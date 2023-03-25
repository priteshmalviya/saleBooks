import Head from 'next/head'
import { auth } from "../firebase/firebaseinit/firebase";
import {signInWithPopup, GoogleAuthProvider,FacebookAuthProvider} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { write } from "../firebase/firestore/write"
import { read } from "../firebase/firestore/read"
import {BsGoogle} from "react-icons/bs"
import {FaFacebookF} from "react-icons/fa"
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {

  
  const router = useRouter();
  const [user,setuser]=useAuthState(auth);
  const googleauth=new GoogleAuthProvider();
  const facebookauth=new FacebookAuthProvider();

  let id;

  if(typeof localStorage !== 'undefined'){
    id=localStorage.getItem('id');
  }

  if(id){
    router.push("/");
  }
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handlerChange = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      const data = { email: email, password: password };
      //console.log(data);
      const exist = await read(data.email);
      if (exist) {
        if(exist.password==password){
          setEmail("");
          setPassword("");
          localStorage.setItem("id",data.email);
          localStorage.setItem("name",exist.displayName);
          localStorage.setItem("url",exist.photoUrl);
          showtoast(true,"LogIn Successfull");
          router.push("/");
        }else{
          setEmail("");
          setPassword("");
          showtoast(false,"Wrong PassWord");
        }
      }else {
        setEmail("");
        setPassword("");
        showtoast(false,"User Does Not Exist");
      }
  };
  
  const loginWithG = async()=>{
    const result=await signInWithPopup(auth,googleauth);
  }

  const loginWithFb = async()=>{
    const result=await signInWithPopup(auth,facebookauth);
  }

  useEffect(()=>{
  },[user]);

  if(user){
    localStorage.setItem('id',user.uid);
    localStorage.setItem('name',user.displayName);
    localStorage.setItem("url",user.photoURL);
    write(user);
  }

  function showtoast(flag,msg){
    if(flag){
    toast.success(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }else{
    toast.error(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  }

  return (
    <>
      <Head>
        <title>Pustakalay | Login</title>
        <meta name="description" content="The web Squad"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

<body className="bg-gray-100 ">
    <div className="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
        <h1 className="text-2xl font-medium text-center mb-5">Login</h1>
        <form onSubmit={handleSubmit} method="Post">
            <div className="mb-4">
                <label for="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input value={email} onChange={handlerChange} type="email" id="email" name="email" className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" required/>
            </div>
            <div className="mb-4">
                <label for="password" className="block text-gray-700 font-medium mb-2">Password</label>
                <input value={password} onChange={handlerChange} type="password" id="password" name="password" className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" required/>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
            <button onSubmit={handleSubmit} type="submit" className=" bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
            <button type='button' onClick={()=>router.push("/signup")}  className="ml-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Signup</button></div>
                <a href="#"  className="text-indigo-500 hover:text-indigo-600 font-medium">Forgot password?</a>
            </div>
        </form>
            <div className="mb-4">
                <span className="block text-gray-700 font-medium mb-2">Or sign in with:</span>
                <button onClick={loginWithG} type="button" className="flex items-center justify-center w-full px-4 py-2 text-white rounded-md bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-2">
                    </svg><h3 classNameName='mr-3'><BsGoogle /></h3>
                    Sign in with Google
                </button>

                <button type="button" className="mt-4 flex items-center justify-center w-full px-4 py-2 text-white rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-2">
                    </svg><h3 classNameName='mr-3'><FaFacebookF /></h3>
                    Sign in with Facebook
                </button>

            </div>
            
    </div>
</body>

    </>
  )
}
