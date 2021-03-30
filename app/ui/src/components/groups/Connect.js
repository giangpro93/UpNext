import React, { Component } from 'react';
import {useState} from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles, Paper, Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,TextField} from '@material-ui/core/';
import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux'
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


}));

export default function Groups(props) {
	const location = useLocation();
	const history = useHistory();
	const classes = useStyles();
	const currentUser = useSelector(state => state.users.currentUser);
	var id = currentUser['id'];
	const [groupTiles, setGroupTiles] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');




	{/*
	function goToGroupPage(name,id,desc,email,admin){
		history.push({
		   pathname: '/groupPage',
		   state: { groupName: name, groupID: id, groupDesc: desc, groupEmail: email, is_admin: admin }
		});
  }

{/*  var testing = api.groups.search("Nol");
	testing.then((resp) => {
		console.log(resp);
	}) */}




	useEffect(() => {
		var promise = api.groups.search(searchTerm)
		promise.then((groups) => {

			if(groups !== "" && groups !== null){
				setGroupTiles(groups)
			}
			else{
				var firstPromise = api.groups.getAll()
				firstPromise.then((group) => {
					setGroupTiles(group)
				});
			}

		});
	}, [searchTerm]);


	return (
	<div>

	  <div className={classes.root}>
		<TextField
	 	 autoFocus
	 	 margin="dense"
	 	 id="searchBar"
	 	 label="Search..."
	 	 onChange={(e) => setSearchTerm(e.target.value)}
	 	 type="text"
	 	 fullWidth
	  />
		{

groupTiles.map(group => (
	<Paper key={group.id} className={classes.groupPaper}>
		<div className={classes.groupNames}>{group.name}</div>
	</Paper>
))
   }
	 </div>
	 </div>



	);

}
