import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '../common/Input';
import EditProfileForm from './EditProfileForm';

export default function ProfileCard(props) {
    const { user } = props;
    const currentUser = useSelector(state => state.users.currentUser);
    const [editProfileWindow, setEditProfileWindow] = useState(false);
    
    const isMe = user.id === currentUser.id;
    return (
        <>
        <Card raised variant='outlined'>
            <CardContent>
                <Typography>
                    Name: {user.name}
                </Typography>
                <Typography>
                    Email: {user.email}
                </Typography>
                <Typography>
                    Bio: {user.description}
                </Typography>
            </CardContent>
            <CardActions>
            {isMe &&
                <Input.ButtonInput
                    label='Edit Profile'
                    onClick={() => { setEditProfileWindow(true); }}
                />
            }
            </CardActions>
        </Card>
        <EditProfileForm
            open={editProfileWindow}
            onClose={() => { setEditProfileWindow(false); }}
            />
        </>
    )
}
