import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDiOO6xMjKXK6mM76djo8qjJdNESxT8i2E",
    authDomain: "qr-billing-system.firebaseapp.com",
    projectId: "qr-billing-system",
    storageBucket: "qr-billing-system.firebasestorage.app",
    messagingSenderId: "981741141050",
    appId: "1:981741141050:web:b28e2f1663fe5087fbc903",
    measurementId: "G-4JCGB3F8YE"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export  { db, storage };
