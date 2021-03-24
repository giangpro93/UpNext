import React from 'react';
import useForm from '../../hooks/useForm';
import { DialogForm } from '../common/DialogForm';
import { Input } from '../common/Input';

const defaultVals = {
    type: 'task',
    title: '',
    description: '',
    loc: '',
    assigned: new Date(),
    due: new Date(),
    remind: false,
    reminder: new Date()
}

export default function TaskForm(props) {

    // isCreate : if true, then creation form. Otherwise, update form.
    const { isCreate, initVals, open, onClose, onSubmit } = props;

    const {
        vals, 
        setVals, 
        errs, 
        setErrs, 
        onChange,
        reset
    } = useForm(initVals ? initVals : defaultVals, validate, true);

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
        if('due' in fields) {
            delete es.due;
            if(vals.due < vals.assigned) es.due = 'Due date must be after assigned date';
        }
        setErrs(es);

        if(fields == vals)
            return (Object.keys(es).length === 0);
    }

    function onConfirm() {
        if(validate()) {
            onSubmit();
        }
    }

    const label = (isCreate ? 'Create ' : 'Update ') + 'Task';

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
                    name='assigned'
                    label= 'Assigned'
                    value={vals.start}
                    onChange={onChange}
                    required
                />
                <Input.DateTimeInput
                    name='due'
                    label= 'Due'
                    value={vals.start}
                    onChange={onChange}
                    required
                />
                <Input.CheckboxInput
                    name='remind'
                    label='Remind Me'
                    checked={vals.remind}
                    onChange={onChange}
                    disabled={vals.type === 'reminder'}
                />
                <Input.DateTimeInput
                    name='reminder'
                    label='Reminder'
                    value={vals.reminder}
                    onChange={onChange}
                    disabled={ !vals.remind || vals.type === 'reminder' }
                />
            </DialogForm>
        </div>
    )
}