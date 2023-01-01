import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import CoinList from './CoinList';

const useStyles=makeStyles(()=>({
    banner:{
        backgroundImage: "url(./banner2.jpg)",
    },
    bannerCon:{
        height: 400,
        display:"flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
}));

function Background() {
    const classes=useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerCon}>
            <div className={classes.tagline} style={{marginLeft:420,marginTop: -20}}>
                <Typography variant="h2" style={{fontWeight: "bold",marginBottom:15,fontFamily:"Montserrat",marginLeft: 10}}>
                    Coin Base
                </Typography>
                <Typography variant="subtitle2" style={{color:"darkgrey",textTransform:"capitalize",fontFamily:"Montserrat"}}>
                    Get all the Info regarding your Favourite coins 
                </Typography>
            </div>
            <CoinList/>
        </Container>
    </div>
  )
}

export default Background
