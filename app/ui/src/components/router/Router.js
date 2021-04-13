import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Appbar from '../base/Appbar';
import Schedule from '../schedule/Schedule'
import Groups from '../groups/Groups'
import GroupPage from '../groups/GroupPage'
import { useSelector } from 'react-redux';
import Login from '../login/Login'
import ProfilePage from '../profile-page/ProfilePage';
import Profile from '../profile/Profile'
import Connect from '../connect/Connect'
import Dashboard from '../dashboard/Dashboard'
import MessagePage from '../messages/MessagePage';
import MessagesPage from '../messages-page/MessagesPage';
// import Profile from '../profile/Profile'
// const useStyles = makeStyles(theme => ({
//     content: theme.mixins.toolbar
// }))

export function Router() {

    // const classes = useStyles();
    const currentUser = useSelector(state => state.users.currentUser);
    const auth = currentUser ? true : false;

    return (
        <BrowserRouter>
            { auth ? <LoggedIn /> : <Login />}
        </BrowserRouter>
    )
}

function LoggedIn() {
    return (
        <>
            <Appbar />
            <Container >
                <Switch>
                    <Route exact path="/">
                        <Dashboard />
                    </Route>
                    <Route exact path="/schedule">
                        <Schedule />
                    </Route>
                    <Route exact path="/groups">
                        <Groups />
                    </Route>
                    <Route exact path="/groupPage">
                        <GroupPage />
                    </Route>
                    <Route exact path="/connect">
                        <Connect />
                    </Route>
                    <Route exact path="/create">
                        Create
                    </Route>
                    <Route exact path="/messages">
                        {/* <MessagePage /> */}
                        <MessagesPage />
                    </Route>
                    <Route exact path="/profile">
                        {/* <Profile /> */}
                        <ProfilePage />
                    </Route>
                </Switch>
            </Container>
        </>
    )
}
