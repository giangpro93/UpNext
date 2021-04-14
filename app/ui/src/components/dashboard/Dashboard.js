import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FormHelperText, makeStyles, Typography } from '@material-ui/core';
import '../App.css';
import EventPost from '../common/EventPost';
import TaskPost from '../common/TaskPost';

const api = require('../../api-client/api.js');
const timezone = 'America/Chicago';
const moment = require('moment-timezone');

const useStyles = makeStyles ((theme) => ({
    gridContainer: {
        display: 'grid',
        padding: '10px',
        gridTemplateColumns: 'auto auto',
    },
    column : {
        padding: '10px',
    },
}));

export default function Dashboard(){
    const classes = useStyles();
    const currentUser = useSelector(state => state.users.currentUser);
    const userID = currentUser['id'];
    let today = new Date (moment(new Date(), timezone))
    const [happenning, setHappenning] = useState([])
    const [upcomming, setUpcomming] = useState([])
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        api.schedule.getEntityScheduleById(userID).then(values =>
        {
            values = values.filter(value => 
            {
                if (value.type === "event") {
                    let startDate = new Date (moment(new Date(value.start), timezone));
                    let endDate = new Date (moment(new Date(value.end), timezone));

                    if (endDate < today) {
                        value.happened = true;
                        return false;
                    }
                    if (moment(startDate).isAfter(today, 'day')) {
                        value.future = true;
                        return false;
                    }

                    if (moment(endDate).isAfter(today, 'day')) {
                        value.end = moment(today).endOf('day').format("h:mm a")
                    }
                    else {
                        value.end = moment(endDate).format("h:mm a")
                    }

                    if (moment(startDate).isSame(today, 'day')) {
                        value.start = moment(startDate).format("h:mm a")
                    }
                    else {
                        value.start = moment(today).startOf('day').format("h:mm a")
                    }

                    value.isHappenning = startDate <= today;
                    if (value.isHappenning) {
                        value.allday = value.start === moment(today).startOf('day').format("h:mm a")
                                    && value.end === moment(today).endOf('day').format("h:mm a")
                    }
                    return true;
                }
                if (value.type === "task") {
                    let due = new Date(moment(new Date(value.due), timezone));
                    if (moment(due).isBefore(today) || moment(due).isAfter(today, 'day')) {
                        return false;
                    }
                    value.due = moment(due).format("h:mm a")
                    return true;
                }
                return false;
            });
            setHappenning(values.filter(value => value.type === "event" && value.isHappenning));
            setUpcomming(values.filter(value => value.type === "event" && !value.isHappenning));
            setTasks(values.filter(value => value.type === "task"));
        })
    }, []);

    return (
    <div class={classes.gridContainer}>
        <div class={classes.column}>
            <Typography variant='h5'> Tasks </Typography>
            <div>
            {
                tasks.length === 0 &&
                <Typography variant='caption'> There is no task due today.</Typography>
            }
            </div>
            <div>
            {
                tasks.length > 0 &&
                tasks.map(task => {
                    return <TaskPost
                        title = {task.title}
                        location = {task.location}
                        due = {task.due}
                        desc = {task.description}
                    />
                })
            }
            </div>
        </div>
        <div class={classes.column}>
            <div>
                <Typography variant='h5'> Happenning </Typography>
                {
                    happenning.length === 0 &&
                    <Typography variant='caption'> There is nothing happenning. </Typography>
                }
                {
                    happenning.length > 0 && 
                    happenning.map(event => { 
                        if (event.type === "event") 
                            return <EventPost 
                                title = {event.title}
                                location = {event.location}
                                start = {event.start}
                                end = {event.end}
                                desc = {event.description}
                            />
                    })
                }
            </div>
            <div>
                <Typography variant='h5'> Upcomming Today </Typography>
                {
                    upcomming.length === 0 &&
                    <Typography variant='caption'> There is nothing upcomming today. </Typography>
                }
                {
                    upcomming.length > 0 && 
                    upcomming.map(event => { 
                        if (event.type === "event") 
                            return <EventPost 
                                title = {event.title}
                                location = {event.location}
                                start = {event.start}
                                end = {event.end}
                                desc = {event.description}
                            />
                    })
                }
            </div>
        </div>
    </div>
    )
    
};