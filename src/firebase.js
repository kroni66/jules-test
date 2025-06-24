const firebaseConfig = {
  apiKey: "AIzaSyBzq5JoZT3rfyZTsESxpGhEbyEHr2ehW_Q",
  authDomain: "emptyproject-2b4c4.firebaseapp.com",
  projectId: "emptyproject-2b4c4",
  storageBucket: "emptyproject-2b4c4.firebasestorage.app",
  messagingSenderId: "1000984428644",
  appId: "1:1000984428644:web:3abffc7e1f4d4851415f71",
  measurementId: "G-0W91H6Y6C7"
};

import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };