import React, { Component } from 'react';
import useState from 'react';
import { makeStyles, Paper, Grid, Button, Box,Typography,AppBar,Tabs,Tab} from '@material-ui/core/';
import {Redirect,useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux'
const api = require('../../api-client/api.js');
var names = ["example"];
var fill = [];
var i;
for(i = 0; i < 6 - names.length % 6; i++){
fill.push("nothing");
}

const useStyles = makeStyles((theme) => ({
	  root: {
		      display: 'flex',
		  		justifyContent: 'space-evenly',
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
		      		marginLeft: 4,
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
	}
}));

export default function Groups(props) {
	const currentUser = useSelector(state => state.users.currentUser);
	var userID = currentUser['id'];
	const groupsPromise = api.memberships.getGroupsOfUser(userID);
		var groups = [];
  groupsPromise.then(function(result) {
     for(var i=0; i< result.length; i++){
			 var name = result[i].name;
			 console.log(name);
			 groups.push(name);
		 }
  });
	const history = useHistory();
	const classes = useStyles()
  function changeBackground(e) {
	   e.target.style.opacity = '0.5';
	}
	function changeBack(e){
    e.target.style.opacity = '1';
	}
	function goToGroupPage(name){
		history.push({
		   pathname: '/groupPage',
		   state: { detail: name }
		});
  }

	return (
	<div>
		<h3>my groups </h3>
	  <div className={classes.root}>
				{

					 groups.map(group => (
						<Paper key={group[0]} onClick={() => goToGroupPage(group[0])} onMouseOver={changeBackground} onMouseOut={changeBack} className={classes.groupPaper}>
							<div className={classes.groupNames}>{group[0]}</div>
						</Paper>
					))
				}
		{fill.map(name => (
			<div color="dark-gray" className={classes.nothingPaper}>

			</div>
			))
		}

	 </div>
	</div>

	);

}
