import React from 'react'
import {Snackbar} from "@material-ui/core";
import {Cryptostate} from "../Context_crypto";
import MuiAlert from '@material-ui/lab/Alert'

function Alert() {

    const {alert,setalert}=Cryptostate();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
           return;
        }

        setalert({open: false});
    };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
        <MuiAlert
          onClose={handleClose}
          elevation={10}
          variant="filled"
          severity={alert.type}
        >
            {alert.message}
        </MuiAlert>
    </Snackbar>
  )
}

export default Alert