// ============================================================
// Perfil (PLAN-UNIFICADO F-6, gap §3 "sec-profile") — UI.
// Acceso desde el menú de usuario (topbar) → ruta #/perfil. Sin ítem en el
// sidebar (no engrosar la navegación; el gran rediseño FE lo reorganiza al final).
// Diseño con el design-system del portal nuevo (no se porta el CSS bespoke del
// admin viejo, que se reemplaza en el rediseño). ⟦OPUS-4.8 · rev-Fable⟧
// ============================================================

import { el, clear } from '../../core/dom.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { initials } from '../../domain/format.js';
import { confirmDialog } from '../../core/confirm.js';
import { icon } from '../../core/icons.js';
import { friendlyError, friendlyCallable } from '../../core/errors.js';
import {
  fmtDate, compressImageToWebp, uploadAvatar, saveProfile, requestCedulaChange,
  PW_RULES, passwordScore, changePassword,
  telegramDeepLink, unlinkTelegram, subscribeOwnProfile,
} from './perfil.data.js';

const PREFIJOS = ['+57', '+1', '+34', '+52', '+54', '+56', '+51'];
const TIPOS_DOC = [
  ['cc', 'Cédula de ciudadanía'],
  ['ce', 'Cédula de extranjería'],
  ['pa', 'Pasaporte'],
];

