import React from 'react';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { TextInput } from './TextInput';

export function DateTimeInput(props) {

    const {name, label, value, onChange, ...other} = props;

    return (
        // <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
        //     <DateTimePicker
        //         autoOk
        //         allowKeyboardControl
        //         disablePast
        //         name={name}
        //         label={label}
        //         value={value}
        //         onChange={date => onChange({ target: { name, value: date }})}
        //         fullWidth
        //         {...other}
        //     />
        // </MuiPickersUtilsProvider>
        <TextInput
            type="datetime-local"
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            InputLabelProps={{
                shrink: true,
            }}
        />
    );
}