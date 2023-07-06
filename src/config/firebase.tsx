import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCVqMl2wRunTPiho_fzY8E6O53uy9jQeYQ",
  authDomain: "roominders.firebaseapp.com",
  projectId: "roominders",
  storageBucket: "roominders.appspot.com",
  messagingSenderId: "530441724623",
  appId: "1:530441724623:web:2b6f6b561b58fbc554cdba",
  measurementId: "G-MNGDGZ9KDJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
// const analytics = getAnalytics(app);