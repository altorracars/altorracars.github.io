/**
 * ALTORRA CARS — CRM module (MF4.1+)
 *
 * Builds a unified contacts table by merging:
 *   - clientes/{uid}        (registered users)
 *   - solicitudes (grouped by email|userId for guests)
 *
 * Loaded only on admin.html. Reactive to AP.appointments updates.
 */
(function () {
    'use strict';

    var AP = window.AP;
    if (!AP) return;
    var $ = AP.$;

    // ─── Build unified contacts list from clientes + solicitudes ───
    function buildContacts() {
        var clientes = AP.clientes || {};
        var solicitudes = AP.appointments || [];

        // contactKey strategy: prefer userId, fallback to email
        function keyOf(s) {
            return s.userId || (s.email && s.email !== 'No proporcionado' ? 'email:' + s.email.toLowerCase() : null);
        }

        var contacts = {};

        // Seed from registered clientes
        Object.keys(clientes).forEach(function (uid) {
            var c = clientes[uid];
            contacts[uid] = {
                key: uid,
                type: 'registered',
                uid: uid,
                nombre: c.nombre || c.email || 'Sin nombre',
                email: c.email || '',
                telefono: c.telefono || '',
                ciudad: c.ciudad || '',
                avatarURL: c.avatarURL || '',
                creadoEn: c.creadoEn || '',
                ultimoAcceso: c.ultimoAcceso || '',
                favoritos: (c.favoritos || []).length,
                comms: [],
                assignedTo: null
            };
        });

        // Merge solicitudes
        solicitudes.forEach(function (s) {
            var k = keyOf(s);
            if (!k) return; // skip docs without identity
            if (!contacts[k]) {
                contacts[k] = {
                    key: k,
                    type: 'guest',
                    uid: s.userId || null,
                    nombre: s.nombre || s.userEmail || s.email || 'Lead',
                    email: s.userEmail || s.email || '',
                    telefono: s.telefono || '',
                    ciudad: (s.datosExtra && s.datosExtra.ciudad) || '',
                    avatarURL: '',
                    comms: [],
                    assignedTo: null
                };
            }
            contacts[k].comms.push(s);
            if (s.assignedTo && !contacts[k].assignedTo) {
                contacts[k].assignedTo = s.assignedTo;
                contacts[k].assignedToName = s.assignedToName;
            }
            // Track latest comm date
            var ts = s.updatedAt || s.createdAt || '';
            if (!contacts[k].lastCommAt || ts > contacts[k].lastCommAt) {
                contacts[k].lastCommAt = ts;
            }
        });

        return Object.values(contacts);
    }

    // ─── Lead score (MF4.5) — multi-factor weighted algorithm ───
    // Inspired by PlanOK Propeler, normalized to 0-100.
    // Each factor returns 0-1, then multiplied by its weight, summed.
    function computeScoreBreakdown(c) {
        var factors = {};
        var comms = c.comms || [];

        // 1. Engagement (20%): favoritos + búsquedas + vistos
        var engagementRaw = (c.favoritos || 0) * 1.5
            + (c.busquedasGuardadas || 0) * 2
            + (c.vehiculosVistos || 0) * 0.5;
        factors.engagement = Math.min(1, engagementRaw / 20);

        // 2. # interacciones (15%): cada comm = 0.15 con cap a 1
        factors.interactions = Math.min(1, comms.length / 6);

        // 3. Capacidad económica (25%): from financiación payloads
        var maxCuotaInicial = 0;
        var maxIngresos = 0;
        comms.forEach(function (s) {
            if (s.tipo === 'financiacion' && s.datosExtra) {
                var c1 = parseInt(String(s.datosExtra.cuotaInicial || '').replace(/[^0-9]/g, ''), 10) || 0;
                var i1 = parseInt(String(s.datosExtra.ingresos || '').replace(/[^0-9]/g, ''), 10) || 0;
                if (c1 > maxCuotaInicial) maxCuotaInicial = c1;
                if (i1 > maxIngresos) maxIngresos = i1;
            }
        });
        // $50M cuota inicial OR $10M ingresos mensuales = max
        factors.economic = Math.min(1, Math.max(maxCuotaInicial / 50000000, maxIngresos / 10000000));

        // 4. Frecuencia (10%): días con actividad en últimos 30
        var distinctDays = {};
        comms.forEach(function (s) {
            var ts = s.createdAt || s.updatedAt;
            if (!ts) return;
            var d = new Date(ts);
            if ((Date.now() - d.getTime()) > 30 * 86400000) return;
            distinctDays[d.toISOString().slice(0, 10)] = true;
        });
        factors.frequency = Math.min(1, Object.keys(distinctDays).length / 8);

        // 5. Profundidad de interés (15%): docs of kind solicitud or cita = high intent
        var intentCount = comms.filter(function (s) {
            return s.kind === 'cita' || s.kind === 'solicitud';
        }).length;
        factors.depth = Math.min(1, intentCount / 3);

        // 6. Antiguedad (5%): registered users with > 30 days = max
        var ageScore = 0;
        if (c.creadoEn) {
            var days = (Date.now() - new Date(c.creadoEn).getTime()) / 86400000;
            ageScore = Math.min(1, days / 60);
        } else if (comms.length) {
            var firstComm = comms.reduce(function (acc, s) {
                var ts = s.createdAt || s.updatedAt;
                if (!ts) return acc;
                return !acc || ts < acc ? ts : acc;
            }, '');
            if (firstComm) {
                var days2 = (Date.now() - new Date(firstComm).getTime()) / 86400000;
                ageScore = Math.min(1, days2 / 60);
            }
        }
        factors.age = ageScore;

        // 7. Recencia (10%): inverse of days since last activity
        var recency = 0;
        if (c.lastCommAt) {
            var daysAgo = (Date.now() - new Date(c.lastCommAt).getTime()) / 86400000;
            recency = Math.max(0, 1 - daysAgo / 30);
        }
        factors.recency = recency;

        var weights = {
            engagement: 0.20,
            economic: 0.25,
            interactions: 0.15,
            depth: 0.15,
            recency: 0.10,
            frequency: 0.10,
            age: 0.05
        };

        var total = 0;
        Object.keys(weights).forEach(function (k) {
            total += factors[k] * weights[k];
        });

        return {
            score: Math.round(total * 100),
            factors: factors,
            weights: weights
        };
    }

    function computeScore(c) {
        return computeScoreBreakdown(c).score;
    }

    function tierOf(score) {
        if (score >= 70) return { name: 'Caliente', emoji: '🔥', cls: 'crm-tier-hot' };
        if (score >= 40) return { name: 'Tibio', emoji: '🟧', cls: 'crm-tier-warm' };
        return { name: 'Frío', emoji: '🟦', cls: 'crm-tier-cold' };
    }

    function formatDate(ts) {
        if (!ts) return '—';
        try {
            var d = new Date(ts);
            var now = new Date();
            var diffDays = Math.floor((now - d) / 86400000);
            if (diffDays === 0) return 'Hoy';
            if (diffDays === 1) return 'Ayer';
            if (diffDays < 7) return 'Hace ' + diffDays + 'd';
            return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
        } catch (e) { return '—'; }
    }

    function escHtml(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    // ─── Render ──────────────────────────────────────────────────
    function renderCRM() {
        var body = $('crmTableBody');
        if (!body) return;
        var contacts = buildContacts();

        // Apply filters
        var filterType = ($('crmFilter') && $('crmFilter').value) || 'all';
        var search = ($('crmSearchInput') && $('crmSearchInput').value || '').trim().toLowerCase();
        var filtered = contacts.filter(function (c) {
            if (filterType !== 'all' && c.type !== filterType) return false;
            if (search) {
                var hay = ((c.nombre || '') + ' ' + (c.email || '') + ' ' + (c.telefono || '')).toLowerCase();
                if (hay.indexOf(search) === -1) return false;
            }
            return true;
        });

        // Sort by lastCommAt desc
        filtered.sort(function (a, b) {
            return (b.lastCommAt || '').localeCompare(a.lastCommAt || '');
        });

        // KPIs
        var total = contacts.length;
        var registered = contacts.filter(function (c) { return c.type === 'registered'; }).length;
        var guests = total - registered;
        var totalComms = contacts.reduce(function (acc, c) { return acc + (c.comms || []).length; }, 0);
        var avg = total > 0 ? (totalComms / total).toFixed(1) : '0';
        if ($('crmKpiTotal')) $('crmKpiTotal').textContent = total;
        if ($('crmKpiRegistered')) $('crmKpiRegistered').textContent = registered;
        if ($('crmKpiGuests')) $('crmKpiGuests').textContent = guests;
        if ($('crmKpiAvgComms')) $('crmKpiAvgComms').textContent = avg;

        // Update sidebar nav badge with total contacts
        var navBadge = $('navBadgeCrm');
        if (navBadge) navBadge.textContent = total;

        if (filtered.length === 0) {
            body.innerHTML = '<tr><td colspan="7" class="table-empty">Sin contactos que coincidan</td></tr>';
            return;
        }

        body.innerHTML = filtered.slice(0, 100).map(function (c) {
            var score = computeScore(c);
            var tier = tierOf(score);
            var typeBadge = c.type === 'registered'
                ? '<span class="crm-type-badge crm-type-registered">Registrado</span>'
                : '<span class="crm-type-badge crm-type-guest">Guest</span>';
            var avatar = c.avatarURL
                ? '<img src="' + escHtml(c.avatarURL) + '" class="crm-avatar" alt="">'
                : '<span class="crm-avatar crm-avatar-letter">' + escHtml((c.nombre || '?').charAt(0).toUpperCase()) + '</span>';
            var phone = c.telefono ? '<a href="https://wa.me/57' + c.telefono.replace(/[^0-9]/g, '') + '" target="_blank" style="color:#25d366;">' + escHtml(c.telefono) + '</a>' : '';
            return '<tr data-key="' + escHtml(c.key) + '">' +
                '<td>' +
                    '<div class="crm-contact-cell">' +
                        avatar +
                        '<div>' +
                            '<div class="crm-contact-name">' + escHtml(c.nombre) + '</div>' +
                            '<div class="crm-contact-meta">' + escHtml(c.email || '—') + (phone ? ' · ' + phone : '') + '</div>' +
                        '</div>' +
                    '</div>' +
                '</td>' +
                '<td>' + typeBadge + '</td>' +
                '<td><strong>' + (c.comms || []).length + '</strong></td>' +
                '<td>' + escHtml(formatDate(c.lastCommAt)) + '</td>' +
                '<td><span class="crm-score-badge ' + tier.cls + '">' + tier.emoji + ' ' + score + '</span></td>' +
                '<td style="font-size:0.78rem;color:var(--admin-text-muted);">' + escHtml(c.assignedToName || '—') + '</td>' +
                '<td><button class="btn btn-sm btn-ghost" data-action="crm-detail" data-key="' + escHtml(c.key) + '">Ver 360°</button></td>' +
            '</tr>';
        }).join('');
    }

    // ─── Wire events ─────────────────────────────────────────────
    var inputDebounce = null;
    document.addEventListener('input', function (e) {
        if (e.target && e.target.id === 'crmSearchInput') {
            clearTimeout(inputDebounce);
            inputDebounce = setTimeout(renderCRM, 200);
        }
    });
    document.addEventListener('change', function (e) {
        if (e.target && e.target.id === 'crmFilter') renderCRM();
    });

    // Listen for admin appointments updates (CRM should re-render)
    document.addEventListener('click', function (e) {
        var navBtn = e.target.closest('[data-section="crm"]');
        if (navBtn) {
            // Render when section opened
            setTimeout(renderCRM, 50);
        }
    });

    // Load clientes once (cached) — needs to be efficient
    AP.clientes = AP.clientes || {};
    var clientesLoaded = false;
    function loadClientes() {
        if (clientesLoaded || !window.db) return;
        clientesLoaded = true;
        window.db.collection('clientes').get().then(function (snap) {
            snap.docs.forEach(function (d) {
                AP.clientes[d.id] = d.data();
            });
            renderCRM();
        }).catch(function (err) {
            if (window.auth && !window.auth.currentUser) return;
            console.warn('[CRM] Could not load clientes:', err.message);
        });
    }

    // Re-render whenever appointments update
    var origRender = window._origRenderAppointments || null;
    function setupAppointmentsHook() {
        // Hook into the existing onSnapshot via a periodic check (cheap)
        var lastLen = -1;
        setInterval(function () {
            var section = document.getElementById('sec-crm');
            if (!section || !section.classList.contains('active')) return;
            var len = (AP.appointments || []).length;
            if (len !== lastLen) {
                lastLen = len;
                renderCRM();
            }
        }, 1500);
    }

    // Init when AP is ready (clientes load triggered when admin opens CRM)
    function init() {
        // Ensure clientes are loaded as soon as possible (background)
        loadClientes();
        setupAppointmentsHook();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose for MF4.2 detail view
    window.AltorraCRM = {
        renderCRM: renderCRM,
        buildContacts: buildContacts,
        computeScore: computeScore,
        computeScoreBreakdown: computeScoreBreakdown,
        tierOf: tierOf
    };
})();
