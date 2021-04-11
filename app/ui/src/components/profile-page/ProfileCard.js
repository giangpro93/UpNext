import { Card, CardActions, CardContent, CardHeader, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '../common/Input';
import EditProfileForm from './EditProfileForm';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UserRelationButtons from '../user/UserRelationButtons';

export default function ProfileCard(props) {
    const { user } = props;
    const currentUser = useSelector(state => state.users.currentUser);
    const [editProfileWindow, setEditProfileWindow] = useState(false);

    const isMe = user.id === currentUser.id;
    const targetUser = isMe ? currentUser : user;
    
    return (
        <div style={{ width: '100%', textAlign: 'center', padding: '20px'}}>
        <Card raised variant='outlined' style={{display: 'block'}}>
            <CardContent>
                <p><AccountCircleIcon style={{ width: '80px', height: '80px'}}/></p>
                <Typography variant="h3">
                    {targetUser.name}
                </Typography>
                <Typography gutterBottom variant="h6">
                   {targetUser.email}
                </Typography>
                <Typography variant='subtitle1'>
                    {targetUser.description}
                </Typography>
            </CardContent>
            <CardActions>
            <div style={{ width: '100%', textAlign: 'center'}}>
            {isMe ?
                <Input.ButtonInput
                    label='Edit Profile'
                    onClick={() => { setEditProfileWindow(true); }}
                    color='primary'
                />
                : <UserRelationButtons user={targetUser} />
            }
            </div>
            </CardActions>
        </Card>
        <EditProfileForm
            open={editProfileWindow}
            onClose={() => { setEditProfileWindow(false); }}
            />
        </div>
    )
}
