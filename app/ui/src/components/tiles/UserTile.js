import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import EntityTile from './EntityTile';
import { Input } from '../common/Input';
import api from '../../api-client/api';

export default function UserTile(props) {
    const { user, paperStyle, ...other } = props;

    const currentUser = useSelector(state => state.users.currentUser);

    // Possible states: null, 'noRelation', 'areFriends', 'pendingMe', 'pendingThem'
    const [friendshipState, setFriendshipState] = useState(null);

    // Possible states: true (on success), false (on failure)
    const actionState = useState(null);

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
                            if(res.is_accepted) setFriendshipState('areFriends');
                            // currentUser has not accepted friend request from user
                            else setFriendshipState('pendingMe');
                        } else {
                            setFriendshipState('noRelation');
                        }
                    })
                }
            })
        }
    }, [actionState]);

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

        const onClick1 = () => {

        }

        // requires verification
        const onClick2 = () => {

        }

        return (
            <>
                {label && 
                <Input.ButtonInput
                    label={label}
                    onClick={onClick1}
                    color='primary'
                />
                }
                {label2 &&
                <Input.ButtonInput
                    label={label2}
                    onClick={onClick2}
                    color='secondary'
                />
                }
            </>
        )
    }


    return (
        <EntityTile
            entity={user}
            paperStyle={paperStyle}
            onClick={onClick}
        >
            {makeButtons()}
        </EntityTile>
    )
}
