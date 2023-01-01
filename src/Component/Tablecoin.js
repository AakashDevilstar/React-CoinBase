import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Cryptostate } from '../Context_crypto';
import {CoinList} from "../../src/Config/Api"
import {Container, createTheme, LinearProgress, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography,Table,TableCell, TableBody} from "@material-ui/core"
import { useNavigate } from 'react-router-dom';
import {makeStyles} from "@material-ui/core"
import {Pagination} from "@material-ui/lab"

function Tablecoin() {
    const [search,setsearch]=useState("");
    const {currency,symbol,coin,loading,fetchCoins}=Cryptostate();
    const [page,setpage]=useState(1);
    console.log(coin);

    useEffect(()=>{
        fetchCoins();
    },[currency]);

    
    function numbercomma(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
    }

    const darkTheme=createTheme({
        palette:{
            primary:{
                main:'#fff',
            },
            type: 'dark',
        },
    });

    
  const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
  });

  const classes = useStyles();

    const handlesearch=()=>{
        return coin.filter(
            (coin)=> coin.name.toLowerCase().includes(search) ||  coin.symbol.toLowerCase().includes(search)
        )
    }

    const navigate=useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign: "center"}}>
            <Typography variant="h4" style={{margin:18,fontFamily: "Montserrat"}}>
                Cryptocurrency Prices by Market Cap
            </Typography>
            <TextField label="Search for a Crypto Currency...." variant='outlined' style={{marginBottom: 20, width: "100%"}} onChange={(e)=>setsearch(e.target.value)}/>
            <TableContainer>
                {
                    loading ?(
                        <LinearProgress style={{backgroundColor: "gold"}} />
                    ):(
                        <Table>
                            <TableHead style={{backgroundColor:"EEBC1D"}}>
                                <TableRow>
                                    {["Coin","Price","24h Change","Market Cap","Total Supply"].map((head)=>(
                                        <TableCell style={{color:"black",fontWeight:"700",fontFamily:"Montserrat",backgroundColor:"gold"}} key={head} align={head === "Coin"? "" : "right"}>
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {handlesearch().slice((page-1)*10,(page-1)*10+10).map((row)=>{
                                    const profit=row.price_change_percentage_24h>0;

                                    return (
                                        <TableRow
                                           onClick={()=>navigate(`/coins/${row.id}`)}
                                           className={classes.row}
                                           key={row.name}
                                        >
                                            <TableCell component="th" scope="row" style={{display:"flex",gap:15,}}>
                                                <img 
                                                   src={row.image}
                                                   alt={row.name}
                                                   height="50"
                                                   style={{marginBottom:10}}
                                                />
                                                <div style={{display:"flex",flexDirection:"column"}}>
                                                    <span style={{textTransform:"uppercase",fontSize:22}}>
                                                        {row.symbol}
                                                    </span>
                                                    <span style={{color:"darkgrey"}}>{row.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell align="right">
                                                {symbol}{" "}
                                                {numbercomma(row.current_price.toFixed(2))}
                                            </TableCell>
                                            <TableCell align="right" style={{color:profit>0?"rgb(14,203,129)":"red",fontWeight:500}}>
                                                {profit && "+"}
                                                {row.price_change_percentage_24h.toFixed(2)}%
                                            </TableCell>
                                            <TableCell align="right">
                                                {symbol}{" "}
                                                {numbercomma(row.market_cap.toString().slice(0,-6))}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.total_supply}
                                            </TableCell>
                                        </TableRow>
                                    )

                                })}
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>
            <Pagination 
              style={{padding: 20,width: "100%",display:"flex",justifyContent:"center",}}
              count={(handlesearch()?.length/10).toFixed(0)}
              classes={{ul: classes .pagination}}
              onChange={(_,value)=>{
                setpage(value);
                window.scroll(0,450);
              }}
            />
        </Container>
    </ThemeProvider>
  )
}

export default Tablecoin
