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
                '<td><input type="checkbox" class="crm-row-check" data-key="' + escHtml(c.key) + '"></td>' +
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

    // ─── MF4.2 — 360° contact detail panel ────────────────────────
    function ensureDetailPanel() {
        if (document.getElementById('crmDetailPanel')) return;
        var panel = document.createElement('div');
        panel.id = 'crmDetailPanel';
        panel.className = 'crm-detail-panel';
        panel.innerHTML =
            '<div class="crm-detail-overlay" data-action="close-crm-detail"></div>' +
            '<div class="crm-detail-modal">' +
                '<div class="crm-detail-head">' +
                    '<div id="crmDetailTitle"></div>' +
                    '<button class="crm-detail-close" data-action="close-crm-detail" aria-label="Cerrar">&times;</button>' +
                '</div>' +
                '<div class="crm-detail-tabs" role="tablist">' +
                    '<button class="crm-detail-tab active" data-tab="resumen">Resumen</button>' +
                    '<button class="crm-detail-tab" data-tab="comms">Comunicaciones</button>' +
                    '<button class="crm-detail-tab" data-tab="actividad">Actividad</button>' +
                    '<button class="crm-detail-tab" data-tab="score">Score</button>' +
                    '<button class="crm-detail-tab" data-tab="notas">Notas</button>' +
                '</div>' +
                '<div class="crm-detail-body" id="crmDetailBody"></div>' +
            '</div>';
        document.body.appendChild(panel);
        panel.addEventListener('click', function (e) {
            if (e.target.matches('[data-action="close-crm-detail"]')) {
                panel.classList.remove('crm-detail-panel--open');
            }
            var tab = e.target.closest('.crm-detail-tab');
            if (tab) {
                panel.querySelectorAll('.crm-detail-tab').forEach(function (t) { t.classList.remove('active'); });
                tab.classList.add('active');
                if (window._crmDetailContact) renderDetailTab(tab.dataset.tab, window._crmDetailContact);
            }
        });
    }

    function escTxt(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    function renderDetailTab(tab, c) {
        var body = $('crmDetailBody');
        if (!body) return;
        var schema = window.AltorraCommSchema;

        if (tab === 'resumen') {
            body.innerHTML =
                '<div class="crm-detail-summary">' +
                    '<div class="crm-detail-row"><strong>Email</strong><span>' + escTxt(c.email || '—') + '</span></div>' +
                    '<div class="crm-detail-row"><strong>Teléfono</strong><span>' + escTxt(c.telefono || '—') + '</span></div>' +
                    '<div class="crm-detail-row"><strong>Ciudad</strong><span>' + escTxt(c.ciudad || '—') + '</span></div>' +
                    '<div class="crm-detail-row"><strong>Tipo</strong><span>' + (c.type === 'registered' ? 'Registrado' : 'Guest (solo leads)') + '</span></div>' +
                    '<div class="crm-detail-row"><strong>UID</strong><span style="font-family:monospace;font-size:0.78rem;">' + escTxt(c.uid || 'N/A') + '</span></div>' +
                    (c.creadoEn ? '<div class="crm-detail-row"><strong>Registro</strong><span>' + escTxt(formatDate(c.creadoEn)) + '</span></div>' : '') +
                    '<div class="crm-detail-row"><strong>Asesor asignado</strong><span>' + escTxt(c.assignedToName || '—') + '</span></div>' +
                '</div>';
        } else if (tab === 'comms') {
            var sorted = (c.comms || []).slice().sort(function (a, b) {
                return (b.createdAt || '').localeCompare(a.createdAt || '');
            });
            body.innerHTML = '<div class="crm-detail-comms">' +
                (sorted.length === 0 ? '<div class="crm-detail-empty">Sin comunicaciones</div>' :
                 sorted.map(function (s) {
                    var kind = s.kind || (schema && schema.inferKind(s));
                    var estado = (schema && schema.STATE_LABELS[s.estado]) || s.estado || '—';
                    return '<div class="crm-detail-comm">' +
                        '<div class="crm-detail-comm-head">' +
                            '<span class="comm-kind-tab-badge" data-kind="' + kind + '">' + kind + '</span>' +
                            '<span style="font-weight:600;font-size:0.85rem;">' + escTxt(s.tipo || 'consulta') + '</span>' +
                            '<span style="font-size:0.74rem;color:var(--admin-text-muted);">' + escTxt(formatDate(s.createdAt)) + '</span>' +
                        '</div>' +
                        '<div style="font-size:0.82rem;margin-top:4px;">' + escTxt(s.vehiculo || '') + '</div>' +
                        '<div style="font-size:0.74rem;color:var(--admin-text-muted);margin-top:3px;">Estado: <strong>' + escTxt(estado) + '</strong>' + (s.assignedToName ? ' · ' + escTxt(s.assignedToName) : '') + '</div>' +
                        (s.observaciones ? '<div style="font-size:0.78rem;margin-top:6px;padding:6px 8px;background:rgba(184,150,88,0.06);border-radius:6px;">' + escTxt(s.observaciones) + '</div>' : '') +
                    '</div>';
                 }).join('')) +
            '</div>';
        } else if (tab === 'actividad') {
            var clienteData = AP.clientes[c.uid] || {};
            body.innerHTML =
                '<div class="crm-detail-activity">' +
                    '<div class="crm-detail-act-row"><i data-lucide="heart"></i>' +
                        '<strong>' + ((clienteData.favoritos || []).length) + '</strong> Favoritos' +
                    '</div>' +
                    '<div class="crm-detail-act-row"><i data-lucide="search"></i>' +
                        '<strong>' + (c.busquedasGuardadas || 0) + '</strong> Búsquedas guardadas' +
                    '</div>' +
                    '<div class="crm-detail-act-row"><i data-lucide="eye"></i>' +
                        '<strong>' + ((clienteData.vehiculosVistos || []).length) + '</strong> Vehículos vistos' +
                    '</div>' +
                    (c.type !== 'registered' ? '<div class="crm-detail-empty" style="margin-top:12px;">Solo se registra actividad para usuarios registrados.</div>' : '') +
                '</div>';
            if (window.lucide) try { window.lucide.createIcons(); } catch (e) {}
        } else if (tab === 'score') {
            var bd = computeScoreBreakdown(c);
            var weights = bd.weights;
            var rows = Object.keys(weights).map(function (k) {
                var fac = bd.factors[k] || 0;
                var contribution = Math.round(fac * weights[k] * 100);
                var fillW = Math.round(fac * 100);
                return '<div class="crm-detail-score-row">' +
                    '<div class="crm-detail-score-label">' + k + ' <span style="opacity:0.5;">(' + Math.round(weights[k] * 100) + '%)</span></div>' +
                    '<div class="crm-detail-score-bar">' +
                        '<div class="crm-detail-score-fill" style="width:' + fillW + '%"></div>' +
                    '</div>' +
                    '<div class="crm-detail-score-val">+' + contribution + '</div>' +
                '</div>';
            }).join('');
            var tier = tierOf(bd.score);
            body.innerHTML =
                '<div class="crm-detail-score-summary">' +
                    '<div class="crm-detail-score-big ' + tier.cls + '">' + tier.emoji + ' ' + bd.score + '</div>' +
                    '<div style="font-size:0.78rem;color:var(--admin-text-muted);">Tier: <strong>' + tier.name + '</strong></div>' +
                '</div>' +
                '<div class="crm-detail-score-rows">' + rows + '</div>';
        } else if (tab === 'notas') {
            body.innerHTML =
                '<div class="crm-detail-notes">' +
                    '<textarea id="crmDetailNoteText" class="form-textarea" rows="3" placeholder="Agregar nota interna sobre este contacto..."></textarea>' +
                    '<button class="btn btn-sm btn-primary" id="crmAddNoteBtn">Agregar nota</button>' +
                    '<div id="crmNotesList" class="crm-notes-list"><div class="crm-detail-empty">Cargando notas...</div></div>' +
                '</div>';
            loadNotes(c);
            var btn = document.getElementById('crmAddNoteBtn');
            if (btn) btn.addEventListener('click', function () { addNote(c); });
        }
    }

    function loadNotes(c) {
        var list = document.getElementById('crmNotesList');
        if (!list || !window.db || !c.uid) {
            if (list) list.innerHTML = '<div class="crm-detail-empty">Notas solo disponibles para contactos registrados.</div>';
            return;
        }
        window.db.collection('clientes').doc(c.uid).collection('crmNotes').orderBy('at', 'desc').get().then(function (snap) {
            if (snap.empty) {
                list.innerHTML = '<div class="crm-detail-empty">Sin notas todavía.</div>';
                return;
            }
            list.innerHTML = snap.docs.map(function (d) {
                var n = d.data();
                return '<div class="crm-note">' +
                    '<div class="crm-note-meta">' + escTxt(n.author || 'admin') + ' · ' + escTxt(formatDate(n.at)) + '</div>' +
                    '<div class="crm-note-text">' + escTxt(n.text) + '</div>' +
                '</div>';
            }).join('');
        }).catch(function () {
            list.innerHTML = '<div class="crm-detail-empty">No se pudieron cargar las notas.</div>';
        });
    }

    function addNote(c) {
        var ta = document.getElementById('crmDetailNoteText');
        if (!ta || !ta.value.trim() || !c.uid) return;
        var note = {
            text: ta.value.trim(),
            at: new Date().toISOString(),
            author: (window.auth.currentUser && window.auth.currentUser.email) || 'admin'
        };
        window.db.collection('clientes').doc(c.uid).collection('crmNotes').add(note).then(function () {
            ta.value = '';
            loadNotes(c);
            if (AP.toast) AP.toast('Nota agregada');
        }).catch(function (err) {
            if (AP.toast) AP.toast('Error: ' + err.message, 'error');
        });
    }

    function openDetail(key) {
        ensureDetailPanel();
        var contacts = buildContacts();
        var c = contacts.find(function (x) { return x.key === key; });
        if (!c) return;
        window._crmDetailContact = c;
        var panel = document.getElementById('crmDetailPanel');
        var title = document.getElementById('crmDetailTitle');
        if (title) title.innerHTML = '<h2 style="margin:0;font-size:1.1rem;">' + escTxt(c.nombre) + '</h2>' +
            '<div style="font-size:0.78rem;color:var(--admin-text-muted);">' + escTxt(c.email || '') + '</div>';
        // Reset to Resumen tab
        panel.querySelectorAll('.crm-detail-tab').forEach(function (t, i) {
            t.classList.toggle('active', i === 0);
        });
        renderDetailTab('resumen', c);
        panel.classList.add('crm-detail-panel--open');
    }
    AP.openCrmDetail = openDetail;

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
        // MF4.3 — selection handling
        if (e.target && e.target.id === 'crmSelectAll') {
            var on = e.target.checked;
            document.querySelectorAll('.crm-row-check').forEach(function (cb) { cb.checked = on; });
            updateBulkBar();
        }
        if (e.target && e.target.classList && e.target.classList.contains('crm-row-check')) {
            updateBulkBar();
        }
    });
    document.addEventListener('click', function (e) {
        var b = e.target.closest('[data-action="crm-detail"]');
        if (b) { openDetail(b.getAttribute('data-key')); return; }
        var bulk = e.target.closest('[data-bulk]');
        if (bulk) { handleBulk(bulk.getAttribute('data-bulk')); return; }
    });

    // ─── MF4.3 — Bulk actions ────────────────────────────────────
    function getSelectedKeys() {
        return Array.from(document.querySelectorAll('.crm-row-check:checked')).map(function (cb) {
            return cb.getAttribute('data-key');
        });
    }
    function updateBulkBar() {
        var bar = document.getElementById('crmBulkBar');
        var count = document.getElementById('crmBulkCount');
        if (!bar) return;
        var selected = getSelectedKeys();
        if (selected.length === 0) {
            bar.hidden = true;
        } else {
            bar.hidden = false;
            if (count) count.textContent = selected.length + ' seleccionado(s)';
        }
    }
    function csvEscape(v) {
        if (v == null) return '';
        var s = String(v);
        if (s.indexOf(',') !== -1 || s.indexOf('"') !== -1 || s.indexOf('\n') !== -1) {
            return '"' + s.replace(/"/g, '""') + '"';
        }
        return s;
    }
    function handleBulk(action) {
        var selected = getSelectedKeys();
        if (action === 'clear') {
            document.querySelectorAll('.crm-row-check').forEach(function (cb) { cb.checked = false; });
            var sa = document.getElementById('crmSelectAll'); if (sa) sa.checked = false;
            updateBulkBar();
            return;
        }
        if (!selected.length) {
            if (AP.toast) AP.toast('Seleccioná al menos un contacto', 'error');
            return;
        }
        var contacts = buildContacts().filter(function (c) { return selected.indexOf(c.key) !== -1; });

        if (action === 'export-csv') {
            var headers = ['Nombre', 'Email', 'Telefono', 'Ciudad', 'Tipo', 'Comunicaciones', 'Score', 'Tier', 'UltimoContacto', 'Asesor'];
            var rows = contacts.map(function (c) {
                var s = computeScore(c);
                return [
                    csvEscape(c.nombre),
                    csvEscape(c.email),
                    csvEscape(c.telefono),
                    csvEscape(c.ciudad),
                    csvEscape(c.type),
                    (c.comms || []).length,
                    s,
                    csvEscape(tierOf(s).name),
                    csvEscape(c.lastCommAt || ''),
                    csvEscape(c.assignedToName || '')
                ].join(',');
            });
            var csv = headers.join(',') + '\n' + rows.join('\n');
            var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'altorra-crm-' + new Date().toISOString().slice(0, 10) + '.csv';
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
            URL.revokeObjectURL(url);
            if (AP.toast) AP.toast('CSV exportado: ' + selected.length + ' contactos');
        } else if (action === 'tag') {
            var tag = prompt('Nombre de la etiqueta a agregar:');
            if (!tag) return;
            tag = tag.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-');
            if (!tag) return;
            var ok = 0;
            var pending = contacts.filter(function (c) { return c.uid; });
            pending.forEach(function (c) {
                window.db.collection('clientes').doc(c.uid).update({
                    crmTags: firebase.firestore.FieldValue.arrayUnion(tag)
                }).then(function () { ok++; }).catch(function () {});
            });
            if (AP.toast) AP.toast('Etiqueta "' + tag + '" agregada a ' + pending.length + ' contactos registrados');
        }
    }

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
