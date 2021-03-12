import React, { Component } from 'react';
import { makeStyles, Paper, Grid, Button, Box,Typography,AppBar,Tabs,Tab} from '@material-ui/core/';
import {Redirect,useHistory} from 'react-router-dom';
var names = [" nd stuff to see if this fits well","Group 2", "Group 3","Group 2", "Group 3","Group 4","Group 5","Group 6", "Group 8","Group 9", "Group 10", "Group 11", "Group 12","Group 1","Group 2", "Group 3","Group 4","Group 4","Group 5"];
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
	const history = useHistory();
           function changeBackground(e) {
	   e.target.style.opacity = '0.5';
	   }
	   function changeBack(e){
           e.target.style.opacity = '1';
	   }
	   function goLogin(name){
		   	      history.push({
		              pathname: '/groupPage',
		              state: { detail: name }
		          });
          }
        const classes = useStyles()													 
	return (
	<div>
		<h3>my groups </h3>
	  <div className={classes.root}>
		{names.map(name => (
			<Paper onClick={() => goLogin(name)} onMouseOver={changeBackground} onMouseOut={changeBack} className={classes.groupPaper}>
			<div className={classes.groupNames}>{name}</div>
			</Paper>
		))
		}
		{fill.map(name => (
			<div color="dark-gray" className={classes.nothingPaper}>
		
			</div>
		))
		}
		
	 </div>
	</div>	  );

}


			            
