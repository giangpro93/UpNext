import React from 'react';
import { useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';
import { DialogForm } from '../common/DialogForm';
import { Input } from '../common/Input';
import api from '../../api-client/api';

const defaultVals = {
    type: 'event',
    title: '',
    description: '',
    loc: '',
    start: new Date(),
    end: new Date(),
    remind: false,
    reminder: new Date()
}

export default function EventForm(props) {

    // isCreate : if true, then creation form. Otherwise, update form.
    const { isCreate, initVals, open, onClose, onSubmit, onError } = props;

    const {
        vals, 
        setVals, 
        errs, 
        setErrs, 
        onChange,
        reset
    } = useForm(initVals ? initVals : defaultVals, validate, true);

    const currentUser = useSelector(state => state.users.currentUser);

    function validate(fields = vals) {
        let es = {...errs};
        if('type' in fields) {
            delete es.type;
            if(vals.type === '') es.type = 'Type is required';
        }
        if('title' in fields) {
            delete es.title;
            if(vals.title === '') es.title = 'Value is required';
        }
        if('end' in fields) {
            delete es.end;
            if(vals.end < vals.start) es.end = 'Date must be after start date';
        }
        setErrs(es);

        if(fields == vals)
            return (Object.keys(es).length === 0);
    }

    function onConfirm() {
        if(validate()) {
            const call = isCreate 
                ? api.schedule.createEvent
                : api.schedule.updateEvent;

            call(isCreate
                ? {...vals, entity_id: currentUser.id}
                : vals)
            .then(res => {
                onSubmit();
                onClose();
            })
            .catch(onError)
        }
    }

    const label = (isCreate ? 'Create ' : 'Update ') + 'Event';

    return (
        <div>
            <DialogForm
                open={open}
                onClose={onClose}
                title={label}
                cancelLabel='Cancel'
                onCancel={onClose}
                confirmLabel={label}
                onConfirm={onConfirm}
            >
                <Input.TextInput
                    label='Title'
                    name='title'
                    value={vals.title}
                    onChange={onChange}
                    required
                />
                <Input.TextInput
                    label='Description'
                    name='description'
                    value={vals.description}
                    onChange={onChange}
                    multiline
                />
                <Input.DateTimeInput
                    name='start'
                    label= 'Start Time'
                    value={vals.start}
                    onChange={onChange}
                    required
                />
                <Input.DateTimeInput
                    name='end'
                    label= 'End Time'
                    value={vals.end}
                    onChange={onChange}
                    required
                />
                <Input.CheckboxInput
                    name='remind'
                    label='Remind Me'
                    checked={vals.remind}
                    onChange={onChange}
                />
                <Input.DateTimeInput
                    name='reminder'
                    label='Reminder'
                    value={vals.reminder}
                    onChange={onChange}
                    disabled={ !vals.remind }
                />
            </DialogForm>
        </div>
    )
}
