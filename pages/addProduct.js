import React from "react";
import { useState,useEffect } from "react"; 
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from '../firebase/firebaseinit/firebase'
import upload from "../firebase/storage/upload";
import Link from "next/link";
import { useRouter } from "next/router";
import { NevBar } from "../nevbar/nevbar";
import Head from "next/head";

const AddProduct = () => {

    const router=useRouter();

    const [user,setuser]=useAuthState(auth);
  let sid,sname;

  if(typeof localStorage !== 'undefined'){
    sid=localStorage.getItem('id');
    sname=localStorage.getItem('name');
  }

  useEffect(()=>{
    if(!sid){
      router.push("/");
    }
  },[user]);

  
  

  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [auther, setAuther] = useState();
  const [year, setYear] = useState();

  const handlerChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "price") {
      setPrice(e.target.value);
    }else if (e.target.name == "auther") {
        setAuther(e.target.value);
      }else if (e.target.name == "year") {
        setYear(e.target.value);
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const fileInput = document.getElementById("file");
    var file = fileInput.files[0];

    let url="";
    let sellerid=sid;
    let sellerName=sname;
    const data = {
        ProductName: name,
        AutherName: auther,
        Year: year,
        Price:price,
        Producturl:url,
        sellername:sellerName,
        sellerid:sellerid
    };
    
     upload(file,data);

     setName("");
     setPrice("");
     setYear("");
     setAuther("");
     router.push("/");
  };

  return (
    <>

    
<Head>
        <title>Pustakalay | Add Products</title>
        <meta name="description" content="The web Squad"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    {/* nev bar starts here */}

    <NevBar/>

    {/*nev bar ends here */}

      <div className="sm:bg-[#fafafa] w-full h-[100vh] flex items-center justify-center flex-col">

      

        <div className="sm:w-1/2 sm:max-w-md h-fit w-full sm:border bg-white flex items-center flex-col">
          
          <h1 className="text-3xl p-5 font-medium font-serif text-center">Add Your Product To Sale</h1>

          <div className="mt-8 flex flex-col items-center w-full h-fit">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center w-full"
              method="post"
            >
              <input
                value={name}
                required
                onChange={handlerChange}
                maxlength="30"
                type="text"
                name="name"
                placeholder="Enter Product Name"
                className="bg-[#fafafa] p-[6px] my-1 border w-3/4 "
              />
              <input
                value={auther}
                required
                onChange={handlerChange}
                type="text"
                name="auther"
                placeholder="Enter Auther Name"
                className="bg-[#fafafa] p-[6px] my-1 border w-3/4 "
              />
              <input
                value={year}
                required
                onChange={handlerChange}
                type="number"  min="1900" max="2023"
                name="year"
                placeholder="Enter Printing Year"
                className="bg-[#fafafa] p-[6px] my-1 border w-3/4 "
              />
              <input
                value={price}
                required
                onChange={handlerChange}
                type="number"
                name="price"
                placeholder="Enter Price"
                className="bg-[#fafafa] p-[6px] my-1 border w-3/4 "
              />
              <input
                onChange={handlerChange}
                required
                type="file"
                name="file"
                id="file"
                className="bg-[#fafafa] p-[6px] my-1 border w-3/4 "
              />
              <button className="cursor-pointer bg-[#6cbef5] text-white p-[2px] my-2 border w-3/4 rounded-md">
                AddProduct
              </button>
            </form>

            
            <button className="cursor-pointer bg-[#6cbef5] text-white p-[2px] my-2 border w-3/4 rounded-md">
                <Link href={"/"}>Home</Link>
              </button>
            <div className="flex w-4/5 justify-center items-center space-x-5 mt-2">
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
