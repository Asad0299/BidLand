// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAB2hnyYPuU9MeJtuqjdd8Pi3cBLuoIHMM",
  authDomain: "bidland-7717d.firebaseapp.com",
  projectId: "bidland-7717d",
  storageBucket: "bidland-7717d.appspot.com",
  messagingSenderId: "1056364502460",
  appId: "1:1056364502460:web:f954cdc0c24a2d36d51fb9",
  measurementId: "G-M2DFBERGEJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 const db = getFirestore(app);
 const storage = getStorage(app);

 export { db, storage };
