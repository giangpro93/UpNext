import { useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { signup as submitSignup, login as submitLogin } from '../../state/users/actions'
import { Typography } from '@material-ui/core'
import { Input } from '../common/Input'
import { useForm } from '../common/useForm'
import { DialogForm } from '../common/DialogForm'

const PASS_LEN = 8;

const initialSignup = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const initialLogin = {
    email: '',
    password: ''
}


export default function Login() {

    const [signupWindow, setSignupWindow] = useState(false);
    const [loginWindow, setLoginWindow] = useState(false);

    const signup = useForm(initialSignup, validateSignup)
    const login = useForm(initialLogin, validateLogin)

    const usersState = useSelector(state => state.users);
    const dispatch = useDispatch();

    function validateSignup(fields = signup.vals) {
        let errs = {};
        const { firstName, lastName, email, password, confirmPassword } = signup.vals;
        if('firstName' in fields) {
            if(firstName === '') errs.firstName = 'This field is required'
            else if(!firstName.match(/([a-zA-Z])*/)) errs.firstName = 'Names must contain only letters'
        }
        if('lastName' in fields) {
            if(lastName === '') errs.lastName = 'This field is required'
            else if(!lastName.match(/([a-zA-Z])*/)) errs.lastName = 'Names must contain only letters'
        }
        if('email' in fields) {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!email.match(re)) errs.email = 'Provide a valid email address'
        }
        if('password' in fields) {
            if(password.length < PASS_LEN) errs.password = `Password must be at least ${PASS_LEN} characters`
        }
        if('confirmPassword' in fields) {
            if(password !== confirmPassword) errs.confirmPassword = 'Must match the password provided above'
        }

        signup.setErrs(errs);
        if(fields == signup.vals)
            return (Object.keys(errs).length === 0);
    }

    function validateLogin(fields = login.vals) {
        const { email, password } = login.vals;
        let errs = {};

        if('email' in fields) {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!email.match(re)) errs.email = 'Provide a valid email address'
        }
        if('password' in fields) {
            if(password === '') errs.password = 'Provide a password'
        }

        login.setErrs(errs);
        if(fields == login.vals)
            return (Object.keys(errs).length === 0);
    }

    async function onSignupSubmit(e) {
        e.preventDefault();
        if(validateSignup()) {
            // dispatch redux event to try to add the new user
            dispatch(submitSignup(signup.vals));
            // alert('successful sign up')
            setSignupWindow(false);
        }
    }

    async function onLoginSubmit(e) {
        e.preventDefault();
        if(validateLogin()) {
            dispatch(submitLogin(login.vals));
            // alert('successful login')
            setLoginWindow(false);
        }
    }

    return (
        <>
            <Typography variant='h1'>
                UpNext
            </Typography>
            <div>
                <Input.ButtonInput 
                    label='Sign Up' 
                    onClick={() => { setSignupWindow(true); }}
                />
                <Input.ButtonInput 
                    label='Log In'
                    onClick={() => { setLoginWindow(true); }}
                />
            </div>
            <DialogForm 
                open={signupWindow}
                onClose={() => { setSignupWindow(false); }}
                title='Sign Up'
                cancelLabel='Cancel'
                onCancel={() => { setSignupWindow(false); }}
                confirmLabel='Sign Up'
                onConfirm={onSignupSubmit}>
                <Input.TextInput
                    label='First Name'
                    name='firstName'
                    value={signup.vals.firstName}
                    onChange={signup.onChange}
                    error={signup.errs.firstName}
                    helperText={signup.errs.firstName}
                    />
                <Input.TextInput
                    label='Last Name'
                    name='lastName'
                    value={signup.vals.lastName}
                    onChange={signup.onChange}
                    error={signup.errs.lastName}
                    helperText={signup.errs.lastName}
                    />
                <Input.TextInput
                    label='Email'
                    name='email'
                    value={signup.vals.email}
                    onChange={signup.onChange}
                    type='email'
                    error={signup.errs.email}
                    helperText={signup.errs.email}
                    />
                <Input.TextInput
                    label='Create Password'
                    name='password'
                    value={signup.vals.password}
                    onChange={signup.onChange}
                    type='password'
                    error={signup.errs.password}
                    helperText={signup.errs.password}
                    />
                <Input.TextInput
                    label='Confirm Password'
                    name='confirmPassword'
                    value={signup.vals.confirmPassword}
                    onChange={signup.onChange}
                    type='password'
                    error={signup.errs.confirmPassword}
                    helperText={signup.errs.confirmPassword}
                    />
            </DialogForm>
            <DialogForm 
                open={loginWindow}
                onClose={() => { setLoginWindow(false); }}
                title='Log In'
                cancelLabel='Cancel'
                onCancel={() => { setLoginWindow(false); }}
                confirmLabel='Log In'
                onConfirm={onLoginSubmit}>
                <Input.TextInput
                    label='Email'
                    name='email'
                    value={login.vals.email}
                    onChange={login.onChange}
                    type='email'
                    error={login.errs.email}
                    helperText={login.errs.email}
                    />
                <Input.TextInput
                    label='Password'
                    name='password'
                    value={login.vals.password}
                    onChange={login.onChange}
                    type='password'
                    error={login.errs.password}
                    helperText={login.errs.password}
                    />
            </DialogForm>
        </>
    )
}
