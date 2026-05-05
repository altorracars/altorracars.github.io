/**
 * ALTORRA CARS — Adaptive UI (Mega-Plan v4, Microfase N.3)
 * ===========================================================
 * El sistema aprende qué secciones usa más cada admin y las muestra
 * como "Atajos personalizados" pinned en el dashboard.
 *
 * Tracking 100% local (localStorage) — no PII al servidor.
 *
 * Storage:
 *   altorra_admin_section_visits = {section: count, ...}
 *   altorra_admin_section_lastvisit = {section: timestamp, ...}
 *
 * Heurística "top 5":
 *   - Score = visits * 0.7 + recency_bonus * 0.3
 *   - recency_bonus = 1 si visitado <24h, 0.5 si <7d, 0 si más
 *   - Mínimo 3 secciones distintas con visits>=2 para mostrar el panel
 *
 * Public API:
 *   AltorraAdaptive.topSections(n=5) → array ordenado
 *   AltorraAdaptive.reset()           → borra histórico (debug)
 */
(function () {
    'use strict';
    if (window.AltorraAdaptive) return;
    var AP = window.AP;
    if (!AP) return;

    var VISITS_KEY = 'altorra_admin_section_visits';
    var LAST_KEY = 'altorra_admin_section_lastvisit';
    var MIN_DISTINCT = 3;
    var MIN_VISITS = 2;
    var DAY_MS = 86400000;

    function loadVisits() {
        try { return JSON.parse(localStorage.getItem(VISITS_KEY) || '{}'); }
        catch (e) { return {}; }
    }
    function saveVisits(v) {
        try { localStorage.setItem(VISITS_KEY, JSON.stringify(v)); } catch (e) {}
    }
    function loadLast() {
        try { return JSON.parse(localStorage.getItem(LAST_KEY) || '{}'); }
        catch (e) { return {}; }
    }
    function saveLast(v) {
        try { localStorage.setItem(LAST_KEY, JSON.stringify(v)); } catch (e) {}
    }

    function trackVisit(section) {
        if (!section || section === 'dashboard') return; // dashboard no se cuenta
        var v = loadVisits();
        v[section] = (v[section] || 0) + 1;
        saveVisits(v);
        var l = loadLast();
        l[section] = Date.now();
        saveLast(l);
    }

    function topSections(n) {
        n = n || 5;
        var visits = loadVisits();
        var last = loadLast();
        var sections = Object.keys(visits);
        if (sections.length < MIN_DISTINCT) return [];
        var scored = sections
            .filter(function (s) { return visits[s] >= MIN_VISITS; })
            .map(function (s) {
                var ageDays = last[s] ? (Date.now() - last[s]) / DAY_MS : 999;
                var recencyBonus = ageDays < 1 ? 1 : ageDays < 7 ? 0.5 : 0;
                var score = (visits[s] || 0) * 0.7 + recencyBonus * 30;
                return { section: s, count: visits[s], score: score, ageDays: ageDays };
            })
            .sort(function (a, b) { return b.score - a.score; });
        return scored.slice(0, n);
    }

    function reset() {
        try { localStorage.removeItem(VISITS_KEY); localStorage.removeItem(LAST_KEY); } catch (e) {}
        renderShortcuts();
    }

    /* ═══════════════════════════════════════════════════════════
       UI — render de shortcuts en dashboard
       ═══════════════════════════════════════════════════════════ */
    function renderShortcuts() {
        var container = document.getElementById('adaptiveShortcuts');
        if (!container) return;
        var top = topSections(5);
        if (top.length === 0) {
            container.style.display = 'none';
            return;
        }
        container.style.display = '';
        var registry = (window.AltorraSections && window.AltorraSections.registry) || {};
        container.innerHTML =
            '<div class="adaptive-shortcuts-head">' +
                '<i data-lucide="zap"></i>' +
                '<span>Atajos personalizados</span>' +
                '<small>Basado en tu uso</small>' +
            '</div>' +
            '<div class="adaptive-shortcuts-grid">' +
                top.map(function (item) {
                    var meta = registry[item.section] || {};
                    var label = meta.label || item.section;
                    var icon = meta.icon || 'arrow-right';
                    return '<button class="adaptive-shortcut" data-shortcut="' + escTxt(item.section) + '">' +
                        '<i data-lucide="' + escTxt(icon) + '"></i>' +
                        '<div class="adaptive-shortcut-label">' + escTxt(label) + '</div>' +
                        '<div class="adaptive-shortcut-count">' + item.count + ' visitas</div>' +
                    '</button>';
                }).join('') +
            '</div>';
        if (window.AltorraIcons) window.AltorraIcons.refresh(container);
        else if (window.lucide) try { window.lucide.createIcons({ context: container }); } catch (e) {}
    }

    function escTxt(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    /* ═══════════════════════════════════════════════════════════
       WIRING
       ═══════════════════════════════════════════════════════════ */
    document.addEventListener('click', function (e) {
        var btn = e.target.closest && e.target.closest('[data-shortcut]');
        if (btn && window.AltorraSections) {
            window.AltorraSections.go(btn.getAttribute('data-shortcut'));
        }
    });

    // Subscribe a cambios de sección desde el router
    if (window.AltorraSections && window.AltorraSections.onChange) {
        window.AltorraSections.onChange(function (section) {
            trackVisit(section);
            // Re-render si volvemos al dashboard
            if (section === 'dashboard') {
                setTimeout(renderShortcuts, 200);
            }
        });
    }

    // Init: render shortcuts cuando admin entra
    var attempts = 0;
    var iv = setInterval(function () {
        attempts++;
        if (window.auth && window.auth.currentUser && AP.isEditorOrAbove && AP.isEditorOrAbove()) {
            renderShortcuts();
            clearInterval(iv);
        } else if (attempts > 60) clearInterval(iv);
    }, 1500);

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraAdaptive = {
        topSections: topSections,
        reset: reset,
        track: trackVisit,
        _renderShortcuts: renderShortcuts
    };
})();
