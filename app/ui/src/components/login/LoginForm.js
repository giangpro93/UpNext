import { useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { login } from '../../state/users/actions'
import { Input } from '../common/Input'
import useForm from '../../hooks/useForm'
import { DialogForm } from '../common/DialogForm'
import Snackbar from '../common/Snackbar';
import { useStyles } from './styles';
import { Avatar, Paper } from '@material-ui/core';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
const initialLogin = {
    email: '',
    password: ''
}


export default function LoginForm(props) {
const classes = useStyles();
    const { open, onClose } = props;

    const {vals, errs, setErrs, onChange} = useForm(initialLogin, validateLogin);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const usersState = useSelector(state => state.users);
    const dispatch = useDispatch();

    function validateLogin(fields = vals) {
        const { email, password } = vals;
        let errs = {};

        if('email' in fields) {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!email.match(re)) errs.email = 'Provide a valid email address'
        }
        if('password' in fields) {
            if(password === '') errs.password = 'Provide a password'
        }

        setErrs(errs);
        if(fields == vals)
            return (Object.keys(errs).length === 0);
    }

    function onLoginSubmit(e) {
        e.preventDefault();
        if(validateLogin()) {
            dispatch(login(vals))
            .then(res => {
                if(usersState.currentUser) {
                    setSuccess(true);
                    onClose();
                }
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
                  label='Email'
                  name='email'
                  value={vals.email}
                  onChange={onChange}
                  type='email'
                  error={errs.email}
                  helperText={errs.email}
                  />
              <Input.TextInput
                  label='Password'
                  name='password'
                  value={vals.password}
                  onChange={onChange}
                  type='password'
                  error={errs.password}
                  helperText={errs.password}
                  />
                  <Input.ButtonInput
                      label='Log In'
                      onClick={onLoginSubmit}
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
              message={success ? 'Login Successful' : 'Login Failed'}
          />
      </div>


    )
}
