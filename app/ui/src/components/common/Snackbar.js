import React from 'react';
import { Snackbar as MuiSnackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

export default function Snackbar(props) {

    const { open, onClose, severity, message, ...other} = props;

    return (
        <MuiSnackbar 
            open={open} 
            autoHideDuration={3000} 
            onClose={onClose}
        >
            <Alert onClose={onClose} severity={severity}>
            {message}
            </Alert>
        </MuiSnackbar>
    )
}
