import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import '../App.css';
import EventPost from '../common/EventPost'
import useAsync from '../../hooks/useAsync';

const api = require('../../api-client/api.js');
const timezone = 'America/Chicago';
const moment = require('moment-timezone');


export default function Dashboard(){
    const currentUser = useSelector(state => state.users.currentUser);
    const userID = currentUser['id'];
    let today = new Date (moment(new Date(), timezone))
    const [posts, setPosts] = useState([])
    const [happenning, setHappenning] = useState([])
    const [upcomming, setUpcomming] = useState([])
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
                return false;
            });
            setHappenning(values.filter(value => value.isHappenning));
            setUpcomming(values.filter(value => !value.isHappenning));

                // if (post.type === "task") {
                //     let due = new Date(dateStore(post.due));
                //     return (today <= due && today.getDate() === due.getDate() 
                //                          && today.getMonth() === due.getMonth() 
                //                          && today.getYear() == due.getYear())
                // }
                // else if (post.type === "reminder") {
                //     let time = new Date(dateStore(post.time));
                //     return (today.getDate() === time.getDate() 
                //          && today.getMonth() === time.getMonth() 
                //          && today.getYear() == time.getYear())
                // }
        })
    }, []);

    return (
    <div>
        <div>
            <h3> Happenning </h3>
            {
                happenning.length === 0 &&
                <p> "There is nothing happenning" </p>
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
            <h3> Upcomming Today </h3>
            {
                upcomming.length === 0 &&
                "There is nothing upcomming today"
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
    )
    
};