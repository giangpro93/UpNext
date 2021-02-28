import { TextField } from '@material-ui/core';
import React from 'react'

export function TextInput(props) {

    const {name, label, value, onChange, ...other} = props;
    
    return (
        <TextField
            variant={props.variant || "outlined"}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            fullWidth
            {...other}
        />
    )
}
