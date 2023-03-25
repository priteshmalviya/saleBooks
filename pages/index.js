import { collection, getDocs } from "firebase/firestore";
import { db,auth } from "../firebase/firebaseinit/firebase";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";

const Home = ({ Products }) => {

  
  const [user,setuser]=useAuthState(auth);

  const [search, setSearch] = useState("");
  const handlerChange = (e) => {
    setSearch(e.target.value);
    matched=[]
  };

  function logout(){
    auth.signOut();
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("url");
    router.push('/')
  }
  
  const router = useRouter();

  let id,name,imgurl;

  if(typeof localStorage !== 'undefined'){
    id=localStorage.getItem('id');
    name=localStorage.getItem('name');
    imgurl=localStorage.getItem('url');
  }
  
  //useEffect(() => {}, [user]);

  function toggelMenu() {
    var element = document.getElementById("menu");
    if (element.classList.contains("hidden")) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  }
  

  let matched=[];

  return (
    <>
    
      <Head>
        <title>Pustakalay | Home</title>
        <meta name="description" content="The web Squad"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
{/* nev bar starts here */}

    <>
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

            {/*  search bar starts here */}

      <div class="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
              <div class="w-3/4">
                <label for="search" class="sr-only">
                  Search Books
                </label>
                <div class="relative text-gray-400 focus-within:text-gray-600">
                  <div class="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                    <BsSearch/>
                  </div>
                  <input
                    value={search}
                    onChange={handlerChange}
                    name="search"
                    class="block w-full bg-gray-700 border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:bg-white focus:border-gray-500 focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                  {search != "" ? (
                    
                    /*Not empty starts here */
                    <>
                    <div className="bg-gray-100 p-1 rounded-lg absolute w-full max-h-1/2 overflow-auto">
                      {Products.map((item) => {
                        if (item.data.ProductName.includes(search.toLowerCase())) {
                          matched.push(item.data.ProductName);
                          return (
                            <>
                            <Link className="text-black text-lg bg-white border-2 m-3 p-2 flex justify-between items-center flex-row" href={"/" + item.data.ProductName}>
                            <div className="flex items-center">
                              <Image alt="Book Cover" width="28" height="40" className="w-7  h-10 m-3" src={item.data.Producturl}/>
                                 {item.data.ProductName}
                               </div>
                              <p className="mt-4 text-sm text-black">Rs {item.data.Price}/-</p>
                                </Link>
                            </>
                          );
                        }
                      }
                      )
                      }
                      {matched.length==0?<>
                      
                      <h1 className="text-center font-bold text-xl p-4">No Result Found!</h1>

                      </>:<></>}
                      </div>
                    </>

                    /*Not empty ends here */
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>

       {/*  search bar ends here */}

{/* other links start here*/}

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

{/* other links ends here*/}
          </div>
        </div>

{/* other Menu starts here*/}


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


{/* other Menu ends here*/}
        
      </nav>
    </>

{/* nev bar ends here */}


        <div className="flex flex-wrap m-10 items-center justify-center">
          {Products.map((item) => {
            return (
              <>
                <Link href={"/"+item.data.ProductName}>
                  <div className="flex flex-wrap flex-col items-center justify-center m-3 p-5 border-2">
                    <Image width="288" height="288" alt="Book Cover" src={item.data.Producturl} className="w-72 h-72"/>
                    <p className="mt-4 text-sm">Price: Rs {item.data.Price}/- </p>
                    <h1 className="m-3 text-lg font-medium">{item.data.ProductName}</h1>
                  </div>
                </Link>
              </>
            );
          })}
        </div>
    </>
  );
};

export async function getServerSideProps(context) {
  let Products = [];

  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    Products.push({ id: doc.id, data: doc.data() });
  });

  return {
    props: { Products: JSON.parse(JSON.stringify(Products)) },
  };
}

export default Home;