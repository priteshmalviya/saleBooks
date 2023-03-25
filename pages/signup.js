import Head from "next/head";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { read } from "../firebase/firestore/read";
import { addUser } from "../firebase/firestore/write";

const signup = () => {
  
  /*const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpass, setConfirm] = useState();*/

  let name="";
  let email="";
  let password="";
  let confirmpass="";

  const handlerChange = (e) => {
    if (e.target.name == "name") {
      name=e.target.value;
    } else if (e.target.name == "email") {
      email=e.target.value;
    } else if (e.target.name == "password") {
      password=e.target.value;
    } else if (e.target.name == "confirm_password") {
      confirmpass=e.target.value;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const img="https://firebasestorage.googleapis.com/v0/b/destination-discoveries.appspot.com/o/image%2Fdefout%20image.png?alt=media&token=9bbb2048-6156-4485-9bf8-746b635b7d17";

    if (password == confirmpass) {
      const data = { "displayName": name,"uid":email, "email": email, password: password,"photoUrl":img};

      const exist = await read(data.email);
      //console.log("exits: ", exist);
      if (!exist) {
        const value = addUser(data);
        //console.log("valu: ", value);
        if (value) {/*
          setName("");
          setEmail("");
          setPassword("");*/
          showtoast(true,"Signup Successfull");
          //router.push("/login");
          document.getElementById('loginLink').click();
        }else{
            
        showtoast(false,"Some Error Accur");
        }
      }else {/*
        setName("");
        setEmail("");
        setPassword("");
        setConfirm("");*/
        showtoast(false,"User Already Exist");
      }
    } else {
      showtoast(false,"Password And Confirmpass Does Not Match")
    }
  };

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
        <title>Pustakalay | SignUp</title>
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

      <body class="bg-gray-100">
        <div class="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
          <h1 class="text-2xl font-medium text-center mb-5">Signup</h1>
          <form onSubmit={handleSubmit} method="Post">
            <div class="mb-4">
              <label for="name" class="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                onChange={handlerChange}
                type="text"
                id="name"
                name="name"
                class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                onChange={handlerChange}
                type="email"
                id="email"
                name="email"
                class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="password"
                class="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                onChange={handlerChange}
                type="password"
                id="password"
                name="password"
                class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="confirm_password"
                class="block text-gray-700 font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                onChange={handlerChange}
                type="password"
                id="confirm_password"
                name="confirm_password"
                class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div class="flex justify-between items-center mb-4">
              <button
                onSubmit={handleSubmit}
                type="submit"
                class="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Signup
              </button>
              <Link id='loginLink'
              href="/login">
              <button
                type="button"
                class="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button></Link>
            </div>
          </form>
        </div>
      </body>
    </>
  );
};

export default signup;