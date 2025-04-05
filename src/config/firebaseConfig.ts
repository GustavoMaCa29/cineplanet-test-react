import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBS2RynMJhAS61FSB3rXZlMcP_R7aesUs4",
  authDomain: "cineplanet-app.firebaseapp.com",
  projectId: "cineplanet-app",
  storageBucket: "cineplanet-app.firebasestorage.app",
  messagingSenderId: "361817682760",
  appId: "1:361817682760:web:74f03c51cae8d1b1db397d",
  measurementId: "G-NZQ8EVP0LC"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged  };