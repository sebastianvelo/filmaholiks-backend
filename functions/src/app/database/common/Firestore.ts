import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = {
    apiKey: "AIzaSyCSrm8mvach9V8m4f2nDjb05U8DZygxZ4E",
    authDomain: "filmaholiks.firebaseapp.com",
    projectId: "filmaholiks",
    storageBucket: "filmaholiks.appspot.com",
    messagingSenderId: "46981723350",
    appId: "1:46981723350:web:4453ccf6c4606b8ee48577",
    measurementId: "G-NGD1PVR7N2"
};

export const app = initializeApp(config);

export const firestore = getFirestore(app);
