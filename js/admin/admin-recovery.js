/**
 * ALTORRA ADMIN — Sistema de recuperación de cuenta (§48)
 * =========================================================
 * Multi-capa de fallback al 2FA SMS estilo Apple/Amazon/GitHub.
 *
 * Cuando Firebase rate-limit bloquea SMS (auth/too-many-requests),
 * el usuario puede entrar via:
 *   1. Backup Codes (10 códigos de un solo uso, formato XXXX-XXXX)
 *   2. Preguntas de seguridad (3 preguntas, requiere 2/3 correctas)
 *
 * Crypto: 100% client-side via Web Crypto API. Server (Firestore)
 * solo guarda hashes SHA-256. Si alguien lee Firestore, NO obtiene
 * códigos ni respuestas en plaintext.
 *
 * Schema Firestore `usuarios/{uid}`:
 *   backupCodes: [{hash, usedAt}]                       // 10 entries
 *   backupCodesGeneratedAt: ISO timestamp
 *   securityQuestions: [{questionId, salt, hash}]       // 3 entries
 *   securityQuestionsUpdatedAt: ISO timestamp
 *
 * Public API (window.AltorraRecovery):
 *   generateBackupCodes() → array<string>          (10 nuevos)
 *   hashBackupCode(code) → Promise<string>         (SHA-256 hex)
 *   verifyBackupCode(input, entries) → Promise<index|-1>
 *   hashAnswer(answer) → Promise<{salt, hash}>
 *   verifyAnswer(input, salt, expectedHash) → Promise<bool>
 *   AVAILABLE_QUESTIONS — array de preguntas predefinidas
 */
