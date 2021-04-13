import { Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import Connect from '../connect/Connect';
import Conversation from './Conversation';

export default function NewMessageDialogBox(props) {

    const { entityId, open, onSend, onClose } = props;
    const [otherId, setOtherId] = useState(null);

    function handleClose() {
        onClose();
        setOtherId(null);
    }

    function handleSend() {
        onSend();
        handleClose();
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen
        >
            <DialogContent>
            <IconButton onClick={handleClose}>
                <CloseIcon />
            </IconButton>
            { otherId 
                ? <Conversation
                    entityId={entityId}
                    otherId={otherId}
                    onUpdate={handleSend}
                />
                :
                <>
                <p style={{textAlign: 'center'}}>
                    <Typography variant='h4'>
                        Send Message
                    </Typography>
                </p>
                <Connect
                    disableButtons={true}
                    onTileClick={entity => { setOtherId(entity.id); }}
                />
                </>
            }
            </DialogContent>
        </Dialog>
    )
}
