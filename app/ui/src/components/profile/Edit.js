import React, { Component } from 'react'
import { makeStyles, Paper, Button,TextField} from '@material-ui/core/';
import {useState} from 'react'
import '../App.css'
import { useSelector } from 'react-redux'
import { useEffect } from "react";
const api = require('../../api-client/api.js');
const useStyles = makeStyles((theme) => ({
    root: {
        width: 300,
        height: 120,
        backgroundColor: 'gray',
        borderColor: 'gray',
        whiteSpace: 'pre-wrap',
      },
}));

export const Edit = () => {
    //bio message
    const [Value, setValue] = useState("This is a default bio. Click on the text to change it. The text will wrap around like this automatically. All you have to do is enter your description. Thanks!");
    const [EditMode, setEditMode] = useState(false);
    const currentUser = useSelector(state => state.users.currentUser);
    var userId = currentUser['id'];
    useEffect(() => {
      const getDescReq = api.users.getById(userId)
      getDescReq.then((resp) => {
  			setValue(resp.description)
  		});
  	}, []);
    if (EditMode === false && Value == "")
    {
        //blank message
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
