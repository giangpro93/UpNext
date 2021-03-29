import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { ConfirmDialog } from '../common/ConfirmDialog';
import api from '../../api-client/api';

export default function EventView(props) {

    const { item, open, onClose, onEdit, onDelete, ...other } = props;
    const { id, entity_id, title, description, start, end } = item;

    const currentUser = useSelector(state => state.users.currentUser);

    const [deleteWindow, setDeleteWindow] = useState(false);

    function deleteItem() {
        api.schedule.deleteScheduleItemById(id)
    }

    const allowedToEdit = currentUser.id === entity_id;

    return (
        <div>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">View Event</DialogTitle>
            <DialogContent dividers>
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
            </DialogContent>
            <DialogActions>
            <Input.ButtonInput 
                label='Close'
                onClick={onClose}
                color="primary" />
            <Input.ButtonInput 
                label='Edit'
                onClick={onEdit}
                color="primary"
                disabled={!allowedToEdit} />
            <Input.ButtonInput 
                label='Delete'
                onClick={onDelete}
                color="secondary"
                disabled={!allowedToEdit} />
            </DialogActions>
        </Dialog>
        <ConfirmDialog
            title="Are you sure you want to delete this event?"
            open={deleteWindow}
            onClose={() => { setDeleteWindow(false) }}
            onConfirm={() => {
                deleteItem()
                .then(onDelete)
                .then(onClose)
                .catch(onError);
            }}
            />
        </div>
    )
}
