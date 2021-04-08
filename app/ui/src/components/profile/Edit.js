import React, { Component } from 'react'
import { makeStyles, Paper, Button,TextField} from '@material-ui/core/';
import {useState} from 'react'
import '../App.css'

const useStyles = makeStyles((theme) => ({
    root: {
        width: 350,
        height: 200,
        backgroundColor: 'gray',
        borderColor: 'gray',
        whiteSpace: 'pre-wrap',
      },
}));

export const Edit = () => {
    const [Value, setValue] = useState("This is a default bio. Click here to change it. The text will wrap around like this automatically. All you have to do is enter your description. Thanks!");
    const [EditMode, setEditMode] = useState(false);
    if (EditMode === false && Value == "")
    {
        setValue("Write something about yourself");
    }
    const toggleEditMode = () => setEditMode(!EditMode);
    const classes = useStyles()
    return EditMode ? (
        <textarea
        className={classes.root}
        type="text"
        value={Value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={toggleEditMode}></textarea>
    ) : (
        <span onClick={toggleEditMode}>{Value}</span>
    );
};