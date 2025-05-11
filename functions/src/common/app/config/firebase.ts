import * as admin from 'firebase-admin';

const initializeFirebaseAdmin = () => {
    if (!admin.apps.length) {
        admin.initializeApp();
        console.log('Firebase Admin initialized with default credentials');
    }
};

export { initializeFirebaseAdmin };