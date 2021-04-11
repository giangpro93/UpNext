import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import api from '../../api-client/api';
import ProfileCard from './ProfileCard';
import ProfilePageBody from './ProfilePageBody';

export default function ProfilePage() {
    const location = useLocation();
    const currentUser = useSelector(state => state.users.currentUser);
    const user_id = (location && location.state && location.state.user_id) ? location.state.user_id : null;
    const [user, setUser] = useState(null);

    useEffect(() => {
        if(user_id) {
            api.users.getById(user_id)
            .then(u => {
                if(u) setUser(u);
                else setUser(currentUser);
            })
            .catch(err => {
                setUser(currentUser);
            })
        } else setUser(currentUser);
    }, [user_id, currentUser]);

    return (
        user &&
        <div>
            <ProfileCard user={user} />
            <ProfilePageBody user={user} />
        </div>
    )
}
