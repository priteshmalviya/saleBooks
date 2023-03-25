import React from 'react'
import { doc, getDoc } from "firebase/firestore";
import {db} from "../firebase/firebaseinit/firebase";
import { NevBar} from '../nevbar/nevbar';
import Image from 'next/image';
import Head from 'next/head';


const slug = ({Products})=> {


  return (
    <>

    
<Head>
        <title>Pustakalay | Products</title>
        <meta name="description" content="The web Squad"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

{/* nev bar starts here */}

      <NevBar/>

{/*nev bar ends here */}

    <div className="flex flex-wrap m-10 items-center justify-center">
            <div className="flex flex-wrap flex-col items-center justify-center m-3 p-5 border-2">
    <Image height="288" width="288" src={Products.Producturl} alt="Book Cover" className="w-72 h-72"/>
              <p className="mt-4 text-sm">Price: Rs {Products.Price}/- </p>
              <h1 className="m-3 text-lg font-medium">{Products.ProductName}</h1>
            </div>
  </div>
    </>
  )
}

export async function getServerSideProps(context) {

  const {slug}=context.query;
  
  const docRef = doc(db, "products",slug);
  const docSnap = await getDoc(docRef);

  let Product = docSnap.data();

  return {
    props: { Products: Product } ? { Products: Product } :"No data avalable",
  };
}

export default slug