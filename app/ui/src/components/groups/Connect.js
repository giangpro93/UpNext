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
	const [isMember, setIsMember] = useState(false);
	function changeBackground(e) {
		 e.target.style.opacity = '0.5';
	}

	function changeBack(e){
		e.target.style.opacity = '1';
	}



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

{/*
const reqObj = {user_id: 1, group_id: 11}
var groupPromise = api.memberships.get(reqObj)
groupPromise.then((group) => {
console.log(group)
})
*/}
function goToGroup(name,groupId,desc,email){
	var goToPromise = api.memberships.getGroupsOfUser(id)
	goToPromise.then((group) => {
		for(var i =0; i<group.length; i++){
			if(group[i].id === groupId){
				setIsMember(true)
				goToGroupPage(group[i].name,group[i].id,group[i].description,group[i].email,group[i].is_admin,isMember)
			}
			else{
				setIsMember(false)
				goToGroupPage(name,groupId,desc,email,0,false)
			}

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
		{

groupTiles.map(group => (
	<Paper key={group.id} className={classes.groupPaper} onMouseOver={changeBackground} onMouseOut={changeBack} onClick={() => goToGroup(group.name,group.id,group.description,group.email)}>
		<div className={classes.groupNames}>{group.name}</div>
	</Paper>
))
   }
	 </div>
	 </div>



	);

}
