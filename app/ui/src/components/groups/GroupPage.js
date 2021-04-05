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
				marginBottom: 16,
		},
		leaveGroupButton: {
			marginLeft: 16,
		},
		userPaper: {
			width: 200,
			height: 50,
			marginTop: 8,
			marginBottom: 8,
		},
}));

export default function GroupPage(props) {
	const location = useLocation();
	const [eventWindow, setEventWindow] = useState(false);
	const [infoWindow, setInfoWindow] = useState(false);
	const [groupEvents,setGroupEvents] = useState([]);
	const [groupReminders,setGroupReminders] = useState([]);
	const [groupTasks, setGroupTasks] = useState([]);
	const [eventName,setEventName] = useState('');
	const [eventLocation, setEventLocation] = useState('');
	const [eventStart, setEventStart] = useState('');
	const [eventEnd, setEventEnd] = useState('');
	const [eventDescription, setEventDescription] = useState('');
	const [loadCreatePost, setLoadCreatePost] = useState(false);
	const [groupUsers, setGroupUsers] = useState([]);
	const [joinedGroup, setJoinedGroup] = useState(location.state.isMember);
  var description = location.state.groupDesc;
	if(description == null){
		description = "this is where a description would be if it had one :(";
	}
	var groupEmail = location.state.groupEmail;
	const name = location.state.groupName;
	const currentUser = useSelector(state => state.users.currentUser);
	const groupId = location.state.groupID;
	const isAdmin = location.state.is_admin;
	var is_member = location.state.isMember;
	var prevPage  = location.state.page;
	if(isAdmin === 1){
		owner = true;
	}
	else{
		owner = false;
	}
	var userId = currentUser['id'];
	function changeBackground(e) {
           e.target.style.opacity = '0.5';
	}
	function changeBack(e){
          e.target.style.opacity = '1';
	}
	const history = useHistory();
	function goBack(name,id){
		var push = ''
		if(prevPage === "connect"){
			push = '/connect'
		}
		else{
			push = '/groups'
		}
		history.push({
			 pathname: push,
		});
	}





			useEffect(() => {
				var events = []
				var reminders = []
				var tasks = []
				var groupPromise = api.schedule.getEntityScheduleById(groupId);
					groupPromise.then(data => {
						for(var post = 0; post<data.length; post++){
							if(data[post].type === 'event'){
								data[post].start = "Date: " + data[post].start.substring(0,10);
								events.push(data[post]);
							}
							if(data[post].type === 'reminder'){
								data[post].time = "Date: " + data[post].time.substring(0,10);
								reminders.push(data[post]);
							}
							if(data[post].type === 'task'){
								data[post].due = "Date: " + data[post].due.substring(0,10);
								tasks.push(data[post]);
							}
						}
						events.sort(function(a, b){
							if(a.start.substring(12,16) < b.start.substring(12,16)){
								return -1;
							}
							else{
								return 1;
							}
						})
						reminders.sort(function(a, b){
							if(a.time.substring(12,16) < b.time.substring(12,16)){
								return -1;
							}
							else{
								return 1;
							}
						})
						tasks.sort(function(a, b){
							if(a.due.substring(12,16) < b.due.substring(12,16)){
								return -1;
							}
							else{
								return 1;
							}
						})
						var userPromise = api.memberships.getUsersOfGroup(groupId)
						userPromise.then((users) => {
							console.log(users)
						})
						setGroupEvents(events);
						setGroupTasks(tasks);
						setGroupReminders(reminders);
						setLoadCreatePost(false);
					});
				}, [loadCreatePost, joinedGroup]);


			function leaveGroup(){
				if(joinedGroup){
				var reqObj = { user_id: userId, group_id: groupId};
				console.log(reqObj.user_id)
				console.log(reqObj.group_id)
				const promise = api.memberships.deleteMembership(reqObj);
				promise.then((resp) => {
					setJoinedGroup(false)
				})
			}
			else{
				var addData = {user_id: userId, group_id: groupId, is_admin: 0}
				var newGroupPromise = api.memberships.create(addData);
				newGroupPromise.then((resp) => {
					console.log(resp);
				})
				setJoinedGroup(true)
			}
			}
			function createPost(title,location,start,end,desc){
				var requestVar = {entity_id: groupId, title: title, location: location, description: desc,start:start,end:end}
			var reqEvent =	api.schedule.createEvent(requestVar);
			reqEvent.then((resp) => {
				console.log(resp);
				setEventWindow(false);
				setLoadCreatePost(true);
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
							{joinedGroup ? 'Leave' : 'Join'}
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
			<h2> Events </h2>
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
								{event.location}

			        </Typography>
				<Typography display='block' variant="subtitle1" color="textPrimary" component="p">
					{event.description}
				</Typography>
			      </CardContent>
				</Card>
				))}
				</div>
				<h2> Reminders </h2>
				<div className={classes.eventBoard}>
				{groupReminders.map(event => (

				<Card key={event.id} className={classes.card}>
						<CardHeader
							avatar={
										<Avatar className={classes.avatar}>
										H
										</Avatar>
									}
							title={event.title}
							subheader={event.time}
						/>

						<CardContent>
							<Typography display='block' variant="subtitle1" color="textSecondary" component="p">
								{event.location}

							</Typography>
				<Typography display='block' variant="subtitle1" color="textPrimary" component="p">
					{event.description}
				</Typography>
						</CardContent>
				</Card>
				))}
				</div>
				<h2> Tasks </h2>
				<div className={classes.eventBoard}>
				{groupTasks.map(event => (

				<Card key={event.id} className={classes.card}>
						<CardHeader
							avatar={
										<Avatar className={classes.avatar}>
										H
										</Avatar>
									}
							title={event.title}
							subheader={event.due}
						/>

						<CardContent>
							<Typography display='block' variant="subtitle1" color="textSecondary" component="p">
								{event.location}

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
