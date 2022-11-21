import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdzc40RxohLjWA_zzet7Oq_T53KJq92zY",
  authDomain: "crwn-clothing-db-ed0c5.firebaseapp.com",
  projectId: "crwn-clothing-db-ed0c5",
  storageBucket: "crwn-clothing-db-ed0c5.appspot.com",
  messagingSenderId: "676503434980",
  appId: "1:676503434980:web:bfa58e8e98e9ed260cdef1",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// For google signin
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// To Export google authentication
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
