import React from 'react';
import {makeStyles, Card, CardHeader, CardContent, Avatar, Typography} from '@material-ui/core';

const useStyles = makeStyles ((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    card: {
        width: 800,
        marginBottom: 16,
        marginRight: 16,
        marginLeft: 16,
        marginTop: 16,
    },
    avatar: {
        backgroundColor: 'blue',
    }
}));

export default function EventPost( props ) {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader
                avatar = {
                    <Avatar className={classes.avatar}>
                        A
                    </Avatar>
                }
                title = {props.title}
                subheader = {props.location}
            />
            <CardContent>
                <Typography display='block' components='p'>
                    Time: {props.time}
                </Typography>
                <Typography display='block' components='p'>
                    Date: {props.date}
                </Typography>
                <Typography display='block' components='p'>
                    {props.desc}
                </Typography>
            </CardContent>
        </Card>  
    )
};