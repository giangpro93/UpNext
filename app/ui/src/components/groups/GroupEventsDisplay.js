import React, { Component } from 'react';
import { useLocation } from "react-router-dom";
import { makeStyles,Typography, Button,Card,CardContent,CardHeader,Avatar} from '@material-ui/core/';
import {useHistory} from 'react-router-dom';
import GroupEventsEdit from './GroupEventsEdit'
import {useState} from 'react';
import { useEffect } from "react";
import { dateInputFormat, toUTC, format, dateStrFormat } from '../schedule/dates';
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
export default function GroupEventsDisplay(props) {
	const[editWindow,setEditWindow] = useState(false)
const classes = useStyles()
	return(
		<div className={classes.eventBoard}>
			{props.events.map(event => (
				<div>
			<Card key={event.id} className={classes.card}>
					<CardHeader
						avatar={
									<Avatar className={classes.avatar}>
									E
									</Avatar>
								}
						title={event.title}
						subheader= <div><div> {"Start: " + dateStrFormat(event.start)} </div> {"End: " + dateStrFormat(event.end)}</div>
					/>

					<CardContent>
						<Typography display='block' variant="subtitle1" color="textSecondary" component="p">
							{"Location: " + event.location}

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
			<GroupEventsEdit setWindow={setEditWindow} window={editWindow} name={event.title} loc={event.location} start={event.start} end={event.end} desc={event.description} pushEdit={props.editLoad} postId={event.id}/>
			</div>
			))}
			</div>
	);

}
