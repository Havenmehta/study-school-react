import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAVG0rIrLqxqLVGCNoJNdkg1eOvKUW6-E0",
  authDomain: "the-study-school.firebaseapp.com",
  projectId: "the-study-school",
  storageBucket: "the-study-school.firebasestorage.app",
  messagingSenderId: "687326686384",
  appId: "1:687326686384:web:2d28d6b31e751770171f75",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);     // database
export const auth = getAuth(app);        // login/admin
export const storage = getStorage(app);  // photos

