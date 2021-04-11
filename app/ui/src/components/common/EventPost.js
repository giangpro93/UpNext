import React from 'react';
import {makeStyles, Card, CardHeader, CardContent, Avatar, Typography, Link} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles ((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
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
                subheader = {
                    <Typography display='block' components='p'>
                        {props.start+" - "+props.end+" "}
                        <LocationOnIcon fontSize="inherit"/>
                        <Link href={"http://maps.google.com/maps?q="+props.location}>{props.location}</Link>
                    </Typography>                    
                }
            />
            <CardContent>
                <Typography display='block' components='p'>
                    {props.desc}
                </Typography>
            </CardContent>
        </Card>  
    )
};