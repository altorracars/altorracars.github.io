/**
 * ALTORRA CARS — Knowledge Graph (Mega-Plan v4, Bloque Q)
 * =========================================================
 * Grafo en memoria que conecta contactos ↔ vehículos ↔ marcas a
 * partir de las comunicaciones, favoritos, búsquedas guardadas e
 * historial de visitas. Permite responder preguntas como:
 *
 *   - "¿Qué contactos están interesados en este vehículo nuevo?"
 *   - "¿Qué otros contactos son parecidos a este?"
 *   - "Búsqueda semántica: SUV menor a $100M en Cartagena"
 *
 * Nodos:
 *   - contact:<email>     (cliente registrado o guest agrupado por email)
 *   - vehicle:<id>        (vehículo del inventario)
 *   - brand:<nombre>      (marca normalizada)
 *
 * Aristas (con weight):
 *   - contact → vehicle  (contactó por ese vehículo, weight depende del kind)
 *   - contact → brand    (mostró interés en esa marca, weight = #contactos)
 *   - vehicle → brand    (vehículo es de esa marca)
 *   - contact ↔ contact  (similares — comparten marcas/categorías)
 *
 * Reconstruir es O(n) sobre AP.vehicles + AP.appointments + AP.clientes;
 * con throttle de 5s para evitar reconstrucción excesiva.
 *
 * Q.1 — Build / index
 * Q.2 — neighborsOf(node)
 * Q.3 — matchContactsForVehicle(vehicle) → quién querrá el vehículo nuevo
 * Q.4 — searchContacts(query) → búsqueda semántica con NER
 *
 * Public API:
 *   AltorraGraph.build()                    → reconstruir grafo
 *   AltorraGraph.neighborsOf(nodeId)        → vecinos del nodo
 *   AltorraGraph.matchContactsForVehicle(v) → contactos que probablemente quieren v
 *   AltorraGraph.searchContacts(query)      → búsqueda NL con NER
 *   AltorraGraph.stats()                    → métricas del grafo
 */
