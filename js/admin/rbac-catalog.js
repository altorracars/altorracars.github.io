// §61.R1 — RBAC Catalog (Foundation)
//
// Catálogo canónico de permissions atómicas + mapeo de roles legacy
// (super_admin / editor / viewer) a permissions concretas.
//
// Single source of truth para frontend Y backend (Cloud Function
// seedSystemRoles consume este mismo catálogo via fetch dinámico
// para evitar drift entre fuentes).
//
// REGLA DOCTRINAL §17.4: este archivo NO debe modificarse sin
// IAP §37. Cualquier cambio aquí se propaga a los 154 callsites
// del admin via los helpers de admin-state.js.
//
// Naming convention: <resource>.<action> (estilo Linear/Stripe).

(function () {
    'use strict';

    // ========== ATOMIC PERMISSIONS (71) ==========
    // Agrupadas en 8 categorías que matchean los workspaces del topnav.

    var PERMISSIONS_CATALOG = [
        // 🚗 Inventario (12)
        { id: 'vehicles.read', name: 'Ver vehículos', description: 'Ver el inventario completo', category: 'Inventario', resource: 'vehicles', action: 'read' },
        { id: 'vehicles.create', name: 'Crear vehículos', description: 'Agregar nuevos autos al inventario', category: 'Inventario', resource: 'vehicles', action: 'create' },
        { id: 'vehicles.edit', name: 'Editar vehículos', description: 'Modificar datos de autos existentes', category: 'Inventario', resource: 'vehicles', action: 'edit' },
        { id: 'vehicles.delete', name: 'Eliminar vehículos', description: 'Borrar vehículos del inventario', category: 'Inventario', resource: 'vehicles', action: 'delete', critical: true },
        { id: 'vehicles.import', name: 'Importar vehículos', description: 'Carga masiva via CSV/JSON', category: 'Inventario', resource: 'vehicles', action: 'import' },
        { id: 'vehicles.export', name: 'Exportar vehículos', description: 'Descargar el inventario en CSV', category: 'Inventario', resource: 'vehicles', action: 'export' },
        { id: 'brands.read', name: 'Ver marcas', description: 'Ver listado de marcas', category: 'Inventario', resource: 'brands', action: 'read' },
        { id: 'brands.create', name: 'Crear marcas', description: 'Agregar nuevas marcas', category: 'Inventario', resource: 'brands', action: 'create' },
        { id: 'brands.edit', name: 'Editar marcas', description: 'Modificar marcas existentes', category: 'Inventario', resource: 'brands', action: 'edit' },
        { id: 'brands.delete', name: 'Eliminar marcas', description: 'Borrar marcas', category: 'Inventario', resource: 'brands', action: 'delete', critical: true },
        { id: 'dealers.read', name: 'Ver aliados', description: 'Ver lista de concesionarios aliados', category: 'Inventario', resource: 'dealers', action: 'read' },
        { id: 'dealers.create', name: 'Crear aliados', description: 'Registrar nuevos aliados', category: 'Inventario', resource: 'dealers', action: 'create' },
        { id: 'dealers.edit', name: 'Editar aliados', description: 'Modificar datos de aliados', category: 'Inventario', resource: 'dealers', action: 'edit' },
        { id: 'dealers.delete', name: 'Eliminar aliados', description: 'Borrar aliados', category: 'Inventario', resource: 'dealers', action: 'delete', critical: true },

        // 🌐 Sitio público (8)
        { id: 'banners.read', name: 'Ver banners', description: 'Ver banners promocionales', category: 'Sitio público', resource: 'banners', action: 'read' },
        { id: 'banners.create', name: 'Crear banners', description: 'Agregar nuevos banners', category: 'Sitio público', resource: 'banners', action: 'create' },
        { id: 'banners.edit', name: 'Editar banners', description: 'Modificar banners existentes', category: 'Sitio público', resource: 'banners', action: 'edit' },
        { id: 'banners.delete', name: 'Eliminar banners', description: 'Borrar banners', category: 'Sitio público', resource: 'banners', action: 'delete', critical: true },
        { id: 'reviews.read', name: 'Ver reseñas', description: 'Ver reseñas de clientes', category: 'Sitio público', resource: 'reviews', action: 'read' },
        { id: 'reviews.create', name: 'Crear reseñas', description: 'Agregar reseñas manuales', category: 'Sitio público', resource: 'reviews', action: 'create' },
        { id: 'reviews.edit', name: 'Editar reseñas', description: 'Modificar reseñas', category: 'Sitio público', resource: 'reviews', action: 'edit' },
        { id: 'reviews.delete', name: 'Eliminar reseñas', description: 'Borrar reseñas', category: 'Sitio público', resource: 'reviews', action: 'delete', critical: true },

        // 👥 CRM (6)
        { id: 'crm.read', name: 'Ver CRM', description: 'Ver lista de contactos del CRM', category: 'CRM', resource: 'crm', action: 'read' },
        { id: 'crm.create', name: 'Crear contactos', description: 'Agregar contactos manualmente', category: 'CRM', resource: 'crm', action: 'create' },
        { id: 'crm.edit', name: 'Editar contactos', description: 'Modificar datos de contactos', category: 'CRM', resource: 'crm', action: 'edit' },
        { id: 'crm.delete', name: 'Eliminar contactos', description: 'Borrar contactos del CRM', category: 'CRM', resource: 'crm', action: 'delete', critical: true },
        { id: 'crm.assign', name: 'Asignar contactos', description: 'Asignar leads a asesores', category: 'CRM', resource: 'crm', action: 'assign' },
        { id: 'crm.export', name: 'Exportar CRM', description: 'Descargar contactos en CSV', category: 'CRM', resource: 'crm', action: 'export' },

        // 💬 Comunicaciones (12)
        { id: 'appointments.read', name: 'Ver citas', description: 'Ver citas agendadas', category: 'Comunicaciones', resource: 'appointments', action: 'read' },
        { id: 'appointments.create', name: 'Crear citas', description: 'Agendar citas manualmente', category: 'Comunicaciones', resource: 'appointments', action: 'create' },
        { id: 'appointments.edit', name: 'Editar citas', description: 'Modificar/reagendar citas', category: 'Comunicaciones', resource: 'appointments', action: 'edit' },
        { id: 'appointments.delete', name: 'Eliminar citas', description: 'Borrar citas', category: 'Comunicaciones', resource: 'appointments', action: 'delete', critical: true },
        { id: 'concierge.read', name: 'Ver ALTOR Hub', description: 'Ver conversaciones del Hub', category: 'Comunicaciones', resource: 'concierge', action: 'read' },
        { id: 'concierge.respond', name: 'Responder en Hub', description: 'Enviar mensajes como asesor', category: 'Comunicaciones', resource: 'concierge', action: 'respond' },
        { id: 'concierge.claim', name: 'Tomar conversaciones', description: 'Hacerse cargo de un chat', category: 'Comunicaciones', resource: 'concierge', action: 'claim' },
        { id: 'concierge.transfer', name: 'Transferir chats', description: 'Pasar conversación a otro asesor', category: 'Comunicaciones', resource: 'concierge', action: 'transfer' },
        { id: 'concierge.close', name: 'Cerrar conversaciones', description: 'Marcar chats como resueltos', category: 'Comunicaciones', resource: 'concierge', action: 'close' },
        { id: 'concierge.reopen', name: 'Reabrir conversaciones', description: 'Reabrir chats cerrados', category: 'Comunicaciones', resource: 'concierge', action: 'reopen' },
        { id: 'concierge.delete', name: 'Eliminar conversaciones', description: 'Borrar chats permanentemente', category: 'Comunicaciones', resource: 'concierge', action: 'delete', critical: true },
        { id: 'concierge.summarize', name: 'Resumir con IA', description: 'Generar resúmenes IA', category: 'Comunicaciones', resource: 'concierge', action: 'summarize' },

        // 🧠 Cerebro AI (8)
        { id: 'kb.read', name: 'Ver Cerebro AI', description: 'Ver knowledge base del bot', category: 'Cerebro AI', resource: 'kb', action: 'read' },
        { id: 'kb.create', name: 'Crear FAQs', description: 'Agregar nuevas FAQs al bot', category: 'Cerebro AI', resource: 'kb', action: 'create' },
        { id: 'kb.edit', name: 'Editar Cerebro AI', description: 'Modificar identidad/instrucciones del bot', category: 'Cerebro AI', resource: 'kb', action: 'edit' },
        { id: 'kb.delete', name: 'Eliminar FAQs', description: 'Borrar FAQs', category: 'Cerebro AI', resource: 'kb', action: 'delete', critical: true },
        { id: 'kb.bootstrap', name: 'Sembrar FAQs base', description: 'Inicializar 25 FAQs predefinidas', category: 'Cerebro AI', resource: 'kb', action: 'bootstrap' },
        { id: 'unmatched.read', name: 'Ver "Lo que no entendí"', description: 'Ver consultas sin match del bot', category: 'Cerebro AI', resource: 'unmatched', action: 'read' },
        { id: 'unmatched.promote', name: 'Promover a FAQ', description: 'Convertir consultas en FAQs', category: 'Cerebro AI', resource: 'unmatched', action: 'promote' },
        { id: 'unmatched.delete', name: 'Eliminar consultas no match', description: 'Borrar registros de "Lo que no entendí"', category: 'Cerebro AI', resource: 'unmatched', action: 'delete' },

        // 📅 Calendario (6)
        { id: 'calendar.read', name: 'Ver calendario', description: 'Ver vista mes/día del calendario', category: 'Calendario', resource: 'calendar', action: 'read' },
        { id: 'calendar.create', name: 'Crear eventos', description: 'Agregar eventos manualmente', category: 'Calendario', resource: 'calendar', action: 'create' },
        { id: 'calendar.edit', name: 'Editar eventos', description: 'Modificar eventos del calendario', category: 'Calendario', resource: 'calendar', action: 'edit' },
        { id: 'calendar.delete', name: 'Eliminar eventos', description: 'Borrar eventos', category: 'Calendario', resource: 'calendar', action: 'delete', critical: true },
        { id: 'calendar.config', name: 'Configurar disponibilidad', description: 'Editar workDays/workHours/slots', category: 'Calendario', resource: 'calendar', action: 'config' },
        { id: 'calendar.holidays', name: 'Gestionar festivos', description: 'CRUD de festivos del calendario', category: 'Calendario', resource: 'calendar', action: 'holidays' },

        // 📊 Reportes (2)
        { id: 'reports.view', name: 'Ver reportes', description: 'Acceder al dashboard de reportes', category: 'Reportes', resource: 'reports', action: 'view' },
        { id: 'reports.export', name: 'Exportar reportes', description: 'Descargar reportes en CSV/PDF', category: 'Reportes', resource: 'reports', action: 'export' },

        // ⚙️ Configuración (16)
        { id: 'users.read', name: 'Ver usuarios', description: 'Ver lista de usuarios admin', category: 'Configuración', resource: 'users', action: 'read' },
        { id: 'users.create', name: 'Crear usuarios', description: 'Crear nuevos usuarios admin', category: 'Configuración', resource: 'users', action: 'create', critical: true },
        { id: 'users.edit', name: 'Editar usuarios', description: 'Modificar datos de usuarios admin', category: 'Configuración', resource: 'users', action: 'edit', critical: true },
        { id: 'users.delete', name: 'Eliminar usuarios', description: 'Borrar usuarios admin', category: 'Configuración', resource: 'users', action: 'delete', critical: true },
        { id: 'users.unlock', name: 'Desbloquear usuarios', description: 'Limpiar bloqueo por intentos fallidos', category: 'Configuración', resource: 'users', action: 'unlock' },
        { id: 'roles.read', name: 'Ver roles', description: 'Ver roles del sistema', category: 'Configuración', resource: 'roles', action: 'read' },
        { id: 'roles.create', name: 'Crear roles', description: 'Crear roles personalizados', category: 'Configuración', resource: 'roles', action: 'create', critical: true },
        { id: 'roles.edit', name: 'Editar roles', description: 'Modificar permisos de roles', category: 'Configuración', resource: 'roles', action: 'edit', critical: true },
        { id: 'roles.delete', name: 'Eliminar roles', description: 'Borrar roles personalizados', category: 'Configuración', resource: 'roles', action: 'delete', critical: true },
        { id: 'audit.read', name: 'Ver auditoría', description: 'Ver log de actividad', category: 'Configuración', resource: 'audit', action: 'read' },
        { id: 'audit.export', name: 'Exportar auditoría', description: 'Descargar audit log', category: 'Configuración', resource: 'audit', action: 'export' },
        { id: 'audit.delete', name: 'Eliminar entradas de auditoría', description: 'Borrar registros del log', category: 'Configuración', resource: 'audit', action: 'delete', critical: true },
        { id: 'workflows.read', name: 'Ver workflows', description: 'Ver reglas de automatización', category: 'Configuración', resource: 'workflows', action: 'read' },
        { id: 'workflows.create', name: 'Crear workflows', description: 'Crear nuevas reglas', category: 'Configuración', resource: 'workflows', action: 'create' },
        { id: 'workflows.edit', name: 'Editar workflows', description: 'Modificar reglas existentes', category: 'Configuración', resource: 'workflows', action: 'edit' },
        { id: 'workflows.delete', name: 'Eliminar workflows', description: 'Borrar reglas', category: 'Configuración', resource: 'workflows', action: 'delete' },
        { id: 'templates.read', name: 'Ver plantillas', description: 'Ver plantillas de respuesta', category: 'Configuración', resource: 'templates', action: 'read' },
        { id: 'templates.create', name: 'Crear plantillas', description: 'Crear nuevas plantillas', category: 'Configuración', resource: 'templates', action: 'create' },
        { id: 'templates.edit', name: 'Editar plantillas', description: 'Modificar plantillas', category: 'Configuración', resource: 'templates', action: 'edit' },
        { id: 'templates.delete', name: 'Eliminar plantillas', description: 'Borrar plantillas', category: 'Configuración', resource: 'templates', action: 'delete' },
        { id: 'settings.theme', name: 'Cambiar tema', description: 'Cambiar tema visual del admin', category: 'Configuración', resource: 'settings', action: 'theme' },
        { id: 'settings.seo', name: 'Configurar SEO', description: 'Regenerar páginas SEO + GitHub token', category: 'Configuración', resource: 'settings', action: 'seo', critical: true },
        { id: 'settings.backup', name: 'Backup/Restore', description: 'Exportar/importar respaldo de datos', category: 'Configuración', resource: 'settings', action: 'backup', critical: true },

        // 🏢 Departamentos (2) — §193.4 ④a
        { id: 'departments.read', name: 'Ver departamentos', description: 'Ver la lista de departamentos del CRM', category: 'Departamentos', resource: 'departments', action: 'read' },
        { id: 'departments.manage', name: 'Gestionar departamentos', description: 'Crear, editar, eliminar departamentos y asignar personas', category: 'Departamentos', resource: 'departments', action: 'manage', critical: true }
    ];

    // ========== SYSTEM ROLES (1 inmutable — §69 R7) ==========
    //
    // §69 R7 — Reducido a UN solo system role: CEO (id system_super_admin
    // por retrocompat con migración R4 + rules backend del R6). Editor y
    // Viewer eliminados del catálogo. El cliente crea custom roles según
    // necesidad. CEO es el único user que puede TODO (wildcard '*') y es
    // imposible de modificar/editar/eliminar por otros usuarios.
    //
    // Decisión arquitectónica: el ID interno se mantiene como
    // 'system_super_admin' (NO renombrado a 'system_ceo') para preservar:
    //   1. Migración R4 ya ejecutada (users con roleId='system_super_admin')
    //   2. firestore.rules R6 que referencian conceptualmente al wildcard
    //   3. Cero docs huérfanos en Firestore
    //
    // Solo cambia el LABEL visible: name='CEO'.

    var SYSTEM_ROLES = [
        {
            id: 'system_super_admin',
            name: 'CEO',
            description: 'Acceso absoluto al sistema. No se puede modificar, editar ni eliminar.',
            isSystem: true,
            isDefault: false,
            color: '#b89658',
            icon: 'crown',
            permissions: ['*'],
            nivel: 100 // §193.4 ④a — autoridad máxima (default inicial del rol; el nivel real es per-usuario)
        }
        // §69 R7 — Editor y Viewer ELIMINADOS del catálogo.
        // Si el cliente quiere roles específicos para asesores/lectores,
        // los crea como custom roles desde sec-roles UI con los permisos
        // exactos que necesite.
    ];

    // ========== LEGACY ROLE → PERMISSIONS MAPPING ==========
    // §69 R7 — Solo super_admin se mapea a CEO. Editor y viewer legacy
    // ya NO se auto-mapean. Users con rol='editor' o rol='viewer' que
    // NO tengan permissions[] denormalizado quedarán bloqueados al login
    // con pantalla "No tienes roles asignados". El super_admin debe
    // asignarles un custom role manualmente desde sec-users.

    var LEGACY_TO_ROLE_ID = {
        'super_admin': 'system_super_admin'
        // 'editor' y 'viewer' eliminados — no hay auto-mapeo
    };

    function getRoleById(roleId) {
        for (var i = 0; i < SYSTEM_ROLES.length; i++) {
            if (SYSTEM_ROLES[i].id === roleId) return SYSTEM_ROLES[i];
        }
        return null;
    }

    function mapLegacyRoleToPermissions(legacyRol) {
        var roleId = LEGACY_TO_ROLE_ID[legacyRol];
        if (!roleId) return [];
        var role = getRoleById(roleId);
        return role ? role.permissions.slice() : [];
    }

    function getPermissionById(permId) {
        for (var i = 0; i < PERMISSIONS_CATALOG.length; i++) {
            if (PERMISSIONS_CATALOG[i].id === permId) return PERMISSIONS_CATALOG[i];
        }
        return null;
    }

    function getPermissionsByCategory() {
        var grouped = {};
        for (var i = 0; i < PERMISSIONS_CATALOG.length; i++) {
            var p = PERMISSIONS_CATALOG[i];
            if (!grouped[p.category]) grouped[p.category] = [];
            grouped[p.category].push(p);
        }
        return grouped;
    }

    // ========== EXPONER API ==========

    window.AltorraRBACCatalog = {
        version: '1.1.0',
        permissions: PERMISSIONS_CATALOG,
        systemRoles: SYSTEM_ROLES,
        legacyMapping: LEGACY_TO_ROLE_ID,

        // Helpers
        getRoleById: getRoleById,
        getPermissionById: getPermissionById,
        getPermissionsByCategory: getPermissionsByCategory,
        mapLegacyRoleToPermissions: mapLegacyRoleToPermissions,

        // Diagnóstico
        _stats: function () {
            return {
                totalPermissions: PERMISSIONS_CATALOG.length,
                totalSystemRoles: SYSTEM_ROLES.length,
                categories: Object.keys(getPermissionsByCategory()).length
            };
        }
    };

    if (window.console && window.console.log) {
        console.log('[RBAC] §61.R1 catalog ready', window.AltorraRBACCatalog._stats());
    }
})();
