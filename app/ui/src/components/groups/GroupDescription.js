import React, { Component } from 'react';
import { useLocation } from "react-router-dom";
import { makeStyles, Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core/';
import {useHistory} from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';

export default function GroupDescription(props) {

	return(
		<Dialog open={props.window} onClose={() => { props.setWindow(false); }} aria-labelledby="form-dialog-title">
																					<DialogTitle id="form-dialog-title">{props.groupName}</DialogTitle>
																					<DialogContent>
																						<DialogContentText>
																							{props.groupDesc}
																							</DialogContentText>
																							</DialogContent>
																					<DialogActions>
																						<Button onClick={() => { props.setWindow(false); }} color="primary">
																							Close
																						</Button>
																					</DialogActions>
																				</Dialog>
	);

}
