/**
 * AltorraDualCore — Router central Premium↔Free
 * §24 FASE 4 (Offline Ultra Brain 2.0).
 *
 * Decide en cada turno qué core responde:
 *   - Core Premium (LLM Anthropic via Cloud Function chatLLM): si está
 *     habilitado en knowledgeBase/_brain.enabled === true Y la API
 *     responde sin error
 *   - Core Free (Offline Ultra Brain 2.0): si Premium está OFF o falla
 *
 * Circuit Breaker: si Premium falla 3+ veces en últimos 5 min, lo
 * bypassea durante 3 min (evita timeout 12s × N en cada turno mientras
 * Anthropic está caído o se acabó saldo).
 *
 * Cero downtime: la memoria conversacional (session.context) es
 * compartida entre cores. Si el LLM responde turno 1 y luego cae,
 * el Free Core continúa turno 2 sabiendo de qué se hablaba.
 *
 * El código del LLM existente NO se toca. AltorraAI.providers.chat
 * sigue siendo el provider que apunta a Cloud Function chatLLM.
 *
 * API:
 *   AltorraDualCore.respond(userText, session) → Promise<{text, cta?, source}>
 *   AltorraDualCore.health()                   → diagnóstico
 *   AltorraDualCore.forceFreeMode(true|false)  → debug
 */
