const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();
const httpsCallable = functions
    .region('us-central1')
    .runWith({ ingressSettings: 'ALLOW_ALL' })
    .https;

function mapAdminAuthError(error, fallbackAction) {
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

function mapAdminAuthError(error, fallbackAction) {
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

// Helper: verify caller is super_admin
async function verifySuperAdmin(context) {
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

// ========== CREATE MANAGED USER ==========
// Creates a user in Firebase Auth + Firestore profile
// Only callable by super_admin
exports.createManagedUser = httpsCallable.onCall(async (data, context) => {
    // Verify caller is super_admin
    const callerProfile = await verifySuperAdmin(context);

    // Validate input
    const { nombre, email, password, rol } = data;

    if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 2) {
        throw new functions.https.HttpsError('invalid-argument', 'El nombre es obligatorio (minimo 2 caracteres).');
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
        throw new functions.https.HttpsError('invalid-argument', 'El email no es valido.');
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
        throw new functions.https.HttpsError('invalid-argument', 'La contrasena debe tener al menos 6 caracteres.');
    }

    const validRoles = ['super_admin', 'editor', 'viewer'];
    if (!rol || !validRoles.includes(rol)) {
        throw new functions.https.HttpsError('invalid-argument', 'Rol invalido. Debe ser: super_admin, editor o viewer.');
    }

    // Check if email already exists in Firestore
    const existingSnap = await db.collection('usuarios')
        .where('email', '==', email.trim().toLowerCase())
        .limit(1)
        .get();

    if (!existingSnap.empty) {
        throw new functions.https.HttpsError('already-exists', 'Ya existe un usuario con ese email en el sistema.');
    }

    try {
        // Step 1: Create Firebase Auth account
        const userRecord = await admin.auth().createUser({
            email: email.trim().toLowerCase(),
            password: password,
            displayName: nombre.trim()
        });

        // Step 2: Create Firestore profile
        await db.collection('usuarios').doc(userRecord.uid).set({
            nombre: nombre.trim(),
            email: email.trim().toLowerCase(),
            rol: rol,
            estado: 'activo',
            uid: userRecord.uid,
            creadoEn: new Date().toISOString(),
            creadoPor: context.auth.token.email || context.auth.uid
        });

        return {
            success: true,
            uid: userRecord.uid,
            message: 'Usuario "' + nombre.trim() + '" creado exitosamente.'
        };

    } catch (error) {
        console.error('Error creating user:', error);
        throw mapAdminAuthError(error, 'No se pudo crear el usuario');
    }
});

// ========== DELETE MANAGED USER ==========
// Deletes user from Firebase Auth + Firestore
// Only callable by super_admin
exports.deleteManagedUser = httpsCallable.onCall(async (data, context) => {
    // Verify caller is super_admin
    await verifySuperAdmin(context);

    const { uid } = data;

    if (!uid || typeof uid !== 'string') {
        throw new functions.https.HttpsError('invalid-argument', 'UID del usuario es obligatorio.');
    }

    // Prevent self-deletion
    if (uid === context.auth.uid) {
        throw new functions.https.HttpsError('failed-precondition', 'No puedes eliminar tu propia cuenta.');
    }

    // Step 1: Delete from Firestore
    const userDoc = await db.collection('usuarios').doc(uid).get();
    if (userDoc.exists) {
        await db.collection('usuarios').doc(uid).delete();
    }

    // Step 2: Delete from Firebase Auth
    try {
        await admin.auth().deleteUser(uid);
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            // User doesn't exist in Auth - that's OK, Firestore was already cleaned
            console.log('User not found in Auth (already deleted or never existed):', uid);
        } else {
            console.error('Error deleting Auth user:', error);
            throw mapAdminAuthError(error, 'El perfil se elimino, pero no se pudo eliminar la cuenta de Authentication');
        }
    }

    return {
        success: true,
        message: 'Usuario eliminado completamente (Auth + Firestore).'
    };
});

// ========== UPDATE USER ROLE ==========
// Updates a user's role in Firestore
// Only callable by super_admin
exports.updateUserRole = httpsCallable.onCall(async (data, context) => {
    await verifySuperAdmin(context);

    const { uid, nombre, rol } = data;

    if (!uid || typeof uid !== 'string') {
        throw new functions.https.HttpsError('invalid-argument', 'UID del usuario es obligatorio.');
    }

    const validRoles = ['super_admin', 'editor', 'viewer'];
    if (!rol || !validRoles.includes(rol)) {
        throw new functions.https.HttpsError('invalid-argument', 'Rol invalido.');
    }

    const userDoc = await db.collection('usuarios').doc(uid).get();
    if (!userDoc.exists) {
        throw new functions.https.HttpsError('not-found', 'Usuario no encontrado.');
    }

    const updateData = {
        rol: rol,
        actualizadoEn: new Date().toISOString(),
        actualizadoPor: context.auth.token.email || context.auth.uid
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
