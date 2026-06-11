'use strict';

const admin = require('firebase-admin');
const { nextMorningISO } = require('../../shared/cita-blocks');

/**
 * citaSweep — patas de CITAS del job horario (F20, ADR §184). Idempotente
 * por FLAGS en la solicitud (ningún retry duplica):
 *
 *  (a) startAt en (24h, 48h] sin `reminder24hSentAt` → email recordatorio
 *      con el link tokenizado + Telegram al asesor con wa.me prellenado.
 *  (b) cita ACTIVA confirmada de HOY a ≤3h sin `confirmDiaSentAt` →
 *      recordatorio de la misma mañana (email + Telegram al asesor).
 *  (c) HOLD-EXPIRY (F19): `pendiente` sin confirmar a ≤3h del startAt →
 *      libera el cupo global, estado `caducada`, follow-up al asesor
 *      ("cliente no confirmó — ¿reagendar?") + alerta crítica (F38).
 *
 * Las citas de corto aviso entran en la siguiente pasada horaria.
 */

const H = 3600e3;
const ESTADOS_ACTIVOS = ['pendiente', 'confirmada', 'reprogramada'];

/**
 * Decisión PURA por solicitud → lista de acciones ('hold_expire' |
 * 'reminder24h' | 'confirm_dia'). Testeable sin Firebase.
 */
function citaSweepDecision(sol, nowLike) {
  if (!sol || !(sol.kind === 'cita' || sol.requiereCita === true)) return [];
  if (sol._migration === true || sol._suppressed === true) return [];
  if (!sol.startAt || !ESTADOS_ACTIVOS.includes(sol.estado)) return [];
  const now = new Date(nowLike).getTime();
  const start = new Date(sol.startAt).getTime();
  if (!Number.isFinite(start)) return [];
  const until = start - now;

  if (sol.estado === 'pendiente') {
    // Nunca confirmó: a T-3h el hold muere y libera disponibilidad real.
    // GUARD (review §184): una cita de CORTO AVISO (creada hace <3h) jamás
    // recibió pedido de confirmación — no se caduca; pasa natural y el
    // daily job la cierra después. createdAt ausente = cita vieja → aplica.
    const created = sol.createdAt ? new Date(sol.createdAt).getTime() : 0;
    const tuvoTiempo = !Number.isFinite(created) || created === 0 || (now - created >= 3 * H);
    if (until <= 3 * H) return tuvoTiempo ? ['hold_expire'] : [];
    return (until > 24 * H && until <= 48 * H && !sol.reminder24hSentAt) ? ['reminder24h'] : [];
  }
  const out = [];
  if (until > 24 * H && until <= 48 * H && !sol.reminder24hSentAt) out.push('reminder24h');
  if (until > 0 && until <= 3 * H && !sol.confirmDiaSentAt) out.push('confirm_dia');
  return out;
}

/** Teléfono → dígitos wa.me (E.164-ish CO). */
function waDigits(sol) {
  const raw = String(sol.whatsapp || sol.telefono || '').replace(/\D/g, '');
  if (!raw) return null;
  if (raw.length === 10 && raw.startsWith('3')) return '57' + raw;
  const pref = String(sol.prefijoPais || '').replace(/\D/g, '');
  return raw.startsWith('57') || !pref ? raw : pref + raw;
}

async function ensureToken(solRef, sol) {
  if (sol.confirmToken) return sol.confirmToken;
  const crypto = require('crypto');
  const token = crypto.randomBytes(16).toString('hex');
  await solRef.update({ confirmToken: token, confirmTokenAt: new Date().toISOString() });
  return token;
}

function confirmUrl(solId, token, channel) {
  return 'https://us-central1-altorra-cars.cloudfunctions.net/citaConfirm?id=' + solId + '&t=' + token + '&c=' + (channel || 'wa');
}

function recordatorioHtml(sol, url, esHoy) {
  const cuando = (sol.fecha || '') + (sol.hora ? ' a las ' + sol.hora : '');
  return '<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">'
    + '<div style="background:#1a1a2e;color:#fff;padding:20px;border-radius:8px 8px 0 0;text-align:center">'
    + '<h2 style="margin:0;color:#f0c040">ALTORRA CARS</h2>'
    + '<p style="margin:5px 0 0;opacity:0.8">' + (esHoy ? 'Tu cita es HOY' : 'Recordatorio de tu cita') + '</p></div>'
    + '<div style="border:1px solid #ddd;border-top:none;padding:20px;border-radius:0 0 8px 8px">'
    + '<p>Hola <strong>' + (sol.nombre || 'Cliente') + '</strong>,</p>'
    + '<p>' + (esHoy ? 'Hoy te esperamos' : 'Te esperamos') + ' el <strong>' + cuando + '</strong>'
    + (sol.vehiculo ? ' para ver el <strong>' + sol.vehiculo + '</strong>' : '') + '.</p>'
    + '<p style="text-align:center;margin:24px 0"><a href="' + url + '" '
    + 'style="background:#b89658;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:bold">'
    + '✅ Confirmar mi cita</a></p>'
    + '<p style="font-size:0.85rem;color:#777">Si no puedes asistir, respóndenos por WhatsApp y reagendamos sin problema.</p>'
    + '</div></body></html>';
}

/**
 * Corre las patas de citas. deps = { transporter, fromUser, telegramToken }
 * (los secrets se leen en index.js — este módulo no toca defineSecret).
 */
