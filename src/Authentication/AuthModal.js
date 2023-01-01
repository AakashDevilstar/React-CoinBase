import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Box } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import AppBar from "@material-ui/core/AppBar";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import { Cryptostate } from '../Context_crypto';
import {auth} from "../Authentication/Firebase"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    background: theme.palette.background.paper,
    color: "white",
    borderRadius: 10,
  },
  google:{
    padding:24,
    paddingTop:0,
    display:"flex",
    flexDirection:'column',
    textAlign:'center',
    gap:20,
    fontSize:'20',
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // console.log(value);

  const googleProvider=new GoogleAuthProvider();
  const {setalert}=Cryptostate();

  const signInWithGoogle=()=>{
      signInWithPopup(auth,googleProvider).then(res=>{
        setalert({
          open:true,
          message:`Sign Up Successfull Welcome ${res.user.email}`,
          type:'Success',
        });
        handleClose();
      }).catch(error=>{
        setalert({
          open:true,
          message:error.message,
          type:'error',
        })
        return;
      });
  }

  return (
    <div>
      <button variant="contained" style={{width:85,height:40,marginLeft:20,borderRadius:10,outline:'none',backgroundColor:'#EEBC1D'}} onClick={handleOpen}>
        LOGIN
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar
               position='static'
               style={{backgroundColor:"transparent",color:"white"}}
            >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="fullWidth"
                  style={{borderRadius:10}}
                >
                    <Tab label="Login" />
                    <Tab label="Sign Up" />
                </Tabs>
            </AppBar>
            {value===0 && <Login handleClose={handleClose} />}
            {value===1 && <Signup handleClose={handleClose} />}
            <Box className={classes.google}>
              <span>OR</span>
              <GoogleButton style={{width:"100%",outline:"none"}} 
                  onClick={signInWithGoogle}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
