import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import { Input } from './Input'

export function DialogForm(props) {

    const { children, open, onClose, title, cancelLabel, onCancel, confirmLabel, onConfirm } = props;

    return (
    <div>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
            <Input.ButtonInput 
                label={cancelLabel}
                onClick={onCancel} 
                color="primary" />
            <Input.ButtonInput 
                label={confirmLabel}
                onClick={onConfirm}
                color="primary" />
            </DialogActions>
        </Dialog>
    </div>
    )
}
