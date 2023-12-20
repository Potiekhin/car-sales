// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "car-sales-47cb3.firebaseapp.com",
  projectId: "car-sales-47cb3",
  storageBucket: "car-sales-47cb3.appspot.com",
  messagingSenderId: "397447607151",
  appId: "1:397447607151:web:bc3e05268761cf7e1d2e9a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);