import React, { Component } from 'react';
import { useLocation } from "react-router-dom";
import { makeStyles,Typography, Button,Card,CardContent,CardHeader,Avatar,Link} from '@material-ui/core/';
import {useHistory} from 'react-router-dom';
import GroupEventsEdit from './GroupEventsEdit'
import {useState} from 'react';
import { useEffect } from "react";
import LocationOnIcon from '@material-ui/icons/LocationOn';
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
	const[eventName,setEventName] = useState('')
	const[eventLocation,setEventLocation] = useState('')
	const[eventStart,setEventStart] = useState('')
	const[eventEnd,setEventEnd] = useState('')
	const[eventDesc,setEventDesc] = useState('')
	const[eventID,setEventID] = useState(0)
const classes = useStyles()
	return(
		<div className={classes.eventBoard}>
			{props.events.map(event => (
				<div key={event.id}>
			<Card key={event.id} className={classes.card}>
					<CardHeader
						avatar={
									<Avatar className={classes.avatar}>
									E
									</Avatar>
								}
						title={event.title}
						subheader= {<div><div> {"Start: " + dateStrFormat(event.start)} </div> {"End: " + dateStrFormat(event.end)}</div>}
					/>

					<CardContent>
						<Typography display='block' variant="subtitle1" color="textSecondary" component="p">
							Location: <LocationOnIcon fontSize="inherit"/>
							<Link href={"http://maps.google.com/maps?q="+event.location}>{event.location}</Link>

						</Typography>
			<Typography display='block' variant="subtitle1" color="textPrimary" component="p">
				{event.description}
			</Typography>
			{props.groupOwner === true ? (
				<div>
			<Button variant='contained' onClick={() => { props.deleteEvent(event.id); }} color="primary">
				Delete
			</Button>

			<Button variant='contained' onClick={() => { setEventName(event.title); setEventLocation(event.location); setEventStart(event.start); setEventEnd(event.end); setEventDesc(event.description); setEventID(event.id); setEditWindow(true);}} color="primary" >
				Edit
			</Button>
			</div>
			) : null}
					</CardContent>
			</Card>
			</div>
			))}
			<GroupEventsEdit setWindow={setEditWindow} window={editWindow} name={eventName} loc={eventLocation} start={eventStart} end={eventEnd} desc={eventDesc} pushEdit={props.editLoad} postId={eventID}/>
			</div>
	);

}
