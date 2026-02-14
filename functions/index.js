const { onCall, HttpsError } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();
const callableOptionsV2 = {
    region: 'us-central1',
    invoker: 'public',
    cors: true
};

function mapAuthError(error, fallbackAction) {
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

async function verifySuperAdmin(auth) {
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

function throwInputError(code) {
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

async function createManagedUserCore(data, auth) {
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
        throw mapAuthError(error, 'No se pudo crear el usuario');
    }
}

// ========== CREATE MANAGED USER ==========
exports.createManagedUserV2 = onCall(callableOptionsV2, async (request) => {
    await verifySuperAdmin(request.auth);

    try {
        return await createManagedUserCore(request.data || {}, request.auth);
    } catch (error) {
        if (error && error.message) {
            throwInputError(error.message);
        }
        throw error;
    }
});

// ========== DELETE MANAGED USER ==========
exports.deleteManagedUserV2 = onCall(callableOptionsV2, async (request) => {
    await verifySuperAdmin(request.auth);

    const { uid } = request.data || {};

    if (!uid || typeof uid !== 'string') {
        throw new HttpsError('invalid-argument', 'UID del usuario es obligatorio.');
    }

    if (uid === request.auth.uid) {
        throw new HttpsError('failed-precondition', 'No puedes eliminar tu propia cuenta.');
    }

    const userDoc = await db.collection('usuarios').doc(uid).get();
    if (userDoc.exists) {
        await db.collection('usuarios').doc(uid).delete();
    }

    try {
        await admin.auth().deleteUser(uid);
    } catch (error) {
        if (error.code !== 'auth/user-not-found') {
            throw mapAuthError(error, 'El perfil se elimino, pero no se pudo eliminar la cuenta de Authentication');
        }
    }

    return {
        success: true,
        message: 'Usuario eliminado completamente (Auth + Firestore).'
    };
});

// ========== UPDATE USER ROLE ==========
exports.updateUserRoleV2 = onCall(callableOptionsV2, async (request) => {
    await verifySuperAdmin(request.auth);

    const { uid, nombre, rol } = request.data || {};

    if (!uid || typeof uid !== 'string') {
        throw new HttpsError('invalid-argument', 'UID del usuario es obligatorio.');
    }

    const validRoles = ['super_admin', 'editor', 'viewer'];
    if (!rol || !validRoles.includes(rol)) {
        throw new HttpsError('invalid-argument', 'Rol invalido.');
    }

    const userDoc = await db.collection('usuarios').doc(uid).get();
    if (!userDoc.exists) {
        throw new HttpsError('not-found', 'Usuario no encontrado.');
    }

    const updateData = {
        rol: rol,
        actualizadoEn: new Date().toISOString(),
        actualizadoPor: (request.auth && request.auth.token && request.auth.token.email) || request.auth.uid
    };

    if (nombre && typeof nombre === 'string') {
        updateData.nombre = nombre.trim();
    }

    await db.collection('usuarios').doc(uid).update(updateData);

    return {
        success: true,
        message: 'Usuario actualizado.'
    };
});
