/**
 * AltorraAdminTelegram — Conector Telegram Bot $0 para alertas móviles
 * =====================================================================
 * §26.5 — Alternativa GRATUITA a FCM Web Push para asesores que NO
 * tienen iOS 16.4+ con PWA instalada (donde FCM no funciona en BG).
 *
 * Telegram Bot API es 100% gratuito, funciona en TODOS los celulares
 * con Telegram instalado, y entrega push reliable sin necesitar PWA.
 *
 * Setup operacional one-time (super_admin):
 *
 *   1. Abrir https://t.me/BotFather → /newbot
 *      Nombre sugerido: "Altorra Cars Alerts Bot"
 *      Username: AltorraCarsAlertsBot (o similar disponible)
 *      Recibís un BOT_TOKEN tipo: 1234567:AAH...xyz
 *
 *   2. En PowerShell del servidor Firebase:
 *      firebase functions:secrets:set TELEGRAM_BOT_TOKEN
 *      (pegar el token completo)
 *
 *   3. Deploy de Cloud Function:
 *      firebase deploy --only functions:sendTelegramAlert,functions:linkTelegramChat
 *
 *   4. Cada asesor:
 *      a) Abre admin.html → su perfil → botón "Conectar Telegram"
 *      b) Sigue el deep-link al bot
 *      c) Bot responde "✓ Vinculado correctamente con uid={uid}"
 *      d) A partir de ahí recibe alertas push reliable
 *
 * API:
 *   AltorraAdminTelegram.openLinkFlow()     → abre deep-link al bot
 *   AltorraAdminTelegram.unlink()           → quita el chatId
 *   AltorraAdminTelegram.isLinked()         → bool
 *   AltorraAdminTelegram.status()           → { linked, chatId, lastUsed }
 */
(function () {
    'use strict';
    if (window.AltorraAdminTelegram) return;
    var AP = window.AP || {};

    // §26.5 — Username del bot creado en BotFather. Cambiá esto al
    // username real cuando crees el bot. Mientras esté como placeholder,
    // el flujo informa al admin que el setup está pendiente.
    // §39 (2026-05-08) — Bot Telegram CONFIGURADO. Username real desde BotFather.
    var BOT_USERNAME = 'AltorraCarsbot';

    function isConfigured() {
        return BOT_USERNAME && BOT_USERNAME !== 'AltorraCarsAlertsBot';
    }

    function isLinked() {
        if (!AP.currentUserProfile) return false;
        return !!(AP.currentUserProfile.telegramChatId);
    }

    function status() {
        if (!AP.currentUserProfile) return { linked: false };
        return {
            linked: !!AP.currentUserProfile.telegramChatId,
            chatId: AP.currentUserProfile.telegramChatId || null,
            lastUsed: AP.currentUserProfile.telegramLastUsedAt || null
        };
    }

    /**
     * openLinkFlow — abre deep-link al bot de Telegram con payload
     * `start=ASESOR_<uid>`. El bot recibe ese param en /start y la
     * Cloud Function `linkTelegramChat` (trigger Telegram webhook)
     * persiste el chatId en `usuarios/{uid}.telegramChatId`.
     */
    function openLinkFlow() {
        if (!window.auth || !window.auth.currentUser) {
            if (AP.toast) AP.toast('Iniciá sesión primero', 'error');
            return;
        }
        if (!isConfigured()) {
            if (AP.toast) AP.toast(
                '⚠️ Telegram Bot no configurado. Pedí al super_admin crear el bot en @BotFather y editar BOT_USERNAME en js/admin-telegram.js.',
                'warning'
            );
            return;
        }
        var uid = window.auth.currentUser.uid;
        var url = 'https://t.me/' + BOT_USERNAME + '?start=ASESOR_' + uid;

        if (AP.toast) AP.toast(
            '📲 Abriendo Telegram. Tocá "INICIAR" en el chat del bot para vincular.',
            'info', 6000
        );
        window.open(url, '_blank', 'noopener');
    }

    /**
     * unlink — borra el chatId del usuario. Después de esto NO
     * recibirá más alertas por Telegram (FCM sigue funcionando si
     * tiene token registrado).
     */
    function unlink() {
        if (!window.auth || !window.auth.currentUser || !window.db) return;
        if (!confirm('¿Desvincular Telegram? Dejarás de recibir alertas push del equipo.')) return;
        var uid = window.auth.currentUser.uid;
        window.db.collection('usuarios').doc(uid).update({
            telegramChatId: window.firebase.firestore.FieldValue.delete(),
            telegramLastUsedAt: window.firebase.firestore.FieldValue.delete()
        }).then(function () {
            if (AP.currentUserProfile) {
                delete AP.currentUserProfile.telegramChatId;
                delete AP.currentUserProfile.telegramLastUsedAt;
            }
            if (AP.toast) AP.toast('✓ Telegram desvinculado', 'success');
        }).catch(function (err) {
            if (AP.toast) AP.toast('Error: ' + err.message, 'error');
        });
    }

    /**
     * §51 — setupWebhook: configura el webhook del bot via Cloud Function
     * (super_admin only). Sin esto, el bot no responde a /start y nadie
     * puede vincular su Telegram → onChatEscalatedTelegram nunca tiene
     * destinatarios.
     */
    function setupWebhook() {
        if (!window.functions || !window.firebase) {
            if (AP.toast) AP.toast('Firebase Functions no cargado', 'error');
            return Promise.reject(new Error('functions not loaded'));
        }
        var fn = window.functions.httpsCallable('setupTelegramWebhook');
        return fn().then(function (result) {
            var data = (result && result.data) || {};
            if (data.success) {
                if (AP.toast) AP.toast(
                    '✓ Webhook configurado. Ahora el bot responde a /start y los asesores pueden vincular Telegram.',
                    'success', 8000
                );
            } else {
                if (AP.toast) AP.toast('Error inesperado: respuesta sin success', 'error');
            }
            return data;
        }).catch(function (err) {
            var msg = (err && err.message) || 'Error desconocido';
            if (AP.toast) AP.toast('Error: ' + msg, 'error', 10000);
            console.error('[Telegram] setupWebhook error:', err);
            throw err;
        });
    }

    /**
     * §51 — getWebhookStatus: devuelve el estado actual del webhook.
     * Útil para diagnóstico antes de configurar.
     */
    function getWebhookStatus() {
        if (!window.functions) {
            return Promise.reject(new Error('functions not loaded'));
        }
        var fn = window.functions.httpsCallable('getTelegramWebhookStatus');
        return fn().then(function (result) { return (result && result.data) || {}; });
    }

    /* ─── Public API ────────────────────────────────────────────── */
    window.AltorraAdminTelegram = {
        openLinkFlow: openLinkFlow,
        unlink: unlink,
        isLinked: isLinked,
        isConfigured: isConfigured,
        status: status,
        setupWebhook: setupWebhook,           // §51 — super_admin only
        getWebhookStatus: getWebhookStatus,   // §51 — diagnóstico
        BOT_USERNAME: BOT_USERNAME
    };
})();
