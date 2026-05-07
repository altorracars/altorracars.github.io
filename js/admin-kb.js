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
        var firstSnap = true;
        _unsub = window.db.collection('knowledgeBase')
            .orderBy('priority', 'desc')
            .onSnapshot(function (snap) {
                _entries = [];
                snap.forEach(function (doc) {
                    _entries.push(Object.assign({ _id: doc.id }, doc.data()));
                });
                renderUI();
                // Seed condicional: SOLO en el primer snapshot, SOLO si vacía,
                // SOLO super_admin (rules requieren editor+ para create).
                // Flag localStorage previene re-seeds accidentales aunque el
                // admin elimine FAQs después.
                if (firstSnap) {
                    firstSnap = false;
                    maybeSeedKB();
                }
            }, function (err) {
                if (window.auth && !window.auth.currentUser) return;
                console.warn('[KB] listener error:', err.message);
            });
    }

    /* ═══════════════════════════════════════════════════════════
       SEEDER — 10 FAQs fundacionales
       Se ejecuta UNA SOLA VEZ si:
         1. La colección knowledgeBase/ está vacía (primer snapshot)
         2. El usuario es super_admin (rules exigen editor+ para create)
         3. localStorage flag `altorra_kb_seeded` NO está seteado
       Después del primer seed marca el flag para no repetir aunque admin
       borre FAQs manualmente.
       ═══════════════════════════════════════════════════════════ */
    var SEED_FAQS = [
        {
            question: '¿Cuál es el horario de atención?',
            answer: '🕒 Atendemos de lunes a sábado de 8:00 AM a 6:00 PM. Fuera de horario el bot te responde y dejamos a un asesor pendiente para contactarte al día siguiente.',
            category: 'horarios',
            keywords: ['horario', 'cuando abren', 'cuando atienden', 'a que hora', 'cuando atienen']
        },
        {
            question: '¿Dónde están ubicados?',
            answer: '📍 Estamos en Cartagena, Colombia. Si quieres agendar una visita o que un asesor te envíe la dirección exacta + cómo llegar, dime "agendar cita" y te conecto.',
            category: 'ubicacion',
            keywords: ['ubicacion', 'donde estan', 'donde queda', 'direccion', 'como llegar', 'sede']
        },
        {
            question: '¿Qué requisitos necesito para financiar un vehículo?',
            answer: '💳 Para financiación pedimos: cédula de ciudadanía, comprobante de ingresos (últimos 3 meses), referencia familiar y comercial. Cuota inicial mínima del 30%. Plazos hasta 72 meses. ¿Quieres que te conecte con un asesor para una propuesta personalizada?',
            category: 'financiacion',
            keywords: ['requisitos financiacion', 'requisitos credito', 'que necesito para financiar', 'documentos credito', 'papeles para financiar']
        },
        {
            question: '¿Cuál es la cuota inicial mínima?',
            answer: '💰 La cuota inicial mínima es del 30% del valor del vehículo. Si tienes una cuota inicial mayor obtienes mejores tasas y plazos más cómodos. ¿Quieres que un asesor te haga una simulación?',
            category: 'financiacion',
            keywords: ['cuota inicial', 'inicial minima', 'primer pago', 'anticipo', 'cuanto debo dar']
        },
        {
            question: '¿A qué plazos puedo financiar?',
            answer: '📅 Trabajamos plazos desde 12 hasta 72 meses (6 años). Entre más corto el plazo, menos intereses pagas. El simulador de crédito en nuestra web te muestra opciones en tiempo real.',
            category: 'financiacion',
            keywords: ['plazos', 'cuantos meses', 'a cuanto puedo financiar', 'tiempo financiar', 'cuanto plazo']
        },
        {
            question: '¿Puedo agendar un test drive antes de comprar?',
            answer: '🚗 ¡Por supuesto! Todos nuestros vehículos están disponibles para prueba de manejo previa cita. Dime el modelo que te interesa y te conecto con un asesor para coordinar fecha y hora.',
            category: 'inventario',
            keywords: ['test drive', 'prueba de manejo', 'probar el carro', 'probar el auto', 'manejar antes', 'ver el vehiculo']
        },
        {
            question: '¿Qué garantía ofrecen sobre los vehículos?',
            answer: '🛡️ Todos nuestros vehículos usados incluyen garantía mecánica de 3 meses sobre componentes principales (motor, caja, transmisión). Los vehículos nuevos mantienen la garantía de fábrica. Cualquier inquietud específica te la resuelve un asesor.',
            category: 'politica',
            keywords: ['garantia', 'tienen garantia', 'cuanto garantia', 'respaldo', 'garantizan']
        },
        {
            question: '¿Cómo es el proceso de peritaje?',
            answer: '🔍 Cada vehículo en nuestro inventario pasa por un peritaje mecánico de 50+ puntos antes de ser publicado: motor, frenos, suspensión, eléctrico, carrocería, kilometraje real, historial. Recibes el reporte completo del vehículo que te interese.',
            category: 'politica',
            keywords: ['peritaje', 'revision', 'inspeccion', 'verifican', 'tecnomecanica', 'estado del vehiculo']
        },
        {
            question: '¿Cómo puedo vender mi auto a través de ustedes?',
            answer: '🚙 Ofrecemos dos modalidades: (1) compra directa con valuación inmediata, o (2) consignación en nuestro inventario. Iniciamos con peritaje gratuito sin compromiso. Dime "vender mi auto" y te conecto con un asesor de compras.',
            category: 'consignacion',
            keywords: ['vender mi auto', 'vender mi carro', 'consignacion', 'consigna', 'venden carros usados', 'compran carros']
        },
        {
            question: '¿Qué documentos necesito para comprar un vehículo?',
            answer: '📋 Para la compra necesitas: cédula de ciudadanía vigente, RUT (si aplica para factura), y comprobante de ingresos si vas a financiar. Para el traspaso te acompañamos en todo el proceso ante la SIM.',
            category: 'general',
            keywords: ['documentos compra', 'que necesito comprar', 'papeles comprar', 'requisitos comprar', 'que llevar para comprar']
        }
    ];

    function maybeSeedKB() {
        if (_entries.length > 0) return;
        try {
            if (localStorage.getItem('altorra_kb_seeded') === '1') return;
        } catch (e) {}
        if (!window.auth || !window.auth.currentUser) return;
        if (!AP.isSuperAdmin || !AP.isSuperAdmin()) return;

        var batch = window.db.batch();
        var now = new Date().toISOString();
        var uid = window.auth.currentUser.uid;
        SEED_FAQS.forEach(function (faq) {
            var ref = window.db.collection('knowledgeBase').doc();
            batch.set(ref, {
                question: faq.question,
                answer: faq.answer,
                category: faq.category,
                keywords: faq.keywords,
                priority: 50,
                enabled: true,
                usageCount: 0,
                createdAt: now,
                createdBy: uid,
                updatedAt: now,
                updatedBy: uid,
                seedSource: 'altorra-foundational-v1'
            });
        });

        batch.commit().then(function () {
            try { localStorage.setItem('altorra_kb_seeded', '1'); } catch (e) {}
            console.info('[KB] Seed: ' + SEED_FAQS.length + ' FAQs fundacionales inyectadas.');
            if (AP.toast) AP.toast(SEED_FAQS.length + ' FAQs base inyectadas en Knowledge Base', 'success');
        }).catch(function (err) {
            console.warn('[KB] Seed failed:', err.message);
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

    // Callback opcional registrado por admin-unmatched.js cuando promueve
    // una query a FAQ. Recibe el ID de la FAQ recién creada para poder
    // marcar la unmatched query como `promotedToFAQ:true`.
    var _onSaveCallback = null;

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
            promise = window.db.collection('knowledgeBase').doc(id).set(data, { merge: true })
                .then(function () { return id; });
        } else {
            data.createdAt = new Date().toISOString();
            data.createdBy = window.auth.currentUser.uid;
            data.usageCount = 0;
            promise = window.db.collection('knowledgeBase').add(data)
                .then(function (ref) { return ref.id; });
        }
        promise.then(function (newId) {
            AP.toast('FAQ guardada correctamente');
            // §22 Capa E — disparar callback si la FAQ vino de "Lo que no entendí"
            if (typeof _onSaveCallback === 'function') {
                try { _onSaveCallback(newId); } catch (e) {}
                _onSaveCallback = null;
            }
            hideForm();
        }).catch(function (err) {
            AP.toast('Error al guardar: ' + err.message, 'error');
        });
    }

    /**
     * §22 Capa E — openFormPrefilled
     * Llamado por admin-unmatched.js para crear una FAQ con la query
     * del cliente prellenada. Acepta opcional onSaveCallback que recibe
     * el ID de la FAQ recién creada para marcar la unmatched como
     * `promotedToFAQ:true`.
     */
    function openFormPrefilled(opts) {
        opts = opts || {};
        showForm({
            question: opts.question || '',
            keywords: opts.keywords || [],
            category: 'general',
            priority: 50
        });
        _onSaveCallback = opts._onSaveCallback || null;
        // Foco al campo answer porque pregunta + keywords ya están llenos
        setTimeout(function () {
            var ans = $('kbFormAnswer');
            if (ans) ans.focus();
        }, 100);
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
       FASE 3 — CEREBRO ALTORRA AI
       Sub-controlador para el doc singleton knowledgeBase/_brain
       que define identidad, contexto, instrucciones, reglas de
       seguridad y configuración del modelo LLM.
       ═══════════════════════════════════════════════════════════ */
    var BRAIN_DOC = 'knowledgeBase/_brain';

    var DEFAULT_BRAIN = {
        enabled: false,
        llmProvider: 'anthropic',
        llmModel: 'claude-haiku-4-5',
        llmTemperature: 0.7,
        maxTokens: 600,
        identidad: {
            nombre: 'ALTOR',
            tono: 'cálido, profesional pero cercano, colombiano natural',
            personalidad: 'Soy ALTOR, el asistente virtual IA de Altorra Cars. Estoy aquí para ayudarte a encontrar el auto perfecto, resolver dudas sobre financiación, peritaje y conectarte con un asesor humano cuando lo necesites.'
        },
        contexto: {
            descripcion: 'Altorra Cars es un concesionario líder en Cartagena especializado en venta de vehículos nuevos y usados con peritaje técnico, financiación con aliados estratégicos y consignación.',
            valores: ['Transparencia', 'Peritaje técnico de 50+ puntos', 'Financiación accesible', 'Garantía mecánica de 3 meses'],
            servicios: ['Compra de vehículos nuevos y usados', 'Venta y consignación', 'Financiación con cuota inicial desde 30%', 'Test drive con cita previa', 'Peritaje técnico']
        },
        instrucciones: 'Eres ALTOR, asistente virtual IA de Altorra Cars. Tu misión es ayudar a clientes a encontrar el auto ideal, resolver dudas sobre financiación, peritaje, garantías y agendar visitas.\n\nREGLAS:\n- Responde siempre en español, en tono cálido y colombiano natural.\n- Si el cliente pide un precio específico, consulta el inventario en tiempo real (te lo paso en cada turno) y solo confirma precios que están en la lista.\n- Si el cliente quiere agendar una cita, ofrece conectarlo con un asesor humano.\n- Si detectas frustración, ofrece escalar a un asesor sin demorar.\n- NUNCA inventes datos. Si no tienes la info, ofrece conectar con asesor.\n- Sé breve: 2-3 oraciones por respuesta. Si el tema requiere más, pide al cliente confirmar antes de extender.',
        reglas_seguridad: [
            'NUNCA confirmes un precio que no esté en el inventario actual.',
            'NUNCA prometas garantías o servicios que no estén en la lista oficial.',
            'NUNCA des datos personales de otros clientes ni del equipo.',
            'NUNCA inventes ni alucines información sobre vehículos, financiación o políticas.',
            'NUNCA aceptes negociar descuentos sin escalar a un asesor humano.',
            'NUNCA confirmes una cita sin que un asesor la valide.'
        ]
    };

    var _brainData = null;
    var _brainUnsub = null;
    var _brainDirty = false;

    function loadBrain() {
        if (_brainUnsub || !window.db) return;
        _brainUnsub = window.db.doc(BRAIN_DOC).onSnapshot(function (snap) {
            _brainData = snap.exists ? snap.data() : null;
            renderBrainForm();
        }, function (err) {
            if (window.auth && !window.auth.currentUser) return;
            console.warn('[Cerebro] listener error:', err.message);
        });
    }

    function $b(id) { return document.getElementById(id); }
    function val(id) { var el = $b(id); return el ? el.value : ''; }
    function setVal(id, v) { var el = $b(id); if (el) el.value = (v == null ? '' : v); }
    function setChecked(id, v) { var el = $b(id); if (el) el.checked = !!v; }

    function renderBrainForm() {
        var d = _brainData || DEFAULT_BRAIN;
        var id = d.identidad || DEFAULT_BRAIN.identidad;
        var ctx = d.contexto || DEFAULT_BRAIN.contexto;

        setVal('cerebroIdNombre', id.nombre || '');
        setVal('cerebroIdTono', id.tono || '');
        setVal('cerebroIdPersonalidad', id.personalidad || '');

        setVal('cerebroCtxDescripcion', ctx.descripcion || '');
        setVal('cerebroCtxValores', (ctx.valores || []).join('\n'));
        setVal('cerebroCtxServicios', (ctx.servicios || []).join('\n'));

        setVal('cerebroInstrucciones', d.instrucciones || '');
        setVal('cerebroReglas', (d.reglas_seguridad || []).join('\n'));

        setVal('cerebroLlmProvider', d.llmProvider || 'anthropic');
        setVal('cerebroLlmModel', d.llmModel || 'claude-haiku-4-5');
        setVal('cerebroTemperature', d.llmTemperature == null ? 0.7 : d.llmTemperature);
        setVal('cerebroMaxTokens', d.maxTokens || 600);
        setChecked('cerebroEnabled', !!d.enabled);

        // Status pill
        var status = $b('cerebroStatus');
        if (status) {
            if (_brainData && _brainData.enabled) {
                status.setAttribute('data-status', 'on');
                status.innerHTML = '<i data-lucide="zap"></i> Activo · ' + (_brainData.llmModel || '');
            } else if (_brainData) {
                status.setAttribute('data-status', 'off');
                status.innerHTML = '<i data-lucide="power-off"></i> Apagado';
            } else {
                status.setAttribute('data-status', 'new');
                status.innerHTML = '<i data-lucide="plus-circle"></i> Sin configurar';
            }
            if (window.AltorraIcons && window.AltorraIcons.refresh) {
                window.AltorraIcons.refresh(status);
            }
        }
        _brainDirty = false;
        var saveState = $b('cerebroSaveState');
        if (saveState) saveState.textContent = '';
    }

    function gatherBrainForm() {
        function lines(v) {
            return (v || '').split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
        }
        return {
            enabled: !!($b('cerebroEnabled') && $b('cerebroEnabled').checked),
            llmProvider: val('cerebroLlmProvider') || 'anthropic',
            llmModel: val('cerebroLlmModel') || 'claude-haiku-4-5',
            llmTemperature: parseFloat(val('cerebroTemperature')) || 0.7,
            maxTokens: parseInt(val('cerebroMaxTokens'), 10) || 600,
            identidad: {
                nombre: val('cerebroIdNombre').trim() || 'ALTOR',
                tono: val('cerebroIdTono').trim(),
                personalidad: val('cerebroIdPersonalidad').trim()
            },
            contexto: {
                descripcion: val('cerebroCtxDescripcion').trim(),
                valores: lines(val('cerebroCtxValores')),
                servicios: lines(val('cerebroCtxServicios'))
            },
            instrucciones: val('cerebroInstrucciones').trim(),
            reglas_seguridad: lines(val('cerebroReglas')),
            updatedAt: new Date().toISOString(),
            updatedBy: (window.auth && window.auth.currentUser) ? window.auth.currentUser.uid : null
        };
    }

    function saveBrain() {
        if (!AP.isSuperAdmin || !AP.isSuperAdmin()) {
            AP.toast('Solo super_admin puede modificar el Cerebro AI', 'error');
            return;
        }
        var data = gatherBrainForm();
        var saveState = $b('cerebroSaveState');
        var btn = $b('cerebroSaveBtn');
        if (btn) btn.disabled = true;
        if (saveState) saveState.textContent = 'Guardando…';

        window.db.doc(BRAIN_DOC).set(data, { merge: true }).then(function () {
            if (saveState) {
                saveState.textContent = '✓ Guardado';
                setTimeout(function () { saveState.textContent = ''; }, 2500);
            }
            if (btn) btn.disabled = false;
            _brainDirty = false;
        }).catch(function (err) {
            if (saveState) saveState.textContent = '✗ Error: ' + err.message;
            if (btn) btn.disabled = false;
            AP.toast('No se pudo guardar el Cerebro: ' + err.message, 'error');
        });
    }

    /* §26.2 — FAQ Bootstrap masivo. Auto-siembra una base de
       conocimiento profesional de 25 FAQs cuando el admin lo solicita.
       Cada FAQ incluye keywords coloquiales colombianos. */
    var BOOTSTRAP_FAQS = [
        {
            question: '¿Dónde están ubicados?',
            answer: 'Estamos en Cartagena, Bolívar, Colombia. Atendemos clientes de toda la Costa Caribe. Si querés agendar una visita, decime "agendar cita" y te conecto con un asesor.',
            keywords: ['ubicacion', 'donde estan', 'donde quedan', 'cartagena', 'sede', 'direccion', 'como llego'],
            category: 'ubicacion', priority: 90
        },
        {
            question: '¿Cuál es el horario de atención?',
            answer: 'Atendemos de **Lunes a Sábado de 8:00 AM a 6:00 PM**. Domingos cerrado. Si tenés alguna urgencia, escribime aquí y te conecto con un asesor por WhatsApp.',
            keywords: ['horario', 'cuando abren', 'atienden hoy', 'hasta que hora', 'abren domingo'],
            category: 'horarios', priority: 90
        },
        {
            question: '¿Cuál es el número de teléfono / WhatsApp?',
            answer: 'Nuestro número es **+57 323 501 6747** 📲 con WhatsApp activo. También me podés escribir aquí mismo y te conecto con un asesor humano al instante.',
            keywords: ['telefono', 'celular', 'whatsapp', 'numero', 'contacto'],
            category: 'general', priority: 85
        },
        {
            question: '¿Qué es el peritaje y cuánto cuesta?',
            answer: 'El peritaje es una **revisión técnica gratuita** que hacemos a todos los autos que vendemos. Verificamos motor, caja, suspensión, frenos, electricidad y carrocería. Te entregamos un informe escrito. **Es 100% gratis** para clientes que están considerando comprar o consignar.',
            keywords: ['peritaje', 'inspeccion', 'revision', 'chequeo', 'diagnostico', 'cuanto cuesta peritaje'],
            category: 'politica', priority: 85
        },
        {
            question: '¿Dan garantía mecánica?',
            answer: 'Sí, todos nuestros vehículos tienen **90 días de garantía mecánica** en motor y caja. Cubre fallas que no sean por mal uso. Te entregamos el certificado al momento de la compra.',
            keywords: ['garantia', 'garantizan', 'cuanto tiempo de garantia', 'cubren', 'tres meses', '90 dias'],
            category: 'politica', priority: 85
        },
        {
            question: '¿Cómo funciona la financiación?',
            answer: 'Trabajamos con **bancos aliados** (Bancolombia, Davivienda, Banco de Bogotá, etc). Cuotas de **12 a 72 meses**. Cuota inicial **mínima 30%**. Te ayudamos con todo el trámite: solicitud, documentos, aprobación. Aprobación en 24-48h. ¿Querés simular tu cuota?',
            keywords: ['financiacion', 'credito', 'cuotas', 'plazo', 'banco', 'prestamo', 'mensual', 'inicial'],
            category: 'financiacion', priority: 95
        },
        {
            question: '¿Cuál es la cuota inicial mínima?',
            answer: 'La cuota inicial mínima es del **30% del valor del vehículo**. A mayor cuota inicial, menor es la cuota mensual. Si necesitás simular escenarios distintos, podemos ayudarte con eso.',
            keywords: ['cuota inicial', 'inicial', 'enganche', 'minimo', 'prima', 'que pongo de inicial'],
            category: 'financiacion', priority: 90
        },
        {
            question: '¿A cuántos meses puedo financiar?',
            answer: 'Podés financiar de **12 a 72 meses** (1 a 6 años) según el banco y tu perfil crediticio. La aprobación final la da el banco en 24-48 horas.',
            keywords: ['plazo', 'meses', 'cuanto tiempo financiar', 'cuantos años', 'a cuantos meses'],
            category: 'financiacion', priority: 88
        },
        {
            question: '¿Quiero vender mi auto, cómo funciona la consignación?',
            answer: 'En consignación nosotros lo **vendemos por vos**: lo exhibimos, hacemos el marketing, atendemos llamadas, mostramos el auto, todo. Vos solo recibís la plata cuando se vende. **Sin costo si lo vendemos nosotros**. Primero hacemos un peritaje gratuito y te damos un precio sugerido. ¿Te interesa?',
            keywords: ['consignar', 'consignacion', 'vender mi auto', 'venta de mi carro', 'pongo en venta', 'reciben mi auto'],
            category: 'consignacion', priority: 90
        },
        {
            question: '¿Cuánto vale mi auto? ¿Hacen avalúo?',
            answer: 'Sí, **el avalúo es gratuito**. Necesitamos verlo en persona (15-20 min): revisamos kilometraje, estado mecánico y de carrocería. Te damos una oferta justa basada en precios reales del mercado. ¿Querés agendar el avalúo?',
            keywords: ['avaluo', 'tasacion', 'cuanto vale mi', 'cuanto me dan', 'tasar', 'valuar'],
            category: 'consignacion', priority: 85
        },
        {
            question: '¿Reciben mi auto como parte de pago?',
            answer: '¡Sí! **Recibimos tu auto como parte de pago** del nuevo. Hacemos el avalúo gratuito y descontamos ese valor del auto que querés llevar. Te ahorra el trámite de venderlo por separado.',
            keywords: ['parte de pago', 'permuta', 'cambio mi auto', 'me reciben', 'tomar como parte'],
            category: 'consignacion', priority: 85
        },
        {
            question: '¿Hacen entrega del auto en otra ciudad?',
            answer: 'Estamos en **Cartagena** pero coordinamos envío a otras ciudades de Colombia. El costo del transporte depende de la ciudad. Te lo cotizamos en el momento de la compra.',
            keywords: ['envio', 'envian', 'entregan', 'otra ciudad', 'bogota', 'medellin', 'transporte'],
            category: 'general', priority: 75
        },
        {
            question: '¿Qué documentos necesito para comprar?',
            answer: 'Para **compra de contado**: cédula vigente. Para **financiación**: cédula, certificado laboral, extractos bancarios últimos 3 meses, declaración de renta si aplica. Te ayudamos paso a paso.',
            keywords: ['documentos', 'papeles', 'requisitos', 'que necesito', 'que piden'],
            category: 'general', priority: 80
        },
        {
            question: '¿Hacen el traspaso del vehículo?',
            answer: 'Sí, **nosotros nos encargamos del traspaso**. Nos das los documentos, vamos a notaría, lo pasamos a tu nombre y tramitamos los runt. Todo incluido en el precio.',
            keywords: ['traspaso', 'paso a nombre', 'tramite', 'runt', 'notaria', 'documentacion'],
            category: 'politica', priority: 80
        },
        {
            question: '¿Los autos vienen con SOAT y técnico-mecánica?',
            answer: 'Sí, todos nuestros vehículos se entregan con **SOAT vigente** y **técnico-mecánica al día** (cuando aplica por antigüedad). Sin sorpresas.',
            keywords: ['soat', 'tecnico mecanica', 'rtm', 'revision tecnica', 'documentos al dia'],
            category: 'politica', priority: 78
        },
        {
            question: '¿Puedo hacer test drive antes de comprar?',
            answer: '¡Por supuesto! El **test drive es parte del proceso**. Agendás una cita, vas a nuestra sede en Cartagena, lo manejas con un asesor a bordo. Sin compromiso de compra.',
            keywords: ['test drive', 'manejarlo', 'probar', 'prueba de manejo', 'puedo manejar'],
            category: 'general', priority: 80
        },
        {
            question: '¿Qué tipos de vehículos manejan?',
            answer: 'Manejamos **SUVs, sedanes, hatchbacks y pickups** de las marcas más confiables (Toyota, Mazda, Chevrolet, Renault, Kia, Hyundai, Nissan, Ford). Tanto **usados como semi-nuevos**. Decime qué andás buscando y te muestro opciones.',
            keywords: ['que tipos', 'que manejan', 'que venden', 'que carros tienen', 'que marcas'],
            category: 'inventario', priority: 88
        },
        {
            question: '¿Tienen autos a menos de $30 millones?',
            answer: 'Sí, tenemos opciones desde **$25 millones** (autos usados con buen kilometraje y peritaje aprobado). Decime tu rango exacto y te muestro las mejores opciones.',
            keywords: ['barato', 'economico', 'precio bajo', 'menos de', 'rango', '20 millones', '30 millones'],
            category: 'inventario', priority: 85
        },
        {
            question: '¿Negocian el precio?',
            answer: 'Para hablar de **rebajas y precios finales** necesitás conectar con un asesor humano. Ellos manejan los descuentos según el caso. Decime "hablar con asesor" y te conecto al instante.',
            keywords: ['rebaja', 'descuento', 'negociable', 'precio final', 'minimo', 'mejor precio', 'le hago'],
            category: 'general', priority: 80
        },
        {
            question: '¿Aceptan pago con tarjeta?',
            answer: 'Aceptamos **transferencia bancaria, cheque, tarjeta de crédito (con recargo)** y por supuesto efectivo. Para grandes montos te recomendamos transferencia (más seguro).',
            keywords: ['pago', 'tarjeta', 'transferencia', 'cheque', 'efectivo', 'como pago'],
            category: 'general', priority: 70
        },
        {
            question: '¿Quién es ALTOR?',
            answer: 'Soy **ALTOR**, el asistente virtual de Altorra Cars 🤖. Te ayudo 24/7 con consultas rápidas, mostrarte el inventario, agendar visitas. Si necesitás algo más complejo, te conecto con un asesor humano al instante.',
            keywords: ['quien eres', 'que eres', 'eres bot', 'eres humano', 'altor', 'inteligencia artificial'],
            category: 'general', priority: 70
        },
        {
            question: '¿Cómo agendo una visita?',
            answer: 'Para agendar una visita decime **"quiero agendar"** o **"hablar con asesor"** y te conecto con un humano que te coordina la fecha y hora. También podés escribir directo al WhatsApp +57 323 501 6747.',
            keywords: ['agendar', 'cita', 'visita', 'cuando puedo ir', 'verlo en persona', 'cuadrar'],
            category: 'general', priority: 92
        },
        {
            question: '¿Qué pasa si el auto que me gusta tiene falla?',
            answer: 'Antes de venderse, **todos pasan por peritaje técnico**. Si después de comprarlo aparece una falla cubierta por garantía (90 días motor/caja), lo reparamos sin costo. Si querés, podés también **pedir un peritaje externo** antes de comprar — lo aceptamos sin problema.',
            keywords: ['falla', 'problema', 'rompe', 'garantia mecanica', 'peritaje externo', 'tercero'],
            category: 'politica', priority: 78
        },
        {
            question: '¿Aceptan motos como parte de pago?',
            answer: 'Recibimos **motos de marcas reconocidas** (Yamaha, Honda, Suzuki, Kawasaki, Bajaj) como parte de pago. Hacemos avalúo gratuito. Decime qué moto tenés y te oriento.',
            keywords: ['moto', 'motocicleta', 'permuta moto', 'cambio mi moto'],
            category: 'consignacion', priority: 65
        },
        {
            question: '¿Cuánto rinde un auto en gasolina?',
            answer: 'Depende del modelo y motor. Como referencia: **autos pequeños/sedanes 1.6L → 35-45 km/galón**, **SUVs medianas → 30-38 km/galón**, **pickups → 25-32 km/galón**. Si me decís qué modelo te interesa, te paso el dato exacto.',
            keywords: ['rendimiento', 'consumo', 'gasolina', 'km por galon', 'cuanto rinde', 'gasta mucho'],
            category: 'inventario', priority: 70
        }
    ];

    /**
     * §26.2 — Sembrar Knowledge Base profesional con 25 FAQs base.
     * Solo super_admin. Idempotente: skip las que ya existen
     * (matching por question normalizada).
     */
    function bootstrapFAQs() {
        if (!AP.isSuperAdmin || !AP.isSuperAdmin()) {
            AP.toast('Solo super_admin puede sembrar la KB', 'error');
            return;
        }
        if (!confirm('Esto creará ' + BOOTSTRAP_FAQS.length + ' FAQs profesionales en la base de conocimientos. Las que ya existan NO se duplicarán. ¿Continuar?')) return;

        AP.toast('Sembrando ' + BOOTSTRAP_FAQS.length + ' FAQs profesionales...', 'info');

        var existingQs = (_entries || []).map(function (e) {
            return (e.question || '').toLowerCase().trim();
        });

        var toCreate = BOOTSTRAP_FAQS.filter(function (f) {
            return existingQs.indexOf(f.question.toLowerCase().trim()) === -1;
        });

        if (toCreate.length === 0) {
            AP.toast('Las 25 FAQs ya están sembradas. Nada nuevo que crear.', 'info');
            return;
        }

        var batch = window.db.batch();
        var coll = window.db.collection('knowledgeBase');
        var nowIso = new Date().toISOString();
        var by = (AP.currentUserProfile && AP.currentUserProfile.uid) || 'system';

        toCreate.forEach(function (faq) {
            var ref = coll.doc();
            batch.set(ref, {
                question: faq.question,
                answer: faq.answer,
                keywords: faq.keywords,
                category: faq.category,
                enabled: true,
                priority: faq.priority || 50,
                usageCount: 0,
                lastUsedAt: null,
                createdAt: nowIso,
                createdBy: by,
                updatedAt: nowIso,
                updatedBy: by,
                _bootstrapped: true
            });
        });

        batch.commit().then(function () {
            AP.toast('✓ ' + toCreate.length + ' FAQs sembradas. ALTOR ya sabe todo lo básico.', 'success');
        }).catch(function (err) {
            AP.toast('Error: ' + err.message, 'error');
        });
    }

    /**
     * §26.2 — Restaurar configuración recomendada del Cerebro.
     * Pone los DEFAULTS profesionales en el doc _brain (sin pisar
     * llmModel ni provider — esos los maneja el admin). Útil al
     * primer setup o cuando el admin quiere "resetear" el tono.
     */
    function restoreBrainDefaults() {
        if (!AP.isSuperAdmin || !AP.isSuperAdmin()) {
            AP.toast('Solo super_admin puede restaurar el Cerebro', 'error');
            return;
        }
        if (!confirm('Esto restaurará la configuración recomendada del Cerebro AI: identidad, tono, contexto, instrucciones y reglas de seguridad. NO se tocan tus settings de modelo LLM. ¿Continuar?')) return;

        var preserveLLM = _brainData ? {
            enabled: _brainData.enabled || false,
            llmProvider: _brainData.llmProvider,
            llmModel: _brainData.llmModel,
            llmTemperature: _brainData.llmTemperature,
            maxTokens: _brainData.maxTokens
        } : {};

        var data = Object.assign({}, DEFAULT_BRAIN, preserveLLM);

        window.db.doc(BRAIN_DOC).set(data, { merge: true }).then(function () {
            AP.toast('✓ Cerebro AI restaurado a configuración recomendada', 'success');
        }).catch(function (err) {
            AP.toast('Error: ' + err.message, 'error');
        });
    }

    // Tabs del Cerebro
    document.addEventListener('click', function (e) {
        var tab = e.target.closest && e.target.closest('[data-cerebro-tab]');
        if (tab) {
            var name = tab.getAttribute('data-cerebro-tab');
            document.querySelectorAll('[data-cerebro-tab]').forEach(function (t) {
                t.classList.toggle('is-active', t.getAttribute('data-cerebro-tab') === name);
            });
            document.querySelectorAll('[data-cerebro-panel]').forEach(function (p) {
                p.classList.toggle('is-active', p.getAttribute('data-cerebro-panel') === name);
            });
            return;
        }
        // Save button
        if (e.target && e.target.closest && e.target.closest('#cerebroSaveBtn')) {
            saveBrain();
            return;
        }
        // §26.2 — Bootstrap FAQs
        if (e.target && e.target.closest && e.target.closest('#cerebroBootstrapFAQsBtn')) {
            bootstrapFAQs();
            return;
        }
        // §26.2 — Restore brain defaults
        if (e.target && e.target.closest && e.target.closest('#cerebroRestoreBtn')) {
            restoreBrainDefaults();
            return;
        }
    });

    // Marcar dirty al cambiar cualquier campo del Cerebro
    document.addEventListener('input', function (e) {
        var el = e.target;
        if (el && el.id && el.id.indexOf('cerebro') === 0) {
            _brainDirty = true;
            var saveState = $b('cerebroSaveState');
            if (saveState) saveState.textContent = '· Cambios sin guardar';
        }
    });

    // Cargar el brain doc cuando el admin entra a la sección kb
    if (window.AltorraSections && window.AltorraSections.onChange) {
        window.AltorraSections.onChange(function (section) {
            if (section === 'kb') {
                loadBrain();
                renderBrainForm();
            }
        });
    }
    // También arrancar el listener si user es editor+ (para que el status pill
    // refleje el estado del Cerebro aunque no entre a la sección)
    var brainAttempts = 0;
    var brainIv = setInterval(function () {
        brainAttempts++;
        if (window.auth && window.auth.currentUser && AP.isEditorOrAbove && AP.isEditorOrAbove()) {
            loadBrain();
            clearInterval(brainIv);
        } else if (brainAttempts > 60) clearInterval(brainIv);
    }, 1000);

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraKB = {
        findBest: findBest,
        list: function () { return _entries.slice(); },
        recordUsage: recordUsage,
        // FASE 3 — Cerebro AI
        getBrain: function () { return _brainData; },
        // §22 Capa E — promoción desde "Lo que no entendí"
        openFormPrefilled: openFormPrefilled,
        // §26.2 — Bootstrap masivo
        bootstrapFAQs: bootstrapFAQs,
        restoreBrainDefaults: restoreBrainDefaults,
        BOOTSTRAP_FAQS: BOOTSTRAP_FAQS
    };
})();
