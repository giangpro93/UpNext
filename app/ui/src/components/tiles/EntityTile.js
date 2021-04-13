import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '../common/Input';
import NewMessageDialogBox from '../messages-page/NewMessageDialogBox';
import Tile from './Tile';


export default function EntityTile(props) {
    const { entity, onClick, children, paperStyle, ...other } = props;
    const currentUser = useSelector(state => state.users.currentUser);
    const [openMessageWindow, setOpenMessageWindow] = useState(false);
    return (
        <>
            <Tile
                label={entity.name}
                caption={entity.email}
                onClick={onClick}
                paperStyle={paperStyle}
            >
                <>
                {children}
                {currentUser.id !== entity.id &&
                    <Input.ButtonInput
                        label='Message'
                        onClick={() => { setOpenMessageWindow(true); }}
                    />
                }
                </>
            </Tile>
            <NewMessageDialogBox
                entityId={currentUser.id}
                other_id={entity.id}
                open={openMessageWindow}
                onSend={() => { setOpenMessageWindow(false); }}
                onClose={() => { setOpenMessageWindow(false); }}
            />
        </>
    )
}
