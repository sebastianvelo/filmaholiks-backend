import * as admin from 'firebase-admin';
import initializeFirebaseAdmin from './initializeFirebaseAdmin';

initializeFirebaseAdmin();

export default function createCollection<T = any>(path: string): admin.firestore.CollectionReference<T> {
    return admin.firestore().collection(path) as admin.firestore.CollectionReference<T>;
}