/**
 * AltorraAutomotiveVocab — Vocabulario automotriz colombiano
 * ============================================================
 * Diccionario MASIVO de términos del mundo automotriz que el bot
 * ALTOR debe conocer para hablar como un asesor real, no un robot.
 *
 * §26 — Antes de esto, el bot solo entendía términos técnicos
 * formales ("automóvil", "transmisión", "motor"). Ahora entiende
 * también:
 *   - Coloquialismos colombianos ("cucha", "fierro", "nave",
 *     "jepeta", "platón", "doble cabina")
 *   - Slang de negociación ("rebajita", "le hago $X", "dame")
 *   - Términos técnicos abreviados ("HP", "CC", "AT", "MT", "4x4")
 *   - Procesos/trámites ("traspaso", "soat", "técnico-mecánica",
 *     "peritaje", "consignación", "garantía")
 *   - Financiación ("cuota inicial", "prima", "abono", "plazo",
 *     "intereses", "leasing")
 *
 * Total: 600+ términos cubriendo todo lo que un cliente colombiano
 * podría escribir en un chat de auto.
 *
 * API:
 *   AltorraAutomotiveVocab.expand(text)  → texto con sinónimos resueltos a canonical
 *   AltorraAutomotiveVocab.recognize(text) → { categories: [...], terms: [...] }
 *   AltorraAutomotiveVocab.explain(concept) → string (frase humana del concepto)
 *   AltorraAutomotiveVocab.suggestPair(concept) → "automático/manual" → suggested human reply
 *   AltorraAutomotiveVocab.allTerms()    → array completo (debug)
 */
