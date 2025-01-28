// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// TODO: Hide API key
const firebaseConfig = {
  apiKey: "AIzaSyDjK7WfA3T_l7n-tn30Xel0G_OftmAkCy4",
  authDomain: "doctor-app-e6829.firebaseapp.com",
  projectId: "doctor-app-e6829",
  storageBucket: "doctor-app-e6829.firebasestorage.app",
  messagingSenderId: "136585722947",
  appId: "1:136585722947:web:450fd5d63354acff66e8f6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);