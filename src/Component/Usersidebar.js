import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { Cryptostate } from '../Context_crypto';
import { Avatar, FormHelperText } from '@material-ui/core';
import { signOut } from 'firebase/auth';
import { auth } from '../Authentication/Firebase';
import {AiFillDelete} from 'react-icons/ai'
import {doc,setDoc} from "firebase/firestore"
import { db } from '../Authentication/Firebase';

const useStyles = makeStyles({
    container:{
        width:350,
        padding:25,
        height:"100%",
        display:"flex",
        flexDirection:'column',
        fontFamily:'monospace',
    },
    profile:{
        flex:1,
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        gap:"20px",
        height:"92%",
    },
    picture:{
        width:200,
        height:200,
        cursor:'pointer',
        backgroundColor:'#EEBC1D',
        objectFit:'contain',
    },
    logout:{
        height:'8%',
        width:'100%',
        backgroundColor:'#EEBC1D',
        marginTop:20,
    },
    watchlist:{
        flex:1,
        width:"100%",
        backgroundColor:'grey',
        borderRadius:10,
        padding:15,
        paddingTop:10,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        gap:12,
        overflow:"scroll",
    },
    coin:{
        padding:10,
        borderRadius:5,
        color:'black',
        width:'100%',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#EEBC1D',
        boxShadow:'0 0 3px black',
    }
});

export default function Usersidebar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const {user,setalert,watchlist,coin,symbol}=Cryptostate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const logout=()=>{
    signOut(auth);
    setalert({
        open:true,
        type:'success',
        message:'Logout Successfull !',
    });
    toggleDrawer();
  }

  function numbercomma(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
  }

  const removelist=async(coin)=>{
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

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
            
          <Avatar 
            onClick={toggleDrawer(anchor,true)}
            style={{
                height:38,
                width:38,
                marginLeft:15,
                cursor:'pointer',
                backgroundColor:"#EEBC1D",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <div className={classes.container}>
                <div className={classes.profile}>
                    <Avatar
                      className={classes.picture}
                      src={user.photoURL}
                      alt={user.displayName || user.email }
                    />
                    <span style={{width:"100%",fontSize:20,textAlign:'center',fontWeight:'bolder',wordWrap:'break-word'}}>
                        {user.displayName || user.email}
                    </span>
                    <div className={classes.watchlist}>
                        <span style={{fontSize:15,textShadow:'0 0 5px black'}}>
                            Watchlist
                        </span>
                        {
                            coin.map((coin) => {
                                if(watchlist.includes(coin.id))
                                return (
                                  <div className={classes.coin}>
                                    <span>{coin.name}</span>
                                    <span style={{display:'flex',gap:8}}>
                                        {symbol}
                                        {numbercomma(coin.current_price.toFixed(2))}
                                        <AiFillDelete
                                           style={{cursor:'pointer'}}
                                           fontSize='16'
                                           onClick={()=>removelist(coin)}
                                        />
                                    </span>
                                  </div>
                                );
                            })
                        }
                    </div>
                </div>
                <Button variant="contained" className={classes.logout} onClick={logout}>
                    Log Out
                </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
