// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6OgfUN-JkpoO2_AdUUy0H71v26EGGS9o",
  authDomain: "eatupdb-b32a5.firebaseapp.com",
  projectId: "eatupdb-b32a5",
  storageBucket: "eatupdb-b32a5.appspot.com",
  messagingSenderId: "1060022749658",
  appId: "1:1060022749658:web:37e91b46338db4f47418e3",
  measurementId: "G-BMKE4KKJ8F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Initialize Firestore
const firestore = getFirestore(app);

export { auth, provider, firestore, analytics };