import React from 'react'
import {Box,Button,TextField} from "@material-ui/core";
import {useState} from "react";
import {Cryptostate} from "../Context_crypto"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from "../Authentication/Firebase"

function Signup({handleClose}) {
    const [email,setemail]=useState();
    const[password,setpassword]=useState();
    const [configpassword,setconfigpassword]=useState();  
    
    const {setalert}=Cryptostate();

    const handleSubmit= async()=>{
        if(password!== configpassword){
            setalert({
                open: true,
                message:'Password Do not Match',
                type:'error',
            }) 
        }
        try{
          const result=await createUserWithEmailAndPassword(auth, email, password);
          console.log(result);
          setalert({
            open:true,
            message:`Sign Up Successfull Welcome ${result.user.email}`,
            type:'Success',
          })
          handleClose();
        }catch(error){
          setalert({
            open:true,
            message:error.message,
            type:'error',
          });
          return;
        }
    };

  return (
    <Box
      p={3}
      style={{display:"flex",flexDirection:"column",gap:"20px"}}
    >
        <TextField
         variant="outlined"
         type="email"
         label="Enter Email"
         value={email}
         onChange={(e)=> setemail(e.target.value)}
         fullWidth
        />

        <TextField
         variant="outlined"
         type="password"
         label="Enter PassWord"
         value={password}
         onChange={(e)=> setpassword(e.target.value)}
         fullWidth
        />

        <TextField
         variant="outlined"
         type="password"
         label="Confirm Password"
         value={configpassword}
         onChange={(e)=> setconfigpassword(e.target.value)}
         fullWidth
        />
        <Button
          variant="contained"
          size="large"
          style={{backgroundColor:"#EEBC1D"}}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
    </Box>
  )
}

export default Signup