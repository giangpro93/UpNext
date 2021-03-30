import React from 'react';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { TextInput } from './TextInput';

export function DateTimeInput(props) {

    const {name, label, value, onChange, disabled, ...other} = props;

    return (
        <TextInput
            type="datetime-local"
            name={name}
            label={label}
            value={value}
            disabled={disabled}
            onChange={onChange}
            {...other}
        />
    );
}