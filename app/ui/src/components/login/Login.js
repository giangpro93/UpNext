import { Typography } from '@material-ui/core';
import React, {useState} from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import { Input } from '../common/Input';

export default function Login(props) {
    const [loginOpen, setLoginOpen] = useState(false);
    return (
        <div>
            <p style={{textAlign: 'center', textShadow: '4px 4px #ff0000'}}>
                <Typography variant="h1">
                    UpNext
                </Typography>
            </p>
            <SignupForm />
            <p style={{textAlign: 'center'}}>
                Already registered? 
                <Input.ButtonInput
                    label='Log In'
                    onClick={() => { setLoginOpen(true); }}
                />
            </p>
            
            <LoginForm
                open={loginOpen}
                onClose={() => { setLoginOpen(false); }}
            />
        </div>
    )
}
