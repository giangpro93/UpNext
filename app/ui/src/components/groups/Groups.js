import React, { Component } from 'react';
import {useState} from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles, Paper, Grid, Button, Box,Typography,AppBar,Tabs,Tab,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,TextField} from '@material-ui/core/';
import {Redirect,useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux'
const api = require('../../api-client/api.js');


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
	const [createGroupName,setCreateGroupName] = useState('');
	const [createGroupDesc,setCreateGroupDesc] = useState('');
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
	const groupPromise = fetchGroupData(id);
{/* useEffect is where the groupTiles array is actually populated. useEffect will re-render the components that have just come in.*/}
	useEffect(() => {
		groupPromise.then(data => {
			setGroupTiles(data.groups[0]);
		});
	}, []);

  function changeBackground(e) {
	   e.target.style.opacity = '0.5';
	}

	function changeBack(e){
    e.target.style.opacity = '1';
	}

	function goToGroupPage(name,id){
		history.push({
		   pathname: '/groupPage',
		   state: { groupName: name, groupID: id  }
		});
  }
	function createGroup(name,desc){
		setCreateGroupWindow(false);
		console.log(name);
		console.log(desc);
		const responsePromise = api.groups.create("name","mail@mail.com","this is a new description");
		responsePromise.then((resp) => {
			console.log(typeof resp);
		})
	}

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
	<Paper key={group.name} onClick={() => goToGroupPage(group.name,group.id)} onMouseOver={changeBackground} onMouseOut={changeBack} className={classes.groupPaper}>
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
				 <Button onClick={() => { createGroup(createGroupName,createGroupDesc);}} color="primary">
					 Create
				 </Button>
			 </DialogActions>
		 </Dialog>
	</div>

	);

}