(function () {
    'use strict';
    if (window.AltorraGraph) return;
    var AP = window.AP;
    if (!AP) return;

    var DAY_MS = 86400000;
    var REBUILD_THROTTLE_MS = 5000;
    var _lastBuild = 0;
    var _scheduledBuild = null;

    /* ═══════════════════════════════════════════════════════════
       GRAPH STATE — adyacencias por nodo
       ═══════════════════════════════════════════════════════════ */
    var nodes = {
        contacts: {},  // 'contact:email' → {id, type:'contact', email, nombre, score, tier, comms}
        vehicles: {},  // 'vehicle:id' → {id, type:'vehicle', marca, modelo, year, precio, ...}
        brands: {}     // 'brand:nombre' → {id, type:'brand', name, count}
    };
    var edges = {};    // 'contact:x' → [{target, weight, kind}, ...]

    function nodeKey(type, id) {
        return type + ':' + (id || '').toString().toLowerCase().trim();
    }

    function addEdge(from, to, weight, kind) {
        if (!from || !to || from === to) return;
        if (!edges[from]) edges[from] = [];
        // Si ya existe el edge, sumar weights
        var existing = edges[from].find(function (e) { return e.target === to && e.kind === kind; });
        if (existing) {
            existing.weight += weight;
        } else {
            edges[from].push({ target: to, weight: weight, kind: kind });
        }
    }

    /* ═══════════════════════════════════════════════════════════
       BUILD — reconstruye el grafo desde AP.* (throttled)
       ═══════════════════════════════════════════════════════════ */
    function build() {
        var now = Date.now();
        if (now - _lastBuild < REBUILD_THROTTLE_MS) {
            // Postpone si es muy pronto
            if (!_scheduledBuild) {
                _scheduledBuild = setTimeout(function () {
                    _scheduledBuild = null;
                    build();
                }, REBUILD_THROTTLE_MS - (now - _lastBuild));
            }
            return;
        }
        _lastBuild = now;

        // Reset
        nodes.contacts = {};
        nodes.vehicles = {};
        nodes.brands = {};
        edges = {};

        // 1. Vehículos → nodos + edges a marcas
        if (AP.vehicles) {
            AP.vehicles.forEach(function (v) {
                if (!v.id) return;
                var vKey = nodeKey('vehicle', v.id);
                nodes.vehicles[vKey] = {
                    id: vKey,
                    type: 'vehicle',
                    vehicleId: v.id,
                    marca: v.marca,
                    modelo: v.modelo,
                    year: v.year,
                    precio: v.precio,
                    categoria: v.categoria,
                    estado: v.estado,
                    raw: v
                };
                if (v.marca) {
                    var bKey = nodeKey('brand', v.marca);
                    if (!nodes.brands[bKey]) {
                        nodes.brands[bKey] = { id: bKey, type: 'brand', name: v.marca, count: 0 };
                    }
                    nodes.brands[bKey].count++;
                    addEdge(vKey, bKey, 1, 'is_brand');
                }
            });
        }

        // 2. Contactos: agrupados por email desde appointments + clientes
        var contactBuckets = {};
        if (AP.appointments) {
            AP.appointments.forEach(function (a) {
                if (!a.email) return;
                var key = a.email.toLowerCase();
                if (!contactBuckets[key]) {
                    contactBuckets[key] = {
                        email: key,
                        nombre: a.nombre || '',
                        telefono: a.telefono || '',
                        ciudad: a.ciudad || '',
                        comms: [],
                        lastCommAt: null,
                        type: a.userId ? 'registered' : 'guest'
                    };
                }
                contactBuckets[key].comms.push(a);
                var ts = a.createdAt || a.updatedAt;
                if (ts && (!contactBuckets[key].lastCommAt || ts > contactBuckets[key].lastCommAt)) {
                    contactBuckets[key].lastCommAt = ts;
                }
            });
        }

        // Crear nodos contact + edges contact → vehicle/brand
        Object.keys(contactBuckets).forEach(function (email) {
            var c = contactBuckets[email];
            var cKey = nodeKey('contact', email);
            // Score si hay AltorraCRM
            var score = 0;
            if (window.AltorraCRM && window.AltorraCRM.computeScore) {
                try { score = window.AltorraCRM.computeScore(c); } catch (e) {}
            }
            nodes.contacts[cKey] = {
                id: cKey,
                type: 'contact',
                email: email,
                nombre: c.nombre,
                telefono: c.telefono,
                ciudad: c.ciudad,
                contactType: c.type,
                lastCommAt: c.lastCommAt,
                commCount: c.comms.length,
                score: score,
                raw: c
            };

            // Edges: contact → vehicle / brand desde comms
            c.comms.forEach(function (comm) {
                // Edge a vehículo si el comm referencia un vehicleId
                if (comm.vehicleId) {
                    var vKey = nodeKey('vehicle', comm.vehicleId);
                    if (nodes.vehicles[vKey]) {
                        // Weight según kind: cita > solicitud > lead
                        var w = 1;
                        if (comm.kind === 'cita') w = 4;
                        else if (comm.kind === 'solicitud') w = 3;
                        else w = 1;
                        addEdge(cKey, vKey, w, 'interested_in');
                        // También edge inverso para neighborsOf de vehículo
                        addEdge(vKey, cKey, w, 'attracted_contact');

                        // Edge a la marca del vehículo
                        var v = nodes.vehicles[vKey];
                        if (v.marca) {
                            var bKey = nodeKey('brand', v.marca);
                            addEdge(cKey, bKey, w, 'likes_brand');
                        }
                    }
                }

                // Edge a marca si el texto del comm la menciona (NER)
                var msgText = [comm.observaciones, comm.comentarios, comm.mensaje, comm.vehiculo].filter(Boolean).join(' ');
                if (msgText && window.AltorraNER) {
                    try {
                        var ext = window.AltorraNER.extract(msgText);
                        if (ext.summary && ext.summary.marca) {
                            var bKey2 = nodeKey('brand', ext.summary.marca);
                            if (nodes.brands[bKey2]) {
                                addEdge(cKey, bKey2, 1, 'mentioned_brand');
                            }
                        }
                    } catch (e) {}
                }
            });
        });

        // 3. Edges contact ↔ contact (similares por marcas compartidas)
        // Solo computar para contactos con score ≥ 30 para no inflar el grafo
        var hotContacts = Object.values(nodes.contacts).filter(function (c) { return c.score >= 30; });
        hotContacts.forEach(function (c1) {
            var c1Brands = (edges[c1.id] || []).filter(function (e) { return e.kind === 'likes_brand'; }).map(function (e) { return e.target; });
            if (c1Brands.length === 0) return;
            hotContacts.forEach(function (c2) {
                if (c1.id >= c2.id) return; // evita duplicar y self
                var c2Brands = (edges[c2.id] || []).filter(function (e) { return e.kind === 'likes_brand'; }).map(function (e) { return e.target; });
                var shared = c1Brands.filter(function (b) { return c2Brands.indexOf(b) !== -1; });
                if (shared.length >= 1) {
                    addEdge(c1.id, c2.id, shared.length, 'similar_to');
                    addEdge(c2.id, c1.id, shared.length, 'similar_to');
                }
            });
        });

        // Notificar via EventBus
        if (window.AltorraEventBus) {
            window.AltorraEventBus.emit('graph.built', {
                contacts: Object.keys(nodes.contacts).length,
                vehicles: Object.keys(nodes.vehicles).length,
                brands: Object.keys(nodes.brands).length,
                edges: Object.keys(edges).reduce(function (acc, k) { return acc + edges[k].length; }, 0)
            });
        }
    }

    /* ═══════════════════════════════════════════════════════════
       Q.2 — neighborsOf(nodeId, opts)
       ═══════════════════════════════════════════════════════════ */
    function neighborsOf(nodeId, opts) {
        opts = opts || {};
        var limit = opts.limit || 10;
        var kindFilter = opts.kind || null;
        var arr = (edges[nodeId] || []).slice();
        if (kindFilter) arr = arr.filter(function (e) { return e.kind === kindFilter; });
        // Sort por weight desc
        arr.sort(function (a, b) { return b.weight - a.weight; });
        return arr.slice(0, limit).map(function (e) {
            var node = nodes.contacts[e.target] || nodes.vehicles[e.target] || nodes.brands[e.target];
            return { node: node, weight: e.weight, kind: e.kind };
        }).filter(function (x) { return x.node; });
    }

    /* ═══════════════════════════════════════════════════════════
       Q.3 — matchContactsForVehicle(vehicle)
       Dado un vehículo, retorna los contactos que probablemente
       lo quieren basándose en sus marcas/categorías favoritas.
       ═══════════════════════════════════════════════════════════ */
    function matchContactsForVehicle(vehicle) {
        if (!vehicle) return [];
        var bKey = nodeKey('brand', vehicle.marca || '');
        var matches = {};

        // 1. Contactos que mencionaron esta marca
        Object.keys(nodes.contacts).forEach(function (cKey) {
            var contactEdges = edges[cKey] || [];
            var brandEdge = contactEdges.find(function (e) {
                return (e.kind === 'likes_brand' || e.kind === 'mentioned_brand') && e.target === bKey;
            });
            if (!brandEdge) return;

            var c = nodes.contacts[cKey];
            var score = brandEdge.weight * 10;

            // Bonus si la categoría del vehículo coincide con categorías que pidió antes
            (c.raw.comms || []).forEach(function (comm) {
                if (comm.categoria && vehicle.categoria && comm.categoria === vehicle.categoria) {
                    score += 5;
                }
                // Bonus si el rango de precio cuadra (±20%)
                if (comm.datosExtra && comm.datosExtra.precioEsperado && vehicle.precio) {
                    var pe = parseInt(String(comm.datosExtra.precioEsperado).replace(/[^0-9]/g, ''), 10);
                    if (pe) {
                        var diff = Math.abs(pe - vehicle.precio) / vehicle.precio;
                        if (diff < 0.20) score += 8;
                        else if (diff < 0.40) score += 3;
                    }
                }
            });

            // Bonus general por score del contacto (lead caliente prioritario)
            score += (c.score || 0) / 10;

            matches[cKey] = {
                contact: c,
                matchScore: score,
                reason: 'mostró interés en ' + vehicle.marca
            };
        });

        // 2. Convertir a array y ordenar
        return Object.values(matches)
            .sort(function (a, b) { return b.matchScore - a.matchScore; })
            .slice(0, 10);
    }

    /* ═══════════════════════════════════════════════════════════
       Q.4 — searchContacts(query)
       Búsqueda semántica: extrae entities con NER del query y
       filtra contactos cuyos intereses coinciden.
       Ej: "interesados en SUV menor a $100M en Cartagena"
       ═══════════════════════════════════════════════════════════ */
    function searchContacts(query) {
        if (!query) return [];
        var ext = window.AltorraNER ? window.AltorraNER.extract(query) : { summary: {} };
        var summary = ext.summary || {};
        var lowerQuery = query.toLowerCase();

        // Categorías comunes que el query puede mencionar
        var categoryKeywords = {
            suv: 'suv', sedan: 'sedan', sedán: 'sedan', pickup: 'pickup',
            hatchback: 'hatchback', camioneta: 'camioneta', utilitario: 'suv'
        };
        var queryCategoria = null;
        Object.keys(categoryKeywords).forEach(function (k) {
            if (lowerQuery.indexOf(k) !== -1) queryCategoria = categoryKeywords[k];
        });

        // Detectar "menor a / menos de / hasta" para precio
        var priceLimit = null;
        var priceMatch = lowerQuery.match(/(?:menor|menos|hasta|max|máximo|maximo|bajo|debajo)\s*(?:a|de|que)?\s*\$?\s*(\d+)\s*(m|millones?|k)?/);
        if (priceMatch) {
            var n = parseFloat(priceMatch[1]);
            if (priceMatch[2] && priceMatch[2].charAt(0) === 'm') n *= 1000000;
            else if (priceMatch[2] === 'k') n *= 1000;
            else if (n < 1000) n *= 1000000; // asume millones
            priceLimit = n;
        }

        var results = [];
        Object.values(nodes.contacts).forEach(function (c) {
            var matchScore = 0;
            var reasons = [];

            // 1. Marca explícita en el query
            if (summary.marca) {
                var bKey = nodeKey('brand', summary.marca);
                var hasBrand = (edges[c.id] || []).some(function (e) {
                    return (e.kind === 'likes_brand' || e.kind === 'mentioned_brand') && e.target === bKey;
                });
                if (hasBrand) {
                    matchScore += 10;
                    reasons.push('le interesa ' + summary.marca);
                }
            }

            // 2. Ciudad
            if (summary.ciudad && c.ciudad && c.ciudad.toLowerCase().indexOf(summary.ciudad) !== -1) {
                matchScore += 8;
                reasons.push('en ' + summary.ciudad);
            }

            // 3. Categoría: contactó por vehículos de esa categoría
            if (queryCategoria && c.raw.comms) {
                var hasCat = c.raw.comms.some(function (comm) {
                    if (comm.categoria && comm.categoria.toLowerCase() === queryCategoria) return true;
                    // O por vehicleId conectado
                    if (comm.vehicleId) {
                        var v = nodes.vehicles[nodeKey('vehicle', comm.vehicleId)];
                        return v && v.categoria && v.categoria.toLowerCase() === queryCategoria;
                    }
                    return false;
                });
                if (hasCat) {
                    matchScore += 7;
                    reasons.push('busca ' + queryCategoria);
                }
            }

            // 4. Precio: contactó con precio esperado dentro del límite
            if (priceLimit && c.raw.comms) {
                var hasPriceMatch = c.raw.comms.some(function (comm) {
                    if (!comm.datosExtra || !comm.datosExtra.precioEsperado) return false;
                    var pe = parseInt(String(comm.datosExtra.precioEsperado).replace(/[^0-9]/g, ''), 10);
                    return pe && pe <= priceLimit;
                });
                if (hasPriceMatch) {
                    matchScore += 5;
                    reasons.push('presupuesto ≤ $' + Math.round(priceLimit / 1000000) + 'M');
                }
            }

            if (matchScore >= 5) {
                results.push({
                    contact: c,
                    matchScore: matchScore,
                    reasons: reasons
                });
            }
        });

        results.sort(function (a, b) { return b.matchScore - a.matchScore; });
        return results.slice(0, 20);
    }

    /* ═══════════════════════════════════════════════════════════
       STATS
       ═══════════════════════════════════════════════════════════ */
    function stats() {
        return {
            contacts: Object.keys(nodes.contacts).length,
            vehicles: Object.keys(nodes.vehicles).length,
            brands: Object.keys(nodes.brands).length,
            edges: Object.keys(edges).reduce(function (acc, k) { return acc + edges[k].length; }, 0),
            lastBuild: _lastBuild
        };
    }

    /* ═══════════════════════════════════════════════════════════
       AUTO-BUILD — escucha eventos del bus para reconstruir
       ═══════════════════════════════════════════════════════════ */
    function init() {
        // Build inicial cuando AP tiene datos
        var attempts = 0;
        var iv = setInterval(function () {
            attempts++;
            if (AP.vehicles && AP.vehicles.length > 0) {
                build();
                clearInterval(iv);
            } else if (attempts > 60) clearInterval(iv);
        }, 1000);

        // Reconstruir en eventos relevantes (con throttle)
        if (window.AltorraEventBus) {
            window.AltorraEventBus.on('vehicle.', function () { build(); });
            window.AltorraEventBus.on('comm.', function () { build(); });
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ═══════════════════════════════════════════════════════════
       Q.3 — Auto-suggest cuando llega vehículo nuevo
       Listener al EventBus que sugiere notificar contactos
       ═══════════════════════════════════════════════════════════ */
    if (window.AltorraEventBus) {
        window.AltorraEventBus.on('vehicle.created', function (event) {
            if (!AP.isSuperAdmin || !AP.isSuperAdmin()) return;
            if (event.payload && event.payload.__replay) return;

            // Esperar a que el grafo se reconstruya con el vehículo nuevo
            setTimeout(function () {
                var vehicle = AP.vehicles && AP.vehicles.find(function (v) { return v.id === event.payload.id; });
                if (!vehicle) return;
                var matches = matchContactsForVehicle(vehicle);
                if (matches.length === 0) return;

                if (window.notifyCenter && window.notifyCenter.notify) {
                    window.notifyCenter.notify('system', {
                        title: 'Nuevo vehículo: ' + matches.length + ' contacto' + (matches.length !== 1 ? 's' : '') + ' interesado' + (matches.length !== 1 ? 's' : ''),
                        message: vehicle.marca + ' ' + vehicle.modelo + ' ' + (vehicle.year || '') + ' — sugerimos notificarlos',
                        link: 'admin.html#crm',
                        entityRef: 'graph-suggest:' + vehicle.id,
                        priority: 'normal'
                    });
                }
            }, 6000); // 6s para dar tiempo al rebuild throttled
        });
    }

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraGraph = {
        build: build,
        neighborsOf: neighborsOf,
        matchContactsForVehicle: matchContactsForVehicle,
        searchContacts: searchContacts,
        stats: stats,
        // Acceso de bajo nivel (debugging)
        _nodes: nodes,
        _edges: edges
    };
})();
