import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Cryptostate } from '../Context_crypto';
import AuthModal from '../Authentication/AuthModal';
import Usersidebar from './Usersidebar';

const useStyles=makeStyles(()=>({
  title:{
    flex:1,
    color:"gold",
    fontFamily:"Montserrat",
    fontWeight: "bold",
    fontSize: "1.4em",
    cursor:"pointer",
  },
}));

function Header() {

  const classes=useStyles();
  const navigate=useNavigate();

  const {currency,setcurrency,user}=Cryptostate();

  console.log(currency);
  // console.log(user);

  const darktheme=createTheme({
    palette:{
      primary:{
        main:"#fff",
      },
      type: "dark",
    },
  })

  return (
    <ThemeProvider theme={darktheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography className={classes.title} onClick={()=> navigate("/")}>Coin Base</Typography>
            <Select variant='outlined' style={{width:100,height:40,marginLeft:15}} value={currency} onChange={(e)=> setcurrency(e.target.value)}>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            {user ?<Usersidebar/>:<AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header