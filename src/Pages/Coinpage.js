import { Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../Config/Api';
import { Cryptostate } from '../Context_crypto';
import {TrendingCoins} from "../../src/Config/Api";
import {Link} from "react-router-dom";
import {doc,setDoc} from "firebase/firestore"
import {db} from "../Authentication/Firebase"

function Coinpage() {
  const {id}=useParams();
  const [coin,setcoin]=useState();
  const {currency,symbol,user,watchlist,setalert}=Cryptostate();

  const fetchCoin= async ()=>{
    const {data}=await axios.get(SingleCoin(id));
    setcoin(data);
  }

  console.log(coin);

  useEffect(()=>{
    fetchCoin();
  },[]);

  const[show,setshow]=useState([]);

  const fetchTredingCoin= async () =>{
    const {data}= await axios.get(TrendingCoins(currency));
    console.log(data);
    console.log("aakash nnn");
    setshow(data);
};

useEffect(() => {
    fetchTredingCoin();
},[currency]);

  function numbercomma(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
  }

  const useStyles=makeStyles((theme)=>({
    container:{
      display:"flex",
      [theme.breakpoints.down("md")]:{
        flexDirection: "column",
        alignItems:"center",
      },
    },
    sidebar:{
      width: "30%",
      [theme.breakpoints.down("md")]:{
        width: "100%",
      },
      display:"flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop:25,
      borderRight: "2px solid white",
    },
    heading:{
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    desc:{
      marginLeft: 10,
      fontWeight: "bold",
      color: "gold",
      padding: 25,
      paddingBottom: 15,
      textAlign: "justify", 
    },
    newhead:{
      marginLeft: 155,
      marginTop: 30,
      fontFamily: "Montserrat",
    }, 
    setting:{
      marginTop: 20,
      display:'inline-block',
      padding: 10,

    },
    marketdown:{
      width:"100%",
      padding:25,
      paddingTop:10,
      alignSelf:"start",
      [theme.breakpoints.down("sm")]:{
        flexDirection:"column",
        alignItems:"center",
      },
      [theme.breakpoints.down("md")]:{
        display:"flex",
        flexDirection:"column",
        alignItems:'center',
      },
      [theme.breakpoints.down("xs")]:{
        alignItems:"start",
      },
    },
  }));

  const InWatchlist=watchlist.includes(coin?.id);

  const addtoWatchlist=async()=>{
    const coinref=doc(db,"watchlist",user.uid);
    try{
      await setDoc(coinref,{
        coins:watchlist?[...watchlist,coin?.id]:[coin?.id]
      });
      setalert({
        open:true,
        message:`${coin.name} Remove from the Watchlist !`,
        type:'success',
      })
    }catch(err){
      setalert({
        open:true,
        message:err.message,
        type:'error',
      })
    }
  }

  const removelist=async()=>{
    const coinref=doc(db,"watchlist",user.uid);
    try{
      await setDoc(coinref,{
        coins:watchlist.filter((watch)=>watch!==coin?.id)},
        {merge:"true"}
      );
      setalert({
        open:true,
        message:`${coin.name} Added to the Watchlist !`,
        type:'success',
      })
    }catch(err){
      setalert({
        open:true,
        message:err.message,
        type:'error',
      })
    }
  }

  const classes=useStyles();

  if(!coin) return <LinearProgress style={{backgroundColor:"gold"}}/>

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img 
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{marginBottom:20}}
        />
        <Typography variant='h3' className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant='subtitle1' className={classes.desc}>
          {coin?.description.en.split(".")[0]}.
        </Typography>
        <div className={classes.marketdown}>
          <span style={{display:"flex"}}>
            <Typography variant='h5' className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' style={{fontFamily:"Montserrat"}}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{display:"flex"}}>
            <Typography variant='h5' className={classes.heading}>
              Current Price:
            </Typography>
            <Typography variant='h5' style={{fontFamily:"Montserrat"}}>
              {symbol}{" "}
              {numbercomma(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
              {/* {coin?.market_cap_rank} */}
            </Typography>
          </span>
          <span style={{display:"flex"}}>
            <Typography variant='h5' className={classes.heading}>
              Market Cap:{" "}
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' style={{fontFamily:"Montserrat"}}>
              {symbol}{" "}
              {numbercomma(
                coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0,-6)
              )}
              M
            </Typography>
          </span> 
          {user && (
            <Button 
              variant='outlined'
              style={{width:"100%",height:40,backgroundColor:InWatchlist?'#ff0000':'#EEBC1D'}}
              onClick={InWatchlist?removelist:addtoWatchlist}
            >
              {InWatchlist?"Remove from Watchlist":"Add to Watchlist"}
            </Button>
          )}
        </div>
      </div>
      <div >
        <Typography variant='h3' className={classes.newhead}>
            <div>More Coins You Have to Buy</div>
        </Typography>
        <div>
          {show.map((e)=>{
            return(
              <Link className={classes.setting} to={`/coins/${e.id}`}>
                <img
                  src={e.image}
                  alt={e.name}
                  height="100"
                />
              </Link>

            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Coinpage
