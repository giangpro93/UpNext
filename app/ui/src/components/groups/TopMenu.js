import React, { Component } from 'react';
import { useLocation } from "react-router-dom";
import { makeStyles, Button,IconButton,Tooltip,DialogTitle,DialogContent,DialogContentText,TextField,DialogActions,Dialog} from '@material-ui/core/';
import {useHistory} from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
import { useState } from 'react'
import GroupDescription from './GroupDescription'
import Snackbar from '../common/Snackbar';
import { useEffect } from "react";
const api = require('../../api-client/api.js');
const useStyles = makeStyles((theme) => ({
	  root: {
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap',
				flexGrow: 1,
		},
		topMenuStyle: {
			display: 'flex',
			flexDirection: 'row',
			flexWrap: 'wrap',
			flexGrow: 1,
			justifyContent: 'flex-end',
		},
		leaveGroupButton: {
			marginLeft: 16,
		},
}));
export default function TopMenu(props) {
	const [groupName,setGroupName] = useState(props.namee)
	const [groupEmail, setGroupEmail] = useState(props.email)
	const [groupDesc, setGroupDesc] = useState(props.desc)
	const [editGroupWindow, setEditGroupWindow] = useState(false);
	const [editGroup,setEditGroup] = useState(false)
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [informationWindow,setInformationWindow] = useState(false)
	function editGroupFunc(name,email,desc){

		var updateData={id: props.groupID, name: groupName , email: groupEmail, description: groupDesc}
		var updateReq = api.groups.update(updateData)
		updateReq.then((group) => {
			if(group){
				setSuccess(true);
			}
			else{
				setError(true);
			}
			setEditGroupWindow(false)
		})
		.catch(() => { setError(true); })
	}
const classes = useStyles()
useEffect(() => {

}, [editGroup]);
	return(
		<div className={classes.root}>
			<div className={classes.root}>
				<h1>{groupName}</h1>
				<Tooltip title="Group Description" placement="top">
				<IconButton size="small" onClick={() => { setInformationWindow(true); }}>
								<InfoIcon />
							</IconButton>
				</Tooltip>
				 <GroupDescription window={informationWindow} setWindow={setInformationWindow} groupName={groupName} groupDesc={groupDesc}/>
				<h4 style={{marginLeft: 8,  cursor:'pointer',marginTop: 16}} onClick={() => { props.setUserDisplay(true); }}>
				{props.users.length} Members
				</h4>
			</div>
		<div className={classes.topMenuStyle}>
		{props.isOwner === true ? (
			<Button variant="contained" color="primary" className={classes.leaveGroupButton} onClick={() => { setEditGroupWindow(true);}}>
						Edit
			</Button>
		) : null}
			<Button variant="contained" color="primary" className={classes.leaveGroupButton} onClick={() => { props.leave();}}>
						{props.joined ? 'Leave' : 'Join'}
			</Button>
		</div>
		<Dialog open={editGroupWindow} onClose={() => { setEditGroupWindow(false); }} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Edit Group</DialogTitle>
				<DialogContent>
					<DialogContentText>

					</DialogContentText>
					<TextField
						autoFocus
						defaultValue = {props.namee}
						margin="dense"
						id="eventName"
						label="Group Name"
						onChange={(e) => setGroupName(e.target.value)}
						type="text"
						fullWidth
					/>
					<TextField
					 id="filled-multiline-static"
					 label="Group email"
					 type="text"
					 defaultValue= {props.email}
					 margin = "dense"
					 variant="filled"
					 onChange={(e) => setGroupEmail(e.target.value)}
					 fullWidth
					 autoFocus
					 />
					<TextField
					 id="filled-multiline-static"
					 label="Group Description"
					 multiline
					 defaultValue={props.desc}
					 rows={4}
					 margin = "dense"
					 variant="filled"
					 onChange={(e) => setGroupDesc(e.target.value)}
					 fullWidth
					 autoFocus
					 />


				</DialogContent>
				<DialogActions>
					<Button onClick={() => { setEditGroupWindow(false); }} color="primary">
						Cancel
					</Button>
					<Button onClick={() => {editGroupFunc(groupName,groupEmail,groupDesc);}} color="primary">
						Update
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar
					open={error || success}
					onClose={() => {
							setError(false);
							setSuccess(false);
					}}
					severity={error ? 'error' : 'success'}
					message={error ? 'Error completing transaction' : 'Success'}
			/>
		</div>
	);

}
