/**
 * ALTORRA CARS — Knowledge Base client (Mega-Plan v4, Microfase U.5)
 * ====================================================================
 * Versión liviana del KB para páginas públicas. El Concierge bot
 * consulta `AltorraKB.findBest(query)` antes del FAQ hardcoded.
 *
 * Solo lee — no expone CRUD (eso vive en js/admin-kb.js).
 * Las reglas Firestore permiten read público a `knowledgeBase/`.
 */
(function () {
    'use strict';
    if (window.AltorraKB) return; // si admin-kb ya cargó, no sobrescribir

    var _entries = [];
    var _loaded = false;
    var _unsub = null;

    function startListener() {
        if (_unsub || !window.db) return;
        _unsub = window.db.collection('knowledgeBase')
            .where('enabled', '==', true)
            .orderBy('priority', 'desc')
            .onSnapshot(function (snap) {
                _entries = [];
                snap.forEach(function (doc) {
                    _entries.push(Object.assign({ _id: doc.id }, doc.data()));
                });
                _loaded = true;
            }, function () { /* silencioso si falla */ });
    }

    function findBest(query) {
        if (!query || _entries.length === 0) return null;
        var lower = query.toLowerCase();
        var best = null, bestScore = 0;
        _entries.forEach(function (e) {
            var score = 0;
            (e.keywords || []).forEach(function (k) {
                if (k && lower.indexOf(k.toLowerCase()) !== -1) score += 2;
            });
            if (e.question && lower.indexOf(e.question.toLowerCase().slice(0, 20)) !== -1) {
                score += 3;
            }
            score += (e.priority || 0) / 50;
            if (score > bestScore) { bestScore = score; best = e; }
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

    // Init después de Firebase ready
    if (window.firebaseReady) {
        window.firebaseReady.then(function () {
            startListener();
        });
    } else {
        var attempts = 0;
        var iv = setInterval(function () {
            attempts++;
            if (window.db) { startListener(); clearInterval(iv); }
            else if (attempts > 30) clearInterval(iv);
        }, 500);
    }

    window.AltorraKB = {
        findBest: findBest,
        list: function () { return _entries.slice(); },
        recordUsage: recordUsage,
        isLoaded: function () { return _loaded; }
    };
})();
