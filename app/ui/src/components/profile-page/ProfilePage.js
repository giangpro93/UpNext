import React from 'react';
import { useSelector } from 'react-redux';
import ProfileCard from './ProfileCard';

export default function ProfilePage() {
    const currentUser = useSelector(state => state.users.currentUser);    
    return (
        <div>
            <ProfileCard user={currentUser} />
            
        </div>
    )
}
