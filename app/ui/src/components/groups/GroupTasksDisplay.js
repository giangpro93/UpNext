import React, { Component } from 'react';
import { makeStyles,Typography,TextField, Button,Tooltip,Card,CardContent,CardHeader,Avatar,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core/';
import {useHistory} from 'react-router-dom';
import { dateInputFormat, toUTC, format, dateStrFormat } from '../schedule/dates';
import {useState} from 'react';
import { useEffect } from "react";
import GroupTasksEdit from './GroupTasksEdit'
const useStyles = makeStyles((theme) => ({
	  root: {
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap',
				flexGrow: 1,
		},
		eventBoard: {
			 display: 'flex',
			 color: 'black',
			 position: 'relative',
			 flexDirection: 'row',
			 flexWrap: 'wrap',
		},
		card: {
			 width: 345,
			 marginBottom: 16,
			 marginRight: 16,
			 marginLeft: 16,
			 marginTop: 16,
		},
		avatar: {
			 backgroundColor: 'red',
		},
}));
export default function GroupTasksDisplay(props) {
	const[editWindow,setEditWindow] = useState(false)
	const[post,setPost] = useState([]);
 const classes = useStyles()

	return(
		<div className={classes.eventBoard}>
		{props.tasks.map(event => (
			<div>
		<Card key={event.id} className={classes.card}>
				<CardHeader
					avatar={
								<Avatar className={classes.avatar}>
								T
								</Avatar>
							}
					title={event.title}
					subheader=<div><div> {"Assigned: " + dateStrFormat(event.assigned)} </div> {"Due: " + dateStrFormat(event.due)}</div>
				/>

				<CardContent>
					<Typography display='block' variant="subtitle1" color="textSecondary" component="p">
						{event.location}

					</Typography>
		<Typography display='block' variant="subtitle1" color="textPrimary" component="p">
			{event.description}
		</Typography>
		{props.groupOwner === true ? (
			<div>
		<Button onClick={() => { props.deleteEvent(event.id); }} color="primary">
			Delete
		</Button>

		<Button onClick={() => {setEditWindow(true);}} color="primary" >
			Edit
		</Button>
		</div>
		) : null}
				</CardContent>
		</Card>
			<GroupTasksEdit setWindow={setEditWindow} window={editWindow} name={event.title} loc={event.location} start={event.assigned} end={event.due} desc={event.description} pushEdit={props.editLoad} postId={event.id}/>
			</div>
		))}
		</div>


	);

}
