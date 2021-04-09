import React, {useState, useEffect, useMemo} from 'react';
import { useSelector } from 'react-redux';
import EntityTile from './EntityTile';
import { Input } from '../common/Input';
import Snackbar from '../common/Snackbar';
import ConfirmDialog from '../common/ConfirmDialog';
import api from '../../api-client/api';
import useAsync from '../../hooks/useAsync';
import { Typography } from '@material-ui/core';

export default function UserTile(props) {
    const { user, paperStyle, ...other } = props;

    const currentUser = useSelector(state => state.users.currentUser);

    // Possible states: null, 'noRelation', 'areFriends', 'pendingMe', 'pendingThem'
    const [friendshipState, setFriendshipState] = useState(null);

    const [deleteWindow, setDeleteWindow] = useState(false);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if(currentUser.id === user.id) { 
            setFriendshipState(null)
        } else {
            api.friends.get({ requester_id: currentUser.id, requested_id: user.id })
            .then(res => {
                if(Boolean(res)) {
                    if(res.is_accepted) setFriendshipState('areFriends');
                    // user has not accepted friend request from currentUser
                    else setFriendshipState('pendingThem');
                } else {
                    api.friends.get({ requester_id: user.id, requested_id: currentUser.id })
                    .then(res2 => {
                        if(Boolean(res2)) {
                            if(res2.is_accepted) setFriendshipState('areFriends');
                            // currentUser has not accepted friend request from user
                            else setFriendshipState('pendingMe');
                        } else {
                            setFriendshipState('noRelation');
                        }
                    })
                }
            })
        }
    }, [success]);

    function onClick() {

    }

    const makeButtons = () => {
        let label = '';
        let func = (() => {});
        let label2 = '';
        let func2 = (() => {});
        if(friendshipState === null) return null;
        else if(friendshipState === 'noRelation') {
            label = 'Add Friend';
            func = () => api.friends.create({requester_id: currentUser.id, requested_id: user.id});
        }
        else if(friendshipState === 'areFriends') {
            label2 = 'Remove Friend';
            func2 = () => api.friends.deleteFriend({id1: currentUser.id, id2: user.id})
        }
        else if(friendshipState === 'pendingMe') {
            label = 'Accept Request';
            func = () => api.friends.acceptFriendRequest({requester_id: user.id, requested_id: currentUser.id});
            label2 = 'Decline Request';
            func2 = () => api.friends.deleteFriend({id1: currentUser.id, id2: user.id});
        }
        else if(friendshipState === 'pendingThem') {
            label = 'Request Pending';
            func = (() => {});
            label2 = 'Delete Request';
            func2 = () => api.friends.deleteFriend({id1: currentUser.id, id2: user.id});
        }

        return (
            <>
                {label ?
                label === 'Request Pending'
                ? <Typography display='inline' variant='subtitle2'>Request Pending...</Typography>
                : <Input.ButtonInput
                    label={label}
                    onClick={() => 
                        func()
                        .then(res => {
                            if(res) setSuccess(true);
                            else setError(true);
                        })
                        .catch(() => { setError(true); })
                    }
                    color='primary'
                />
                : null
                }
                {label2 &&
                <>
                <Input.ButtonInput
                    label={label2}
                    onClick={() => { setDeleteWindow(true);}}
                    color='secondary'
                />
                <ConfirmDialog
                    title="Are you sure you want to perform this action?"
                    open={deleteWindow}
                    onClose={() => { setDeleteWindow(false) }}
                    onConfirm={() =>
                        func2()
                        .then(res => {
                            if(res) setSuccess(true);
                            else setError(true);
                        })
                        .catch(() => { setError(true); })}
                />
                </>
                }   
            </>
        )
    }


    return (
        <>
        <EntityTile
            entity={user}
            paperStyle={paperStyle}
            onClick={onClick}
        >
            {makeButtons()}
        </EntityTile>
        <Snackbar
            open={error || success}
            onClose={() => {
                setError(false);
                setSuccess(false);
            }}
            severity={error ? 'error' : 'success'}
            message={error ? 'Error completing transaction' : 'Success'}
        />
        </>
    )
}
