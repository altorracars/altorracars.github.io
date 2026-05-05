/**
 * ALTORRA CARS — Knowledge Base admin (Mega-Plan v4, Microfase U.5)
 * ===================================================================
 * CRUD de FAQs / políticas / datos del negocio que el Concierge bot
 * consulta para responder al cliente.
 *
 * Schema `knowledgeBase/{kbId}`:
 *   {
 *     question: string,       // pregunta o tema
 *     answer: string,         // respuesta que el bot dará
 *     keywords: [string],     // palabras clave para matching
 *     category: string,       // 'general' | 'financiacion' | 'inventario' | 'politica' | 'horarios'
 *     enabled: boolean,
 *     priority: number,       // 1-100, mayor = se prefiere ante coincidencia
 *     usageCount: number,     // contador de veces que el bot la usó
 *     createdAt, createdBy, updatedAt, updatedBy
 *   }
 *
 * El bot del Concierge llama AltorraKB.findBest(query) que retorna
 * la mejor coincidencia (rule-based scoring sobre keywords).
 *
 * Public API:
 *   AltorraKB.findBest(query) → entry o null
 *   AltorraKB.list()          → array de entries
 *   AltorraKB.recordUsage(id) → incrementa usageCount (analytics)
 */
(function () {
    'use strict';
    if (window.AltorraKB) return;
    var AP = window.AP;
    if (!AP) return;

    var _entries = [];
    var _unsub = null;

    function $(id) { return document.getElementById(id); }
    function escTxt(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    /* ═══════════════════════════════════════════════════════════
       FIRESTORE LISTENER
       ═══════════════════════════════════════════════════════════ */
    function startListener() {
        if (_unsub || !window.db) return;
        _unsub = window.db.collection('knowledgeBase')
            .orderBy('priority', 'desc')
            .onSnapshot(function (snap) {
                _entries = [];
                snap.forEach(function (doc) {
                    _entries.push(Object.assign({ _id: doc.id }, doc.data()));
                });
                renderUI();
            }, function (err) {
                if (window.auth && !window.auth.currentUser) return;
                console.warn('[KB] listener error:', err.message);
            });
    }

    /* ═══════════════════════════════════════════════════════════
       SCORING — encuentra la mejor entry para un query
       ═══════════════════════════════════════════════════════════ */
    function findBest(query) {
        if (!query) return null;
        var lower = query.toLowerCase();
        var best = null, bestScore = 0;
        _entries.forEach(function (e) {
            if (!e.enabled) return;
            var score = 0;
            // 1. Keywords coincidentes
            (e.keywords || []).forEach(function (k) {
                if (k && lower.indexOf(k.toLowerCase()) !== -1) score += 2;
            });
            // 2. Pregunta sustring del query
            if (e.question && lower.indexOf(e.question.toLowerCase().slice(0, 20)) !== -1) {
                score += 3;
            }
            // 3. Bonus por priority
            score += (e.priority || 0) / 50;
            if (score > bestScore) {
                bestScore = score;
                best = e;
            }
        });
        return bestScore >= 2 ? best : null;
    }

    function recordUsage(id) {
        if (!window.db || !id) return;
        var ref = window.db.collection('knowledgeBase').doc(id);
        ref.set({
            usageCount: (window.firebase && window.firebase.firestore) ?
                window.firebase.firestore.FieldValue.increment(1) : 1,
            lastUsedAt: new Date().toISOString()
        }, { merge: true }).catch(function () {});
    }

    /* ═══════════════════════════════════════════════════════════
       UI — sección admin con lista + form
       ═══════════════════════════════════════════════════════════ */
    function renderUI() {
        var listEl = $('kbList');
        if (!listEl) return;
        if (_entries.length === 0) {
            listEl.innerHTML = '<div class="table-empty">Sin entradas. Agrega la primera ↑</div>';
            return;
        }
        listEl.innerHTML = _entries.map(function (e) {
            return '<div class="kb-entry' + (e.enabled === false ? ' kb-entry--disabled' : '') + '">' +
                '<div class="kb-entry-head">' +
                    '<div>' +
                        '<div class="kb-entry-q">' + escTxt(e.question || '(sin pregunta)') + '</div>' +
                        '<div class="kb-entry-meta">' +
                            '<span class="kb-entry-cat">' + escTxt(e.category || 'general') + '</span>' +
                            ' · prioridad ' + (e.priority || 50) +
                            (e.usageCount ? ' · usado ' + e.usageCount + ' veces' : '') +
                        '</div>' +
                    '</div>' +
                    '<div class="kb-entry-actions">' +
                        '<label class="kb-toggle">' +
                            '<input type="checkbox" data-kb-toggle="' + escTxt(e._id) + '"' +
                                (e.enabled !== false ? ' checked' : '') + '> ' +
                            '<span>' + (e.enabled !== false ? 'Activa' : 'Pausada') + '</span>' +
                        '</label>' +
                        '<button class="alt-btn alt-btn--ghost alt-btn--sm" data-kb-edit="' + escTxt(e._id) + '">' +
                            '<i data-lucide="pencil"></i>' +
                        '</button>' +
                        '<button class="alt-btn alt-btn--ghost alt-btn--sm" data-kb-delete="' + escTxt(e._id) + '">' +
                            '<i data-lucide="trash-2"></i>' +
                        '</button>' +
                    '</div>' +
                '</div>' +
                '<div class="kb-entry-a">' + escTxt(e.answer || '') + '</div>' +
                (e.keywords && e.keywords.length ?
                    '<div class="kb-entry-keywords">' +
                        e.keywords.map(function (k) {
                            return '<span class="kb-keyword">' + escTxt(k) + '</span>';
                        }).join('') +
                    '</div>'
                : '') +
            '</div>';
        }).join('');
        if (window.AltorraIcons) window.AltorraIcons.refresh(listEl);
        else if (window.lucide) try { window.lucide.createIcons({ context: listEl }); } catch (e) {}
    }

    function showForm(entry) {
        var formEl = $('kbForm');
        if (!formEl) return;
        var e = entry || {};
        formEl.innerHTML =
            '<input type="hidden" id="kbFormId" value="' + escTxt(e._id || '') + '">' +
            '<div class="form-row">' +
                '<div class="form-group" style="flex:2;">' +
                    '<label class="form-label">Pregunta / tema *</label>' +
                    '<input type="text" id="kbFormQuestion" class="form-input" required value="' + escTxt(e.question || '') + '" placeholder="Ej: ¿Cuál es el horario de atención?">' +
                '</div>' +
                '<div class="form-group">' +
                    '<label class="form-label">Categoría</label>' +
                    '<select id="kbFormCategory" class="form-select">' +
                        ['general', 'financiacion', 'inventario', 'politica', 'horarios', 'ubicacion', 'consignacion'].map(function (c) {
                            return '<option value="' + c + '"' + (e.category === c ? ' selected' : '') + '>' + c + '</option>';
                        }).join('') +
                    '</select>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label class="form-label">Prioridad (1-100)</label>' +
                    '<input type="number" id="kbFormPriority" class="form-input" min="1" max="100" value="' + (e.priority || 50) + '">' +
                '</div>' +
            '</div>' +
            '<div class="form-group">' +
                '<label class="form-label">Respuesta del bot *</label>' +
                '<textarea id="kbFormAnswer" class="form-textarea" rows="3" required placeholder="Lo que el bot le dirá al cliente">' + escTxt(e.answer || '') + '</textarea>' +
            '</div>' +
            '<div class="form-group">' +
                '<label class="form-label">Palabras clave (separadas por coma)</label>' +
                '<input type="text" id="kbFormKeywords" class="form-input" value="' + escTxt((e.keywords || []).join(', ')) + '" placeholder="horario, abren, cuándo, atención">' +
                '<small style="color:var(--text-tertiary);font-size:0.72rem;">El bot usará estas keywords para matching contra mensajes del cliente.</small>' +
            '</div>' +
            '<div style="display:flex;gap:8px;justify-content:flex-end;">' +
                '<button type="button" class="alt-btn alt-btn--ghost" id="kbFormCancel">Cancelar</button>' +
                '<button type="button" class="alt-btn alt-btn--primary" id="kbFormSave">' + (e._id ? 'Guardar cambios' : 'Crear FAQ') + '</button>' +
            '</div>';
        formEl.style.display = '';
        if (window.AltorraIcons) window.AltorraIcons.refresh(formEl);
    }

    function hideForm() {
        var formEl = $('kbForm');
        if (formEl) { formEl.style.display = 'none'; formEl.innerHTML = ''; }
    }

    function saveEntry() {
        if (!window.db) return;
        var id = $('kbFormId') && $('kbFormId').value;
        var question = ($('kbFormQuestion') && $('kbFormQuestion').value || '').trim();
        var answer = ($('kbFormAnswer') && $('kbFormAnswer').value || '').trim();
        var category = ($('kbFormCategory') && $('kbFormCategory').value) || 'general';
        var priority = parseInt(($('kbFormPriority') && $('kbFormPriority').value) || '50', 10);
        var keywordsStr = ($('kbFormKeywords') && $('kbFormKeywords').value || '').trim();
        var keywords = keywordsStr ? keywordsStr.split(',').map(function (k) { return k.trim(); }).filter(Boolean) : [];

        if (!question || !answer) {
            AP.toast('Pregunta y respuesta son obligatorias', 'error');
            return;
        }

        var data = {
            question: question,
            answer: answer,
            category: category,
            priority: priority,
            keywords: keywords,
            enabled: true,
            updatedAt: new Date().toISOString(),
            updatedBy: window.auth.currentUser.uid
        };
        var promise;
        if (id) {
            promise = window.db.collection('knowledgeBase').doc(id).set(data, { merge: true });
        } else {
            data.createdAt = new Date().toISOString();
            data.createdBy = window.auth.currentUser.uid;
            data.usageCount = 0;
            promise = window.db.collection('knowledgeBase').add(data);
        }
        promise.then(function () {
            AP.toast('FAQ guardada correctamente');
            hideForm();
        }).catch(function (err) {
            AP.toast('Error al guardar: ' + err.message, 'error');
        });
    }

    function deleteEntry(id) {
        if (!confirm('¿Eliminar esta FAQ? El bot dejará de usarla.')) return;
        window.db.collection('knowledgeBase').doc(id).delete()
            .then(function () { AP.toast('FAQ eliminada'); })
            .catch(function (err) { AP.toast('Error: ' + err.message, 'error'); });
    }

    function toggleEnabled(id, enabled) {
        window.db.collection('knowledgeBase').doc(id)
            .set({ enabled: enabled }, { merge: true })
            .catch(function (err) { AP.toast('Error: ' + err.message, 'error'); });
    }

    /* ═══════════════════════════════════════════════════════════
       EVENT WIRING
       ═══════════════════════════════════════════════════════════ */
    document.addEventListener('click', function (e) {
        if (e.target && e.target.closest && e.target.closest('#kbAddBtn')) {
            showForm(null);
            return;
        }
        if (e.target && e.target.closest && e.target.closest('#kbFormCancel')) {
            hideForm();
            return;
        }
        if (e.target && e.target.closest && e.target.closest('#kbFormSave')) {
            saveEntry();
            return;
        }
        var editBtn = e.target.closest && e.target.closest('[data-kb-edit]');
        if (editBtn) {
            var id = editBtn.getAttribute('data-kb-edit');
            var entry = _entries.find(function (e) { return e._id === id; });
            if (entry) showForm(entry);
            return;
        }
        var delBtn = e.target.closest && e.target.closest('[data-kb-delete]');
        if (delBtn) {
            deleteEntry(delBtn.getAttribute('data-kb-delete'));
            return;
        }
    });
    document.addEventListener('change', function (e) {
        var toggle = e.target.closest && e.target.closest('[data-kb-toggle]');
        if (toggle) {
            toggleEnabled(toggle.getAttribute('data-kb-toggle'), toggle.checked);
        }
    });

    /* ═══════════════════════════════════════════════════════════
       INIT — start listener cuando admin entra a la sección
       ═══════════════════════════════════════════════════════════ */
    if (window.AltorraSections && window.AltorraSections.onChange) {
        window.AltorraSections.onChange(function (section) {
            if (section === 'kb') startListener();
        });
    }
    // Auto-arranque para que el bot pueda usar las FAQs aunque admin no entre
    var attempts = 0;
    var iv = setInterval(function () {
        attempts++;
        if (window.auth && window.auth.currentUser && AP.isEditorOrAbove && AP.isEditorOrAbove()) {
            startListener();
            clearInterval(iv);
        } else if (attempts > 60) clearInterval(iv);
    }, 1000);

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraKB = {
        findBest: findBest,
        list: function () { return _entries.slice(); },
        recordUsage: recordUsage
    };
})();
