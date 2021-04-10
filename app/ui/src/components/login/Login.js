import { Typography } from '@material-ui/core';
import React, {useState} from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import { Input } from '../common/Input';

export default function Login(props) {
    const [loginOpen, setLoginOpen] = useState(true);
    return (
        <div>
            <p style={{textAlign: 'center', textShadow: '4px 4px #ff0000'}}>
                <Typography variant="h1">
                    UpNext
                </Typography>
            </p>
          {loginOpen
            ? <LoginForm />
            : <SignupForm />
          }
            <p style={{textAlign: 'center'}}>
            {loginOpen
              ? "Need to Register?"
              : "Already registered?"
            }
              {loginOpen
                ? <Input.ButtonInput
                    label='Sign Up'
                    onClick={() => { setLoginOpen(false); }}
                />
                : <Input.ButtonInput
                    label='Log In'
                    onClick={() => { setLoginOpen(true); }}
                />
              }
            </p>

        </div>
    )
}
