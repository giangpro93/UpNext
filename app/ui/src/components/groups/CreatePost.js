import React, { Component } from 'react';
import { Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,TextField,FormControl,FormLabel,RadioGroup,FormControlLabel,Radio} from '@material-ui/core/';
import {useHistory} from 'react-router-dom';



export default function CreatePost(props) {
	const handleChange = (event) => {
		 props.setEvntType(event.target.value)
	 };

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
			 label="Start"
			 defaultValue="2021-04-14T12:15"
				 type="datetime-local"
			 onChange={(e) => props.setEvntStart(e.target.value)}
			 InputLabelProps={{
					shrink: true,
					}}
	fullWidth
	/>
	{props.evntType === "Task" ? (
	<TextField
	autoFocus
		 id="datetime-local"
		 key = "five"
	 margin="dense"
			 label="End"
				 type="datetime-local"
				 onChange={(e) => props.setEvntEnd(e.target.value)}
			 defaultValue="2021-04-14T12:30"
			 InputLabelProps={{
					shrink: true,
					}}
	fullWidth
	/>
	) :
	<TextField
	autoFocus
		 id="datetime-local"
		 key = "five"
	 margin="dense"
			 label="End"
				 type="time"
				 onChange={(e) => props.setEvntEnd(props.evntStart.substring(0,11) + e.target.value)}
			 defaultValue="12:30"
			 InputLabelProps={{
					shrink: true,
					}}
	fullWidth
	/>


	}
	<FormControl component="fieldset">
  <FormLabel component="legend">Type</FormLabel>
  <RadioGroup aria-label="Type" name="Type1" value={props.evntType} onChange={handleChange} >
    <FormControlLabel value="Event" control={<Radio />} label="Event" />
    <FormControlLabel value="Task" control={<Radio />} label="Task" />
  </RadioGroup>
</FormControl>
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
