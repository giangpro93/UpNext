import React, { Component } from 'react';
import { useLocation } from "react-router-dom";
import { makeStyles,Typography, Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core/';
import {useHistory} from 'react-router-dom';
import UserTile from '../tiles/UserTile';
const useStyles = makeStyles((theme) => ({
	  root: {
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap',
				flexGrow: 1,
		},

}));
export default function UserDisplay(props) {
const classes = useStyles();
var users = [];
var admins = [];
for(var i=0; i<props.users.length; i++){
	if(props.users[i].is_admin === 1){
		admins.push(props.users[i]);
	}
	else{
		users.push(props.users[i]);
	}
}
	return(
																	<Dialog maxWidth={'lg'}  open={props.window} onClose={() => { props.openWindow(false); }} aria-labelledby="form-dialog-title">
																			<DialogTitle >Members</DialogTitle>
																			<DialogContent>
																				<DialogContentText>
																				Admins:
																				{admins.map(user => (
																				<div className={classes.root}>
																				<UserTile key={user.id} user={user} />
																			</div>
																				))}
																				Members:
																				{users.map(user => (
																				<div className={classes.root}>
																				<UserTile key={user.id} user={user} />
																				{(props.isOwner === true && user.is_admin === 0) ? (
																			<Button color="primary" onClick={() => { props.makeAdmin(user.id); }}>
																				Make Admin
																			</Button>
																			) : null}
																			</div>
																				))}
																				</DialogContentText>
																				</DialogContent>
																				<DialogActions>
																				 <Button onClick={() => { props.openWindow(false); }} color="primary">
																					 Close
																				 </Button>
																			 </DialogActions>
																		 </Dialog>
	);

}
