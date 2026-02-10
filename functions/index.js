const functions = require('firebase-functions');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();
const callableOptionsV2 = {
    region: 'us-central1',
    invoker: 'public',
    cors: true
};

function mapAdminAuthErrorV1(error, fallbackAction) {
    const code = error && error.code ? String(error.code) : '';
    const message = error && error.message ? String(error.message) : 'Sin detalles';

    if (code === 'auth/email-already-exists') {
        return new functions.https.HttpsError('already-exists',
            'Este email ya tiene una cuenta en Firebase Auth. Eliminala primero desde Firebase Console si deseas re-crearla.');
    }

    if (code === 'auth/invalid-email') {
        return new functions.https.HttpsError('invalid-argument', 'El formato del email no es valido.');
    }

    if (code === 'auth/weak-password' || code === 'auth/invalid-password') {
        return new functions.https.HttpsError('invalid-argument', 'La contrasena no cumple los requisitos minimos.');
    }

    if (code === 'auth/operation-not-allowed') {
        return new functions.https.HttpsError('failed-precondition',
            'El proveedor Email/Password no esta habilitado en Firebase Authentication.');
    }

    if (code === 'auth/insufficient-permission') {
        return new functions.https.HttpsError('permission-denied',
            'La cuenta de servicio de Cloud Functions no tiene permisos de Firebase Auth Admin.');
    }

    return new functions.https.HttpsError('internal',
        fallbackAction + ' (codigo: ' + (code || 'desconocido') + ').',
        { code: code || 'unknown', originalMessage: message });
}

function mapAdminAuthErrorV2(error, fallbackAction) {
    const code = error && error.code ? String(error.code) : '';
    const message = error && error.message ? String(error.message) : 'Sin detalles';

    if (code === 'auth/email-already-exists') {
        return new HttpsError('already-exists',
            'Este email ya tiene una cuenta en Firebase Auth. Eliminala primero desde Firebase Console si deseas re-crearla.');
    }

    if (code === 'auth/invalid-email') {
        return new HttpsError('invalid-argument', 'El formato del email no es valido.');
    }

    if (code === 'auth/weak-password' || code === 'auth/invalid-password') {
        return new HttpsError('invalid-argument', 'La contrasena no cumple los requisitos minimos.');
    }

    if (code === 'auth/operation-not-allowed') {
        return new HttpsError('failed-precondition',
            'El proveedor Email/Password no esta habilitado en Firebase Authentication.');
    }

    if (code === 'auth/insufficient-permission') {
        return new HttpsError('permission-denied',
            'La cuenta de servicio de Cloud Functions no tiene permisos de Firebase Auth Admin.');
    }

    return new HttpsError('internal',
        fallbackAction + ' (codigo: ' + (code || 'desconocido') + ').',
        { code: code || 'unknown', originalMessage: message });
}

// Helper: verify caller is super_admin
async function verifySuperAdminV1(context) {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Debes iniciar sesion.');
    }

    const callerDoc = await db.collection('usuarios').doc(context.auth.uid).get();

    if (!callerDoc.exists) {
        throw new functions.https.HttpsError('permission-denied', 'No tienes un perfil de administrador.');
    }

    const callerData = callerDoc.data();
    if (callerData.rol !== 'super_admin') {
        throw new functions.https.HttpsError('permission-denied', 'Solo un Super Admin puede realizar esta accion.');
    }

    return callerData;
}

async function verifySuperAdminV2(auth) {
    if (!auth || !auth.uid) {
        throw new HttpsError('unauthenticated', 'Debes iniciar sesion.');
    }

    const callerDoc = await db.collection('usuarios').doc(auth.uid).get();

    if (!callerDoc.exists) {
        throw new HttpsError('permission-denied', 'No tienes un perfil de administrador.');
    }

    const callerData = callerDoc.data();
    if (callerData.rol !== 'super_admin') {
        throw new HttpsError('permission-denied', 'Solo un Super Admin puede realizar esta accion.');
    }

    return callerData;
}