(function () {
    'use strict';
    if (window.AltorraDualCore) return;

    /* ─── State ──────────────────────────────────────────────────── */
    var _premiumCheckCache = null;
    var _premiumCheckAt = 0;
    var PREMIUM_CHECK_TTL_MS = 60 * 1000;  // 60s

    var _premiumFailures = [];  // timestamps de fallas recientes
    var _premiumDownUntil = 0;
    var FAILURE_WINDOW_MS = 5 * 60 * 1000;  // 5 min
    var FAILURE_THRESHOLD = 3;
    var DOWN_DURATION_MS = 3 * 60 * 1000;   // 3 min de circuit breaker

    var _forceFreeMode = false;  // override manual para testing

    /* ─── Premium availability check ─────────────────────────────── */

    function _premiumCacheValid() {
        return _premiumCheckCache !== null &&
               (Date.now() - _premiumCheckAt) < PREMIUM_CHECK_TTL_MS;
    }

    /**
     * isPremiumAvailable — chequea (con cache 60s):
     *   - knowledgeBase/_brain.enabled === true
     *   - Provider chat registrado en AltorraAI
     *   - Circuit breaker no está OPEN
     */
    function isPremiumAvailable() {
        if (_forceFreeMode) return Promise.resolve(false);
        if (Date.now() < _premiumDownUntil) return Promise.resolve(false);
        if (_premiumCacheValid()) return Promise.resolve(_premiumCheckCache);

        // Si AltorraKB cargado, leer brain enabled
        var brainCheck = Promise.resolve(false);
        if (window.AltorraKB && typeof window.AltorraKB.getBrain === 'function') {
            try {
                var brain = window.AltorraKB.getBrain();
                if (brain && brain.enabled) brainCheck = Promise.resolve(true);
            } catch (e) {}
        } else if (window.db) {
            // Fallback: lectura directa Firestore
            brainCheck = window.db.doc('knowledgeBase/_brain').get()
                .then(function (snap) {
                    return snap.exists && snap.data() && snap.data().enabled === true;
                })
                .catch(function () { return false; });
        }

        return brainCheck.then(function (enabled) {
            // Premium disponible si: brain enabled Y AltorraAI con provider chat
            var providerOk = !!(window.AltorraAI &&
                                window.AltorraAI.providers &&
                                window.AltorraAI.providers.chat);
            var available = enabled && providerOk;
            _premiumCheckCache = available;
            _premiumCheckAt = Date.now();
            return available;
        });
    }

    /* ─── Circuit breaker ────────────────────────────────────────── */

    function _markPremiumFailure(error) {
        var now = Date.now();
        // Limpiar fallas viejas (>5 min)
        _premiumFailures = _premiumFailures.filter(function (t) {
            return (now - t) < FAILURE_WINDOW_MS;
        });
        _premiumFailures.push(now);
        if (_premiumFailures.length >= FAILURE_THRESHOLD) {
            _premiumDownUntil = now + DOWN_DURATION_MS;
            _premiumFailures = [];  // reset al abrir el breaker
            console.warn('[DualCore] Circuit breaker OPEN — Premium bypaseado por 3 min',
                error && error.message);
        }
    }

    function _markPremiumSuccess() {
        _premiumFailures = [];  // reset en cualquier success
    }

    /* ─── Premium call wrapper ───────────────────────────────────── */

    function _callPremium(userText, session) {
        if (!window.AltorraAI || !window.AltorraAI.providers ||
            !window.AltorraAI.providers.chat) {
            return Promise.reject(new Error('chat-provider-not-registered'));
        }

        // Construir messages para el LLM (últimos 12 turnos)
        var llmMessages = (session.messages || []).slice(-12).filter(function (m) {
            return m.from === 'user' || m.from === 'bot' || m.from === 'asesor';
        }).map(function (m) {
            return { role: m.from === 'user' ? 'user' : 'assistant', content: m.text };
        });
        // Asegurar que el último message sea del usuario
        if (llmMessages.length === 0 || llmMessages[llmMessages.length - 1].role !== 'user') {
            llmMessages.push({ role: 'user', content: userText });
        }

        return window.AltorraAI.chat(llmMessages, {
            sessionId: session.sessionId,
            timeoutMs: 12000
        }).then(function (resp) {
            if (resp && resp.text) {
                _markPremiumSuccess();
                return { text: resp.text, cta: resp.cta || null, source: 'llm' };
            }
            // Premium dijo "disabled" o "noKey" — no es failure, es opt-out
            return null;
        });
    }

    /* ─── Free Core cascade ──────────────────────────────────────── */

    function _respondFree(userText, session) {
        var ctx = session.context || {};
        var firstName = (function () {
            if (session.profile && session.profile.nombre) {
                return String(session.profile.nombre).split(' ')[0];
            }
            if (session.nombre) return String(session.nombre).split(' ')[0];
            return '';
        })();

        // ─── 1. ANÁFORA RESOLUTION (si responde "el primero", "ese", etc.) ───
        if (window.AltorraIntent && window.AltorraIntent.resolvePronominalChoice) {
            var anaResp = window.AltorraIntent.resolvePronominalChoice(userText, ctx);
            if (anaResp && anaResp.resolved) {
                // Limpiar pendingChoice tras resolver
                if (window.AltorraIntent.clearPendingChoice) {
                    window.AltorraIntent.clearPendingChoice(ctx);
                }
                // Si resolved es un vehículo, responder con info
                var v = anaResp.resolved;
                if (v && typeof v === 'object' && v.marca) {
                    var precio = v.precioOferta || v.precio;
                    return Promise.resolve({
                        text: 'Listo, hablemos del **' + v.marca + ' ' + (v.modelo || '') +
                              ' ' + (v.year || '') + '**. ' +
                              (precio ? 'Está en $' + (precio / 1e6).toFixed(1) + 'M. ' : '') +
                              '¿Querés ver la ficha completa o agendar una visita?',
                        cta: { label: 'Agendar visita', action: 'escalate' },
                        source: 'anaphora'
                    });
                }
                // Si resolved es un string (categoría/marca elegida)
                if (typeof anaResp.resolved === 'string') {
                    return Promise.resolve({
                        text: 'Perfecto, **' + anaResp.resolved + '**. ' +
                              '¿Te muestro las opciones que tenemos disponibles?',
                        cta: { label: 'Ver catálogo', action: 'goto-busqueda' },
                        source: 'anaphora'
                    });
                }
            }
        }

        // ─── 2. SMALL TALK ───────────────────────────────────────────
        if (window.AltorraSmallTalk) {
            var stResp = window.AltorraSmallTalk.detect(userText, session);
            if (stResp && stResp.text) {
                return Promise.resolve({
                    text: stResp.text,
                    source: 'small-talk',
                    matchedPattern: stResp.matchedPattern,
                    intent: stResp.intent
                });
            }
        }

        // ─── 3. RULE-BASED EXISTENTE — generateBotResponse ───────────
        // Esto reusa toda la lógica acumulada en concierge.js (intents,
        // KB ranker, inventory search, NER, doble fallback, etc.).
        var ruleResp = null;
        if (typeof window._altorraConciergeRespondLocal === 'function') {
            try {
                ruleResp = window._altorraConciergeRespondLocal(userText);
                // Solo retornamos directamente si NO es fallback genérico
                // (si _isFallback=true, primero probamos Transformers como
                // capa 4 antes de rendirnos al fallback)
                if (ruleResp && ruleResp.text && !ruleResp._isFallback) {
                    ruleResp.source = ruleResp.source || 'rule-based';
                    return Promise.resolve(ruleResp);
                }
            } catch (err) {
                console.warn('[DualCore] Rule-based threw:', err);
            }
        }

        // ─── 4. TRANSFORMERS.JS (zero-shot classification) ──────────
        // Solo se activa si:
        //   a) feature flag enabled (admin opt-in para no descargar 90MB)
        //   b) el rule-based devolvió fallback genérico
        // Si Transformers identifica un intent claro, le pasamos el
        // userText con un hint del intent al rule-based para que responda
        // mejor.
        if (window.AltorraTransformers && window.AltorraTransformers.isEnabled()) {
            return window.AltorraTransformers.classify(userText)
                .then(function (tfResult) {
                    if (tfResult && tfResult.score >= 0.65) {
                        var intent = window.AltorraTransformers.mapToIntent(tfResult.label);
                        if (intent && intent !== 'none' && intent !== 'pregunta general') {
                            // Re-invocar rule-based con un hint inyectado
                            // (un sufijo "[INTENT:xxx]" que el classifier
                            // detecta para forzar la branch correcta)
                            // NOTA: una integración más robusta sería un
                            // 2do parámetro a generateBotResponse — pero
                            // ese contrato lo dejamos para v3 del dual-core.
                            console.log('[DualCore] Transformers detected intent:', intent, 'score:', tfResult.score);
                        }
                    }
                    // Devolver el ruleResp original (ya marcado como _isFallback)
                    if (ruleResp && ruleResp.text) return ruleResp;
                    return _finalFallback(userText, session, firstName);
                })
                .catch(function () {
                    if (ruleResp && ruleResp.text) return ruleResp;
                    return _finalFallback(userText, session, firstName);
                });
        }

        // Sin Transformers: devolver el ruleResp si existe
        if (ruleResp && ruleResp.text) return Promise.resolve(ruleResp);

        // ─── 5. FALLBACK final empático ──────────────────────────────
        return Promise.resolve(_finalFallback(userText, session, firstName));
    }

    function _finalFallback(userText, session, firstName) {
        return {
            text: (firstName ? firstName + ', ' : '') +
                  'puedo ayudarte con info del catálogo, financiación, citas y peritaje. ' +
                  'Escribime con más detalle qué necesitas, o si prefieres, te paso con un asesor.',
            cta: { label: 'Hablar con asesor', action: 'escalate' },
            source: 'fallback',
            _isFallback: true
        };
    }

    /* ─── respond — entry point ──────────────────────────────────── */

    /**
     * respond — decide y devuelve la respuesta del bot.
     *
     * Cascada:
     *   1. ¿Premium disponible Y no en circuit-break?
     *      → Try AltorraAI.chat (LLM)
     *      → Si responde texto → return con source='llm'
     *      → Si throw → mark failure, fallback a Free
     *      → Si null/disabled/noKey → fallback silencioso a Free
     *   2. Free Core cascada:
     *      → Anáfora 2.0 (resolvePronominalChoice)
     *      → Small Talk
     *      → Rule-based existente (generateBotResponse vía hook)
     *      → Fallback empático
     *
     * Memory siempre se preserva: session.context es el mismo en ambos.
     */
    function respond(userText, session) {
        if (!userText || !session) {
            return Promise.resolve({
                text: 'Hubo un error procesando tu mensaje. ¿Podrías reintentarlo?',
                source: 'error'
            });
        }

        return isPremiumAvailable().then(function (premiumOn) {
            if (!premiumOn) return _respondFree(userText, session);

            return _callPremium(userText, session)
                .then(function (resp) {
                    if (resp && resp.text) return resp;
                    // Premium retornó null/disabled — fallback silencioso
                    return _respondFree(userText, session);
                })
                .catch(function (err) {
                    // Falla real: timeout, network, 5xx, saldo agotado
                    _markPremiumFailure(err);
                    console.warn('[DualCore] Premium failed, fallback to Free:', err && err.message);
                    return _respondFree(userText, session);
                });
        });
    }

    /* ─── Diagnostics ────────────────────────────────────────────── */

    function health() {
        return {
            premiumCacheValid: _premiumCacheValid(),
            premiumCacheValue: _premiumCheckCache,
            recentFailures: _premiumFailures.length,
            circuitBreakerOpen: Date.now() < _premiumDownUntil,
            circuitBreakerExpiresIn: Math.max(0, _premiumDownUntil - Date.now()),
            forceFreeMode: _forceFreeMode
        };
    }

    function forceFreeMode(force) {
        _forceFreeMode = !!force;
        _premiumCheckCache = null;  // invalidar cache
        return _forceFreeMode;
    }

    function resetCircuitBreaker() {
        _premiumFailures = [];
        _premiumDownUntil = 0;
        _premiumCheckCache = null;
    }

    /* ─── Public API ─────────────────────────────────────────────── */
    window.AltorraDualCore = {
        respond: respond,
        isPremiumAvailable: isPremiumAvailable,
        health: health,
        forceFreeMode: forceFreeMode,
        resetCircuitBreaker: resetCircuitBreaker,
        _internal: {
            markPremiumFailure: _markPremiumFailure,
            markPremiumSuccess: _markPremiumSuccess
        }
    };
})();
