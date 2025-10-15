// This file is machine-generated - edit at your own risk!

// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add your own Firebase configuration from the Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyBk9QjT0XYJPYFOMMybb40cRKW4f9qo90o",
  authDomain: "test-700a7.firebaseapp.com",
  projectId: "test-700a7",
  storageBucket: "test-700a7.firebasestorage.app",
  messagingSenderId: "641516618242",
  appId: "1:641516618242:web:e3c475a5630fd736e91d1b"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
