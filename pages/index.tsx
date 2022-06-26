import type { NextPage } from 'next'
import Head from 'next/head'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { doc, getDoc, collection, addDoc, setDoc, getDocs} from 'firebase/firestore';
import { firestore } from '../lib/firebaseConfig/init'
import { useState , useEffect} from 'react';
import React from "react";
import {useMoralis} from "react-moralis";
import { useRouter } from 'next/router';
import Link from 'next/link'
interface Props {
  posts: any
}

export default function Home(props:Props): any {
  const { isAuthenticated, authenticate } = useMoralis();
  const router = useRouter();
  const { user } = useMoralis();
  const [username, setUsername] = useState();
  // console.log("hey 1", username)
  const login = async () => {
    if (!isAuthenticated) {

      await authenticate({ 
              provider: "walletconnect", 
              mobileLinks: [
                "rainbow",
                "metamask",
                "argent",
                "trust",
                "imtoken",
                "pillar",
              ] 
          })
        .then(function (user) {
          console.log(user!.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  useEffect(() => {
    if (isAuthenticated){
      const address = user?.attributes.ethAddress
      setUsername(address);

      // console.log("hey 2", username)
    } 
  }, [isAuthenticated]);

  // if(username){
    useEffect(()=> {
      const storeData = async() => {
        if(username){
          await setDoc(doc(firestore, "usernames", username!), {
            walletAddress: username
            
          })    
          router.replace(`/${username}`);

        // console.log("test", username)
      }

      }
      storeData();


    },[username])
   
    // router.replace(`/${username}`);
  // }
  return (
    <>
      <Head>
        <title>Home</title>
        
      </Head>

<html lang="en" className="h-100">
  <head>
    <meta charSet="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600;700&display=swap" rel="stylesheet"/>

    <title>DAO Dash</title>

    <link href="../css/main.css" rel="stylesheet"/>
    <link rel="shortcut icon" href="../img/favico.png"/>
  </head>
  
  <div className="bgContainer"></div>

  <div id="Profile">
    <h1 id="PlayerName">
      Player Name
    </h1>
    <div className="ProfileInfo">
    <h3 id="PlayerLevel">Player Level</h3>
    <h3>  |  </h3>
    <h3 id="PlayerXP">Player XP</h3>
  </div>
  <div id="Signout">
  {/* <Link href={'/'}>

    <button onClick={() =>
      authenticate({ signingMessage: "Authorize linking of your wallet" })
    } className="WalletBttn"> Connect Metamask </button>
  </Link> */}

    <Link href={'/'}>

    <button onClick={login}
     className="WalletBttn"> Connect Your Wallet </button>
  </Link>

  </div>

  <div id="Signout2">
    <Link href={'/'}>

    <button onClick={() =>
      authenticate({ signingMessage: "Authorize linking of your wallet" })
    }
     className="WalletBttn2"> Connect Metamask </button>
  </Link>

  </div>
    <img src={'/img/bar.png'} id="XPProgressBarFrame" className="Progress"/>
    <img src="/img/sq.png" id="XPProgressBar" className="Progress"/>
  <div style={{height:"40px"}}></div>
  <div id="Tags">
    <button className="SkillTag stY">Javascript</button>
    <button className="SkillTag stR">React</button>
    <button className="SkillTag stB">NextJS</button>
  </div>
  </div>
  
  <div id="Character">
    <img src="img/character.png" style={{width:"100%"}}/>
  </div>

  <div id="Door">
    <img src="img/door.png"/>
  </div>

  <div id="Window">
    <img src="img/window.png"/>
  </div>

  <div className="Plant" style={{left:"500px"}}>
    <img src="img/plant2.png"/>
    <button className="PlantBttn">
    <div className="DAOName">
      CityDAO
    </div>
    <div className="PlantXP">
      5060 XP
    </div>
  </button>
  </div>

  <div className="Plant" style={{left:"675px"}}>
    <img src="img/plant0.png"/>
    <button 
    className="PlantBttn">
    <div className="DAOName">
      Juicebox 
    </div>
    <div className="PlantXP">
      300 XP
    </div>
  </button>
  </div>

  <div className="Plant" style={{left:"750px"}}>
    <img src="img/plant1.png"/>
    <button className="PlantBttn">
    <div className="DAOName">
      Gitcoin
    </div>
    <div className="PlantXP">
      2750 XP
    </div>
  </button>
  </div>

{/* <script src="../js/script.js"></script> */}
</html>
</>


  )
}

