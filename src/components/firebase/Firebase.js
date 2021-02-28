// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"
const firebaseConfig = {
  apiKey: "AIzaSyB725dtsSdJliBE7La9XvjsDY4pPjm7rzo",
  authDomain: "whatsapp-9eccd.firebaseapp.com",
  projectId: "whatsapp-9eccd",
  storageBucket: "whatsapp-9eccd.appspot.com",
  messagingSenderId: "355004961944",
  appId: "1:355004961944:web:ed8347daefe4e229f3eced",
  measurementId: "G-MJZRW92NX8"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export {auth,provider};
export default db;