async function createManagedUserCore(data, auth, errorMapper) {
    const { nombre, email, password, rol } = data;

    if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 2) {
        throw new Error('__INVALID_NAME__');
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
        throw new Error('__INVALID_EMAIL__');
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
        throw new Error('__INVALID_PASSWORD__');
    }

    const validRoles = ['super_admin', 'editor', 'viewer'];
    if (!rol || !validRoles.includes(rol)) {
        throw new Error('__INVALID_ROLE__');
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingSnap = await db.collection('usuarios')
        .where('email', '==', normalizedEmail)
        .limit(1)
        .get();

    if (!existingSnap.empty) {
        throw new Error('__ALREADY_EXISTS_FIRESTORE__');
    }

    try {
        const userRecord = await admin.auth().createUser({
            email: normalizedEmail,
            password: password,
            displayName: nombre.trim()
        });

        await db.collection('usuarios').doc(userRecord.uid).set({
            nombre: nombre.trim(),
            email: normalizedEmail,
            rol: rol,
            estado: 'activo',
            uid: userRecord.uid,
            creadoEn: new Date().toISOString(),
            creadoPor: (auth && auth.token && auth.token.email) || auth.uid
        });

        return {
            success: true,
            uid: userRecord.uid,
            message: 'Usuario "' + nombre.trim() + '" creado exitosamente.'
        };
    } catch (error) {
        throw errorMapper(error, 'No se pudo crear el usuario');
    }
}

function throwInputErrorV1(code) {
    if (code === '__INVALID_NAME__') {
        throw new functions.https.HttpsError('invalid-argument', 'El nombre es obligatorio (minimo 2 caracteres).');
    }
    if (code === '__INVALID_EMAIL__') {
        throw new functions.https.HttpsError('invalid-argument', 'El email no es valido.');
    }
    if (code === '__INVALID_PASSWORD__') {
        throw new functions.https.HttpsError('invalid-argument', 'La contrasena debe tener al menos 6 caracteres.');
    }
    if (code === '__INVALID_ROLE__') {
        throw new functions.https.HttpsError('invalid-argument', 'Rol invalido. Debe ser: super_admin, editor o viewer.');
    }
    if (code === '__ALREADY_EXISTS_FIRESTORE__') {
        throw new functions.https.HttpsError('already-exists', 'Ya existe un usuario con ese email en el sistema.');
    }
}

function throwInputErrorV2(code) {
    if (code === '__INVALID_NAME__') {
        throw new HttpsError('invalid-argument', 'El nombre es obligatorio (minimo 2 caracteres).');
    }
    if (code === '__INVALID_EMAIL__') {
        throw new HttpsError('invalid-argument', 'El email no es valido.');
    }
    if (code === '__INVALID_PASSWORD__') {
        throw new HttpsError('invalid-argument', 'La contrasena debe tener al menos 6 caracteres.');
    }
    if (code === '__INVALID_ROLE__') {
        throw new HttpsError('invalid-argument', 'Rol invalido. Debe ser: super_admin, editor o viewer.');
    }
    if (code === '__ALREADY_EXISTS_FIRESTORE__') {
        throw new HttpsError('already-exists', 'Ya existe un usuario con ese email en el sistema.');
    }
}

// ========== CREATE MANAGED USER (v1 - legacy name) ==========
exports.createManagedUser = functions.region('us-central1').https.onCall(async (data, context) => {
    await verifySuperAdminV1(context);

    try {
        return await createManagedUserCore(data, context.auth, mapAdminAuthErrorV1);
    } catch (error) {
        if (error && error.message) {
            throwInputErrorV1(error.message);
        }
        throw error;
    }
});

// ========== CREATE MANAGED USER V2 (new callable) ==========
exports.createManagedUserV2 = onCall(callableOptionsV2, async (request) => {
    await verifySuperAdminV2(request.auth);

    try {
        return await createManagedUserCore(request.data || {}, request.auth, mapAdminAuthErrorV2);
    } catch (error) {
        if (error && error.message) {
            throwInputErrorV2(error.message);
        }
        throw error;
    }
});

async function deleteManagedUserCore(data, auth, errorMapper, failedPreconditionFactory) {
    const { uid } = data;

    if (!uid || typeof uid !== 'string') {
        throw new Error('__INVALID_UID__');
    }

    if (uid === auth.uid) {
        throw failedPreconditionFactory('No puedes eliminar tu propia cuenta.');
    }

    const userDoc = await db.collection('usuarios').doc(uid).get();
    if (userDoc.exists) {
        await db.collection('usuarios').doc(uid).delete();
    }

    try {
        await admin.auth().deleteUser(uid);
    } catch (error) {
        if (error.code !== 'auth/user-not-found') {
            throw errorMapper(error, 'El perfil se elimino, pero no se pudo eliminar la cuenta de Authentication');
        }
    }

    return {
        success: true,
        message: 'Usuario eliminado completamente (Auth + Firestore).'
    };
}

