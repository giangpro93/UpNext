import React, { Component } from 'react';
import {Typography,TextField, Button,Tooltip,Card,CardContent,CardHeader,Avatar,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core/';
import {useHistory} from 'react-router-dom';
import { dateInputFormat, toUTC, format, dateStrFormat } from '../schedule/dates';
import {useState} from 'react';
import { useEffect } from "react";
const api = require('../../api-client/api.js');
export default function GroupEventsEdit(props) {
	const[eventName,setEventName] = useState(props.name)
	const[eventLocation,setEventLocation] = useState(props.loc)
	const[eventStart,setEventStart] = useState(props.start)
	const[eventEnd,setEventEnd] = useState(props.end)
	const[eventDesc,setEventDesc] = useState(props.desc)
function editPost(){
  var updateData = {id: props.postId, title:eventName, location: eventLocation, description: eventDesc, start: format(toUTC(dateInputFormat(new Date(eventStart)))), end: format(toUTC(dateInputFormat(new Date(eventEnd))))}
	var updateReq = api.schedule.updateEvent(updateData)
	updateReq.then((post) => {
		console.log(post)
		props.pushEdit(true);
		props.setWindow(false);
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
						id="eventName"
						label="Event Name"
						type="email"
						onChange={(e) => setEventName(e.target.value)}
						fullWidth
					/>
		<TextField
						autoFocus
						margin="dense"
						key = "two"
						defaultValue={props.loc}
						id="eventName"
						label="Event Location"
						type="email"
						onChange={(e) => setEventLocation(e.target.value)}
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
				 onChange={(e) => setEventStart(e.target.value)}

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
					 onChange={(e) => setEventEnd(e.target.value)}

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
				onChange={(e) => setEventDesc(e.target.value)}
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
