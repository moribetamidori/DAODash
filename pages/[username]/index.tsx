import UserProfile from '../../components/users/UserProfile';
import PostFeed from '../../components/users/PostFeed';
import { getUserWithUsername, postToJSON } from '../../lib/firebaseConfig/init';
import { doc, startAfter, collection, collectionGroup, addDoc, setDoc,getDoc, getDocs, query, where, limit, orderBy} from 'firebase/firestore';
import { firestore } from '../../lib/firebaseConfig/init' ;
import type { NextPage, GetServerSideProps } from 'next'
import { useContext, useEffect, useState } from 'react';
import { authContext } from '../../lib/authContext'
import { fromMillis } from '../../lib/firebaseConfig/init';
import DAODashProfilePage from '../../components/users/DAODash';
import {useMoralis} from "react-moralis";
import { useRouter } from 'next/router';
import { communityToJSON, getCommunityWithSlug } from '../../lib/firebaseConfig/init';

interface Props{
    username: string
}
const LIMIT = 5;
export async function getServerSideProps(context:any) {
    const {query:qr} = context;
    const {username} = qr;
    // console.log("hhhhh")
    const getBounty = async(daoAddress:any, userAddress:any) => {
        console.log("eh", daoAddress, userAddress)
        const res = await fetch(`https://api.covalenthq.com/v1/1/address/${userAddress}/transfers_v2/?quote-currency=USD&format=JSON&contract-address=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&key=ckey_6b2f9329db3c4c4994505cfe884&primer=[{$match:{$and:[{transfers.0.transfer_type=IN},{transfers.0.from_address=${daoAddress}}]}}]&page-size=99999`)
        const data = await res.json()
        console.log("data", data)
        const stp1 = data.data.items.map((i:any) => [...i.transfers])
        const stp2 = stp1.map((j:any)=>j[0]);
        const bounties = stp2.map((k:any)=>k.delta)
        const quoteRate = stp2.map((k:any)=>k.quote_rate)
        const usd:any[] = bounties.map(function(n:any,i:any){return (n/quoteRate[i])/1000000})
        console.log("----usd----", usd)
        return usd 
    }
    // console.log("hhhhh1")


    const setBounty = async(bounty:any, bountySum:any, daoAddress:any, daoName:any) => {
        await setDoc(doc(firestore, "username", username, "daos", daoAddress),{
            walletAddress:daoAddress,
            name: daoName,
            bounty: bounty,
            bountySum: bountySum

        })
    
        
    }
    // console.log("hhhhh2")

    //get all daos information 
    const daosQuery = query(collection(firestore, 'daos'));
        
    const daos = (await getDocs(daosQuery)).docs.map(communityToJSON);

    daos.map(
        (d:any) => {
            // console.log("Dao",d)
            //wallet address is nico's address, need to replace later
           const usd = getBounty(d.walletAddress, "0xdc957cd1b44620a82084a923fba5408e50815e2e")
           if(usd){
            console.log("usd tho", usd)

           }
           const usdSum=Array.isArray(usd)?usd.map(((sum:any = 0, n:any) => sum += n)):0;
           console.log("usdSum", usdSum)
           if (usdSum>0){
            setBounty(usd, usdSum, d.walletAddress, d.name)
           }
        }
    )

    //exisiting dao connection with the wallet address holder
    const existDAOQuery = query(collection(firestore,'usernames', username, "daos"))
    const existDAOs = (await getDocs(existDAOQuery)).docs.map(communityToJSON);
    
    //then get a list of user's daos, 

    return { props: { username, existDAOs} }

}

interface User {
    username: string
}
export default function UserProfilePage(props: User): any {
    const { username } = props;
    return (
    <>
        
        <DAODashProfilePage username={username}/>
        
        </>
    )  
}

