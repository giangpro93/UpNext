import React, {useState} from 'react';
import { Input } from './common/Input';
import { useForm, Form } from './commom/useForm';
import { Divider, Grid, Paper, Typography } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';

const initVals = {
    type: "Event",
    title: '',
    desc: '',
    loc: '',
    start: new Date(),
    end: new Date(),
    freq: 'once',
    remind: false,
    reminder: new Date()
}


export function CreateEventForm(props) {

    const {
        vals, 
        setVals, 
        errs, 
        setErrs, 
        onChange,
        reset
    } = useForm(initVals, validate, true);

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

    function onSubmit(e) {
        e.preventDefault();
        if(validate()) {
            // do something useful
            alert('Success!');
        } else { alert('Failure!')}
    }


    return (
            <Form onSubmit={onSubmit}>
                <Grid container xs={6} spacing={3}>
                    <Grid item xs={12}>
                        <Typography
                            align='left'
                            color='textPrimary'
                            variant='h4'>
                        Create {vals.type}
                        </Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={6} container direction='column' spacing={3}>
                        <Grid item>
                            <Input.RadioGroupInput
                                name='type'
                                label='Event Type'
                                value={vals.type}
                                onChange={onChange}
                                choices={[
                                    {label: 'Event', value: 'Event'},
                                    {label: 'Task', value: 'Task'},
                                    {label: 'Reminder', value: 'Reminder'}
                                ]}
                                row
                                error={errs.type}
                            />
                        </Grid>
                        <Grid item>
                            <Input.TextInput
                                label='Title'
                                name='title'
                                value={vals.title}
                                onChange={onChange}
                                
                                error={errs.title}
                            />
                        </Grid>
                        <Grid item>
                            <Input.TextInput
                                label='Description'
                                name='desc'
                                value={vals.desc}
                                onChange={onChange}
                                multiline
                            />
                        </Grid>
                        <Grid item>
                            <Input.TextInput
                                label='Location'
                                name='loc'
                                value={vals.loc}
                                onChange={onChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={6} container spacing={3} direction='column'>
                        <Grid item>
                            <Input.DateTimeInput
                                name='start'
                                label=
                                    { vals.type === 'Event' ? 'Start' : 
                                    vals.type === 'Task' ? 'Assigned' :
                                    'Reminder Date/Time'
                                    }
                                value={vals.start}
                                onChange={onChange}
                                required
                            />
                        </Grid>
                        <Grid item>
                            <Input.DateTimeInput
                                name='end'
                                label=
                                    { vals.type === 'Event' ? 'End' : 
                                    vals.type === 'Task' ? 'Due' :
                                    ''
                                    }
                                value={vals.type === 'Reminder' ? vals.start : vals.end}
                                onChange={onChange}
                                disabled= {vals.type === 'Reminder'}
                                minDate= {vals.start}
                            />
                        </Grid>
                        <Grid item>
                            <Input.SelectInput
                                name='freq'
                                label='Repeat Frequency'
                                value={vals.freq}
                                onChange={onChange}
                                choices={[
                                    {label: 'Once', value: 'once'},
                                    {label: 'Daily', value: 'daily'},
                                    {label: 'Weekly', value: 'weekly'},
                                    {label: 'Monthly', value: 'monthly'},
                                    {label: 'Yearly', value: 'yearly'}
                                ]}
                            />
                        </Grid>
                        <Grid item>
                            <Input.CheckboxInput
                                name='remind'
                                label='Remind me'
                                checked={vals.remind}
                                onChange={onChange}
                                disabled={vals.type === 'Reminder'}
                            />
                        </Grid>
                        <Grid item>
                            <Input.DateTimeInput
                                name='reminder'
                                label='Reminder'
                                value={vals.reminder}
                                onChange={onChange}
                                disabled={ !vals.remind || vals.type === 'Reminder' }
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Input.ButtonInput
                            label='Reset'
                            onClick={reset}
                            variant='contained'
                            color='secondary'
                            size='large'
                        />
                        <Input.ButtonInput
                            label='Submit'
                            onClick={() => {}}
                            variant='contained'
                            color='primary'
                            size='large'
                            type='submit'
                        />
                    </Grid>
                </Grid>
            </Form>
    )
}