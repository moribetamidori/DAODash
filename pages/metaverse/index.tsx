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


  return (

    <>    
    <img src="/img/lake.png" />


     </>



  )
}

