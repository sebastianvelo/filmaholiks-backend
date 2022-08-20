import { collection, CollectionReference, DocumentData } from "firebase/firestore"
import { firestore } from "./Firestore"

// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(collectionName: string) =>
    collection(firestore, collectionName) as CollectionReference<T>;

export default createCollection;