import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MySchedule from './MySchedule';
import useAsync from '../../hooks/useAsync';
import { schedule } from '../../api-client/api';
import { CheckboxInput } from '../common/CheckboxInput';
import { Grid, GridItem, Typography } from '@material-ui/core';
const api = require('../../api-client/api');

export default function Schedule(props) {

    // current user - pulled from Redux store
    const currentUser = useSelector(state => state.users.currentUser);

    const entitiesState = useAsync(() => 
        api.memberships.getGroupsOfUser(currentUser.id)
        .then(res => [currentUser, ...res])
    );
    const allScheduleEntities = entitiesState.data ? entitiesState.data : [];

    const itemsState = useAsync(() => api.schedule.getEntityScheduleById(currentUser.id));
    const allScheduleItems = itemsState.data ? itemsState.data : [];

    // all entities that are selected to have their events appear on the schedule
    const [entityFilters, setEntityFilters] = useState([]);

    // reset the entity filters when entities are loaded/change
    useEffect(() => {
        if(allScheduleEntities) 
            setEntityFilters(allScheduleEntities)
    }, [allScheduleEntities])

    const entityFilterIds = entityFilters.map(entity => entity.id);

    const filteredScheduleItems = 
        allScheduleItems.filter(item => 
            entityFilterIds.includes(item.entity_id)
        )

    const displayedEvents = (() => {
        let events = [];
        for(let item of filteredScheduleItems) {
            if(item.type === 'event') {
                events.push({
                    title: item.title,
                    start: new Date(item.start),
                    end: new Date(item.end),
                    allDay: false,
                    resource: item
                })
            }
            else if(item.type === 'task') {
                // Push an event for the assignment of the task
                events.push({
                    title: `Assigned: ${item.title}`,
                    start: new Date(item.assigned),
                    end: new Date(item.assigned),
                    allDay: false,
                    resource: item
                });

                // Push an event for the due date of the task
                events.push({
                    title: `Due: ${item.title}`,
                    start: new Date(item.due),
                    end: new Date(item.due),
                    allDay: false,
                    resource: item
                });
            }
            else { // item.type === 'reminder'
                events.push({
                    title: item.title,
                    start: new Date(item.time),
                    end: new Date(item.time),
                    allDay: false,
                    resource: item
                });
            }
        }
        return events;
    })();

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
                            name={entity.id}
                            label={entity.name}
                            checked={entityFilterIds.includes(entity.id)}
                            onChange={e => {
                                if(e.target.checked) setEntityFilters(prevFilters => [...prevFilters, entity])
                                else setEntityFilters(prevFilters => prevFilters.filter(entity2 => entity2.id != entity.id))
                            }}
                        />
                    </Grid>
                )}
            </Grid>
            <Grid
                item
                xs={9}
            >
            <MySchedule events={displayedEvents}/>
            </Grid>
        </Grid>
        </div>
    );
}