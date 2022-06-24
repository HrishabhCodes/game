// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "game-5ea75.firebaseapp.com",
  projectId: "game-5ea75",
  storageBucket: "game-5ea75.appspot.com",
  messagingSenderId: "274615264281",
  appId: "1:274615264281:web:d64bc392da33545e3e3688",
  measurementId: "G-PG272CKT2B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
const db = getFirestore();

const analytics = getAnalytics(app);

export default db;
