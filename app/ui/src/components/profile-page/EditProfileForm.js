import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useForm from '../../hooks/useForm';
import { DialogForm } from '../common/DialogForm';
import { Input } from '../common/Input';
import { update } from '../../state/users/actions';
import Snackbar from '../common/Snackbar';

const PASS_LEN = 8;

export default function EditProfileForm(props) {
    const { open, onClose } = props;

    const usersState = useSelector(state => state.users);
    const dispatch = useDispatch();

    const { vals, errs, setErrs, onChange } = useForm({
        ...usersState.currentUser, 
        password: '', 
        confirmPassword: ''}, 
        validate);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);


    function validate(fields = vals) {
        let errs = {};
        const { name, email, password, confirmPassword } = vals;
        if('name' in fields) {
            if(name === '') errs.name = 'Field cannot be empty'
            else if(!name.match(/([a-zA-Z])*/)) errs.name = 'Names must contain only letters';
        }
        if('email' in fields) {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!email.match(re)) errs.email = 'Provide a valid email address';
        }
        if('password' in fields) {
            if(password.length < PASS_LEN && password !== '') errs.password = `Password must be at least ${PASS_LEN} characters`;
        }
        if('confirmPassword' in fields) {
            if(password !== confirmPassword) errs.confirmPassword = 'Must match the password provided above';
        }

        setErrs(errs);
        if(fields == vals)
            return (Object.keys(errs).length === 0);
    }

    function onSubmit() {
        // clean the request object before sending
        const clean = () => {
            let obj = {...vals};
            delete obj.password;
            delete obj.confirmPassword;
            if(vals.password !== '') obj.password = vals.password;
            return {...obj, id: usersState.currentUser.id};
        }

        if(validate()) {
            const req_vals = clean();
            dispatch(update(req_vals))
            .then(res => {
                if(usersState.isError === false) {
                    setSuccess(true);
                    onClose();
                } else setError(true);
            })
            .catch(err => { setError(true); })
        }
    }

    return (
        <>
        <DialogForm
            open={open}
            onClose={onClose}
            onCancel={onClose}
            title='Edit Profile'
            cancelLabel='Cancel'
            confirmLabel='Update'
            onConfirm={onSubmit}
        >
            <Input.TextInput
                label='Name'
                name='name'
                value={vals.name}
                onChange={onChange}
                error={errs.name}
                helperText={errs.name}
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
                label='Bio'
                name='description'
                value={vals.description}
                onChange={onChange}
                type='email'
                error={errs.description}
                helperText={errs.description}
                multiline
                />
            <Input.TextInput
                label='Change Password'
                name='password'
                value={vals.password}
                onChange={onChange}
                type='password'
                error={errs.password}
                helperText={errs.password ? errs.password : 'Leave blank to keep current password'}
                />
            <Input.TextInput
                label='Confirm Changed Password'
                name='confirmPassword'
                value={vals.confirmPassword}
                onChange={onChange}
                type='password'
                error={errs.confirmPassword}
                helperText={errs.confirmPassword}
                />
        </DialogForm>
        <Snackbar
                open={success || error}
                onClose={() => { setSuccess(false); setError(false); }}
                severity={success ? 'success' : 'error'}
                message={success ? 'Profile Update Successful' : 'Profile Update Failed'}
        />
        </>
    )
}
