import React, { Component } from 'react';
import { makeStyles, Paper, Grid, Button} from '@material-ui/core/';
import {Redirect,useHistory} from 'react-router-dom';
const names = [" nd stuff to see if this fits well","Group 2", "Group 3","Group 4","Group 5","Group 6", "Group 7", "Group 8","Group 9", "Group 10", "Group 11", "Group 12","Group 1","Group 2", "Group 3","Group 4"];
const useStyles = makeStyles((theme) => ({
	  root: {
		  display: 'flex',
		  justifyContent: 'space-evenly',
		  flexWrap: 'wrap',
		 
		    },
	  paper: {
		      textAlign: 'center',
		      marginTop: 8,
		      marginLeft: 4,
		      position: 'relative',
		      minWidth: 200,
		      minHeight: 200,
		      width: 'max-content',
		     color: 'white',
		      height: '40%',
		  	background: '#3CB371',
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
	  <div className={classes.root}>
		{names.map(name => (
			<Paper color="#3CB371" onClick={() => goLogin(name)} onMouseOver={changeBackground} onMouseOut={changeBack} className={classes.paper}>
			<div className={classes.groupNames}>{name}</div>
			</Paper>
		))}
	 </div>
		  );

}


			            
