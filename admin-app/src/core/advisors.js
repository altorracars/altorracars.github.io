// ============================================================
// Asesores del equipo (para selects de Confirmar cita / overrides F21).
// Listar `usuarios` exige users.read o super admin (Rules §61) → si la
// query es denegada se degrada a la rotación de config/crmIntake (lectura
// pública para staff) + el usuario actual. Nunca rompe la UI.
// ============================================================

import { collection, doc, getDoc, getDocs, limit, query } from 'firebase/firestore';
import { db } from './firebase.js';
import { store } from './store.js';

const STAFF_ROLES = ['super_admin', 'admin', 'editor', 'asesor', 'moderator'];
let _cache = null;

export async function fetchAdvisors() {
  if (_cache) return _cache;
  const me = store.get();
  const out = new Map();

  try {
    const snap = await getDocs(query(collection(db, 'usuarios'), limit(50)));
    snap.docs.forEach((d) => {
      const u = d.data();
      if (u.bloqueado === true) return;
      if (!STAFF_ROLES.includes(u.rol) && !u.roleId) return;
      out.set(d.id, { uid: d.id, nombre: u.nombre || u.email || d.id, rol: u.rol || u.roleId || '' });
    });
  } catch (e) {
    // Sin users.read: rotación de intake + yo mismo.
    try {
      const cfg = await getDoc(doc(db, 'config', 'crmIntake'));
      const rot = (cfg.exists() && Array.isArray(cfg.data().rotation)) ? cfg.data().rotation : [];
      rot.forEach((r) => {
        const uid = typeof r === 'string' ? r : r.uid;
        if (uid) out.set(uid, { uid, nombre: (typeof r === 'object' && r.nombre) || uid, rol: '' });
      });
    } catch (e2) { /* sin red: cae al usuario actual */ }
  }

  if (me.user && !out.has(me.user.uid)) {
    out.set(me.user.uid, {
      uid: me.user.uid,
      nombre: (me.profile && me.profile.nombre) || me.user.email || 'Yo',
      rol: (me.profile && me.profile.rol) || '',
    });
  }
  _cache = Array.from(out.values());
  return _cache;
}
