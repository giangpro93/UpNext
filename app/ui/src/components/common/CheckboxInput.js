import { Checkbox, FormControl, FormControlLabel } from '@material-ui/core';
import React from 'react'

export function CheckboxInput(props) {

    const {name, label, checked, onChange, ...other} = props;

    const convertCheckedEvent = e => ({
            ...e,
            target: {
                ...e.target,
                name: name,
                value: e.target.checked
            }
        });

    return (
        <FormControl>
            <FormControlLabel 
                control={
                    <Checkbox
                        name={name}
                        checked={checked}
                        onChange={e => onChange(convertCheckedEvent(e))}
                        {...other}
                    />}
                label={label}
            />
        </FormControl>
    )
}
