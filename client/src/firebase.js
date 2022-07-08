// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "game-7da42.firebaseapp.com",
  projectId: "game-7da42",
  storageBucket: "game-7da42.appspot.com",
  messagingSenderId: "1003196212575",
  appId: "1:1003196212575:web:3a90aed82634f2281002ea",
  measurementId: "G-11WK6XJJZW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
const db = getFirestore(app);

// Analytics
// const analytics = getAnalytics(app);

// Storage
const storage = getStorage(app);

export { db, storage };
