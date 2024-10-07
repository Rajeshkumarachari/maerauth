// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-9e866.firebaseapp.com",
  projectId: "mern-auth-9e866",
  storageBucket: "mern-auth-9e866.appspot.com",
  messagingSenderId: "1061717226344",
  appId: "1:1061717226344:web:212a4fde6ade96000e9cdd",
};

// Initialize  Firebase
export const app = initializeApp(firebaseConfig);