exports.deleteManagedUser = functions.region('us-central1').https.onCall(async (data, context) => {
    await verifySuperAdminV1(context);
    try {
        return await deleteManagedUserCore(
            data,
            context.auth,
            mapAdminAuthErrorV1,
            (message) => new functions.https.HttpsError('failed-precondition', message)
        );
    } catch (error) {
        if (error && error.message === '__INVALID_UID__') {
            throw new functions.https.HttpsError('invalid-argument', 'UID del usuario es obligatorio.');
        }
        throw error;
    }
});

exports.deleteManagedUserV2 = onCall(callableOptionsV2, async (request) => {
    await verifySuperAdminV2(request.auth);
    try {
        return await deleteManagedUserCore(
            request.data || {},
            request.auth,
            mapAdminAuthErrorV2,
            (message) => new HttpsError('failed-precondition', message)
        );
    } catch (error) {
        if (error && error.message === '__INVALID_UID__') {
            throw new HttpsError('invalid-argument', 'UID del usuario es obligatorio.');
        }
        throw error;
    }
});

async function updateUserRoleCore(data, auth, invalidArgumentFactory, notFoundFactory) {
    const { uid, nombre, rol } = data;

    if (!uid || typeof uid !== 'string') {
        throw invalidArgumentFactory('UID del usuario es obligatorio.');
    }

    const validRoles = ['super_admin', 'editor', 'viewer'];
    if (!rol || !validRoles.includes(rol)) {
        throw invalidArgumentFactory('Rol invalido.');
    }

    const userDoc = await db.collection('usuarios').doc(uid).get();
    if (!userDoc.exists) {
        throw notFoundFactory('Usuario no encontrado.');
    }

    const updateData = {
        rol: rol,
        actualizadoEn: new Date().toISOString(),
        actualizadoPor: (auth && auth.token && auth.token.email) || auth.uid
    };

    if (nombre && typeof nombre === 'string') {
        updateData.nombre = nombre.trim();
    }

    await db.collection('usuarios').doc(uid).update(updateData);

    return {
        success: true,
        message: 'Usuario actualizado.'
    };
}

exports.updateUserRole = functions.region('us-central1').https.onCall(async (data, context) => {
    await verifySuperAdminV1(context);
    return updateUserRoleCore(
        data,
        context.auth,
        (message) => new functions.https.HttpsError('invalid-argument', message),
        (message) => new functions.https.HttpsError('not-found', message)
    );
});

exports.updateUserRoleV2 = onCall(callableOptionsV2, async (request) => {
    await verifySuperAdminV2(request.auth);
    return updateUserRoleCore(
        request.data || {},
        request.auth,
        (message) => new HttpsError('invalid-argument', message),
        (message) => new HttpsError('not-found', message)
    );
});

// Public resilient catalog endpoint (fallback when Firestore web rules block anonymous reads)
exports.getPublicCatalog = functions.region('us-central1').https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const [vehiclesSnap, brandsSnap] = await Promise.all([
            db.collection('vehiculos').get(),
            db.collection('marcas').get()
        ]);

        const vehicles = vehiclesSnap.docs.map((doc) => {
            const data = doc.data() || {};

            // Prevent leakage of admin/internal business fields on public endpoint
            delete data.concesionario;
            delete data.comision;
            delete data.comisionPorcentaje;
            delete data.motivoVenta;
            delete data.canalVenta;
            delete data.observacionesInternas;
            delete data.notasInternas;

            if (!data.id) {
                const parsedId = parseInt(doc.id, 10);
                data.id = Number.isNaN(parsedId) ? doc.id : parsedId;
            }

            return data;
        });

        const brands = brandsSnap.docs.map((doc) => {
            const data = doc.data() || {};
            if (!data.id) {
                data.id = doc.id;
            }
            return data;
        });

        res.status(200).json({
            source: 'cloud-function',
            generatedAt: new Date().toISOString(),
            vehicles,
            brands
        });
    } catch (error) {
        console.error('getPublicCatalog failed:', error);
        res.status(500).json({
            error: 'catalog_unavailable',
            message: 'No se pudo cargar el catalogo publico en este momento.'
        });
    }
});