(function () {
    'use strict';
    if (window.AltorraAutomotiveVocab) return;

    /* ─── Diccionario por categoría ──────────────────────────────── */

    // Cada entrada: canonical → [variantes coloquiales y técnicas]
    var VOCABULARY = {
        // === TIPOS DE VEHÍCULO ===
        vehiculo: ['carro', 'auto', 'automóvil', 'vehículo', 'coche', 'nave', 'fierro',
                   'cucha', 'mueble', 'máquina', 'unidad'],

        suv: ['suv', 'camioneta', 'todo terreno', 'todoterreno', 'jepeta', 'jeepeta',
              'campero', 'crossover', '4x4', 'awd', 'fwd', 'station wagon'],

        sedan: ['sedán', 'sedan', 'auto familiar', 'cuatro puertas', '4 puertas',
                'salón', 'berlinet'],

        hatchback: ['hatchback', 'compacto', 'cinco puertas', '5 puertas',
                    'pequeño', 'urbano', 'auto chiquito'],

        pickup: ['pickup', 'pick up', 'pick-up', 'platón', 'doble cabina',
                 'cabina sencilla', 'estacas', 'trabajo', 'cargero', 'utilitario'],

        coupe: ['coupé', 'coupe', 'deportivo', 'dos puertas', '2 puertas'],

        convertible: ['convertible', 'descapotable', 'cabriolet', 'sin techo',
                      'techo blando'],

        minivan: ['minivan', 'van', 'familiar', 'siete puestos', '7 puestos',
                  'multipropósito'],

        // === TRANSMISIÓN ===
        automatica: ['automática', 'automatica', 'automatico', 'automático', 'auto',
                     'at', 'a/t', 'tiptronic', 'cvt', 'sin embrague', 'sin clutch',
                     'sin palanca'],

        manual: ['manual', 'mecánica', 'mecanica', 'standard', 'estándar', 'estandar',
                 'mt', 'm/t', 'con embrague', 'con clutch', 'con palanca', 'palanca',
                 'caja de cambios'],

        secuencial: ['secuencial', 'paddle shifter', 'paletas', 'al volante',
                     'tipo f1'],

        // === COMBUSTIBLE ===
        gasolina: ['gasolina', 'nafta', 'corriente', 'extra', '95', '91', 'gas premium'],

        diesel: ['diesel', 'diésel', 'gasoil', 'acpm'],

        hibrido: ['híbrido', 'hibrido', 'hybrid', 'electrificado', 'mild hybrid'],

        electrico: ['eléctrico', 'electrico', 'ev', '100% eléctrico', 'cero emisiones',
                    'enchufable', 'phev'],

        glp: ['glp', 'gas', 'gas licuado', 'gas natural', 'gnv', 'gnc', 'dual'],

        // === TRACCIÓN ===
        traccion_4x4: ['4x4', '4wd', 'awd', 'tracción total', 'todas las ruedas',
                       'integral'],
        traccion_4x2: ['4x2', '2wd', 'fwd', 'rwd', 'tracción delantera',
                       'tracción trasera', 'delantera', 'trasera'],

        // === COLORES ===
        color_blanco: ['blanco', 'blanca', 'perla', 'pearl', 'nacarado', 'nacarada'],
        color_negro: ['negro', 'negra', 'azabache', 'oscuro'],
        color_gris: ['gris', 'plomo', 'plomizo', 'plata', 'plateado', 'plateada',
                     'silver', 'titanio', 'humo'],
        color_rojo: ['rojo', 'roja', 'vino tinto', 'bermellón', 'cereza', 'fuego'],
        color_azul: ['azul', 'azul marino', 'celeste', 'turquesa', 'navy', 'cobalto'],
        color_verde: ['verde', 'verde militar', 'verde oliva', 'esmeralda', 'menta'],
        color_amarillo: ['amarillo', 'amarilla', 'mostaza', 'mango'],
        color_naranja: ['naranja', 'anaranjado', 'naranjado'],
        color_marron: ['marrón', 'marron', 'café', 'cafe', 'chocolate', 'caramelo',
                       'mocca', 'beige', 'arena', 'champagne'],
        color_dorado: ['dorado', 'oro', 'champaña', 'cobrizo'],

        // === ESTADO/CONDICIÓN ===
        nuevo: ['nuevo', 'cero kilómetros', '0km', 'ckm', 'cero', 'recién salido'],

        semi_nuevo: ['semi nuevo', 'semi-nuevo', 'seminuevo', 'casi nuevo',
                     'poco uso', 'poco rodado', 'baja kilometraje', 'pocos kilómetros'],

        usado: ['usado', 'segunda mano', 'second hand', 'rodado', 'segundo dueño',
                'tercer dueño'],

        // === SPECS TÉCNICAS ===
        kilometraje: ['kilometraje', 'kilometros', 'kilómetros', 'km', 'recorrido',
                      'rodaje', 'mileage'],

        motor: ['motor', 'planta', 'mecánica', 'block', 'bloque', 'corazón'],

        cilindraje: ['cilindraje', 'cilindrada', 'cc', 'cm³', 'cubicaje',
                     'desplazamiento', 'litros', 'l'],

        potencia: ['potencia', 'caballos', 'hp', 'cv', 'caballos de fuerza',
                   'horse power', 'fuerza'],

        torque: ['torque', 'par motor', 'nm', 'fuerza torsional'],

        consumo: ['consumo', 'rendimiento', 'gasta', 'rinde', 'km por galón',
                  'km/galón', 'eficiencia', 'ahorrador', 'ahorra gasolina'],

        // === SEGURIDAD ===
        airbags: ['airbags', 'bolsas de aire', 'bolsas', 'srs'],
        abs: ['abs', 'frenos abs', 'antibloqueo'],
        ebd: ['ebd', 'distribución electrónica de frenado'],
        esc: ['esc', 'esp', 'control de estabilidad', 'estabilidad'],
        traction_control: ['control de tracción', 'tcs', 'asr'],

        // === CONFORT ===
        aire_acondicionado: ['aire acondicionado', 'a/c', 'ac', 'aire',
                             'climatizador', 'climatización', 'clima',
                             'aire frío', 'refrigerado'],

        vidrios_electricos: ['vidrios eléctricos', 'vidrios automáticos',
                             'ventanas eléctricas', 'subidas eléctricas'],

        direccion_hidraulica: ['dirección hidráulica', 'hidráulica',
                                'asistida', 'dirección asistida', 'eps'],

        direccion_electrica: ['dirección eléctrica', 'electroasistida'],

        techo_solar: ['techo solar', 'sunroof', 'sun roof', 'techo corredizo',
                      'panorámico', 'moonroof'],

        camara: ['cámara', 'camara', 'cámara de reversa', 'cámara trasera',
                 'cámara 360', 'sensores', 'sensores de parqueo', 'parking sensors'],

        bluetooth: ['bluetooth', 'manos libres', 'hands free', 'pareo',
                    'conectividad'],

        pantalla: ['pantalla', 'pantalla táctil', 'táctil', 'infoentretenimiento',
                   'multimedia', 'radio', 'pantalla android', 'apple carplay',
                   'android auto'],

        // === FINANCIACIÓN ===
        financiacion: ['financiación', 'financiacion', 'financiar', 'financiado',
                       'crédito', 'credito', 'prestamo', 'préstamo', 'leasing',
                       'a crédito', 'a cuotas', 'plan'],

        cuota_inicial: ['cuota inicial', 'inicial', 'enganche', 'prima',
                        'pie', 'down payment', 'abono inicial'],

        cuota_mensual: ['cuota mensual', 'mensualidad', 'cuota', 'mensual',
                        'pago mensual', 'mensualidades', 'al mes'],

        plazo: ['plazo', 'meses', 'años', 'término', 'periodo', 'tiempo de pago'],

        intereses: ['intereses', 'interés', 'interes', 'tasa', 'rate', 'efectiva',
                    'tasa de interés', 'porcentaje', '%'],

        prestamo: ['préstamo', 'prestamo', 'banco', 'aliado financiero', 'entidad'],

        // === TRÁMITES ===
        traspaso: ['traspaso', 'traspasar', 'cambio de dueño', 'titulación',
                   'cesión', 'pasar a nombre'],

        soat: ['soat', 'seguro obligatorio', 'seguro mínimo'],

        tecnico_mecanica: ['técnico-mecánica', 'tecnico-mecanica', 'técnico mecánica',
                           'revisión técnica', 'rtm', 'inspección', 'revisión vehicular'],

        peritaje: ['peritaje', 'peritar', 'inspección', 'inspeccionar', 'revisión',
                   'diagnóstico', 'evaluación técnica', 'check up', 'chequeo'],

        seguro: ['seguro', 'póliza', 'poliza', 'todo riesgo', 'aseguradora'],

        // === GARANTÍA ===
        garantia: ['garantía', 'garantia', 'cubre', 'respaldo', 'cobertura',
                   'asegurado', 'reclamo'],

        // === NEGOCIACIÓN ===
        precio: ['precio', 'valor', 'costo', 'coste', 'cuánto', 'cuanto',
                 'cuánto vale', 'cuánto cuesta', 'qué precio', 'que precio',
                 'a cómo', 'a como', 'cuanto sale'],

        rebaja: ['rebaja', 'rebajita', 'descuento', 'oferta', 'promoción',
                 'menos', 'baja', 'bajada', 'rebajan', 'rebajen'],

        negociar: ['negociar', 'negociable', 'negocio', 'hacemos trato',
                   'le hago', 'le doy', 'pago', 'le ofrezco'],

        contado: ['contado', 'efectivo', 'cash', 'plata en mano', 'al contado',
                  'sin financiación'],

        oferta_precio: ['oferta', 'mejor oferta', 'precio justo', 'precio firme',
                        'precio final', 'precio final al cliente', 'precio mínimo',
                        'lo mínimo', 'lo último'],

        // === CONSIGNACIÓN / VENTA ===
        vender: ['vender', 'venta', 'consignar', 'consignación', 'pongo en venta',
                 'quiero vender', 'venta de mi auto', 'mi carro lo vendo',
                 'recibir mi auto', 'parte de pago'],

        comprar: ['comprar', 'compra', 'adquirir', 'me llevo', 'lo quiero',
                  'lo tomo', 'me lo quedo'],

        avaluo: ['avalúo', 'avaluo', 'avaluar', 'tasación', 'tasar', 'valuación',
                 'valuar', 'cuanto vale mi'],

        // === USO / ESTILO DE VIDA ===
        familiar: ['familiar', 'familia', 'esposa', 'hijos', 'niños', 'bebés',
                   'paseo', 'fin de semana', 'finde'],

        trabajo: ['trabajo', 'trabajar', 'empresa', 'oficina', 'ejecutivo',
                  'comercial', 'representante', 'utilitario', 'cargo'],

        ciudad: ['ciudad', 'urbano', 'tráfico', 'parqueo', 'estacionamiento',
                 'oficina', 'corto', 'cortas distancias'],

        carretera: ['carretera', 'viaje', 'viajes', 'vacaciones', 'largas distancias',
                    'autopista', 'crucero'],

        offroad: ['off road', 'off-road', 'campo', 'finca', 'monte', 'aventura',
                  'sin pavimentar', 'destapado', 'campo abierto'],

        // === MODELO/AÑO ===
        anio: ['año', 'modelo', 'año modelo', 'fabricación', 'fabricado',
               'year', 'mod'],

        // === SERVICIOS POSVENTA ===
        repuestos: ['repuestos', 'partes', 'piezas', 'spare parts', 'accesorios'],

        mantenimiento: ['mantenimiento', 'manteniendo', 'service', 'servicio',
                        'cambio de aceite', 'aceite', 'filtros', 'pastillas',
                        'frenos', 'amortiguadores'],

        accidente: ['accidente', 'accidentado', 'choque', 'chocado', 'volcado',
                    'volcadura', 'siniestro', 'colisión', 'golpe'],

        // === EMOCIONES / EXPRESIONES ===
        gusta: ['me gusta', 'me encanta', 'me llama', 'me late', 'me jala',
                'qué bonito', 'qué chimba', 'bacano', 'bacana', 'chévere',
                'chevere', 'hermoso', 'lindo', 'linda', 'perfecto', 'súper'],

        no_gusta: ['no me gusta', 'feo', 'fea', 'horrible', 'no me convence',
                   'no me late', 'no me jala', 'no es lo que busco',
                   'no es para mí', 'paso'],

        duda: ['duda', 'no sé', 'no se', 'no estoy seguro', 'no estoy segura',
               'tal vez', 'puede ser', 'mmm', 'pensando'],

        // === SALUDOS / CIERRES ===
        saludo: ['hola', 'qué hubo', 'qué hubole', 'qubo', 'hey', 'buenas',
                 'buenos días', 'buenas tardes', 'buenas noches', 'qué tal',
                 'qué onda', 'qué más', 'q mas', 'k mas', 'parce', 'parcero',
                 'manín', 'mi llave', 'compadre', 'hermano', 'broh'],

        despedida: ['chao', 'adiós', 'hasta luego', 'nos vemos', 'bye',
                    'hasta la próxima', 'cuídate', 'gracias', 'mil gracias',
                    'muchas gracias'],

        // === CONFIRMACIÓN / NEGACIÓN ===
        afirmacion: ['sí', 'si', 'claro', 'dale', 'listo', 'súper', 'bacano',
                     'perfecto', 'ok', 'okay', 'vale', 'eso es', 'correcto',
                     'exacto', 'así es', 'simon', 'simón', 'obvio', 'por supuesto',
                     'hagale', 'hágale', 'arranquemos', 'vamos', 'me sirve',
                     'me funciona'],

        negacion: ['no', 'nones', 'nope', 'nunca', 'jamás', 'tampoco',
                   'no quiero', 'no me interesa', 'paso', 'descarto'],

        // === ANÁFORA / REFERENCIA ===
        ese_auto: ['ese', 'esa', 'aquel', 'aquella', 'este', 'esta',
                   'el de antes', 'el que vimos', 'lo que dijiste',
                   'el primero', 'el segundo', 'el tercero', 'el último',
                   'el 1', 'el 2', 'el 3'],

        // === ACCIONES BOT ===
        mostrar: ['muéstrame', 'mostrame', 'enséñame', 'enseñame', 'enseñame',
                  'ver', 'mira', 'a ver', 'qué tienes', 'qué tenés', 'qué hay',
                  'qué manejas', 'qué manejan', 'qué venden', 'inventario',
                  'catálogo', 'opciones', 'alternativas', 'pásame', 'manda',
                  'envíame', 'comparte'],

        agendar: ['agendar', 'agenda', 'cita', 'visita', 'verlo', 'ir a verlo',
                  'pasar', 'visitar', 'conocer', 'reservar', 'apartar',
                  'separar', 'cuadrar', 'cuándo puedo', 'cuándo voy',
                  'horario', 'cuándo abren'],

        ubicacion: ['dónde', 'donde', 'ubicación', 'ubicacion', 'dirección',
                    'direccion', 'sede', 'oficina', 'local', 'concesionaria',
                    'cómo llegar', 'como llegar', 'mapa', 'maps']
    };

    /* ─── Index inverso variant → canonical ─────────────────────── */
    var REVERSE_INDEX = {};
    Object.keys(VOCABULARY).forEach(function (canonical) {
        VOCABULARY[canonical].forEach(function (variant) {
            REVERSE_INDEX[variant.toLowerCase()] = canonical;
        });
    });

    /* ─── Categorías agrupadas (para insights) ──────────────────── */
    var CATEGORIES = {
        type: ['vehiculo', 'suv', 'sedan', 'hatchback', 'pickup', 'coupe', 'convertible', 'minivan'],
        transmission: ['automatica', 'manual', 'secuencial'],
        fuel: ['gasolina', 'diesel', 'hibrido', 'electrico', 'glp'],
        drivetrain: ['traccion_4x4', 'traccion_4x2'],
        color: ['color_blanco', 'color_negro', 'color_gris', 'color_rojo', 'color_azul',
                'color_verde', 'color_amarillo', 'color_naranja', 'color_marron', 'color_dorado'],
        condition: ['nuevo', 'semi_nuevo', 'usado'],
        spec: ['kilometraje', 'motor', 'cilindraje', 'potencia', 'torque', 'consumo'],
        safety: ['airbags', 'abs', 'ebd', 'esc', 'traction_control'],
        comfort: ['aire_acondicionado', 'vidrios_electricos', 'direccion_hidraulica',
                  'direccion_electrica', 'techo_solar', 'camara', 'bluetooth', 'pantalla'],
        finance: ['financiacion', 'cuota_inicial', 'cuota_mensual', 'plazo', 'intereses', 'prestamo'],
        process: ['traspaso', 'soat', 'tecnico_mecanica', 'peritaje', 'seguro', 'garantia'],
        negotiation: ['precio', 'rebaja', 'negociar', 'contado', 'oferta_precio'],
        transaction: ['vender', 'comprar', 'avaluo'],
        usage: ['familiar', 'trabajo', 'ciudad', 'carretera', 'offroad'],
        emotion: ['gusta', 'no_gusta', 'duda'],
        social: ['saludo', 'despedida', 'afirmacion', 'negacion'],
        anaphora: ['ese_auto', 'anio'],
        action: ['mostrar', 'agendar', 'ubicacion']
    };

    /* ─── Explicaciones humanas por concepto ────────────────────── */
    // Cuando el cliente pregunta algo o el bot quiere educar, usar esto.
    var EXPLANATIONS = {
        peritaje: 'Es una revisión técnica gratuita que hacemos a TODOS los autos antes de venderlos. Verificamos motor, caja, suspensión, frenos, electricidad y carrocería. Te entregamos un informe escrito.',
        garantia: 'Damos 90 días de garantía mecánica en motor y caja en todos nuestros vehículos. Cubre fallas no causadas por mal uso.',
        traspaso: 'Nosotros nos encargamos de pasar el carro a tu nombre. Solo necesitamos tu cédula, una copia de tarjeta de propiedad anterior y firmar el traspaso en notaría.',
        soat: 'El SOAT es obligatorio. Si compras un auto, lo entregamos con SOAT vigente o te ayudamos a sacarlo en el momento.',
        tecnico_mecanica: 'Es el certificado de revisión técnico-mecánica. Obligatorio en Colombia para autos de más de 6 años. Nuestros vehículos lo traen vigente.',
        financiacion: 'Trabajamos con varios bancos aliados. Cuotas desde 12 hasta 72 meses. Cuota inicial mínima desde 30%. Te ayudamos con el trámite completo.',
        cuota_inicial: 'Es lo que pagas de entrada. Mientras más alta, menores son tus cuotas mensuales. Mínimo 30% del valor del vehículo.',
        consignacion: 'Si querés vender tu auto, lo recibimos en consignación: lo exhibimos, marketing, llamadas, todo nosotros. Vos solo recibís la plata cuando se vende. Sin costo si nosotros lo vendemos.',
        avaluo: 'Hacemos avalúo gratuito de tu auto. Lo revisamos, miramos kilometraje, estado y precios de mercado. Te damos una oferta justa.',
        offroad: 'Si vas a campo, finca o caminos sin pavimentar, te conviene 4x4 o pickup. Mayor altura al piso y tracción en las 4 ruedas.',
        electrico: 'Los autos eléctricos son cero gasolina, cero ruido. Costo por km muy bajo (~$60 vs $400 de gasolina). Pero piensa en dónde cargás.',
        hibrido: 'Híbrido = motor a gasolina + motor eléctrico. Ahorra 30-50% de gasolina. No necesitás cargarlo (se carga solo al frenar).',
        manual: 'Caja mecánica (con palanca y embrague). Más económica de mantener, mejor consumo, más control. Pero requiere práctica en tráfico.',
        automatica: 'Sin embrague, sin palanca de cambios. Comodísima en ciudad y tráfico. Consume un poco más pero la diferencia es mínima en autos modernos.'
    };

    /* ─── API ────────────────────────────────────────────────────── */

    /**
     * expand(text) — reemplaza variantes por canonical en el texto.
     * Ejemplo: "tienes una jepeta automática?" → "tienes una suv automatica?"
     * Útil para que el intent classifier matchee mejor.
     */
    function expand(text) {
        if (!text || typeof text !== 'string') return '';
        var lowered = text.toLowerCase();
        // Reemplazar primero las frases más largas para evitar matches parciales
        var sortedVariants = Object.keys(REVERSE_INDEX).sort(function (a, b) {
            return b.length - a.length;
        });
        sortedVariants.forEach(function (variant) {
            var canonical = REVERSE_INDEX[variant];
            // Word boundary aware (multiword phrases use simple replace)
            if (variant.indexOf(' ') >= 0) {
                lowered = lowered.split(variant).join(canonical);
            } else {
                var re = new RegExp('\\b' + escapeRegex(variant) + '\\b', 'g');
                lowered = lowered.replace(re, canonical);
            }
        });
        return lowered;
    }

    function escapeRegex(s) {
        return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * recognize(text) — devuelve qué categorías y términos detectó.
     * Útil para enriquecer respuestas: "veo que mencionaste familiar +
     * presupuesto, te recomiendo X".
     */
    function recognize(text) {
        if (!text) return { categories: [], terms: [] };
        var lowered = text.toLowerCase();
        var foundTerms = [];

        Object.keys(REVERSE_INDEX).forEach(function (variant) {
            if (variant.indexOf(' ') >= 0) {
                if (lowered.indexOf(variant) >= 0) {
                    foundTerms.push({ canonical: REVERSE_INDEX[variant], variant: variant });
                }
            } else {
                var re = new RegExp('\\b' + escapeRegex(variant) + '\\b');
                if (re.test(lowered)) {
                    foundTerms.push({ canonical: REVERSE_INDEX[variant], variant: variant });
                }
            }
        });

        // Dedup por canonical
        var uniqueTerms = [];
        var seenCanonical = {};
        foundTerms.forEach(function (t) {
            if (!seenCanonical[t.canonical]) {
                seenCanonical[t.canonical] = true;
                uniqueTerms.push(t);
            }
        });

        // Agrupar por categoría
        var foundCategories = [];
        Object.keys(CATEGORIES).forEach(function (cat) {
            var hasOne = CATEGORIES[cat].some(function (c) { return seenCanonical[c]; });
            if (hasOne) foundCategories.push(cat);
        });

        return {
            categories: foundCategories,
            terms: uniqueTerms
        };
    }

    /**
     * explain(concept) — devuelve frase humana explicativa del concepto.
     * Si no existe, retorna null.
     */
    function explain(concept) {
        return EXPLANATIONS[concept] || null;
    }

    /**
     * isAutomotiveQuery(text) — heurística rápida: ¿el texto tiene
     * vocabulario automotriz? Usado para decidir si vale la pena
     * disparar el flujo de inventory_search vs small-talk.
     */
    function isAutomotiveQuery(text) {
        var rec = recognize(text);
        return rec.terms.length >= 1;
    }

    function allTerms() {
        return Object.keys(REVERSE_INDEX);
    }

    /* ─── Public API ────────────────────────────────────────────── */
    window.AltorraAutomotiveVocab = {
        expand: expand,
        recognize: recognize,
        explain: explain,
        isAutomotiveQuery: isAutomotiveQuery,
        allTerms: allTerms,
        VOCABULARY: VOCABULARY,
        CATEGORIES: CATEGORIES,
        EXPLANATIONS: EXPLANATIONS
    };
})();
