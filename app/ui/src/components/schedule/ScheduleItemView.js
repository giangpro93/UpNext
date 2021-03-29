import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Input } from '../common/Input';
import { dateStrFormat } from './dateFormat';

export default function ScheduleItemView(props) {

    const { item, open, onClose, onEdit, onDelete, onError, ...other } = props;
    const { id, entity_id, title, description, type } = item;

    const currentUser = useSelector(state => state.users.currentUser);

    const allowedToEdit = currentUser.id === entity_id;

    return (
        <div>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                View { type === 'event' ? 'Event' : type === 'task' ? 'Task' : 'Reminder'}
            </DialogTitle>
            <DialogContent dividers>
                    
                <Typography gutterBottom>
                Title: {title}
                </Typography>

                <Typography gutterBottom>
                Description: {description}
                </Typography>

                {
                    type === 'event' &&
                    <Typography gutterBottom>
                    Start: {dateStrFormat(item.start)}
                    </Typography>
                }
                {
                    type === 'event' &&
                    <Typography gutterBottom>
                    End: {dateStrFormat(item.end)}
                    </Typography>
                }
                {
                    type === 'task' &&
                    <Typography gutterBottom>
                    Assigned: {dateStrFormat(item.assigned)}
                    </Typography>
                }
                {
                    type === 'task' &&
                    <Typography gutterBottom>
                    Due: {dateStrFormat(item.due)}
                    </Typography>
                }
                {
                    type === 'reminder' &&
                    <Typography gutterBottom>
                    Time: {dateStrFormat(item.time)}
                    </Typography>
                }
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
        </div>
    )
}