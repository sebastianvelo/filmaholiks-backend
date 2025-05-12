import { collection, CollectionReference, DocumentData } from "firebase/firestore"
import { firestore } from "./Firestore"

const createCollection = <T = DocumentData>(collectionName: string) =>
    collection(firestore, collectionName) as CollectionReference<T>;

export default createCollection;