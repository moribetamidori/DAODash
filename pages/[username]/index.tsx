import UserProfile from '../../components/users/UserProfile';
import PostFeed from '../../components/users/PostFeed';
import { getUserWithUsername, postToJSON } from '../../lib/firebaseConfig/init';
import { doc, startAfter, collection, collectionGroup, addDoc, setDoc, getDocs, query, where, limit, orderBy} from 'firebase/firestore';
import { firestore } from '../../lib/firebaseConfig/init' ;
import type { NextPage, GetServerSideProps } from 'next'
import { useContext, useEffect, useState } from 'react';
import { authContext } from '../../lib/authContext'
import { fromMillis } from '../../lib/firebaseConfig/init';
import DAODashProfilePage from '../../components/users/DAODash';
import {useMoralis} from "react-moralis";
import { useRouter } from 'next/router';

interface Props{
    username: string
}
const LIMIT = 5;
export async function getServerSideProps(context:any) {
    const {query:qr} = context;
    const {username} = qr;
    const res = await fetch(`https://api.covalenthq.com/v1/1/address/0xDc957Cd1B44620a82084A923FBA5408E50815E2e/transfers_v2/?quote-currency=USD&format=JSON&contract-address=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&key=ckey_6b2f9329db3c4c4994505cfe884&primer=[{$match:{$and:[{transfers.0.transfer_type=IN},{transfers.0.from_address=0x5DC0BB1a0373A3a963F49ef2f204647f889dF117}]}}]&page-size=99999`)
    const data = await res.json()
    // const bounties = data.data.items.map((i:any) => i.transfers.delta);
    // const bounties = data.data.items;
    // const bountiesArr =bounties.map(({delta}))
    const stp1 = data.data.items.map((i:any) => [...i.transfers])
    const stp2 = stp1.map((j:any)=>j[0]);
    const bounties = stp2.map((k:any)=>k.delta)
    const quoteRate = stp2.map((k:any)=>k.quote_rate)
    const usd = bounties.map(function(n:any,i:any){return (n/quoteRate[i])/1000000})


    // const stp2 = {...stp1}
    // const stp2 = stp1.map((j:any)=>j.delta)

    // console.log(data)
    // console.log(stp1)
    // console.log(bounties)

    // console.log("bounties", bounties)
    // Pass data to the page via props
    // console.log("usd", usd )
    return { props: { data, username, bounties } }

}

interface User {
    data: any
    bounties: any
    username: string
}
export default function UserProfilePage(props: User): any {
    const { username, bounties } = props;

    return (
    <>
    {/* This is User Profile */}
        
        {/* <UserProfile user={user} username={username} /> */}
        <DAODashProfilePage username={username}/>
        
        </>
    )  
}

