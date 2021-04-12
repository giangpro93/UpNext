import React, { Component } from 'react';
import {useState} from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles, Paper, Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,TextField, Typography} from '@material-ui/core/';
import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux'
import Snackbar from '../common/Snackbar';
const api = require('../../api-client/api.js');

const useStyles = makeStyles((theme) => ({
	  root: {
		      display: 'flex',
		  		justifyContent: 'flex-start',
		  		flexWrap: 'wrap',
		  		bottomMargin: 16,
		    },

	  groupPaper: {
		      		textAlign: 'center',
		      		marginTop: 16,
		      		marginRight: 16,
		      		position: 'relative',
		      		minWidth: 200,
		      		minHeight: 200,
		      		width: 'max-content',
		     			color: 'white',
		      		height: '40%',
		  				backgroundColor: "#3CB371",
		  				'&:hover': {
							background:'#3CB371',
			},
		  				cursor: 'pointer',

		    },
	groupNames: {
						position: 'absolute',
		  			top: '50%',
		  			left: '50%',
		  			transform: 'translate(-50%, -50%)',
		  			background: 'transparent',
	},
	createGroupButton: {
		  display: 'flex',
			justifyContent: 'flex-end',

	},

}));

export default function Groups(props) {
	const location = useLocation();
	const history = useHistory();
	const classes = useStyles();
	var [createGroupName,setCreateGroupName] = useState('');
	var [createGroupDesc,setCreateGroupDesc] = useState('');
	var [createGroupEmail,setCreateGroupEmail] = useState('');
	var [loadNewGroup,setLoadNewGroup] = useState(true);
	const currentUser = useSelector(state => state.users.currentUser);
	var id = currentUser['id'];
	const [groupTiles, setGroupTiles] = useState([]);
	const [createGroupWindow, setCreateGroupWindow] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

  function changeBackground(e) {
	   e.target.style.opacity = '0.5';
	}

	function changeBack(e){
    e.target.style.opacity = '1';
	}
	function goToGroupPage(name,id,desc,email,admin){
		history.push({
		   pathname: '/groupPage',
		   state: { groupName: name, groupID: id, groupDesc: desc, groupEmail: email, is_admin: admin, isMember: true, page: "group"}
		});
  }
	function createGroup(name,desc,email){
		setCreateGroupWindow(false);
		var reqData = {name: name,email: email, description: desc};
		var responsePromise = api.groups.create(reqData);
		responsePromise.then((resp) => {
			addToNewGroup(resp);
		})
	}


	function addToNewGroup(group){

		var addData = {user_id: id, group_id: group.id, is_admin: 1}
		var newGroupPromise = api.memberships.create(addData);
		newGroupPromise.then((resp) => {
			if(resp){
				setSuccess(true);
			}
			else{
				setError(true);
			}
			setLoadNewGroup(true);
		})
		.catch(() => { setError(true); })
	}

{/* useEffect is where the groupTiles array is actually populated. useEffect will re-render the components that have just come in.*/}
	useEffect(() => {
		var groupPromise = api.memberships.getGroupsOfUser(id)
		groupPromise.then(data => {

			setGroupTiles(data);

		});
		setLoadNewGroup(false);
	}, [loadNewGroup]);
	return (
	<div>
	<div>
		<div className={classes.createGroupButton}>
		 <Button variant="contained" color="primary" onClick={() => { setCreateGroupWindow(true); }} style={{marginTop: 8}}>
						 Create Group
		 </Button>
		</div>
		<Typography variant='h4'>My Groups </Typography>
		</div>
	  <div className={classes.root}>

		{

groupTiles.map(group => (
	<Paper key={group.id} onClick={() => goToGroupPage(group.name,group.id,group.description,group.email,group.is_admin)} onMouseOver={changeBackground} onMouseOut={changeBack} className={classes.groupPaper}>
		<div className={classes.groupNames}>{group.name}</div>
	</Paper>
))
   }

	 </div>
	 <Dialog open={createGroupWindow} onClose={() => { setCreateGroupWindow(false); }} aria-labelledby="form-dialog-title">
			 <DialogTitle id="form-dialog-title">Create Group</DialogTitle>
			 <DialogContent>
				 <DialogContentText>

				 </DialogContentText>
				 <TextField
					 autoFocus
					 margin="dense"
					 id="eventName"
					 label="Group Name"
					 onChange={(e) => setCreateGroupName(e.target.value)}
					 type="text"
					 fullWidth
				 />
				 <TextField
					id="filled-multiline-static"
					label="Group email"
					type="text"
					margin = "dense"
					variant="filled"
					onChange={(e) => setCreateGroupEmail(e.target.value)}
					fullWidth
					autoFocus
					/>
				 <TextField
					id="filled-multiline-static"
				  label="Group Description"
				  multiline
				  rows={4}
					margin = "dense"
					variant="filled"
					onChange={(e) => setCreateGroupDesc(e.target.value)}
					fullWidth
					autoFocus
					/>


			 </DialogContent>
			 <DialogActions>
				 <Button onClick={() => { setCreateGroupWindow(false); }} color="primary">
					 Cancel
				 </Button>
				 <Button onClick={() => { createGroup(createGroupName,createGroupDesc,createGroupEmail);}} color="primary">
					 Create
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
