import React from 'react';
import {makeStyles, Card, CardHeader, CardContent, Avatar, Typography, Link, Button, createMuiTheme, ThemeProvider} from '@material-ui/core';
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
        backgroundColor: "lightgrey",
    },
    mybutton1: {
        background: 'linear-gradient(45deg, #3f51b5 30%, #0E9594 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        marginRight: '5px',
        padding: '1px 7px',
    },
    mybutton2: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        marginRight: '5px',
        padding: '1px 7px',
        '&:hover': {
            background: 'white',
            color: '#ff0044',
        },
    },
}));

export default function TaskPost( props ) {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader
                avatar = {
                    <Avatar className={classes.avatar}>
                        <Typography style={{ fontSize: '20px', color: "#33f"}}> 
                            {<b>{props.title[0]}</b>}
                        </Typography>
                    </Avatar>
                }
                title = {<b>{props.title}</b>}
                subheader = {
                    <Typography display='block' components='p'>
                        <Button className={classes.mybutton1}>{props.due}</Button>
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