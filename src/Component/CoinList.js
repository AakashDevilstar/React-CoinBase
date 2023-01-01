import { makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Cryptostate } from '../Context_crypto';
import AliceCarousel from "react-alice-carousel";
import {TrendingCoins} from "../../src/Config/Api"
import {Link} from "react-router-dom";

export function numbercomma(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

function CoinList() {
    const[trending,settrending]=useState([]);

    const {currency,symbol}=Cryptostate();

    const fetchTredingCoin= async () =>{
        const {data}= await axios.get(TrendingCoins(currency));
        // console.log(data);
        settrending(data);
    };

    useEffect(() => {
        fetchTredingCoin();
    },[currency]);

    // console.log(trending);

    const useStyles = makeStyles((theme) => ({
        carousel: {
          height: "50%",
          display: "flex",
          alignItems: "center",
        },
        carouselItem: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          textTransform: "uppercase",
          color: "white",
        },
    }));
    
    const classes = useStyles();

    const items=trending.map((coin)=>{
        let profit=coin.price_change_percentage_24h >=0;
        return (
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
               <img 
                 src={coin.image}
                 alt={coin.name}
                 height="80"
                 style={{marginBottom: 10}}
               />
               <span>
                {coin.symbol}
                &nbsp;
                <span style={{color: profit >0 ?"rgb(14,203,129)":"red",fontWeight:500}}>
                    {profit && '+'} {coin.price_change_percentage_24h?.toFixed(2)}%
                </span>
               </span>
               <span style={{fontSize: 22,fontWeight: 500}}>
                 {symbol} {numbercomma(coin.current_price.toFixed(2))}
               </span>
            </Link>
        )
    });

    const responsive={
        0:{
            items:2,
        },
        512:{
            items: 4,
        },
    };

  return (
    <div className={classes.carousel}>
        <AliceCarousel 
           mouseTracking
           infinite
           autoPlayInterval={1000}
           animationDuration={1500}
           disableDotsControls
           disableButtonsControls
           responsive={responsive}
           autoPlay
           items={items}
        />
    </div>
  )
}
export default CoinList