import React, { Component } from 'react';
import { useLocation } from "react-router-dom";
import { makeStyles,Typography, Button,Card,CardContent,CardHeader,Avatar} from '@material-ui/core/';
import {useHistory} from 'react-router-dom';

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
const classes = useStyles()
	return(
		<div className={classes.eventBoard}>
			{props.events.map(event => (

			<Card key={event.id} className={classes.card}>
					<CardHeader
						avatar={
									<Avatar className={classes.avatar}>
									E
									</Avatar>
								}
						title={event.title}
						subheader= <div><div> {event.start} </div> {event.end}</div>
					/>

					<CardContent>
						<Typography display='block' variant="subtitle1" color="textSecondary" component="p">
							{"Location: " + event.location}

						</Typography>
			<Typography display='block' variant="subtitle1" color="textPrimary" component="p">
				{event.description}
			</Typography>
			{props.groupOwner === true ? (
			<Button onClick={() => { props.deleteEvent(event.id); }} color="primary">
				Delete
			</Button>
			) : null}
					</CardContent>
			</Card>
			))}
			</div>
	);

}
