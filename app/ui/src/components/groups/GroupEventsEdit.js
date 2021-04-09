import React, { Component } from 'react';
import {Typography,TextField, Button,Tooltip,Card,CardContent,CardHeader,Avatar,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core/';
import {useHistory} from 'react-router-dom';
import { dateInputFormat, toUTC, format, dateStrFormat } from '../schedule/dates';
import {useState} from 'react';
import { useEffect } from "react";
const api = require('../../api-client/api.js');
export default function GroupEventsEdit(props) {
	const[postName,setPostName] = useState(props.name)
	const[postLocation,setPostLocation] = useState(props.loc)
	const[postStart,setPostStart] = useState(props.start)
	const[postEnd,setPostEnd] = useState(props.end)
	const[postDesc,setPostDesc] = useState(props.desc)
function editPost(){
	var name = postName
	var location = postLocation
	var start = postStart
	var end = postEnd
	var desc = postDesc
	if(name.length === 0){
		name = props.name
	}
	if(location.length === 0){
		location = props.loc
	}
	if(start.length === 0){
		start = props.start
	}
	if(end.length === 0){
		end = props.end
	}
	if(desc.length === 0){
		desc = props.desc
		console.log("here: " + desc)
	}


  var updateData = {id: props.postId, title: name, location: location, description: desc, start: format(toUTC(dateInputFormat(new Date(start)))), end: format(toUTC(dateInputFormat(new Date(end))))}
	var updateReq = api.schedule.updateEvent(updateData)
	updateReq.then((post) => {
		console.log(post)
		props.pushEdit(true);
		props.setWindow(false);
		setPostName('')
		setPostLocation('')
		setPostStart('')
		setPostEnd('')
		setPostDesc('')
	})
}
	return(
		<div>
		<Dialog open={props.window} onClose={() => { props.setWindow(false); }} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Edit Event</DialogTitle>
				<DialogContent>
					<DialogContentText>

					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						key = "one"
						defaultValue={props.name}
						id="postName"
						label="Event Name"
						type="email"
						onChange={(e) => setPostName(e.target.value)}
						fullWidth
					/>
		<TextField
						autoFocus
						margin="dense"
						key = "two"
						defaultValue={props.loc}
						id="postName"
						label="Event Location"
						type="email"
						onChange={(e) => setPostLocation(e.target.value)}
						fullWidth
																					/>
		<TextField
		autoFocus
			 id="datetime-local"
			 key = "three"
		 margin="dense"
		 defaultValue={dateInputFormat(new Date(props.start))}
				 label="Start"
					 type="datetime-local"
				 onChange={(e) => setPostStart(e.target.value)}

				 InputLabelProps={{
						shrink: true,
						}}
		fullWidth
		/>
		<TextField
		autoFocus
			 id="datetime-local"
			 key = "five"
		 margin="dense"
				 label="End"
				 defaultValue={dateInputFormat(new Date(props.end))}
					 type="datetime-local"
					 onChange={(e) => setPostEnd(e.target.value)}

				 InputLabelProps={{
						shrink: true,
						}}
		fullWidth
		/>
	<TextField
					id="filled-multiline-static"
					label="Event Description"
					multiline
					key = "four"
					rows={4}
					defaultValue={props.desc}
				onChange={(e) => setPostDesc(e.target.value)}
				margin = "dense"
					variant="filled"
		fullWidth
		autoFocus
				/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => { editPost(); }} color="primary">
						Update
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);

}
