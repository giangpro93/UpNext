import { TextField } from '@material-ui/core';
import React from 'react'

export function DropdownInput(props) {

    const {name, label, value, onChange, children, ...other} = props;

    return (
        <TextField
            variant={props.variant || "outlined"}
            select
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            margin='normal'
            fullWidth
            InputLabelProps={{
                shrink: true,
            }}
            {...other}
        >
            {children}
        </TextField>
    )
}