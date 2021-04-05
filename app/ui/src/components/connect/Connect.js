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
		  		bottomMargin: 32,
					flexDirection: 'column',

		    },
	  groupPaper: {
		      		textAlign: 'center',
		      		marginTop: 8,
		      		marginRight: 16,
		      		position: 'relative',
		      		minWidth: 800,
		      		minHeight: 50,
		      		width: 'max-content',
		     			color: 'black',
		      		height: '40%',
		  				backgroundColor: "white",
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

export default function Connect(props) {
	const location = useLocation();
	const history = useHistory();
	const classes = useStyles();
	const currentUser = useSelector(state => state.users.currentUser);
	var id = currentUser['id'];
	const [groupTiles, setGroupTiles] = useState([]);
	const [userTiles, setUserTiles] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isMember, setIsMember] = useState(false);
	function changeBackground(e) {
		 e.target.style.opacity = '0.5';
	}

	function changeBack(e){
		e.target.style.opacity = '1';
	}

	useEffect(() => {
		var groupSearchPromise = api.groups.search(searchTerm)
		groupSearchPromise.then((groups) => {

			if(groups !== "" && groups !== null){
				setGroupTiles(groups)
			}
			else{
				var allGroupPromise = api.groups.getAll()
				allGroupPromise.then((group) => {
					setGroupTiles(group)
				});
			}

		});
		var userSearchPromise = api.users.search(searchTerm)
		userSearchPromise.then((users) => {

			if(users !== "" && users !== null){
				setUserTiles(users)
			}
			else{
				var allUserPromise = api.users.getAll()
				allUserPromise.then((userss) => {
					setUserTiles(userss)
				});
			}

		});
	}, [searchTerm]);

function goToGroup(name,groupId,desc,email){
	var goToPromise = api.memberships.getGroupsOfUser(id)
	goToPromise.then((group) => {
		for(var i =0; i<group.length; i++){
			if(group[i].id === groupId){
				setIsMember(true)
				goToGroupPage(group[i].name,group[i].id,group[i].description,group[i].email,group[i].is_admin,true)
			}

		}
		if(isMember !== true){
			goToGroupPage(name,groupId,desc,email,0,false)
		}
	})
}
function goToGroupPage(name,id,desc,email,admin,is_member){
	history.push({
		 pathname: '/groupPage',
		 state: { groupName: name, groupID: id, groupDesc: desc, groupEmail: email, is_admin: admin, isMember: is_member, page: "connect" }
	});
}

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
		Groups:
		{
groupTiles.map(group => (
	<Paper key={group.id} className={classes.groupPaper} onMouseOver={changeBackground} onMouseOut={changeBack} onClick={() => goToGroup(group.name,group.id,group.description,group.email)}>
		<div className={classes.groupNames}>{group.name}</div>
	</Paper>
))
   }
	 Users:
	 {
userTiles.map(user => (
 <Paper key={user.id} className={classes.groupPaper} onMouseOver={changeBackground} onMouseOut={changeBack}>
	 <div className={classes.groupNames}>{user.name}</div>
 </Paper>
))
	 }
	 </div>
	 </div>



	);

}
