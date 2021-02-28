import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import React from 'react'

export function RadioGroupInput(props) {

    // choices : [{label, value}]
    const { label, name, value, onChange, choices, ...other } = props;

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <RadioGroup 
                name={name}
                value={value}
                onChange={onChange}
                {...other}>
                {
                    choices.map( opt => 
                        <FormControlLabel
                            key={opt.label}
                            label={opt.label} 
                            value={opt.value} 
                            control={<Radio />} 
                        />)
                }
            </RadioGroup>
        </FormControl>
    )
}
