import React, { Component } from 'react';
import {useState} from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles, Paper, Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,TextField} from '@material-ui/core/';
import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux'
const api = require('../../api-client/api.js');


export default function CreatePost(props) {
	const location = useLocation();
	const history = useHistory();

	return(
	<div>
	<Dialog open={props.evntWindow} onClose={() => { props.setEvntWindow(false); }} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Create Event</DialogTitle>
			<DialogContent>
				<DialogContentText>

				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					key = "one"
					id="eventName"
					label="Event Name"
					type="email"
					onChange={(e) => props.setEvntName(e.target.value)}
					fullWidth
				/>
	<TextField
					autoFocus
					margin="dense"
					key = "two"
					id="eventName"
					label="Event Location"
					type="email"
					onChange={(e) => props.setEvntLoc(e.target.value)}
					fullWidth
																				/>
	<TextField
	autoFocus
		 id="datetime-local"
		 key = "three"
	 margin="dense"
			 label="Event Start"
				 type="datetime-local"
			 onChange={(e) => props.setEvntStart(e.target.value)}
			 defaultValue="2021-01-24T10:30"
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
			 label="Event End"
				 type="datetime-local"
				 onChange={(e) => props.setEvntEnd(e.target.value)}
			 defaultValue="2021-04-24T10:30"
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
			onChange={(e) => props.setEvntDesc(e.target.value)}
			margin = "dense"
				variant="filled"
	fullWidth
	autoFocus
			/>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => { props.setEvntWindow(false); }} color="primary">
					Cancel
				</Button>
				<Button onClick={() => { props.makePost(); }} color="primary">
					Post
				</Button>
			</DialogActions>
		</Dialog>
	</div>

	);

}
