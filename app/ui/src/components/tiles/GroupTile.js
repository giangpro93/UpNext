import React, {useState, useEffect, useMemo} from 'react';
import { useSelector } from 'react-redux';
import EntityTile from './EntityTile';
import { Input } from '../common/Input';
import Snackbar from '../common/Snackbar';
import ConfirmDialog from '../common/ConfirmDialog';
import api from '../../api-client/api';

export default function GroupTile(props) {
    const { group, paperStyle, ...other } = props;

    const currentUser = useSelector(state => state.users.currentUser);

    // Possible states: false (not a member), true (is member)
    const [membershipState, setMembershipState] = useState(null);

    const [deleteWindow, setDeleteWindow] = useState(false);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        api.memberships.get({ user_id: currentUser.id, group_id: group.id })
        .then(res => {
            if(res.user_id) setMembershipState(true);
            else setMembershipState(false);
        })
        .catch(() => { setMembershipState(false); })
    }, [success]);

    function onClick() {

    }

    const makeButtons = () => {
        return (
            <>
                {membershipState === false &&
                <Input.ButtonInput
                    label='Join Group'
                    onClick={() => 
                        api.memberships.create({user_id: currentUser.id, group_id: group.id, is_admin: false})
                        .then(res => {
                            if(res) setSuccess(true);
                            else setError(true);
                        })
                        .catch(() => { setError(true); })
                    }
                    color='primary'
                />
                }
                {membershipState === true &&
                <>
                <Input.ButtonInput
                    label='Leave Group'
                    onClick={() => { setDeleteWindow(true);}}
                    color='secondary'
                />
                <ConfirmDialog
                    title="Are you sure you want to leave this group?"
                    open={deleteWindow}
                    onClose={() => { setDeleteWindow(false) }}
                    onConfirm={() =>
                        api.memberships.deleteMembership({user_id: currentUser.id, group_id: group.id})
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
            entity={group}
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