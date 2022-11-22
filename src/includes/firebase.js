import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// To Export google authentication
const auth = getAuth();
const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// To create collection for users in firestore
const db = getFirestore();
const createUsers = async (userAuth) => {
  if (!userAuth) return;
  // This Ref is the collection that is created
  const userDocRef = doc(db, "users", userAuth.uid);

  // Snapshot for the document of the user that should be recorded in firestore
  const userSnapShot = await getDoc(userDocRef);

  // If it doesn't exist create it
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (err) {
      console.log("new error" + err.message);
    }
  }

  return userDocRef;
};

// To create user with email and password only
const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// To login with email and password
const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// To sign out user from firebase
const signOutUser = async () => {
  await signOut(auth);
};

// To use observable for tracking if the user is signed in or out
const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export {
  auth,
  signInWithGooglePopup,
  db,
  createUsers,
  createAuthUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
  signOutUser,
  onAuthStateChangedListener,
};
