import React, { Component } from 'react';
import { useLocation } from "react-router-dom";
import { makeStyles,Typography, Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core/';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	  root: {
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap',
				flexGrow: 1,
		},

}));
export default function UserDisplay(props) {
const classes = useStyles()

	return(
																	<Dialog open={props.window} onClose={() => { props.openWindow(false); }} aria-labelledby="form-dialog-title">
																			<DialogTitle >Members</DialogTitle>
																			<DialogContent>
																				<DialogContentText>
																				{props.users.map(user => (
																				<div className={classes.root}>
																				<Typography display='block' variant="subtitle1" color="textSecondary" component="p">
																					{user.name}
																					{(user.is_admin === 1) ? '(Admin)' : ''}
																				</Typography>
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
