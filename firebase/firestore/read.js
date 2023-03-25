import { doc, getDoc } from "firebase/firestore";
import {db} from "../firebaseinit/firebase";

export async function read(id){
    const docRef = doc(db, "myUsers", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) { 
        return docSnap.data();
    } else {
        return false; 
    }
}