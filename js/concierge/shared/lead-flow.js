/**
 * ALTORRA CARS — Lead-flow COMPARTIDO (F-1 / TODO-46) ⟦OPUS-4.8 · rev-Fable⟧
 * ============================================================================
 * Capa de DATOS pura (Firestore) del bot, extraída del contrato probado del v1
 * (`js/concierge/concierge.js`) para que el bot v2 (`v2/altor-bot.js`, Web
 * Component) la REUSE en vez de re-implementarla (callejón g: NO copiar).
 *
 * - CERO DOM / CERO render: cada widget pinta lo suyo. Esto solo escribe Firestore.
 * - Modelado FIEL al v1: createSoftContact/persistGateLead (1199/1285),
 *   ensureFirestoreChatDoc (1918), buildWhatsAppSummary (1632). Mismos schemas
 *   → el ALTOR Hub y la ingestión canónica los leen IGUAL, sin tocar backend.
 * - El v1 sigue 100% intacto (usa sus copias internas); MIGRA a este módulo en el
 *   cutover v1→v2, no antes (callejón g: NO big-bang sobre el bot vivo).
 *
 * Todas reciben sus dependencias EXPLÍCITAS (db + objeto session-like) — sin
 * closure oculto → testeable y compartible entre el IIFE v1 y el Shadow DOM v2.
 *
 * API: window.AltorraLeadFlow.{ buildLeadDoc, createLead, ensureChatDoc,
 *      markEscalated, pushMessages, buildWhatsAppSummary, waUrl, wipeSession }
 */
