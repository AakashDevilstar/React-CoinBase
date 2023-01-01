import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { CoinList } from './Config/Api';
import { onAuthStateChanged } from 'firebase/auth';
import { auth,db } from './Authentication/Firebase';
import {doc, onSnapshot} from "firebase/firestore"
const Crypto=createContext();

function Context_crypto({children}) {
    const [coin,setcoin]=useState([]);
    const [loading,setloading]=useState(false);
    const [currency,setcurrency]=useState("INR");
    const [symbol,setsymbol]=useState("₹");
    const [user,setUser]=useState(null);
    const [alert,setalert]=useState({
        open: false,
        message: "",
        type: "success",
    });
    const[watchlist,setwatchlist]=useState([]);

    useEffect(()=>{
        if(user){
            const coinRef=doc(db,"watchlist",user?.uid);
            var unsubscribe=onSnapshot(coinRef,(coin)=>{
                if(coin.exists()){
                    console.log(coin.data().coins);
                    setwatchlist(coin.data().coins);
                }else{
                    console.log("No Items in Watchlist");
                }
            });
            return ()=>{
                unsubscribe();
            };
        }
    },[user])

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user);
            }
            else{
                setUser(null);
            }
            console.log(user);
        });
    },[])

    useEffect(()=>{
        if(currency === "INR"){
            setsymbol("₹");
        }
        else if(currency === "USD"){
            setsymbol("$");
        }
    },[currency]); 

    const fetchCoins= async () => {
        setloading(true);
        const {data}= await axios.get(CoinList(currency));
        console.log(data);
        setcoin(data);
        setloading(false);
    };

  return (
    <Crypto.Provider value={{currency,symbol,setcurrency,coin,loading,fetchCoins,alert,setalert,user,watchlist}}>
        {children}
    </Crypto.Provider>
  )
}
export default Context_crypto;
export const Cryptostate=()=>{
    return useContext(Crypto);
}