import type { NextPage } from 'next'
import Head from 'next/head'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { collectionGroup, query, where, getDocs, orderBy, limit, startAfter, getDoc} from "firebase/firestore";  
import { useState , useEffect} from 'react';

import React from "react";
import {MoralisProvider} from "react-moralis";
import {useMoralis} from "react-moralis";

import { useRouter } from 'next/router';

interface Props {
  posts: any
}

export default function Home(props:Props): any {
    const { user, logout } = useMoralis();
    const [address, setAddress] = useState();
    const { isAuthenticated, authenticate } = useMoralis();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
          setAddress(user?.attributes.ethAddress);
        }
      }, [isAuthenticated]);
    const signOut = async () => {
        await logout();
        console.log("disconnecting")
        router.replace("/")

    }


  return (

    <>

    HEY
    <h1>{address}</h1>

    <button
  className="px-7 mb-5 py-4 text-xl rounded-xl bg-yellow-300"
  onClick={signOut}
//   disabled={isAuthenticated}
>
  Disconnect
</button>
     </>



  )
}

