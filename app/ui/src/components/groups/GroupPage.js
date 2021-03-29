import React, { Component } from 'react';
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InfoIcon from '@material-ui/icons/Info';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import useForm from '../../hooks/useForm'
import { DialogForm } from '../common/DialogForm'
import { useLocation } from "react-router-dom";
import { FormControl,Tooltip, InputLabel,Box,List, Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle, Typography, Input,CardMedia,CardContent, FormHelperText, TextField, Tabs, Tab, Card, CardHeader, Avatar,IconButton,CardActions,FavoriteButton,Collapse} from '@material-ui/core';
import {MoreVertIcon} from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux'
import clsx from 'clsx';
var owner = true;
var events = [["Hunter","Event Name","location","time","ImgLocation(Optional)","This is the description of the event and will be how people descibe the events themselves."]];
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
	const [value, setValue] = useState('one');
  var description = location.state.groupDesc;
	if(description == null){
		description = "this is where a description would be if it had one :(";
	}
	var groupEmail = location.state.groupEmail;
	const name = location.state.groupName;
	const currentUser = useSelector(state => state.users.currentUser);
	const groupId = location.state.groupID;
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
	  const handleChange = (event, newValue) => {
		      setValue(newValue);
		    };


				{/*the block of code below is the broken stuff.*/}

{/*	function fetchGroupData(){
				var reqObj = {user_id: userID, group_id: groupID};
					return Promise.all([
						api.memberships.get(reqObj);
					]).then((groupInformation) => {
					return({groupInformation})
					})
	}

			const groupPromise = fetchGroupData();

			useEffect(() => {
					groupPromise.then(data => {
						console.log(data);
					});
				}, []);

*/}
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
				<Button variant="outlined" color="#3CB371" className={classes.leaveGroupButton} onClick={() => { leaveGroup();}}>
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
				{events.map(eventt => (

				<Card className={classes.card}>
			      <CardHeader
			        avatar={
					          <Avatar className={classes.avatar}>
						{eventt[0][0]}
					          </Avatar>
					        }
			        title={eventt[1]}
			        subheader={eventt[3]}
			      />

			      <CardContent>
			        <Typography display='block' variant="subtitle1" color="textSecondary" component="p">
			         	Location: {eventt[2]}

			        </Typography>
				<Typography display='block' variant="subtitle1" color="textPrimary" component="p">
					{eventt[5]}
				</Typography>
			      </CardContent>
				</Card>
				))}
			</div>
			{owner == true ? (
				         <div className={classes.createPostButton}>
				         	<Button variant="outlined" color="#3CB371" onClick={() => { setEventWindow(true); }}>
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
				            id="eventName"
				            label="Event Name"
				            type="email"
				            fullWidth
				          />
					  <TextField
				            autoFocus
				            margin="dense"
				            id="eventName"
				            label="Event Location"
				            type="email"
				            fullWidth
				                                          />
					  <TextField
					  autoFocus
				   	   id="datetime-local"
					   margin="dense"
				    	   label="Event Time"
				           type="datetime-local"
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
				          rows={4}
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
				          <Button onClick={() => { setEventWindow(false); }} color="primary">
				            Post
				          </Button>
				        </DialogActions>
				      </Dialog>
				        </div>
				                                  ) : null}

				</div>
		      );

}
