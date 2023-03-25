import {initializeApp} from "firebase/app"; 
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAf-FE8WWtYs2_h7Waa85Qa762Zp-u18Vc",
  authDomain: "destination-discoveries.firebaseapp.com",
  projectId: "destination-discoveries",
  storageBucket: "destination-discoveries.appspot.com",
  messagingSenderId: "125407357443",
  appId: "1:125407357443:web:5588c5143f6198369e7c36"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);