export function mountPerfil(root) {
  const { profile, user, mock } = store.get();
  const p = profile || {};
  const uid = (user && user.uid) || p.uid || '';
  const email = p.email || (user && user.email) || '';
  const roleDisplay = p.roleName || p.cargo || p.rol || 'Asesor';

  // Estado editable de la tarjeta "Información personal" + avatar pendiente.
  let pendingAvatarBlob = null;
  let pendingAvatarUrl = null;
  const cedulaLocked = !!p.cedula;
  const initial = {
    nombre: p.nombre || '',
    telefono: p.telefono || '',
    prefijo: p.prefijo || '+57',
    tipoDoc: p.tipoDoc || 'cc',
    cedula: p.cedula || '',
  };

  const wrap = el('section', { class: 'perfil' });
  clear(root); root.append(wrap);

  /* ─── refs que se actualizan en vivo ─── */
  const avatarBox = el('div', { class: 'perfil-avatar', tabindex: '0', role: 'button', 'aria-label': 'Cambiar foto de perfil' });
  const fileInput = el('input', { type: 'file', accept: 'image/png,image/jpeg,image/webp', class: 'perfil-avatar__file' });
  const heroName = el('h2', { class: 'perfil-hero__name', text: initial.nombre || '(Sin nombre)' });

  function paintAvatar(url) {
    clear(avatarBox);
    if (url) {
      avatarBox.append(el('img', { class: 'perfil-avatar__img', src: url, alt: '' }));
    } else {
      avatarBox.append(el('span', { class: 'perfil-avatar__initials', text: initials(initial.nombre || email) }));
    }
    avatarBox.append(el('span', { class: 'perfil-avatar__overlay', 'aria-hidden': 'true', html: icon('camera') }));
  }
  paintAvatar(p.photoURL || p.avatarURL || '');

  /* ─── Tarjeta: Información personal ─── */
  const fNombre = el('input', { class: 'input', type: 'text', value: initial.nombre, placeholder: 'Tu nombre' });
  const fTelefono = el('input', { class: 'input', type: 'tel', value: initial.telefono, placeholder: '3001234567' });
  const fPrefijo = el('select', { class: 'select perfil-prefijo' },
    PREFIJOS.map((pf) => el('option', { value: pf, selected: pf === initial.prefijo || null, text: pf })));

  const saveStatus = el('span', { class: 'perfil-savebar__status u-caption u-muted', text: 'Sin cambios pendientes' });
  const saveBtn = el('button', { class: 'btn btn--gold btn--sm', type: 'button', disabled: true, text: 'Guardar cambios' });
  const cancelBtn = el('button', { class: 'btn btn--ghost btn--sm', type: 'button', disabled: true, text: 'Descartar' });

  function isDirty() {
    if (pendingAvatarBlob) return true;
    if (fNombre.value.trim() !== initial.nombre) return true;
    if (fTelefono.value.trim() !== initial.telefono) return true;
    if (fPrefijo.value !== initial.prefijo) return true;
    if (!cedulaLocked) {
      if (fCedula.value.trim() !== initial.cedula) return true;
      if (fTipoDoc.value !== initial.tipoDoc) return true;
    }
    return false;
  }
  function refreshSaveBar() {
    const dirty = isDirty();
    saveBtn.disabled = !dirty;
    cancelBtn.disabled = !dirty;
    saveStatus.textContent = dirty ? 'Cambios sin guardar' : 'Sin cambios pendientes';
    saveStatus.classList.toggle('is-dirty', dirty);
  }

  [fNombre, fTelefono].forEach((node) => node.addEventListener('input', refreshSaveBar));
  fPrefijo.addEventListener('change', refreshSaveBar);

  const cardPersonal = el('div', { class: 'perfil-card' }, [
    el('h3', { class: 'perfil-card__title u-ico-text', html: icon('user') + ' Información personal' }),
    field('Nombre completo', fNombre),
    field('Correo electrónico', el('input', { class: 'input', type: 'email', value: email, readonly: true }),
      'El correo no se puede cambiar desde aquí.'),
    el('div', { class: 'field' }, [
      el('label', { class: 'field__label', text: 'Teléfono' }),
      el('div', { class: 'perfil-phone-row' }, [fPrefijo, fTelefono]),
    ]),
    field('Cargo', el('input', { class: 'input', type: 'text', value: roleDisplay, readonly: true }),
      'Se asigna automáticamente según tu rol. No es editable.'),
  ]);

  /* ─── Tarjeta: Documento de identidad (lock pattern) ─── */
  const fTipoDoc = el('select', { class: 'select', disabled: cedulaLocked || null },
    TIPOS_DOC.map(([v, label]) => el('option', { value: v, selected: v === initial.tipoDoc || null, text: label })));
  const fCedula = el('input', {
    class: 'input' + (cedulaLocked ? ' is-locked' : ''), type: 'text', value: initial.cedula,
    placeholder: 'Ej: 1043123456', maxlength: '20', readonly: cedulaLocked || null,
  });
  [fTipoDoc, fCedula].forEach((node) => node.addEventListener('input', refreshSaveBar));
  fTipoDoc.addEventListener('change', refreshSaveBar);

  const cedulaHint = el('span', { class: 'field__hint u-caption u-muted', text: cedulaLocked
    ? 'Documento verificado y bloqueado. Para modificarlo, solicita autorización al Super Admin.'
    : 'Ingresa tu número y guárdalo. Una vez guardado quedará bloqueado.' });

  const requestBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', html: icon('mail') + ' Solicitar cambio al Super Admin' });
  requestBtn.addEventListener('click', async () => {
    if (p.cedulaChangeRequested) { toast('Ya hay una solicitud pendiente.', 'info'); return; }
    requestBtn.disabled = true;
    try {
      if (mock) { await wait(400); }
      else { await requestCedulaChange(); }
      toast('✅ Solicitud enviada. El Super Admin recibirá una notificación.', 'ok');
      requestBtn.textContent = '✓ Solicitud enviada';
    } catch (e) {
      requestBtn.disabled = false;
      toast(friendlyCallable(e, 'No se pudo enviar la solicitud.'), 'error');
    }
  });

  const cardDoc = el('div', { class: 'perfil-card' }, [
    el('h3', { class: 'perfil-card__title u-ico-text', html: icon('idCard') + ' Documento de identidad' }),
    field('Tipo de documento', fTipoDoc),
    el('div', { class: 'field' }, [
      el('label', { class: 'field__label', text: 'Número de documento' }),
      fCedula, cedulaHint,
    ]),
    cedulaLocked ? requestBtn : null,
  ]);

  /* ─── Tarjeta: Información de cuenta (read-only) ─── */
  const cardCuenta = el('div', { class: 'perfil-card' }, [
    el('h3', { class: 'perfil-card__title u-ico-text', html: icon('key') + ' Información de cuenta' }),
    infoRow('Rol asignado', roleDisplay, false, 'tag'),
    infoRow('ID de usuario', uid || '—', true, 'idCard'),
    infoRow('Cuenta creada', fmtDate(p.creadoEn || p.createdAt), false, 'calendar'),
    infoRow('Último acceso', fmtDate(p.ultimoAcceso || p.lastLoginAt), false, 'clock'),
  ]);

  /* ─── Tarjeta: Notificaciones por Telegram (§26.5/§39) ─── */
  // Independiente del login (es push, no auth): el backend (linkTelegramChat +
  // senders) ya está deployed. Vincular = deep-link; el estado se refleja EN VIVO
  // por onSnapshot del propio doc (en cuanto el webhook persiste telegramChatId).
  let tgState = { chatId: p.telegramChatId || null, userName: p.telegramUserName || '' };
  let tgUnsub = () => {};
  const tgBody = el('div', { class: 'perfil-tg' });

  function renderTelegram() {
    clear(tgBody);
    if (tgState.chatId) {
      const unlinkBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: 'Desvincular' });
      unlinkBtn.addEventListener('click', onTgUnlink);
      tgBody.append(
        el('div', { class: 'perfil-tg__status is-linked' }, [
          el('span', { class: 'perfil-tg__dot', 'aria-hidden': 'true' }),
          el('div', { class: 'u-grow' }, [
            el('strong', { text: 'Conectado' }),
            el('div', { class: 'u-caption u-muted', text: tgState.userName ? '@' + tgState.userName : 'Recibís las alertas del equipo en Telegram.' }),
          ]),
        ]),
        unlinkBtn,
      );
    } else {
      const connectBtn = el('button', { class: 'btn btn--gold btn--sm', type: 'button', text: 'Conectar Telegram' });
      connectBtn.addEventListener('click', onTgConnect);
      tgBody.append(
        el('p', { class: 'u-caption u-muted', text: 'Conectá tu Telegram para recibir las alertas de leads y chats en el celular — gratis y sin instalar nada extra.' }),
        connectBtn,
      );
    }
  }
  function onTgConnect() {
    if (mock) { toast('Vinculación de Telegram no disponible en demo.', 'info'); return; }
    window.open(telegramDeepLink(uid), '_blank', 'noopener');
    toast('Abrí Telegram y tocá INICIAR en el chat del bot. La conexión aparecerá aquí sola.', 'info');
  }
  async function onTgUnlink() {
    const ok = await confirmDialog({
      title: '¿Desvincular Telegram?',
      message: 'Dejarás de recibir las alertas push del equipo en Telegram.',
      confirmText: 'Desvincular', danger: true,
    });
    if (!ok) return;
    try {
      if (!mock) await unlinkTelegram();
      tgState = { chatId: null, userName: '' };
      renderTelegram();
      toast('Telegram desvinculado.', 'ok');
    } catch (e) { toast(friendlyError(e, 'No se pudo desvincular.'), 'error'); }
  }
  renderTelegram();
  if (!mock && uid) {
    tgUnsub = subscribeOwnProfile(uid, (data) => {
      const chatId = data.telegramChatId || null;
      const userName = data.telegramUserName || '';
      if (chatId !== tgState.chatId || userName !== tgState.userName) {
        tgState = { chatId, userName };
        renderTelegram();
      }
    });
  }
  const cardTelegram = el('div', { class: 'perfil-card' }, [
    el('h3', { class: 'perfil-card__title', text: 'Notificaciones por Telegram' }),
    tgBody,
  ]);

  /* ─── Tarjeta: Seguridad (cambio de contraseña con reauth) ─── */
  const cardSeguridad = buildSecurityCard(mock);

  /* ─── Save bar (sticky) de la tarjeta personal ─── */
  const saveBar = el('div', { class: 'perfil-savebar' }, [
    saveStatus,
    el('div', { class: 'perfil-savebar__actions' }, [cancelBtn, saveBtn]),
  ]);

  saveBtn.addEventListener('click', onSave);
  cancelBtn.addEventListener('click', () => {
    fNombre.value = initial.nombre;
    fTelefono.value = initial.telefono;
    fPrefijo.value = initial.prefijo;
    if (!cedulaLocked) { fCedula.value = initial.cedula; fTipoDoc.value = initial.tipoDoc; }
    pendingAvatarBlob = null; pendingAvatarUrl = null;
    paintAvatar(p.photoURL || p.avatarURL || '');
    refreshSaveBar();
  });

  async function onSave() {
    saveBtn.disabled = true; cancelBtn.disabled = true;
    saveStatus.textContent = 'Guardando…';
    try {
      const updates = {
        nombre: fNombre.value.trim(),
        telefono: fTelefono.value.trim(),
        prefijo: fPrefijo.value || '+57',
      };
      if (!cedulaLocked && fCedula.value.trim()) {
        updates.cedula = fCedula.value.trim();
        updates.tipoDoc = fTipoDoc.value || 'cc';
      }
      if (mock) {
        await wait(500);
      } else {
        if (pendingAvatarBlob) {
          updates.photoURL = await uploadAvatar(uid, pendingAvatarBlob);
        }
        await saveProfile(updates);
      }
      // Asentar el nuevo estado base.
      initial.nombre = updates.nombre;
      initial.telefono = updates.telefono;
      initial.prefijo = updates.prefijo;
      if (updates.cedula) initial.cedula = updates.cedula;
      if (updates.tipoDoc) initial.tipoDoc = updates.tipoDoc;
      if (updates.photoURL) { p.photoURL = updates.photoURL; pendingAvatarUrl = null; }
      pendingAvatarBlob = null;
      heroName.textContent = updates.nombre || '(Sin nombre)';
      toast('✅ Perfil actualizado.', 'ok');
    } catch (e) {
      toast(friendlyError(e, 'No se pudo guardar el perfil. Intenta de nuevo.'), 'error');
    } finally {
      refreshSaveBar();
    }
  }

  /* ─── Avatar wiring ─── */
  function pickFile() { fileInput.click(); }
  avatarBox.addEventListener('click', pickFile);
  avatarBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pickFile(); }
  });
  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!/^image\/(png|jpeg|webp)$/.test(file.type)) { toast('Usa JPG, PNG o WebP.', 'error'); return; }
    if (file.size > 5 * 1024 * 1024) { toast('Imagen muy grande (máx 5 MB).', 'error'); return; }
    try {
      const out = await compressImageToWebp(file);
      pendingAvatarBlob = out.blob;
      pendingAvatarUrl = out.dataUrl;
      paintAvatar(out.dataUrl);
      refreshSaveBar();
    } catch { toast('No se pudo procesar la imagen.', 'error'); }
  });

  /* ─── Hero + ensamblado ─── */
  const hero = el('div', { class: 'perfil-card perfil-hero' }, [
    el('div', { class: 'perfil-hero__avatarwrap' }, [avatarBox, fileInput]),
    el('div', { class: 'perfil-hero__info' }, [
      heroName,
      el('div', { class: 'perfil-hero__role badge badge--gold', text: roleDisplay }),
      el('div', { class: 'perfil-hero__email u-caption u-muted', text: email }),
    ]),
  ]);

  wrap.append(
    hero,
    el('div', { class: 'perfil-grid' }, [
      el('div', { class: 'perfil-col' }, [cardPersonal, saveBar]),
      el('div', { class: 'perfil-col' }, [cardDoc, cardCuenta, cardTelegram]),
      cardSeguridad,
    ]),
  );

  refreshSaveBar();
  return function cleanup() { tgUnsub(); };
}

