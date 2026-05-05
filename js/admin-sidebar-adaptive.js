/**
 * ALTORRA CARS — Sidebar adaptativo (Mega-Plan v4, N.2)
 * =======================================================
 * Reorganiza el sidebar según uso real (extiende N.3):
 *   - Top 3 secciones más usadas → grupo "Frecuentes" anclado al top
 *   - Secciones sin uso en 30+ días → ocultas tras "Mostrar todas"
 *
 * Aprovecha localStorage de N.3:
 *   altorra_admin_section_visits = {section: count}
 *   altorra_admin_section_lastvisit = {section: timestamp}
 *
 * No modifica el HTML del sidebar — solo añade clases:
 *   .nav-item--frequent  → resaltar visualmente
 *   .nav-item--rare      → ocultar (display:none)
 *   .nav-frequent-pin    → grupo flotante al top
 *
 * Public API:
 *   AltorraSidebarAdaptive.refresh()
 *   AltorraSidebarAdaptive.reset()  → mostrar todas
 */
(function () {
    'use strict';
    if (window.AltorraSidebarAdaptive) return;
    var AP = window.AP;
    if (!AP) return;

    var DAY_MS = 86400000;
    var RARE_THRESHOLD_DAYS = 30;
    var TOP_FREQUENT = 3;
    var MIN_VISITS_FOR_FREQUENT = 5;

    function loadVisits() {
        try { return JSON.parse(localStorage.getItem('altorra_admin_section_visits') || '{}'); }
        catch (e) { return {}; }
    }
    function loadLast() {
        try { return JSON.parse(localStorage.getItem('altorra_admin_section_lastvisit') || '{}'); }
        catch (e) { return {}; }
    }

    /* ═══════════════════════════════════════════════════════════
       APPLY CLASSES
       ═══════════════════════════════════════════════════════════ */
    function refresh() {
        var visits = loadVisits();
        var last = loadLast();
        var sections = Object.keys(visits);
        if (sections.length < 5) {
            // Muy poco uso — no aplicar adaptación todavía
            removeAdaptations();
            return;
        }

        // Calcular top frequent
        var sorted = sections
            .filter(function (s) { return visits[s] >= MIN_VISITS_FOR_FREQUENT; })
            .sort(function (a, b) { return (visits[b] || 0) - (visits[a] || 0); });
        var topFrequent = sorted.slice(0, TOP_FREQUENT);

        // Calcular rare (no visited en 30+ días)
        var rare = [];
        sections.forEach(function (s) {
            var ts = last[s];
            if (!ts) return;
            var daysSince = (Date.now() - ts) / DAY_MS;
            if (daysSince > RARE_THRESHOLD_DAYS && (visits[s] || 0) < MIN_VISITS_FOR_FREQUENT) {
                rare.push(s);
            }
        });

        // Aplicar al DOM
        document.querySelectorAll('.nav-item').forEach(function (item) {
            var sec = item.getAttribute('data-section');
            item.classList.remove('nav-item--frequent', 'nav-item--rare');
            if (topFrequent.indexOf(sec) !== -1) {
                item.classList.add('nav-item--frequent');
            }
            if (rare.indexOf(sec) !== -1) {
                item.classList.add('nav-item--rare');
            }
        });

        // Si hay rare, agregar toggle "Mostrar todas"
        var rareCount = rare.length;
        ensureRareToggle(rareCount);
    }

    function removeAdaptations() {
        document.querySelectorAll('.nav-item').forEach(function (item) {
            item.classList.remove('nav-item--frequent', 'nav-item--rare');
        });
        var toggle = document.getElementById('nav-rare-toggle');
        if (toggle) toggle.remove();
        document.body.classList.remove('sidebar-show-rare');
    }

    function ensureRareToggle(rareCount) {
        var existing = document.getElementById('nav-rare-toggle');
        if (rareCount === 0) {
            if (existing) existing.remove();
            return;
        }
        if (existing) {
            existing.querySelector('.nav-rare-count').textContent = rareCount;
            return;
        }
        var sidebar = document.querySelector('.admin-sidebar, .sidebar') || document.querySelector('aside');
        if (!sidebar) return;
        var btn = document.createElement('button');
        btn.id = 'nav-rare-toggle';
        btn.className = 'nav-rare-toggle';
        btn.innerHTML = '<i data-lucide="more-horizontal"></i> ' +
            '<span>Mostrar menos usadas</span> ' +
            '<span class="nav-rare-count">' + rareCount + '</span>';
        btn.addEventListener('click', function () {
            document.body.classList.toggle('sidebar-show-rare');
            var label = btn.querySelector('span:not(.nav-rare-count)');
            label.textContent = document.body.classList.contains('sidebar-show-rare') ?
                'Ocultar menos usadas' : 'Mostrar menos usadas';
        });
        // Insert al final del sidebar
        sidebar.appendChild(btn);
        if (window.AltorraIcons) window.AltorraIcons.refresh(btn);
        else if (window.lucide) try { window.lucide.createIcons({ context: btn }); } catch (e) {}
    }

    /* ═══════════════════════════════════════════════════════════
       AUTO-REFRESH cada vez que cambia sección (que cambia visits)
       ═══════════════════════════════════════════════════════════ */
    if (window.AltorraSections && window.AltorraSections.onChange) {
        window.AltorraSections.onChange(function () {
            // Diferir un tick para que N.3 actualice visits primero
            setTimeout(refresh, 100);
        });
    }

    var attempts = 0;
    var iv = setInterval(function () {
        attempts++;
        if (window.auth && window.auth.currentUser && AP.isEditorOrAbove && AP.isEditorOrAbove()) {
            refresh();
            clearInterval(iv);
        } else if (attempts > 60) clearInterval(iv);
    }, 2000);

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraSidebarAdaptive = {
        refresh: refresh,
        reset: removeAdaptations
    };
})();
