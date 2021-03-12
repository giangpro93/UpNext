import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FormControl, InputLabel,Box,List,Typography, Input,CardMedia,CardContent, FormHelperText, TextField, Tabs, Tab, Card, CardHeader, Avatar,IconButton,CardActions,FavoriteButton,Collapse} from '@material-ui/core';
import {MoreVertIcon} from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
var messages = [['hunter',"this is a message"],["Cobb","This is another Message"],["Cobb","This is another Message"],["Cobb","This is another Message"],["Cobb","This is another Message"],["Cobb","This is another Message"],["Cobb","This is another Message"],["Cobb","This is another Message"],["Cobb","This is another Message"],["Cobb","This is another Message"],["Cobb","This is another Message"],["Cobb","This is another Message"]];
var events = [["Hunter","Event Name","location","time","ImgLocation(Optional)","This is the description of the event and will be how people descibe the events themselves."],["Hunter","Event Name","location","time","ImgLocation(Optional)","This is the description of the event and will be how people descibe the events themselves."], ["Hunter","Event Name","location","time","ImgLocation(Optional)","This is the description of the event and will be how people descibe the events themselves."]];
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
			       height: 400,
			       position: 'relative',
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
		card: {
		width: 345,
		marginBottom: 16,
		marginRight: 16,
		marginLeft: 16,
		marginTop: 16,
		},
		avatar: {
		backgroundColor: 'red',
		},
		eventBoard: {
		 backgroundColor: 'gray',
			                               display: 'flex',
			                               color: 'black',                         
			                               position: 'relative',
			                               flexDirection: 'row',
						       flexWrap: 'wrap',
						      
		},
}));
function TabPanel(props) {
	  const { children, value, index, ...other } = props;

	  return (
		      <div
		        role="tabpanel"
		        hidden={value !== index}
		        id={`wrapped-tabpanel-${index}`}
		        aria-labelledby={`wrapped-tab-${index}`}
		        {...other}
		      >
		        {value === index && (
				        <Box p={3}>
				          <Typography>{children}</Typography>
				        </Box>
				      )}
		      </div>
		    );
}
export default function GroupPage(props) {
	const location = useLocation();
	const [value, setValue] = React.useState('one');
	const name = location.state.detail;
	const [expanded, setExpanded] = React.useState(false);

	  function handleExpandClick(f) {
		      setExpanded(!expanded);
		    };
	function changeBackground(e) {
           e.target.style.opacity = '0.5';
	}
	function changeBack(e){
          e.target.style.opacity = '1';
	}
	  const handleChange = (event, newValue) => {
		      setValue(newValue);
		    };
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
				 <Tabs value={value} onChange={handleChange}>
			    <Tab label="Events"
				value="one"
			       
			    />
			    <Tab label="Forum"
				value = "two"
			  />
			  </Tabs>
			<TabPanel value={value} index="two">
				<div className={classes.messageBoard}>
				<div style={{overflow: 'auto', height: 'inherit', display: 'block' ,marginLeft: 20,}}>
					{messages.map(message => (
						<Paper className={classes.message}>
							<div className={classes.messageText}> {message[0]}</div>
							<div className={classes.messageText}>{message[1]}</div>
						</Paper>
					))}
				 </div>
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
			</TabPanel>
			<TabPanel value={value} index="one">
			<div className={classes.eventBoard}>
				{events.map(eventt => (
					                                        
				<Card className={classes.card}>
			      <CardHeader
			        avatar={
					          <Avatar className={classes.avatar}>
						{eventt[0][0]}
					          </Avatar>
					        }
			        title={eventt[1]}
			        subheader={eventt[3]}
			      />
			
			      <CardContent>
			        <Typography display='block' variant="subtitle1" color="textSecondary" component="p">
			         	Location: {eventt[2]}
					
			        </Typography>
				<Typography display='block' variant="subtitle1" color="textPrimary" component="p">
					{eventt[5]}
				</Typography>
			      </CardContent>
				</Card>
				))}
			</div>
			</TabPanel>
				</div>
		      );

}
