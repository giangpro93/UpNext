import React, { Component } from 'react';
import {useState} from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles, Paper, Grid, Button, Box,Typography,AppBar,Tabs,Tab,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,TextField} from '@material-ui/core/';
import {Redirect,useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux'
const api = require('../../api-client/api.js');
const { axiosInstance } = require('../../api-client/api-client.js');

const useStyles = makeStyles((theme) => ({
	  root: {
		      display: 'flex',
		  		justifyContent: 'flex-start',
		  		flexWrap: 'wrap',
		  		bottomMargin: 16,

		    },
	nothingPaper:{
	 						textAlign: 'center',
		          marginTop: 8,
		          marginLeft: 4,
				      marginBottom: 16,
		          position: 'relative',
		          minWidth: 200,
		          minHeight: 200,
				      outline: 'none',
		          width: 'max-content',
		          color: 'white',
		          height: '40%',
		      	  backgroundColor: '#303030',

	},
	  groupPaper: {
		      		textAlign: 'center',
		      		marginTop: 8,
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
	{/* This begins the fetching process for the JSON data */}
	const currentUser = useSelector(state => state.users.currentUser);
	var id = currentUser['id'];
	const [groupTiles, setGroupTiles] = useState([]);
	const [createGroupWindow, setCreateGroupWindow] = useState(false);
{/* fetchGroupData takes care of promise with JSON data */}
	function fetchGroupData(userID){
		return Promise.all([
			api.memberships.getGroupsOfUser(userID)
		]).then((groups) => {
			return({groups})
		})
	}
{/* actual fetch of the group data */}
	var groupPromise = fetchGroupData(id);

  function changeBackground(e) {
	   e.target.style.opacity = '0.5';
	}

	function changeBack(e){
    e.target.style.opacity = '1';
	}

	function goToGroupPage(name,id,desc,email){
		history.push({
		   pathname: '/groupPage',
		   state: { groupName: name, groupID: id, groupDesc: desc, groupEmail: email }
		});
  }
	function createGroup(name,desc,email){
		setCreateGroupWindow(false);
		console.log(name);
		console.log(desc);
		console.log(email);
		var reqData = {name: name,email: email, description: desc};
		console.log(reqData);
		var responsePromise = api.groups.create(reqData);
		responsePromise.then((resp) => {
			console.log(resp);
			addToNewGroup(resp);
		})
	}

	function addToNewGroup(group){
		console.log(group);
		var addData = {user_id: id, group_id: group.id, is_admin: 1}
		var newGroupPromise = api.memberships.create(addData);
		newGroupPromise.then((resp) => {
			console.log(resp);
			goToGroupPage(group.name,group.id,group.description,group.email);
		})
	}

{/* useEffect is where the groupTiles array is actually populated. useEffect will re-render the components that have just come in.*/}
	useEffect(() => {
		groupPromise.then(data => {
			setGroupTiles(data.groups[0]);
		});

	}, []);
	return (
	<div>
	<div>
		<h3>my groups </h3>

		<div className={classes.createGroupButton}>
		 <Button variant="outlined" color="#3CB371" onClick={() => { setCreateGroupWindow(true); }}>
						 Create Group
		 </Button>
		</div>
		</div>
	  <div className={classes.root}>

		{

groupTiles.map(group => (
	<Paper key={group.name} onClick={() => goToGroupPage(group.name,group.id,group.description,group.email)} onMouseOver={changeBackground} onMouseOut={changeBack} className={classes.groupPaper}>
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
	</div>

	);

}
