import React from 'react';
import { Select, FormControl, InputLabel, FormLabel, MenuItem } from '@material-ui/core';

export function SelectInput(props) {

    // choices :: [{label,value}]
    const {label, name, value, onChange, choices, ...other} = props;

    return (
        <FormControl 
            fullWidth
            variant='outlined'>
            <InputLabel>{label}</InputLabel>
            <Select
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                choices={choices}
                {...other}>
                    <MenuItem value=''>None</MenuItem>
                    {
                    choices.map( opt => 
                        <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)
                    }
            </Select>
        </FormControl>
    )
}
