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

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdzc40RxohLjWA_zzet7Oq_T53KJq92zY",
  authDomain: "crwn-clothing-db-ed0c5.firebaseapp.com",
  projectId: "crwn-clothing-db-ed0c5",
  storageBucket: "crwn-clothing-db-ed0c5.appspot.com",
  messagingSenderId: "676503434980",
  appId: "1:676503434980:web:bfa58e8e98e9ed260cdef1",
};

// Initialize Firebase
initializeApp(firebaseConfig);

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

// To add objects of data to database
const addCollectionAndDocuments = async (collectionKey, objects) => {
  // To create products collection if there's no any
  const collectionRef = collection(db, collectionKey);
  // To make a batch of operations into firebase
  const batch = writeBatch(db);

  objects.forEach((obj) => {
    // To create every document in the database
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    // To set each object into its place into its document
    batch.set(docRef, obj);
  });

  // To start batching
  await batch.commit();
};

// To get objects that we added to database
const getCollectionAndDocuments = async () => {
  // To create products collection if there's no any
  const collectionRef = collection(db, "categories");
  // To make a query to get all objects
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, doc) => {
    const { title, items } = doc.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export {
  auth,
  signInWithGooglePopup,
  db,
  createUsers,
  createAuthUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
  signOutUser,
  onAuthStateChangedListener,
  addCollectionAndDocuments,
  getCollectionAndDocuments,
};
