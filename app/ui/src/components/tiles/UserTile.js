import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import EntityTile from './EntityTile';
import api from '../../api-client/api';
import UserRelationButtons from '../user/UserRelationButtons';

export default function UserTile(props) {
    const { user, onButtonClickSuccess, paperStyle, ...other } = props;
    const location = useLocation();
    const history = useHistory();


    function onTileClick() {
        api.users.getById(user.id)
        .then(res => {
            if(Boolean(res)) {
                history.push({
                    pathname: '/profile',
                    state: { user_id: user.id, page: location }
                });
            }
        })
    }

    return (
        <>
        <EntityTile
            entity={user}
            paperStyle={paperStyle}
            onClick={onTileClick}
        >
            <UserRelationButtons onClickSuccess={onButtonClickSuccess} user={user} />
        </EntityTile>
        </>
    )
}
