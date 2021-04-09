import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 8,
        marginBottom: 8,
        marginRight: 16,
        position: 'relative',
        minWidth: 800,
        minHeight: 50,
        display: 'flex',
        width: 'max-content',
        alignItems: 'center',
        color: 'black',
        backgroundColor: "white",
        cursor: 'pointer',

        "&:hover": {
            opacity: '0.9'
        }
    }
}));

export default function Tile(props) {
    const { label, caption, body, onClick, children, paperStyle, ...other } = props;
    const classes = useStyles();
    return (
        <Paper
            onClick={onClick}
            className={classes.root} 
            style={paperStyle}
            {...other}
        >
            <div style={{ position: 'absolute', left: '5px' }}>
                <Typography variant='subtitle1'>{label}</Typography>
                {caption && <Typography variant='caption'>{caption}</Typography>}
                {body && <Typography variant='body'>{body}</Typography>}
            </div>
            <div style={{ position: 'absolute', right: '5px' }}>
                {children}
            </div>
        </Paper>
    )
}