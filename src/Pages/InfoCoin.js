import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../Config/Api';
import { Cryptostate } from '../Context_crypto';
import axios from 'axios';
import {Button, CircularProgress, createTheme,makeStyles,ThemeProvider} from "@material-ui/core";
import {Line} from "react-chartjs-2";

function InfoCoin({coin}) {

    const [historicalData,sethistoricalData]=useState();
    const [days,setdays]=useState(1);

    const {currency}=Cryptostate();

    const fetchHistoricData=async()=>{
        const {data}=await axios.get(HistoricalChart(coin.id,days,currency));
        sethistoricalData(data.prices);
    };

    useEffect(()=>{
        fetchHistoricData();
    },[currency,days]);

    console.log("Aakash");
    console.log(historicalData);

    const darkTheme=createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            type:"dark",
        },
    });

    const useStyles=makeStyles((theme)=>({
        container:{
            width:"75%",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            marginTop:25,
            padding:40,
            [theme.breakpoints.down("md")]:{
                width:"100%",
                marginTop:0,
                padding: 20,
                paddingTop:0,
            }
        },
    }));

    const classes=useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
        <div className={classes.container}>
            {!historicalData?(
                <CircularProgress
                   style={{color: "gold"}}
                   size={250}
                   thickness={1}
                />
            ):(
                <>
                </>
            )}
        </div>
    </ThemeProvider>
  )
}

export default InfoCoin


            // ):(
                // <>
                //   <Line 
                //     data={{
                //        labels: historicalData.map((coin)=>{
                //         let data=new Date(coin[0]);
                //         let time=data.getHours()>12 ? `${data.getHours()-12}:${data.getMinutes()} PM`:`${data.getHours()}:${data.getMinutes()} AM`;
                //         return days === 1?time: data.toLocaleDateString();
                //        }),
                //        datasets:[{data: historicalData.map((coin)=> coin[1])}]
                //     }}
                //   />
                // </>
            // )}