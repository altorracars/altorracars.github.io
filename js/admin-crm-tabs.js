/**
 * AltorraCRMTabs — Tabs internos del CRM unificado (§27.3)
 * ===================================================================
 * Maneja los 3 tabs de sec-crm:
 *   • contactos — tabla 360° de clientes (lo que era sec-crm)
 *   • bandeja   — solicitudes/citas/leads (lo que era sec-appointments)
 *   • pipeline  — Kanban segmentado por temperatura del lead
 *
 * Funcionalidad:
 *   - Click en tab → mostrar pane correspondiente, ocultar otros
 *   - Deep-link soportado: #/crm, #/crm/bandeja, #/crm/pipeline
 *   - Cuando admin-section-router resuelve alias appointments→crm,
 *     activa automáticamente el tab "bandeja"
 *   - Persistencia: último tab visitado en localStorage
 *   - Counts dinámicos en cada tab (contactos totales / bandeja unhandled / pipeline oportunidades)
 *
 * Filosofía: una sola sección con tabs evita la fragmentación de la
 * info comercial. El asesor entra al CRM y ve TODO (contactos +
 * solicitudes + pipeline) sin saltar entre items del sidebar.
 */
(function () {
    'use strict';
    if (window.AltorraCRMTabs) return;
    var AP = window.AP || {};

    var STORAGE_KEY = 'altorra_crm_last_tab';
    var DEFAULT_TAB = 'contactos';
    var VALID_TABS = ['contactos', 'bandeja', 'pipeline'];

    var _activeTab = null;

    function $(id) { return document.getElementById(id); }

    function setActiveTab(tabName) {
        if (VALID_TABS.indexOf(tabName) === -1) tabName = DEFAULT_TAB;
        if (_activeTab === tabName) return;
        _activeTab = tabName;

        // Toggle tab buttons
        var tabBtns = document.querySelectorAll('#crmTabstrip .crm-tab');
        tabBtns.forEach(function (btn) {
            btn.classList.toggle('is-active', btn.getAttribute('data-crm-tab') === tabName);
            btn.setAttribute('aria-selected', btn.getAttribute('data-crm-tab') === tabName ? 'true' : 'false');
        });

        // Toggle panes
        var panes = document.querySelectorAll('#sec-crm .crm-tabpane');
        panes.forEach(function (pane) {
            pane.classList.toggle('is-active', pane.getAttribute('data-crm-pane') === tabName);
        });

        // Persistir última tab visitada
        try { localStorage.setItem(STORAGE_KEY, tabName); } catch (e) {}

        // Update hash si estamos en sec-crm
        var sec = document.querySelector('.section.active');
        if (sec && sec.id === 'sec-crm') {
            var newHash = tabName === DEFAULT_TAB ? '#/crm' : '#/crm/' + tabName;
            // Usar replaceState para no llenar el history stack con cada click de tab
            try { history.replaceState(null, '', newHash); } catch (e) {}
        }

        // Notificar a módulos que monitorean cambios
        if (window.AltorraEventBus && window.AltorraEventBus.emit) {
            window.AltorraEventBus.emit('crm.tab-changed', { tab: tabName });
        }

        // Refresh icons en pane recién activo
        if (window.AltorraIcons) {
            var activePane = document.querySelector('.crm-tabpane.is-active');
            if (activePane) window.AltorraIcons.refresh(activePane);
        }

        // Pipeline: render lazy si es la primera vez
        if (tabName === 'pipeline' && window.AltorraPipeline && typeof window.AltorraPipeline.render === 'function') {
            try { window.AltorraPipeline.render(); } catch (e) {}
        }
    }

    /**
     * Parsea el hash actual y activa el tab si corresponde.
     * Soportados:
     *   #/crm           → contactos
     *   #/crm/bandeja   → bandeja
     *   #/crm/pipeline  → pipeline
     *   #/appointments  → bandeja (alias del router)
     */
    function applyHashTab() {
        var hash = (location.hash || '').toLowerCase();
        // Aliases legacy → tab
        if (hash === '#/appointments' || hash === '#/bandeja') {
            setActiveTab('bandeja');
            return;
        }
        var m = hash.match(/^#\/crm(?:\/([a-z]+))?$/);
        if (m) {
            setActiveTab(m[1] || DEFAULT_TAB);
            return;
        }
        // Si no matchea ningún hash explícito, usar último tab persistido
        var stored = null;
        try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
        setActiveTab(stored || DEFAULT_TAB);
    }

    /**
     * Hook con el router: cuando se entra a sec-crm, aplicar hash o último tab.
     * Cuando se entra via alias appointments, forzar tab bandeja.
     */
    function bindRouterHook() {
        if (!window.AltorraSections || !window.AltorraSections.onChange) {
            // Reintentar tras 500ms si router no listo aún
            setTimeout(bindRouterHook, 500);
            return;
        }
        window.AltorraSections.onChange(function (section, prevSection) {
            if (section !== 'crm') return;
            // Si el hash actual incluye /bandeja o /pipeline, aplicarlo
            // sino último tab persistido
            applyHashTab();
        });
    }

    /* Click handlers en los tabs */
    document.addEventListener('click', function (e) {
        var tab = e.target.closest && e.target.closest('.crm-tab[data-crm-tab]');
        if (!tab) return;
        e.preventDefault();
        setActiveTab(tab.getAttribute('data-crm-tab'));
    });

    /* Reaccionar a cambios de hash externos (back/forward del browser) */
    window.addEventListener('hashchange', function () {
        var sec = document.querySelector('.section.active');
        if (sec && sec.id === 'sec-crm') applyHashTab();
    });

    /* Init */
    function init() {
        bindRouterHook();
        // Si arrancamos directamente en sec-crm (deep-link inicial), aplicar tab
        var sec = document.querySelector('.section.active');
        if (sec && sec.id === 'sec-crm') applyHashTab();
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ─── Public API ─────────────────────────────────────────────── */
    window.AltorraCRMTabs = {
        setActiveTab: setActiveTab,
        getActiveTab: function () { return _activeTab; },
        applyHashTab: applyHashTab
    };
})();