(function () {
    'use strict';
    if (window.AltorraLeadFlow) return;

    function clip(s, n) { return (typeof s === 'string') ? s.slice(0, n) : s; }

    function lastUserText(session, n) {
        return (session.messages || [])
            .filter(function (m) { return m.from === 'user'; })
            .slice(-n).map(function (m) { return m.text; }).join(' / ');
    }

    /**
     * buildLeadDoc — doc de `solicitudes` (espejo del v1). kind: 'soft' | 'gate'.
     * 'gate' añade `consentGiven` (Ley 1581, whitelisteado en las rules). Aplica
     * caps espejo de las rules (§187) + computeMeta MERGEADO (no reemplaza, §187 FIX).
     */
    function buildLeadDoc(session, kind) {
        var nowIso = new Date().toISOString();
        var lead = {
            kind: 'lead',
            tipo: kind === 'gate' ? 'concierge_gate' : 'concierge_soft',
            origen: 'concierge',
            nombre: clip(session.nombre || null, 120),
            email: session.email || null,
            telefono: session.telefono || null,
            comentarios: clip(lastUserText(session, 5), 3000),
            estado: 'pendiente',
            userId: session.uid || null,
            clientCategory: session.uid ? 'registered' : 'guest',
            sessionId: session.sessionId,
            sourcePage: session.sourcePage,
            sourceVehicleId: session.sourceVehicleId,
            level: session.level || 0,
            createdAt: nowIso,
            lastMessageAt: nowIso
        };
        if (kind === 'gate') lead.consentGiven = !!(session.profile && session.profile.consent);
        if (window.AltorraCommSchema && window.AltorraCommSchema.computeMeta) {
            try { lead = Object.assign({}, lead, window.AltorraCommSchema.computeMeta(lead)); } catch (e) {}
        }
        return lead;
    }

    /**
     * createLead — CREATE en `solicitudes` → reusa la ingestión canónica Fase 1
     * (dedup + consent + dead-letter). El CREATE público está permitido por las
     * rules; el UPDATE es solo-admin (por eso el gate CREA, no actualiza, §TODO-37).
     * Devuelve Promise<ref>. El caller decide el rescate (WhatsApp) si falla.
     */
    function createLead(db, session, kind) {
        if (!db) return Promise.reject(new Error('no-db'));
        return db.collection('solicitudes').add(buildLeadDoc(session, kind));
    }

    /**
     * ensureChatDoc — crea `conciergeChats/{sessionId}` = EL doc que lee el ALTOR
     * Hub. Es la pieza que el v2 disparaba al vacío (CustomEvent sin handler).
     * Idempotente vía merge:true; el caller guarda su flag para no re-subir mensajes.
     * Devuelve Promise.
     */
    function ensureChatDoc(db, session) {
        if (!db) return Promise.resolve();
        var nowIso = new Date().toISOString();
        return db.collection('conciergeChats').doc(session.sessionId).set({
            sessionId: session.sessionId,
            userId: session.uid || null,
            userEmail: session.email || null,
            userNombre: session.nombre || null,
            telefono: session.telefono || null,
            sourcePage: session.sourcePage || null,
            sourceVehicleId: session.sourceVehicleId || null,
            status: 'active',
            mode: session.mode || 'queue',
            unreadByAdmin: 0,
            unreadByUser: 0,
            createdAt: nowIso,
            lastMessageAt: nowIso,
            lastMessage: ''
        }, { merge: true });
    }

    /**
     * markEscalated — pone el chat en cola (mode='queue' + reason) → dispara la
     * Cloud Function de workload + la alerta Telegram al equipo. Espejo de la rama
     * `set({mode:'queue', queueEnteredAt, escalationReason})` del v1 escalateToLive.
     */
    function markEscalated(db, sessionId, reason) {
        if (!db) return Promise.resolve();
        return db.collection('conciergeChats').doc(sessionId).set({
            mode: 'queue',
            queueEnteredAt: new Date().toISOString(),
            escalationReason: reason || 'manual'
        }, { merge: true });
    }

    /**
     * pushMessages — sube la conversación a la subcolección `messages/` para que el
     * asesor la vea al tomar el chat. Espejo del batch de startFirestoreSync (v1).
     */
    function pushMessages(db, sessionId, messages) {
        if (!db || !messages || !messages.length) return Promise.resolve();
        var batch = db.batch();
        var coll = db.collection('conciergeChats').doc(sessionId).collection('messages');
        var stamp = Date.now();
        messages.forEach(function (m, i) {
            if (m.from !== 'user' && m.from !== 'bot' && m.from !== 'asesor' && m.from !== 'system') return;
            batch.set(coll.doc('init_' + i + '_' + stamp), {
                from: m.from,
                text: m.text,
                timestamp: new Date(m.timestamp || stamp).toISOString()
            });
        });
        return batch.commit();
    }

    /**
     * buildWhatsAppSummary — texto del handover a WhatsApp (espejo del v1, con la
     * URL del admin CORREGIDA: el v1 apuntaba a `admin.html#concierge` retirado).
     */
    function buildWhatsAppSummary(session) {
        var ticket = String(session.sessionId || '').slice(-8).toUpperCase();
        var lines = ['🚗 *Altorra Cars*', '*Ticket:* #' + ticket, ''];
        if (session.nombre) lines.push('👤 ' + session.nombre);
        if (session.email) lines.push('📧 ' + session.email);
        if (session.telefono) lines.push('📲 ' + session.telefono);
        if (session.sourceVehicleId) lines.push('🔑 Vehículo de interés: #' + session.sourceVehicleId);
        var lastUser = (session.messages || []).filter(function (m) { return m.from === 'user'; }).slice(-3);
        if (lastUser.length) {
            lines.push('', '*Últimos mensajes del cliente:*');
            lastUser.forEach(function (m, i) {
                lines.push((i + 1) + '. ' + (m.text.length > 120 ? m.text.slice(0, 117) + '…' : m.text));
            });
        }
        lines.push('', 'Hola, soy el cliente del ticket #' + ticket + '.');
        return lines.join('\n');
    }

    function waUrl(whatsappNumber, summary) {
        return 'https://wa.me/' + String(whatsappNumber).replace(/[^0-9]/g, '') +
               '?text=' + encodeURIComponent(summary);
    }

    /**
     * wipeSession — §234 (Ley 1581 / PC compartido de mostrador): borra la sesión
     * persistida en logout para que el chat del cliente anterior NO sea visible al
     * siguiente. El caller pasa su propia clave de storage (v1 y v2 difieren).
     */
    function wipeSession(storageKey) {
        try { localStorage.removeItem(storageKey); } catch (e) {}
    }

    window.AltorraLeadFlow = {
        buildLeadDoc: buildLeadDoc,
        createLead: createLead,
        ensureChatDoc: ensureChatDoc,
        markEscalated: markEscalated,
        pushMessages: pushMessages,
        buildWhatsAppSummary: buildWhatsAppSummary,
        waUrl: waUrl,
        wipeSession: wipeSession
    };
})();
