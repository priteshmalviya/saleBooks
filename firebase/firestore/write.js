import {db} from "../firebaseinit/firebase";
import { doc, setDoc } from "firebase/firestore"; 
import { useRouter } from 'next/router';

export function write(user){
    setDoc(doc(db, "users", user.uid),user.reloadUserInfo);
    sendToHome();
}

export function addProduct(productdata){
  setDoc(doc(db, "products",productdata.ProductName),productdata);
}

export function addUser(user){
  setDoc(doc(db, "myUsers", user.email),user);
  return true;
}

export function sendToHome(){
  const router = useRouter();
  router.push("/");
}