(function () {
    'use strict';
    if (window.AltorraRecovery) return;

    var BACKUP_CODE_LENGTH = 8;       // 8 chars hex (sin guion)
    var BACKUP_CODE_COUNT = 10;
    var SECURITY_QUESTION_COUNT = 3;
    var REQUIRED_CORRECT_ANSWERS = 2;  // 2 de 3

    // ═══════════════════════════════════════════════════════════════
    // PREGUNTAS PREDEFINIDAS
    // ═══════════════════════════════════════════════════════════════
    var AVAILABLE_QUESTIONS = [
        { id: 'q_apodo',         text: '¿Cuál es tu apodo de la infancia?' },
        { id: 'q_ciudad',        text: '¿En qué ciudad naciste?' },
        { id: 'q_mascota',       text: '¿Cómo se llamaba tu primera mascota?' },
        { id: 'q_calle',         text: '¿En qué calle vivías de niño?' },
        { id: 'q_amigo',         text: '¿Cómo se llama tu mejor amigo de la infancia?' },
        { id: 'q_carro',         text: '¿Cuál fue la marca de tu primer carro?' },
        { id: 'q_profesor',      text: '¿Cómo se llamaba tu profesor favorito?' },
        { id: 'q_restaurante',   text: '¿Cuál era tu restaurante favorito de niño?' },
        { id: 'q_madre_apellido', text: '¿Cuál es el apellido de soltera de tu madre?' },
        { id: 'q_libro',         text: '¿Cuál es tu libro favorito?' },
        { id: 'q_pelicula',      text: '¿Cuál es tu película favorita?' },
        { id: 'q_color',         text: '¿Cuál es tu color favorito?' }
    ];

    function getQuestionById(id) {
        for (var i = 0; i < AVAILABLE_QUESTIONS.length; i++) {
            if (AVAILABLE_QUESTIONS[i].id === id) return AVAILABLE_QUESTIONS[i];
        }
        return null;
    }

    // ═══════════════════════════════════════════════════════════════
    // CRYPTO HELPERS — SHA-256 via Web Crypto API
    // ═══════════════════════════════════════════════════════════════
    function bytesToHex(bytes) {
        var arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
        var out = '';
        for (var i = 0; i < arr.length; i++) {
            out += arr[i].toString(16).padStart(2, '0');
        }
        return out;
    }

    function randomBytes(n) {
        var arr = new Uint8Array(n);
        crypto.getRandomValues(arr);
        return arr;
    }

    function sha256Hex(text) {
        var data = new TextEncoder().encode(text);
        return crypto.subtle.digest('SHA-256', data).then(function (buf) {
            return bytesToHex(buf);
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // BACKUP CODES
    // ═══════════════════════════════════════════════════════════════

    /**
     * Genera 10 backup codes random (formato XXXX-XXXX, mayúsculas).
     * Retorna array de strings — el cliente los muestra UNA VEZ y persiste
     * sus hashes (no los strings) en Firestore.
     */
    function generateBackupCodes() {
        var codes = [];
        // Caracteres seguros (sin 0/O/1/I/L para evitar confusión)
        var alphabet = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
        for (var i = 0; i < BACKUP_CODE_COUNT; i++) {
            var bytes = randomBytes(BACKUP_CODE_LENGTH);
            var code = '';
            for (var j = 0; j < BACKUP_CODE_LENGTH; j++) {
                code += alphabet[bytes[j] % alphabet.length];
            }
            // Formato XXXX-XXXX para legibilidad
            codes.push(code.substring(0, 4) + '-' + code.substring(4, 8));
        }
        return codes;
    }

    /**
     * Normaliza un código para hash/comparación.
     * Acepta entrada con/sin guion, mayúsculas/minúsculas.
     */
    function normalizeBackupCode(code) {
        return String(code || '').toUpperCase().replace(/[^A-Z2-9]/g, '');
    }

    /**
     * Hashea un código con SHA-256. Usa el código normalizado SIN guion.
     */
    function hashBackupCode(code) {
        return sha256Hex(normalizeBackupCode(code));
    }

    /**
     * Hashea un array de códigos (para persistir tras generación).
     * Retorna array de entries {hash, usedAt: null}.
     */
    function hashAllBackupCodes(codes) {
        var promises = codes.map(function (c) {
            return hashBackupCode(c).then(function (hash) {
                return { hash: hash, usedAt: null };
            });
        });
        return Promise.all(promises);
    }

    /**
     * Verifica un código input contra el array de entries del server.
     * Retorna el INDEX del entry matching (>= 0) o -1 si no match.
     * Si match, el caller debe marcar usedAt y persistir el array.
     */
    function verifyBackupCode(input, entries) {
        if (!entries || !entries.length) return Promise.resolve(-1);
        return hashBackupCode(input).then(function (inputHash) {
            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                if (!entry || entry.usedAt) continue; // ya usado
                if (entry.hash === inputHash) return i;
            }
            return -1;
        });
    }

    function countAvailableBackupCodes(entries) {
        if (!entries || !entries.length) return 0;
        var n = 0;
        for (var i = 0; i < entries.length; i++) {
            if (entries[i] && !entries[i].usedAt) n++;
        }
        return n;
    }

    // ═══════════════════════════════════════════════════════════════
    // SECURITY QUESTIONS
    // ═══════════════════════════════════════════════════════════════

    /**
     * Normaliza una respuesta — case-insensitive, trim, sin acentos.
     * "Café"/"cafe"/"  CAFE  " todas → "cafe".
     */
    function normalizeAnswer(answer) {
        var s = String(answer || '').trim().toLowerCase();
        // Remove accents (é→e, ñ→n)
        s = s.normalize('NFD').replace(/[̀-ͯ]/g, '');
        // Collapse whitespace
        s = s.replace(/\s+/g, ' ');
        return s;
    }

    /**
     * Hashea una respuesta con salt random.
     * Retorna {salt, hash} — ambos hex strings.
     */
    function hashAnswer(answer) {
        var saltBytes = randomBytes(16);
        var salt = bytesToHex(saltBytes);
        var normalized = normalizeAnswer(answer);
        return sha256Hex(salt + normalized).then(function (hash) {
            return { salt: salt, hash: hash };
        });
    }

    /**
     * Verifica una respuesta contra un entry del server.
     */
    function verifyAnswer(input, salt, expectedHash) {
        var normalized = normalizeAnswer(input);
        return sha256Hex(salt + normalized).then(function (hash) {
            return hash === expectedHash;
        });
    }

    /**
     * Verifica un set de respuestas — retorna # correctas.
     * answers: array de {questionId, value}
     * stored: array de {questionId, salt, hash}
     */
    function verifyAnswerSet(answers, stored) {
        if (!answers || !stored) return Promise.resolve(0);
        var promises = answers.map(function (a) {
            var match = stored.find(function (s) { return s.questionId === a.questionId; });
            if (!match) return Promise.resolve(false);
            return verifyAnswer(a.value, match.salt, match.hash);
        });
        return Promise.all(promises).then(function (results) {
            return results.filter(function (r) { return r === true; }).length;
        });
    }

    function meetsThreshold(correctCount) {
        return correctCount >= REQUIRED_CORRECT_ANSWERS;
    }

    // ═══════════════════════════════════════════════════════════════
    // Public API
    // ═══════════════════════════════════════════════════════════════
    window.AltorraRecovery = {
        // Constants
        BACKUP_CODE_COUNT: BACKUP_CODE_COUNT,
        SECURITY_QUESTION_COUNT: SECURITY_QUESTION_COUNT,
        REQUIRED_CORRECT_ANSWERS: REQUIRED_CORRECT_ANSWERS,
        AVAILABLE_QUESTIONS: AVAILABLE_QUESTIONS,
        getQuestionById: getQuestionById,

        // Backup codes
        generateBackupCodes: generateBackupCodes,
        hashBackupCode: hashBackupCode,
        hashAllBackupCodes: hashAllBackupCodes,
        verifyBackupCode: verifyBackupCode,
        normalizeBackupCode: normalizeBackupCode,
        countAvailableBackupCodes: countAvailableBackupCodes,

        // Security questions
        hashAnswer: hashAnswer,
        verifyAnswer: verifyAnswer,
        verifyAnswerSet: verifyAnswerSet,
        normalizeAnswer: normalizeAnswer,
        meetsThreshold: meetsThreshold,

        // Utility
        sha256Hex: sha256Hex
    };
})();