async function runCitaSweep(db, deps) {
  const notify = require('./notify');
  const now = Date.now();
  const nowISO = new Date(now).toISOString();
  const horizon = new Date(now + 48 * H).toISOString();
  const floor = new Date(now - 6 * H).toISOString(); // pendientes recién vencidas

  const snap = await db.collection('solicitudes')
    .where('kind', '==', 'cita')
    .where('startAt', '>=', floor)
    .where('startAt', '<=', horizon)
    .limit(300).get();

  const report = { checked: snap.size, reminder24h: 0, confirmDia: 0, holdExpired: 0, errors: 0 };

  for (const docSnap of snap.docs) {
    const sol = docSnap.data();
    const actions = citaSweepDecision(sol, now);
    for (const action of actions) {
      try {
        if (action === 'hold_expire') {
          // Transacción: liberar cupo GLOBAL + caducar (F19). La TUPLA no se
          // toca: una 'pendiente' jamás reservó bloques (C.2) — filtrarlos
          // borraría bloques de OTRA cita del mismo asesor (review §184).
          const slotsRef = db.collection('config').doc('bookedSlots');
          await db.runTransaction(async (tx) => {
            const [s2, slotsSnap] = await Promise.all([tx.get(docSnap.ref), tx.get(slotsRef)]);
            const cur = s2.data();
            if (!cur || cur.estado !== 'pendiente') return; // carrera con confirmación: gana el cliente
            const slots = slotsSnap.exists ? slotsSnap.data() : {};
            if (cur.fecha && cur.hora && Array.isArray(slots[cur.fecha])) {
              const next = { ...slots, [cur.fecha]: slots[cur.fecha].filter((h) => h !== cur.hora) };
              if (!next[cur.fecha].length) delete next[cur.fecha];
              tx.set(slotsRef, next);
            }
            tx.update(docSnap.ref, {
              estado: 'caducada', holdExpiredAt: nowISO, updatedAt: nowISO, updatedBy: 'citaSweep',
            });
          });
          await db.collection('activities').doc('holdexpiry_' + docSnap.id).set({
            type: 'tarea', kind: 'system', status: 'open', direction: 'outbound',
            subject: '⏳ Cliente no confirmó — ¿reagendar a ' + (sol.nombre || 'cliente') + '?',
            body: 'La cita del ' + (sol.fecha || '') + ' ' + (sol.hora || '') + ' caducó sin confirmación; el cupo quedó libre.',
            dueAt: nextMorningISO(now),
            relatedTo: { type: 'lead', id: sol._leadId || null, name: sol.nombre || 'Cliente' },
            ownerId: sol.assignedTo || null, sourceSolicitudId: docSnap.id,
            createdAt: nowISO, _version: 1,
          }, { merge: true });
          await notify.criticalAlert(db, deps.telegramToken, {
            targetUid: sol.assignedTo || deps.ceoUid || null,
            text: '⏳ *Cita caducada sin confirmar*\n' + (sol.nombre || '') + ' · ' + (sol.fecha || '') + ' ' + (sol.hora || '')
              + '\nEl cupo quedó libre. ¿Lo llamas para reagendar?',
            url: 'https://altorracars.github.io/admin-app/dist/#/agenda', urlLabel: 'Abrir Agenda',
            type: 'cita_hold_expired', meta: { solicitudId: docSnap.id },
          });
          report.holdExpired++;
        }

        if (action === 'reminder24h' || action === 'confirm_dia') {
          const esHoy = action === 'confirm_dia';
          const token = await ensureToken(docSnap.ref, sol);
          const urlEmail = confirmUrl(docSnap.id, token, 'em');
          const urlWa = confirmUrl(docSnap.id, token, 'wa');

          // Email al cliente (si hay email válido) — respaldo del WhatsApp.
          if (deps.transporter && sol.email && sol.email.includes('@')) {
            await deps.transporter.sendMail({
              from: '"ALTORRA CARS" <' + deps.fromUser + '>',
              to: sol.email,
              subject: esHoy ? 'Hoy es tu cita en ALTORRA CARS — ' + (sol.hora || '') : 'Recordatorio: tu cita en ALTORRA CARS',
              html: recordatorioHtml(sol, urlEmail, esHoy),
            });
          }

          // Telegram al ASESOR con wa.me prellenado (canal primario F18).
          const digits = waDigits(sol);
          if (sol.assignedTo && digits) {
            const msg = 'Hola ' + (sol.nombre || '') + '! Te escribo de ALTORRA CARS por tu cita del '
              + (sol.fecha || '') + ' a las ' + (sol.hora || '')
              + (sol.vehiculo ? ' para ver el ' + sol.vehiculo : '')
              + '. Confírmala aquí 👉 ' + urlWa;
            await notify.sendTelegram(db, deps.telegramToken, sol.assignedTo,
              (esHoy ? '📅 *Cita HOY ' + (sol.hora || '') + '*' : '🔔 *Cita en ~24-48h*') + '\n'
              + (sol.nombre || '') + (sol.vehiculo ? ' · ' + sol.vehiculo : '')
              + (sol.estado === 'pendiente' ? '\n⚠️ AÚN SIN CONFIRMAR' : ''),
              { url: 'https://wa.me/' + digits + '?text=' + encodeURIComponent(msg), urlLabel: '📲 Escribirle por WhatsApp' });
          }

          const flag = {};
          flag[esHoy ? 'confirmDiaSentAt' : 'reminder24hSentAt'] = nowISO;
          await docSnap.ref.update(flag);
          report[esHoy ? 'confirmDia' : 'reminder24h']++;
        }
      } catch (err) {
        report.errors++;
        console.error('[citaSweep] ' + action + ' falló para ' + docSnap.id + ':', err.message);
      }
    }
  }
  console.log('[citaSweep] ' + JSON.stringify(report));
  return report;
}

module.exports = { runCitaSweep, citaSweepDecision, waDigits };
