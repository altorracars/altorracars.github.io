'use strict';

/**
 * notify.js — routing de alertas del CRM (F38, ADR §179).
 *
 * Clasificación del comité (anti-fatiga):
 *  - CRÍTICA  → push individual por Telegram al responsable (owner; CEO si
 *               es sistémico) + doc en `crm_alerts` (auditable, alimenta el
 *               digest F28 de E2 y la métrica de volumen F33a).
 *  - INFO     → SOLO doc en `crm_alerts` (kind 'info'); el digest diario las
 *               agrupa — jamás push por cosas informativas.
 * Regla de salud: >~5 push/día por persona = algo está mal clasificado.
 */

/**
 * Push Telegram a UN usuario (usuarios/{uid}.telegramChatId). Best-effort:
 * sin token o sin chat vinculado → false, sin lanzar.
 */
async function sendTelegram(db, token, uid, text, options) {
  if (!token || !uid) return false;
  try {
    const userSnap = await db.collection('usuarios').doc(uid).get();
    if (!userSnap.exists) return false;
    const chatId = userSnap.data().telegramChatId;
    if (!chatId) return false;

    const payload = {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
      disable_notification: false,
    };
    if (options && options.url) {
      payload.reply_markup = {
        inline_keyboard: [[{ text: options.urlLabel || 'Atender ahora', url: options.url }]],
      };
    }
    const send = (body) => fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    let resp = await send(payload);
    // SEC-06 §187 — los textos interpolan nombres del FORM PÚBLICO: un '*' o
    // '`' sin cerrar rompe el parse Markdown (400) y la alerta se perdía en
    // silencio. Fallback: reintentar UNA vez en texto plano — fea > perdida.
    if (!resp.ok && resp.status === 400) {
      const plain = { ...payload };
      delete plain.parse_mode;
      resp = await send(plain);
    }
    if (resp.ok) {
      await db.collection('usuarios').doc(uid).update({ telegramLastUsedAt: new Date().toISOString() });
    }
    return resp.ok;
  } catch (err) {
    console.warn('[notify.sendTelegram] error para ' + uid + ':', err.message);
    return false;
  }
}

/** Alerta CRÍTICA: push individual + registro auditable. */
async function criticalAlert(db, token, { targetUid, text, url, urlLabel, type, meta }) {
  const sent = await sendTelegram(db, token, targetUid, text, { url, urlLabel });
  await db.collection('crm_alerts').add({
    kind: 'critical', type: type || 'general',
    targetUid: targetUid || null, text,
    sentTelegram: sent,
    meta: meta || {},
    createdAt: new Date().toISOString(),
  });
  return sent;
}

/** Alerta INFO: solo registro (el digest F28 las agrupa en E2). */
async function infoAlert(db, { text, type, meta }) {
  await db.collection('crm_alerts').add({
    kind: 'info', type: type || 'general', targetUid: null, text,
    sentTelegram: false, meta: meta || {}, createdAt: new Date().toISOString(),
  });
}

module.exports = { sendTelegram, criticalAlert, infoAlert };
