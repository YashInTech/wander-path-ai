// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArg8MzPFT-01w7a39tb7SCgQQTWGpaXxI",
  authDomain: "wanderpathai-6f8c5.firebaseapp.com",
  projectId: "wanderpathai-6f8c5",
  storageBucket: "wanderpathai-6f8c5.firebasestorage.app",
  messagingSenderId: "679462390240",
  appId: "1:679462390240:web:ba4ece6f86a4335d6b4385",
  measurementId: "G-6HKXRFHVK6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);