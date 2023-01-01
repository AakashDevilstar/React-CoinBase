import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7RK4iwDIhY0FWFSFzr4ok9lBF9JCY2Yw",
  authDomain: "helpus-d5f5a.firebaseapp.com",
  projectId: "helpus-d5f5a",
  storageBucket: "helpus-d5f5a.appspot.com",
  messagingSenderId: "856771898491",
  appId: "1:856771898491:web:282c2335e12c30f3a4c6de"
};

export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore();