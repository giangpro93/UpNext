import React from 'react';
import { useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';
import { DialogForm } from '../common/DialogForm';
import { Input } from '../common/Input';
import { dateInputFormat } from './dateFormat';
const api = require('../../api-client/api');

const eventDefaultVals = {
    type: 'event',
    title: '',
    description: '',
    loc: '',
    start: dateInputFormat(new Date()),
    end: dateInputFormat(new Date()),
    remind: false,
    reminder: dateInputFormat(new Date())
}

const taskDefaultVals = {
    type: 'task',
    title: '',
    description: '',
    loc: '',
    assigned: new Date(),
    due: new Date(),
    remind: false,
    reminder: new Date()
}

const reminderDefaultVals = {
    type: 'reminder',
    title: '',
    description: '',
    loc: '',
    time: new Date()
}

export default function ScheduleItemForm(props) {

    // isCreate : if true, then creation form. Otherwise, update form.
    const { type, mode, initVals, open, onClose, onSubmit, onError } = props;

    const defaultVals = 
        type === 'event' ? eventDefaultVals
        : type === 'task' ? taskDefaultVals
        : reminderDefaultVals;

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
        if('title' in fields) {
            delete es.title;
            if(vals.title === '') es.title = 'Value is required';
        }
        if('end' in fields) {
            delete es.end;
            if(vals.end < vals.start) es.end = 'Date must be after start date';
        }
        if('due' in fields) {
            delete es.due;
            if(vals.due < vals.assigned) es.due = 'Date must be after assigned date';
        }
        setErrs(es);

        if(fields == vals)
            return (Object.keys(es).length === 0);
    }

    function onConfirm() {
        if(validate()) {

            let call;
            if( type === 'event' && mode === 'create') call = api.schedule.createEvent;
            else if(type === 'event' && mode === 'update') call = api.schedule.updateEvent;
            else if(type === 'task' && mode === 'create') call = api.schedule.createTask;
            else if(type === 'task' && mode === 'update') call = api.schedule.updateTask;
            else if(type === 'reminder' && mode === 'create') call = api.schedule.createReminder;
            else if(type === 'reminder' && mode === 'update') call = api.schedule.updateReminder;

            call({...vals, entity_id: currentUser.id})
            .then(res => {
                onSubmit();
                onClose();
            })
            .catch(onError)
        }
    }

    const label = (mode === 'create' ? 'Create ' : 'Update ') + 
        (type === 'event' ? 'Event'
            : type === 'task' ? 'Task'
            : 'Reminder');

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
                {
                    type === 'event' &&
                    <Input.DateTimeInput
                    name='start'
                    label= 'Start Time'
                    value={dateInputFormat(vals.start)}
                    onChange={onChange}
                    required
                    />
                }
                { 
                    type === 'event' &&
                    <Input.DateTimeInput
                        name='end'
                        label= 'End Time'
                        value={dateInputFormat(vals.end)}
                        onChange={onChange}
                        required
                    />
                }
                {
                    type === 'task' &&
                    <Input.DateTimeInput
                        name='assigned'
                        label= 'Assigned'
                        value={dateInputFormat(vals.assigned)}
                        onChange={onChange}
                        required
                    />
                }
                {
                    type === 'task' &&
                    <Input.DateTimeInput
                        name='due'
                        label= 'Due'
                        value={dateInputFormat(vals.due)}
                        onChange={onChange}
                        required
                    />
                }
                {
                    type === 'reminder' &&
                    <Input.DateTimeInput
                        name='time'
                        label= 'Time'
                        value={dateInputFormat(vals.time)}
                        onChange={onChange}
                        required
                    />
                }
                {
                    (type === 'event' || type === 'task') &&
                    <Input.CheckboxInput
                        name='remind'
                        label='Remind Me'
                        checked={vals.remind}
                        onChange={onChange}
                    />
                }
                {
                    (type === 'event' || type === 'task') &&
                    <Input.DateTimeInput
                        name='reminder'
                        label='Reminder'
                        value={dateInputFormat(vals.reminder)}
                        onChange={onChange}
                        disabled={ !vals.remind }
                    />
                }
            </DialogForm>
        </div>
    )
}