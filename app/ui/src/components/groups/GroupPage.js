import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FormControl, InputLabel, Input, FormHelperText, TextField } from '@material-ui/core';

var messages = [['hunter',"this is a message"],["Cobb","This is another Message"]];
const useStyles = makeStyles((theme) => ({
	          root: {
			display: 'flex',
			justifyContent: 'space-between',
			flexWrap: 'wrap',

	          },
	          paper: {
			 textAlign: 'center',
			 marginTop: 8,
			 position: 'relative',
			 minWidth: 50,
			 minHeight: 50,
			 width: 'max-content',
			 color: 'white',
			 height: '40%',
			 backgroundColor: '#3CB371',
		  },
	          groupNames: {
			      position: 'absolute',
			      top: '50%',
			      left: '50%',
			      transform: 'translate(-50%, -50%)',
			      backgroundColor: 'transparent',
		 },
	         messageBoard: {
			       backgroundColor: 'gray',
			       display: 'flex',
			       color: 'black',
			       minHeight: 400,
			       maxHeight: 400,
			       flexDirection: 'column',
			       justifyContent: 'flex-end',
			       overflow: 'auto',
		},
		messageForm: {
			     display: 'flex',
			     alignItems:'stretch' ,
			     backgroundColor: '#3CB371',
			     fontSize: 'xx-large',
			     flexDirection: 'column',
			    
			     

		},
		message: {
			backgroundColor: 'white',
			marginTop: 8,
			marginBottom: 8,
			minHeight: 50,
			color: 'black',
			marginLeft: 8,
			marginRight: 8,
	        },
		messageText: {
		        
			marginLeft: 16,
		},
}));

export default function GroupPage(props) {
	const location = useLocation();
	const name = location.state.detail;
	function changeBackground(e) {
           e.target.style.opacity = '0.5';
	}
	function changeBack(e){
          e.target.style.opacity = '1';
	}
	const history = useHistory();
	const goLogin = () => history.push('groups');
	        const classes = useStyles()
	        return (
			        <div>
			          <div>
			            <Paper onClick={goLogin}onMouseOver={changeBackground} onMouseOut={changeBack} className={classes.paper}>
			               <div className={classes.groupNames}> Back </div>
			            </Paper>
			         </div>
				  <h1>{name}</h1>
				  <div className={classes.messageBoard}>
					{messages.map(message => (
						<Paper className={classes.message}>
							<div className={classes.messageText}> {message[0]}</div>
							<div className={classes.messageText}>{message[1]}</div>
						</Paper>
					))}
				 </div>
				<div>
				  <TextField
				    className={classes.messageForm}
			            id="filled-multiline-flexible"
			            label="Type Message Here..."
			            multiline
			            rowsMax={2}
			            rowsMin={2}
			            variant="filled"
			          />
				</div>
				</div>
		      );

}
