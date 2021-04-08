import React, { Component } from 'react';
import { userState } from 'react';
import { useEffect } from 'react';
import { userSelector, useSelector } from 'react-redux';
import '../App.css';
import EventPost from '../common/EventPost'

const api = require('../../api-client/api.js');

function fetchUserFeed(userID) {
    return Promise.all([api.posts.getUserFeed(userID)]).then(posts => posts)
}

export default function Dashboard(){
    const currentUser = useSelector(state => state.users.currentUser);
    const userID = currentUser['id']
    let posts = fetchUserFeed(userID);
    return (
        <div>
            <EventPost 
                title = "Engineering Career Fair"
                location = "KU Memorial Union"
                time = "08:00 - 16:00"
                date = "May - 05 - 2021"
                desc = "Calling all students! The Career and Internship Expo is taking place on February 17th from 10 am – 4pm. This virtual event will be held on the careerfairplus.com platform. You'll be able to sign up for appointments and discover fantastic opportunities with all our employers."
            />
            <EventPost />
        </div>
    )
};