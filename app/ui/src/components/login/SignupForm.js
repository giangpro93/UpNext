import React, {useState} from 'react';
import { Avatar, Paper } from '@material-ui/core';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import useForm from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../state/users/actions';
import Snackbar from '../common/Snackbar';
import { Input } from '../common/Input';
import { useStyles } from './styles';

const PASS_LEN = 8;

const initialSignup = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

export default function SignupForm(props) {
    const classes = useStyles();
    const usersState = useSelector(state => state.users);
    const dispatch = useDispatch();

    const { vals, errs, setErrs, onChange } = useForm(initialSignup, validateSignup);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    
    function validateSignup(fields = vals) {
        let errs = {};
        const { firstName, lastName, email, password, confirmPassword } = vals;
        if('firstName' in fields) {
            if(firstName === '') errs.firstName = 'This field is required'
            else if(!firstName.match(/([a-zA-Z])*/)) errs.firstName = 'Names must contain only letters';
        }
        if('lastName' in fields) {
            if(lastName === '') errs.lastName = 'This field is required'
            else if(!lastName.match(/([a-zA-Z])*/)) errs.lastName = 'Names must contain only letters';
        }
        if('email' in fields) {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!email.match(re)) errs.email = 'Provide a valid email address';
        }
        if('password' in fields) {
            if(password.length < PASS_LEN) errs.password = `Password must be at least ${PASS_LEN} characters`;
        }
        if('confirmPassword' in fields) {
            if(password !== confirmPassword) errs.confirmPassword = 'Must match the password provided above';
        }

        setErrs(errs);
        if(fields == vals)
            return (Object.keys(errs).length === 0);
    }

    function onSignupSubmit(e) {
        e.preventDefault();
        if(validateSignup()) {
            // dispatch redux event to try to add the new user
            dispatch(signup(vals))
            .then(res => {
                if(usersState.currentUser) setSuccess(true);
                else setError(true);
            })
            .catch(() => { setError(true); })
        }
    }

    return (
        <div className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PeopleAltIcon className={classes.icon}/>
                </Avatar>
                <div>
                    <Input.TextInput
                        label='First Name'
                        name='firstName'
                        value={vals.firstName}
                        onChange={onChange}
                        error={errs.firstName}
                        helperText={errs.firstName}
                        />
                    <Input.TextInput
                        label='Last Name'
                        name='lastName'
                        value={vals.lastName}
                        onChange={onChange}
                        error={errs.lastName}
                        helperText={errs.lastName}
                        />
                    <Input.TextInput
                        label='Email'
                        name='email'
                        value={vals.email}
                        onChange={onChange}
                        type='email'
                        error={errs.email}
                        helperText={errs.email}
                        />
                    <Input.TextInput
                        label='Create Password'
                        name='password'
                        value={vals.password}
                        onChange={onChange}
                        type='password'
                        error={errs.password}
                        helperText={errs.password}
                        />
                    <Input.TextInput
                        label='Confirm Password'
                        name='confirmPassword'
                        value={vals.confirmPassword}
                        onChange={onChange}
                        type='password'
                        error={errs.confirmPassword}
                        helperText={errs.confirmPassword}
                        />
                    <Input.ButtonInput
                        label='Sign Up'
                        onClick={onSignupSubmit}
                        className={classes.button}
                        fullWidth
                        disableRipple
                    />
                </div>
            </Paper>
            <Snackbar
                open={success || error}
                onClose={() => { setSuccess(false); setError(false); }}
                severity={success ? 'success' : 'error'}
                message={success ? 'Sign Up Successful' : 'Sign Up Failed'}
            />
        </div>
    )
}
