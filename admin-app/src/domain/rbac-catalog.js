// ============================================================
// Catálogo RBAC (PLAN-UNIFICADO F-2, §239) — port ESM del SSoT
// `js/admin/rbac-catalog.js` (§61.R1). 82 permisos atómicos en 9
// categorías + 1 system role (CEO). Naming `<resource>.<action>`.
// (Conteo corregido en OLA-0.6 §266 — el "71 en 8" era stale.)
//
// ⚠️ SINCRONÍA (transición strangler): el SSoT del BACKEND sigue siendo
// `js/admin/rbac-catalog.js` (la CF seedSystemRoles lo fetchea). Esta copia
// es para el RENDER del portal nuevo. Mantener los IDS idénticos hasta el
// cutover (F-6), cuando admin.html se cuarentena y esta copia queda única.
// Cualquier permiso nuevo va a AMBOS hasta entonces.
// ============================================================

export const PERMISSIONS_CATALOG = [
  // 🚗 Inventario
  { id: 'vehicles.read', name: 'Ver vehículos', description: 'Ver el inventario completo', category: 'Inventario' },
  { id: 'vehicles.create', name: 'Crear vehículos', description: 'Agregar nuevos autos al inventario', category: 'Inventario' },
  { id: 'vehicles.edit', name: 'Editar vehículos', description: 'Modificar datos de autos existentes', category: 'Inventario' },
  { id: 'vehicles.delete', name: 'Eliminar vehículos', description: 'Borrar vehículos del inventario', category: 'Inventario', critical: true },
  { id: 'vehicles.import', name: 'Importar vehículos', description: 'Carga masiva via CSV/JSON', category: 'Inventario' },
  { id: 'vehicles.export', name: 'Exportar vehículos', description: 'Descargar el inventario en CSV', category: 'Inventario' },
  { id: 'brands.read', name: 'Ver marcas', description: 'Ver listado de marcas', category: 'Inventario' },
  { id: 'brands.create', name: 'Crear marcas', description: 'Agregar nuevas marcas', category: 'Inventario' },
  { id: 'brands.edit', name: 'Editar marcas', description: 'Modificar marcas existentes', category: 'Inventario' },
  { id: 'brands.delete', name: 'Eliminar marcas', description: 'Borrar marcas', category: 'Inventario', critical: true },
  { id: 'dealers.read', name: 'Ver aliados', description: 'Ver lista de concesionarios aliados', category: 'Inventario' },
  { id: 'dealers.create', name: 'Crear aliados', description: 'Registrar nuevos aliados', category: 'Inventario' },
  { id: 'dealers.edit', name: 'Editar aliados', description: 'Modificar datos de aliados', category: 'Inventario' },
  { id: 'dealers.delete', name: 'Eliminar aliados', description: 'Borrar aliados', category: 'Inventario', critical: true },

  // 🌐 Sitio público
  { id: 'banners.read', name: 'Ver banners', description: 'Ver banners promocionales', category: 'Sitio público' },
  { id: 'banners.create', name: 'Crear banners', description: 'Agregar nuevos banners', category: 'Sitio público' },
  { id: 'banners.edit', name: 'Editar banners', description: 'Modificar banners existentes', category: 'Sitio público' },
  { id: 'banners.delete', name: 'Eliminar banners', description: 'Borrar banners', category: 'Sitio público', critical: true },
  { id: 'reviews.read', name: 'Ver reseñas', description: 'Ver reseñas de clientes', category: 'Sitio público' },
  { id: 'reviews.create', name: 'Crear reseñas', description: 'Agregar reseñas manuales', category: 'Sitio público' },
  { id: 'reviews.edit', name: 'Editar reseñas', description: 'Modificar reseñas', category: 'Sitio público' },
  { id: 'reviews.delete', name: 'Eliminar reseñas', description: 'Borrar reseñas', category: 'Sitio público', critical: true },
  { id: 'content.edit', name: 'Editar contenido del sitio', description: 'Editar textos/contenido editable de las páginas públicas (CMS)', category: 'Sitio público' },

  // 👥 CRM
  { id: 'crm.read', name: 'Ver CRM', description: 'Ver lista de contactos del CRM', category: 'CRM' },
  { id: 'crm.create', name: 'Crear contactos', description: 'Agregar contactos manualmente', category: 'CRM' },
  { id: 'crm.edit', name: 'Editar contactos', description: 'Modificar datos de contactos', category: 'CRM' },
  { id: 'crm.delete', name: 'Eliminar contactos', description: 'Borrar contactos del CRM', category: 'CRM', critical: true },
  { id: 'crm.assign', name: 'Asignar contactos', description: 'Asignar leads a asesores', category: 'CRM' },
  { id: 'crm.export', name: 'Exportar CRM', description: 'Descargar contactos en CSV', category: 'CRM' },

  // 💬 Comunicaciones
  { id: 'appointments.read', name: 'Ver citas', description: 'Ver citas agendadas', category: 'Comunicaciones' },
  { id: 'appointments.create', name: 'Crear citas', description: 'Agendar citas manualmente', category: 'Comunicaciones' },
  { id: 'appointments.edit', name: 'Editar citas', description: 'Modificar/reagendar citas', category: 'Comunicaciones' },
  { id: 'appointments.delete', name: 'Eliminar citas', description: 'Borrar citas', category: 'Comunicaciones', critical: true },
  { id: 'concierge.read', name: 'Ver ALTOR Hub', description: 'Ver conversaciones del Hub', category: 'Comunicaciones' },
  { id: 'concierge.respond', name: 'Responder en Hub', description: 'Enviar mensajes como asesor', category: 'Comunicaciones' },
  { id: 'concierge.claim', name: 'Tomar conversaciones', description: 'Hacerse cargo de un chat', category: 'Comunicaciones' },
  { id: 'concierge.transfer', name: 'Transferir chats', description: 'Pasar conversación a otro asesor', category: 'Comunicaciones' },
  { id: 'concierge.close', name: 'Cerrar conversaciones', description: 'Marcar chats como resueltos', category: 'Comunicaciones' },
  { id: 'concierge.reopen', name: 'Reabrir conversaciones', description: 'Reabrir chats cerrados', category: 'Comunicaciones' },
  { id: 'concierge.delete', name: 'Eliminar conversaciones', description: 'Borrar chats permanentemente', category: 'Comunicaciones', critical: true },
  { id: 'concierge.summarize', name: 'Resumir con IA', description: 'Generar resúmenes IA', category: 'Comunicaciones' },

  // 🧠 Cerebro AI
  { id: 'kb.read', name: 'Ver Cerebro AI', description: 'Ver knowledge base del bot', category: 'Cerebro AI' },
  { id: 'kb.create', name: 'Crear FAQs', description: 'Agregar nuevas FAQs al bot', category: 'Cerebro AI' },
  { id: 'kb.edit', name: 'Editar Cerebro AI', description: 'Modificar identidad/instrucciones del bot', category: 'Cerebro AI' },
  { id: 'kb.delete', name: 'Eliminar FAQs', description: 'Borrar FAQs', category: 'Cerebro AI', critical: true },
  { id: 'kb.bootstrap', name: 'Sembrar FAQs base', description: 'Inicializar 25 FAQs predefinidas', category: 'Cerebro AI' },
  { id: 'unmatched.read', name: 'Ver "Lo que no entendí"', description: 'Ver consultas sin match del bot', category: 'Cerebro AI' },
  { id: 'unmatched.promote', name: 'Promover a FAQ', description: 'Convertir consultas en FAQs', category: 'Cerebro AI' },
  { id: 'unmatched.delete', name: 'Eliminar consultas no match', description: 'Borrar registros de "Lo que no entendí"', category: 'Cerebro AI' },

  // 📅 Calendario
  { id: 'calendar.read', name: 'Ver calendario', description: 'Ver vista mes/día del calendario', category: 'Calendario' },
  { id: 'calendar.create', name: 'Crear eventos', description: 'Agregar eventos manualmente', category: 'Calendario' },
  { id: 'calendar.edit', name: 'Editar eventos', description: 'Modificar eventos del calendario', category: 'Calendario' },
  { id: 'calendar.delete', name: 'Eliminar eventos', description: 'Borrar eventos', category: 'Calendario', critical: true },
  { id: 'calendar.config', name: 'Configurar disponibilidad', description: 'Editar workDays/workHours/slots', category: 'Calendario' },
  { id: 'calendar.holidays', name: 'Gestionar festivos', description: 'CRUD de festivos del calendario', category: 'Calendario' },

  // 📊 Reportes
  { id: 'reports.view', name: 'Ver reportes', description: 'Acceder al dashboard de reportes', category: 'Reportes' },
  { id: 'reports.export', name: 'Exportar reportes', description: 'Descargar reportes en CSV/PDF', category: 'Reportes' },

  // ⚙️ Configuración
  { id: 'users.read', name: 'Ver usuarios', description: 'Ver lista de usuarios admin', category: 'Configuración' },
  { id: 'users.create', name: 'Crear usuarios', description: 'Crear nuevos usuarios admin', category: 'Configuración', critical: true },
  { id: 'users.edit', name: 'Editar usuarios', description: 'Modificar datos de usuarios admin', category: 'Configuración', critical: true },
  { id: 'users.delete', name: 'Eliminar usuarios', description: 'Borrar usuarios admin', category: 'Configuración', critical: true },
  { id: 'users.unlock', name: 'Desbloquear usuarios', description: 'Limpiar bloqueo por intentos fallidos', category: 'Configuración' },
  { id: 'roles.read', name: 'Ver roles', description: 'Ver roles del sistema', category: 'Configuración' },
  { id: 'roles.create', name: 'Crear roles', description: 'Crear roles personalizados', category: 'Configuración', critical: true },
  { id: 'roles.edit', name: 'Editar roles', description: 'Modificar permisos de roles', category: 'Configuración', critical: true },
  { id: 'roles.delete', name: 'Eliminar roles', description: 'Borrar roles personalizados', category: 'Configuración', critical: true },
  { id: 'audit.read', name: 'Ver auditoría', description: 'Ver log de actividad', category: 'Configuración' },
  { id: 'audit.export', name: 'Exportar auditoría', description: 'Descargar audit log', category: 'Configuración' },
  { id: 'audit.delete', name: 'Eliminar entradas de auditoría', description: 'Borrar registros del log', category: 'Configuración', critical: true },
  { id: 'workflows.read', name: 'Ver workflows', description: 'Ver reglas de automatización', category: 'Configuración' },
  { id: 'workflows.create', name: 'Crear workflows', description: 'Crear nuevas reglas', category: 'Configuración' },
  { id: 'workflows.edit', name: 'Editar workflows', description: 'Modificar reglas existentes', category: 'Configuración' },
  { id: 'workflows.delete', name: 'Eliminar workflows', description: 'Borrar reglas', category: 'Configuración' },
  { id: 'templates.read', name: 'Ver plantillas', description: 'Ver plantillas de respuesta', category: 'Configuración' },
  { id: 'templates.create', name: 'Crear plantillas', description: 'Crear nuevas plantillas', category: 'Configuración' },
  { id: 'templates.edit', name: 'Editar plantillas', description: 'Modificar plantillas', category: 'Configuración' },
  { id: 'templates.delete', name: 'Eliminar plantillas', description: 'Borrar plantillas', category: 'Configuración' },
  { id: 'settings.theme', name: 'Cambiar tema', description: 'Cambiar tema visual del admin', category: 'Configuración' },
  { id: 'settings.seo', name: 'Configurar SEO', description: 'Regenerar páginas SEO + GitHub token', category: 'Configuración', critical: true },
  { id: 'settings.backup', name: 'Backup/Restore', description: 'Exportar/importar respaldo de datos', category: 'Configuración', critical: true },

  // 🏢 Departamentos (§193.4 ④a)
  { id: 'departments.read', name: 'Ver departamentos', description: 'Ver la lista de departamentos del CRM', category: 'Departamentos' },
  { id: 'departments.manage', name: 'Gestionar departamentos', description: 'Crear, editar, eliminar departamentos y asignar personas', category: 'Departamentos', critical: true },
];

