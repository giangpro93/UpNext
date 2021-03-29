import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import MySchedule from './MySchedule';
import useAsync from '../../hooks/useAsync';
import { CheckboxInput } from '../common/CheckboxInput';
import { Button, Grid, Typography } from '@material-ui/core';
import ScheduleItemForm from './ScheduleItemForm';
import Snackbar from '../common/Snackbar';
const api = require('../../api-client/api');
const { dateStore } = require('./dateFormat');

export default function Schedule(props) {

    // current user - pulled from Redux store
    const currentUser = useSelector(state => state.users.currentUser);

    const entitiesState = useAsync(() => 
        api.memberships.getGroupsOfUser(currentUser.id)
        .then(res => [currentUser, ...res])
    );
    const allScheduleEntities = useMemo((() =>
        entitiesState.data ? entitiesState.data : []),
        [entitiesState]
    );

    // used as a signal to reload the schedule items
    const [reloadItems, setReloadItems] = useState(0);

    function toggleReloadItems() {
        setReloadItems(prev => prev + 1);
    }

    const itemsState = useAsync(() => 
        api.schedule.getEntityScheduleById(currentUser.id),
        [reloadItems]
    );
    const allScheduleItems = useMemo(
        (() => itemsState.data ? itemsState.data : []),
        [itemsState]
    );

    // all entities that are selected to have their events appear on the schedule
    const [entityFilters, setEntityFilters] = useState([]);

    // holds the value of the type of window to open
    const [createWindow, setCreateWindow] = useState(null);

    // state determinining whether there was an error
    // on an api transaction
    const [error, setError] = useState(false);

    const [success, setSuccess] = useState(false);

    // reset the entity filters when entities are loaded/change
    useEffect(() => {
        if(allScheduleEntities) 
            setEntityFilters(allScheduleEntities)
    }, [allScheduleEntities])

    const entityFilterIds = useMemo(
        (() => entityFilters.map(entity => entity.id)),
        [entityFilters]
    )

    const filteredScheduleItems = useMemo(
        (() => allScheduleItems.filter(item => 
            entityFilterIds.includes(item.entity_id)
        )),
        [allScheduleItems, entityFilterIds]
    );

    const displayedEvents = useMemo(() => {
        let events = [];
        for(let item of filteredScheduleItems) {
            if(item.type === 'event') {
                events.push({
                    title: item.title,
                    start: dateStore(item.start),
                    end: dateStore(item.end),
                    allDay: false,
                    resource: item
                })
            }
            else if(item.type === 'task') {
                // Push an event for the assignment of the task
                events.push({
                    title: `Assigned: ${item.title}`,
                    start: dateStore(item.assigned),
                    end: dateStore(item.assigned),
                    allDay: false,
                    resource: item
                });

                // Push an event for the due date of the task
                events.push({
                    title: `Due: ${item.title}`,
                    start: dateStore(item.due),
                    end: dateStore(item.due),
                    allDay: false,
                    resource: item
                });
            }
            else { // item.type === 'reminder'
                events.push({
                    title: item.title,
                    start: dateStore(item.time),
                    end: dateStore(item.time),
                    allDay: false,
                    resource: item
                });
            }
        }
        return events;
    }, [filteredScheduleItems]);

    function onError(err) {
        setError(true);
    }

    function onSuccess() {
        setSuccess(true);
        toggleReloadItems();
    }

    return (
        <div style={{ padding: 20 }}>
        <Grid
            container
            direction="row"
        >
            <Grid
                item
                container
                xs={3}
                direction="column"
            >
                <Grid item>
                    <Typography 
                        variant="h6"
                    >
                        Selected Calendars
                    </Typography>
                </Grid>
                {allScheduleEntities.map(entity =>
                    <Grid item>
                        <CheckboxInput
                            key={entity.id}
                            name={entity.id}
                            label={entity.name}
                            checked={entityFilterIds.includes(entity.id)}
                            onChange={e => {
                                if(e.target.checked) setEntityFilters(prevFilters => [...prevFilters, entity])
                                else setEntityFilters(prevFilters => prevFilters.filter(entity2 => entity2.id != entity.id))
                            }}
                            color="secondary"
                        />
                    </Grid>
                )}
            </Grid>
            <Grid
                container
                item
                spacing={2}
                direction="column"
                xs={9}
            >
                <Grid item>
                    <MySchedule 
                        events={displayedEvents}
                        onItemUpdate={onSuccess}
                        onError={onError}
                    />
                </Grid>
                <Grid container item spacing={2}>
                    <Grid item>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={() => { setCreateWindow('event') }}
                        >
                        Create Event
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={() => { setCreateWindow('task') }}
                        >
                        Create Task
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={() => { setCreateWindow('reminder') }}
                        >
                        Create Reminder
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <ScheduleItemForm
            type={createWindow}
            mode='create'
            open={Boolean(createWindow)}
            onClose={() => setCreateWindow(null)}
            onSubmit={onSuccess}
            onError={onError}
        />
        <Snackbar
            open={error || success}
            onClose={() => {
                setError(false);
                setSuccess(false);
            }}
            severity={error ? 'error' : 'success'}
            message={error ? 'Error completing transaction' : 'Success'}
        />
        <Snackbar
            open={itemsState.error}
            onClose={() => {}}
            severity='error'
            message='Could not load schedule data'
        />
        <Snackbar
            open={entitiesState.error}
            onClose={() => {}}
            severity='error'
            message='Could not load groups data'
        />
        </div>
    );
}