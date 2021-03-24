import React from 'react';
import { Typography } from '@material-ui/core';
import { DialogForm } from '../common/DialogForm';
import { useSelector } from 'react-redux';

export default function EventView(props) {

    const { item, open, onClose, onEdit, ...other } = props;
    const { id, entity_id, title, description, start, end } = item;

    const currentUser = useSelector(state => state.users.currentUser);

    const allowedToEdit = currentUser.id === entity_id;

    return (
        <div>
            <DialogForm
                open={open}
                onClose={onClose}
                title='View Event'
                cancelLabel='Close'
                onCancel={onClose}
                confirmLabel='Edit'
                onConfirm={onEdit}
                submitDisabled={!allowedToEdit}
            >
                <Typography gutterBottom>
                Title: {title}
                </Typography>
                <Typography gutterBottom>
                Description: {description}
                </Typography>
                <Typography gutterBottom>
                Start: {start}
                </Typography>
                <Typography gutterBottom>
                End: {end}
                </Typography>
            </DialogForm>
        </div>
    )
}