// §219 (P0-SEC-2 — decisión del dueño 29/06): permisos OWNER-EXCLUSIVOS. La administración
// de identidad/seguridad NUNCA se delega a un rol/usuario custom — vive SOLO en el '*' del
// dueño. La UI los muestra DESHABILITADOS (no ocultos); las firestore.rules lo enforce.
// Mantener idéntico a ownerOnlyPerms() de firestore.rules.
export const OWNER_ONLY_PERMS = [
  'users.create', 'users.edit', 'users.delete',
  'roles.create', 'roles.edit', 'roles.delete',
  'settings.backup', 'settings.seo', 'audit.delete',
];
export const isOwnerOnlyPerm = (id) => OWNER_ONLY_PERMS.includes(id);

// 1 system role inmutable (§69 R7): CEO = wildcard. ID conservado por retrocompat R4/rules.
export const SYSTEM_ROLES = [
  { id: 'system_super_admin', name: 'CEO', description: 'Acceso absoluto al sistema. No se puede modificar, editar ni eliminar.', isSystem: true, isDefault: false, color: '#b89658', icon: 'crown', permissions: ['*'], nivel: 100 },
];

/** Orden canónico de categorías (insertion order del catálogo). */
export const CATEGORY_ORDER = PERMISSIONS_CATALOG.reduce((acc, p) => {
  if (!acc.includes(p.category)) acc.push(p.category);
  return acc;
}, []);

/** { categoría: [permiso,…] } en el orden del catálogo. */
export function permissionsByCategory() {
  const grouped = {};
  for (const p of PERMISSIONS_CATALOG) {
    (grouped[p.category] = grouped[p.category] || []).push(p);
  }
  return grouped;
}

export function getPermissionById(id) {
  return PERMISSIONS_CATALOG.find((p) => p.id === id) || null;
}
