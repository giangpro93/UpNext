import React, { Component } from 'react';
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InfoIcon from '@material-ui/icons/Info';
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Tooltip, Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle, Typography,CardMedia,CardContent, TextField, Card, CardHeader, Avatar,IconButton} from '@material-ui/core';
import { useSelector } from 'react-redux'
var owner = false;
const api = require('../../api-client/api.js');
const useStyles = makeStyles((theme) => ({
	  root: {
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap',
		},

		paper: {
			 textAlign: 'center',
			 marginTop: 8,
			 position: 'relative',
			 minWidth: 50,
			 minHeight: 50,
			 width: 'max-content',
			 color: 'white',
			 height: '40%',
			 backgroundColor: '#3CB371',
		},
	  groupNames: {
			 position: 'absolute',
			 top: '50%',
			 left: '50%',
			 transform: 'translate(-50%, -50%)',
			 backgroundColor: 'transparent',
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
		eventBoard: {
			 display: 'flex',
			 color: 'black',
			 position: 'relative',
			 flexDirection: 'row',
		   flexWrap: 'wrap',
		},
		createPostButton: {
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'flex-end',
				marginTop: 16,
		},
		leaveGroupButton: {
			marginLeft: 16,
		},
}));

export default function GroupPage(props) {
	const location = useLocation();
	const [eventWindow, setEventWindow] = useState(false);
	const [infoWindow, setInfoWindow] = useState(false);
	const [groupEvents,setGroupEvents] = useState([]);
	const [eventName,setEventName] = useState('');
	const [eventLocation, setEventLocation] = useState('');
	const [eventStart, setEventStart] = useState('');
	const [eventEnd, setEventEnd] = useState('');
	const [eventDescription, setEventDescription] = useState('');
  var description = location.state.groupDesc;
	if(description == null){
		description = "this is where a description would be if it had one :(";
	}
	var groupEmail = location.state.groupEmail;
	const name = location.state.groupName;
	const currentUser = useSelector(state => state.users.currentUser);
	const groupId = location.state.groupID;
	const isAdmin = location.state.is_admin;
	if(isAdmin === 1){
		owner = true;
	}
	else{
		owner = false;
	}
	var userId = currentUser['id'];
console.log(groupId);
	function changeBackground(e) {
           e.target.style.opacity = '0.5';
	}
	function changeBack(e){
          e.target.style.opacity = '1';
	}
	const history = useHistory();
	function goBack(name,id){
		history.push({
			 pathname: '/groups',
		});
	}



				{/*the block of code below is the broken stuff.*/}

	function fetchGroupData(){
					return Promise.all([
						api.schedule.getEntityScheduleById(groupId)
					]).then((groupSchedule) => {
					return({groupSchedule})
					})
	}

			const groupPromise = fetchGroupData();

			useEffect(() => {
					groupPromise.then(data => {
						setGroupEvents(data.groupSchedule[0]);
					});
				}, [groupPromise]);


			function leaveGroup(){
				var reqObj = { user_id: userId, group_id: groupId};
				console.log(reqObj.user_id)
				console.log(reqObj.group_id)
				const promise = api.memberships.deleteMembership(reqObj);
				promise.then((resp) => {
					console.log(typeof resp);
					console.log(resp);

				})
			}
			function createPost(title,location,start,end,desc){
				var requestVar = {entity_id: groupId, title: title, description: desc,start:start,end:end}
			var reqEvent =	api.schedule.createEvent(requestVar);
			reqEvent.then((resp) => {
				console.log(resp);
				setEventWindow(false);
			})
			}



	        const classes = useStyles()
	        return (
			        <div>
			          <div>
			            <Paper onClick={() => { goBack();}}onMouseOver={changeBackground} onMouseOut={changeBack} className={classes.paper}>
			               <div className={classes.groupNames}> Back </div>
			            </Paper>
			         </div>
				<div className={classes.root}>
				  <h1>{name}</h1>
				<Tooltip title="group description" placement="bottom">
				<IconButton onClick={() => { setInfoWindow(true); }}>
			          <InfoIcon />
			        </IconButton>
				</Tooltip>
				<Button variant="outlined" color="primary" className={classes.leaveGroupButton} onClick={() => { leaveGroup();}}>
								Leave
				</Button>
			       </div>
				<Dialog open={infoWindow} onClose={() => { setInfoWindow(false); }} aria-labelledby="form-dialog-title">
			                                        <DialogTitle id="form-dialog-title">{name}</DialogTitle>
			                                        <DialogContent>
			                                          <DialogContentText>
																									{description}
			                                          </DialogContentText>
			                                        </DialogContent>
								<DialogActions>
			                                          <Button onClick={() => { setInfoWindow(false); }} color="primary">
			                                            Close
			                                          </Button>
			                                        </DialogActions>
			                                      </Dialog>
			<div className={classes.eventBoard}>
				{groupEvents.map(event => (

				<Card key={event.id} className={classes.card}>
			      <CardHeader
			        avatar={
					          <Avatar className={classes.avatar}>
										H
					          </Avatar>
					        }
			        title={event.title}
			        subheader={event.start}
			      />

			      <CardContent>
			        <Typography display='block' variant="subtitle1" color="textSecondary" component="p">
								Location

			        </Typography>
				<Typography display='block' variant="subtitle1" color="textPrimary" component="p">
					{event.description}
				</Typography>
			      </CardContent>
				</Card>
				))}
			</div>
			{owner === true ? (
				         <div className={classes.createPostButton}>
				         	<Button variant="outlined" color="primary" onClick={() => { setEventWindow(true); }}>
				                	Create Event
				                </Button>
						<Dialog open={eventWindow} onClose={() => { setEventWindow(false); }} aria-labelledby="form-dialog-title">
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
										onChange={(e) => setEventName(e.target.value)}
				            fullWidth
				          />
					  <TextField
				            autoFocus
				            margin="dense"
										key = "two"
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
				    	   label="Event Start"
				           type="datetime-local"
									 onChange={(e) => setEventStart(e.target.value)}
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
									 onChange={(e) => setEventEnd(e.target.value)}
				    	   defaultValue="2021-01-24T10:30"
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
									onChange={(e) => setEventDescription(e.target.value)}
					  margin = "dense"
				          variant="filled"
					  fullWidth
					  autoFocus
				        />
				        </DialogContent>
				        <DialogActions>
				          <Button onClick={() => { setEventWindow(false); }} color="primary">
				            Cancel
				          </Button>
				          <Button onClick={() => { createPost(eventName,eventLocation,eventStart,eventEnd,eventDescription); }} color="primary">
				            Post
				          </Button>
				        </DialogActions>
				      </Dialog>
				        </div>
				                                  ) : null}

				</div>
		      );

}
