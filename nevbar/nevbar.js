import React from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase/firebaseinit/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const OtherLinks = () => {
  const router = useRouter();
  //const id = "pm"; //localStorage.getItem("id");

  
  const [user,setuser]=useAuthState(auth);

  function logout() {
    auth.signOut();
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("url");
    router.push("/");
  }

  function toggelMenu() {
    var element = document.getElementById("menu");
    if (element.classList.contains("hidden")) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  }

  return (
    <>
      <div class="hidden md:block">
        <div class="ml-10 flex items-baseline space-x-4">
          {user ? (
            <>
              <a
                onClick={() => router.push("/")}
                class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
              >
                Home
              </a>
              <a
                onClick={() => router.push("/addProduct")}
                class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
              >
                Sale Books
              </a>
              <a
                onClick={logout}
                class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
              >
                LogOut
              </a>
            </>
          ) : (
            <>
              <a
                onClick={() => router.push("/")}
                class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
              >
                Home
              </a>
              <a
                onClick={() => router.push("/login")}
                class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
              >
                Login
              </a>
            </>
          )}
        </div>
      </div>
      <div class="-mr-2 flex md:hidden">
        <button
          onClick={toggelMenu}
          type="button"
          class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
          aria-expanded="false"
        >
          <svg
            class="h-6 w-6"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
};

export const MenuNev = () => {
  const router = useRouter();
  const id = "priteshmalviya32@gmail.com";

  function logout() {
    auth.signOut();
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("url");
    router.push("/");
  }

  return (
    <>
      <div id="menu" class="hidden md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {user ? (
            <>
              <a
                onClick={() => router.push("/")}
                class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
              >
                Home
              </a>
              <a
                onClick={() => router.push("/addProduct")}
                class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
              >
                Sale Books
              </a>
              <a
                onClick={logout}
                class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
              >
                LogOut
              </a>
            </>
          ) : (
            <>
              <a
                onClick={() => router.push("/")}
                class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
              >
                Home
              </a>
              <a
                onClick={() => router.push("/login")}
                class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
              >
                Login
              </a>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export const LogoOnNev = () => {
  const router = useRouter();
  return (
    <>
      <div class="flex-shrink-0">
        <a
          onClick={() => router.push("/")}
          class="hidden cursor-pointer text-white text-xl font-bold tracking-wide md:block"
        >
          My Ecommerce
        </a>
        <a
          onClick={() => router.push("/")}
          class="block cursor-pointer text-white text-xl font-bold tracking-wide md:hidden"
        >
          EC
        </a>
      </div>
    </>
  );
};

export const NevBar = () =>{

  
  const [user,setuser]=useAuthState(auth);
  const router = useRouter();
  let id,name,imgurl;

  if(typeof localStorage !== 'undefined'){
    id=localStorage.getItem('id');
    name=localStorage.getItem('name');
    imgurl=localStorage.getItem('url');
  }

  function logout() {
    auth.signOut();
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("url");
    router.push("/");
  }

  
  function toggelMenu() {
    var element = document.getElementById("menu");
    if (element.classList.contains("hidden")) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  }

  return(<>
    <nav class="bg-gray-900">
      <div class=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
  
        <>
        <div class="flex-shrink-0">
          <a
            onClick={() => router.push("/")}
            class="hidden cursor-pointer text-white text-xl font-bold tracking-wide md:block"
          >
            My Ecommerce
          </a>
          <a
            onClick={() => router.push("/")}
            class="block cursor-pointer text-white text-xl font-bold tracking-wide md:hidden"
          >
            EC
          </a>
        </div>
      </>
  
      <>
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            {id ? (
              <>
                <a
                  onClick={() => router.push("/")}
                  class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Home
                </a>
                <a
                  onClick={() => router.push("/addProduct")}
                  class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Sale Books
                </a>
                <a
                  onClick={logout}
                  class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  LogOut
                </a>
              </>
            ) : (
              <>
                <a
                  onClick={() => router.push("/")}
                  class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Home
                </a>
                <a
                  onClick={() => router.push("/login")}
                  class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Login
                </a>
              </>
            )}
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <button
            onClick={toggelMenu}
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
            aria-expanded="false"
          >
            <svg
              class="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </>
  
          
        </div>
      </div>
  
      <>
        <div id="menu" class="hidden md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {id ? (
              <>
                <a
                  onClick={() => router.push("/")}
                  class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Home
                </a>
                <a
                  onClick={() => router.push("/addProduct")}
                  class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Sale Books
                </a>
                <a
                  onClick={logout}
                  class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  LogOut
                </a>
              </>
            ) : (
              <>
                <a
                  onClick={() => router.push("/")}
                  class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Home
                </a>
                <a
                  onClick={() => router.push("/login")}
                  class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Login
                </a>
              </>
            )}
          </div>
        </div>
      </>
      
    </nav>
  </>);
}