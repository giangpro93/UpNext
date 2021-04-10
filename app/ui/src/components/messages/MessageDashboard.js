import React from 'react'
import MessageSidebar from './MessageSidebar'
import { makeStyles } from '@material-ui/core'
import Chat from './Chat'

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        //background: 'aqua',
        margin: 'auto',
        padding: '10px'
    },
    sideBarDiv: {
        width: '200px',
        height: '100%',
        background: 'red',
        float: 'left'
    },
    chatDiv: {
        marginLeft: '200px',
        height: '100%',
        background: 'black'
    }
}))

export default function MessageDashboard() {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <div className={classes.sideBarDiv}><MessageSidebar /></div>
            <div className={classes.chatDiv}><Chat /></div>
        </div>
    )
}