/* ════════════════ helpers de construcción ════════════════ */

function field(label, control, hint) {
  return el('div', { class: 'field' }, [
    el('label', { class: 'field__label', text: label }),
    control,
    hint ? el('span', { class: 'field__hint u-caption u-muted', text: hint }) : null,
  ]);
}

function infoRow(label, value, mono, iconId) {
  return el('div', { class: 'perfil-inforow' }, [
    iconId
      ? el('span', { class: 'perfil-inforow__label u-caption u-muted u-ico-text' }, [el('span', { class: 'u-ico', 'aria-hidden': 'true', html: icon(iconId) }), label])
      : el('span', { class: 'perfil-inforow__label u-caption u-muted', text: label }),
    el('span', { class: 'perfil-inforow__value' + (mono ? ' u-mono' : ''), text: value }),
  ]);
}

function buildSecurityCard(mock) {
  const current = el('input', { class: 'input', type: 'password', placeholder: 'Tu contraseña actual', autocomplete: 'current-password' });
  const next = el('input', { class: 'input', type: 'password', placeholder: 'Mínimo 8 caracteres', autocomplete: 'new-password' });

  const bar = el('div', { class: 'pw-strength__bar' }, [el('span', { class: 'pw-strength__fill' })]);
  const barWrap = el('div', { class: 'pw-strength' }, [bar]);
  const rules = el('ul', { class: 'pw-rules' },
    PW_RULES.map((r) => el('li', { class: 'pw-rule', dataset: { rule: r.id } }, [
      el('span', { class: 'pw-rule__icon', text: '○' }),
      el('span', { text: r.label }),
    ])));

  const submit = el('button', { class: 'btn btn--gold btn--sm', type: 'submit', html: icon('key') + ' Actualizar contraseña' });

  function refreshStrength() {
    const v = next.value;
    const score = passwordScore(v);
    const fill = bar.querySelector('.pw-strength__fill');
    fill.style.width = (score / PW_RULES.length * 100) + '%';
    fill.dataset.level = String(score);
    rules.querySelectorAll('.pw-rule').forEach((li) => {
      const rule = PW_RULES.find((r) => r.id === li.dataset.rule);
      const ok = rule && rule.test(v);
      li.classList.toggle('is-ok', !!ok);
      li.querySelector('.pw-rule__icon').textContent = ok ? '●' : '○';
    });
  }
  next.addEventListener('input', refreshStrength);

  const form = el('form', { class: 'perfil-card perfil-pwform' }, [
    el('h3', { class: 'perfil-card__title u-ico-text', html: icon('shield') + ' Seguridad · Cambiar contraseña' }),
    el('p', { class: 'u-caption u-muted', text: 'Por seguridad pedimos tu contraseña actual antes de cambiarla.' }),
    field('Contraseña actual', current),
    field('Nueva contraseña', next),
    barWrap, rules, submit,
  ]);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!current.value) { toast('Ingresá tu contraseña actual.', 'error'); return; }
    if (passwordScore(next.value) < PW_RULES.length) { toast('La nueva contraseña no cumple los requisitos.', 'error'); return; }
    submit.disabled = true;
    try {
      if (mock) {
        await wait(500);
      } else {
        await changePassword(current.value, next.value);
      }
      toast('✅ Contraseña actualizada.', 'ok');
      current.value = ''; next.value = ''; refreshStrength();
    } catch (err) {
      toast(pwError(err), 'error');
    } finally {
      submit.disabled = false;
    }
  });

  refreshStrength();
  return form;
}

function pwError(err) {
  const code = (err && err.code) || '';
  if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') return 'La contraseña actual es incorrecta.';
  if (code === 'auth/too-many-requests') return 'Demasiados intentos. Espera unos minutos.';
  if (code === 'auth/weak-password' || code === 'weak-password-policy') return 'La contraseña no cumple los requisitos.';
  if (code === 'auth/requires-recent-login') return 'Por seguridad, cierra sesión y entra de nuevo antes de cambiarla.';
  return friendlyError(err, 'No se pudo actualizar la contraseña.');
}

function wait(ms) { return new Promise((r) => setTimeout(r, ms)); }
