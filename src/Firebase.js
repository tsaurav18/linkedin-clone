// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAbMPgX4EJ7NqbMbp3V0---lQov-TX8LFc",
  authDomain: "linkedin-clone-6734b.firebaseapp.com",
  projectId: "linkedin-clone-6734b",
  storageBucket: "linkedin-clone-6734b.appspot.com",
  messagingSenderId: "380874408024",
  appId: "1:380874408024:web:bb6ddde829873782998a2d",
  measurementId: "G-SRKFFT0MHE",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };
