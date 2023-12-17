// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "bitcat-c40f3.firebaseapp.com",
    projectId: "bitcat-c40f3",
    storageBucket: "bitcat-c40f3.appspot.com",
    messagingSenderId: "389789281319",
    appId: "1:389789281319:web:ef2f5b8a01020660003202"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);