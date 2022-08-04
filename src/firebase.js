import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAKpYg2HzG56ldFE2cg3F9bXa0LqofnBc0",
    authDomain: "prueba-4843d.firebaseapp.com",
    projectId: "prueba-4843d",
    storageBucket: "prueba-4843d.appspot.com",
    messagingSenderId: "292156938259",
    appId: "1:292156938259:web:90ea1931997c860a4147e6",
    measurementId: "G-QFT407JDZ4"
  };
  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


