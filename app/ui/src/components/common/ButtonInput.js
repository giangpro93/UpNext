import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    }
}));

export function ButtonInput(props) {

    const { label, onClick, ...other } = props;

    const classes = useStyles();

    return (
            <Button
                classes={{root: classes.root, label: classes.label}}
                onClick={onClick}
                variant='contained'
                {...other}>
                {label}
            </Button>
    );
}
