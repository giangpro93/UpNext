import React, { Component } from 'react';
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {Tabs,Tab,Button,Typography,Box} from '@material-ui/core';
import { useSelector } from 'react-redux'
import CreatePost from './CreatePost'
import TopMenu from './TopMenu'
import UserDisplay from './UserDisplay'

import GroupEventsDisplay from './GroupEventsDisplay'
import GroupTasksDisplay from './GroupTasksDisplay'
var owner = false;
const api = require('../../api-client/api.js');
const useStyles = makeStyles((theme) => ({
	  root: {
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap',
				flexGrow: 1,
		},
		createPostButton: {
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'flex-end',
				marginTop: 16,
				marginBottom: 16,
		},
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
export default function GroupPage(props) {
	const location = useLocation();
	var groupEmail = location.state.groupEmail;
	const name = location.state.groupName;
	const currentUser = useSelector(state => state.users.currentUser);
	const groupId = location.state.groupID;
	const isAdmin = location.state.is_admin;
	var is_member = location.state.isMember;
	var description = location.state.groupDesc;
	var prevPage  = location.state.page;
	const [eventWindow, setEventWindow] = useState(false);
	const [infoWindow, setInfoWindow] = useState(false);
	const [groupEvents,setGroupEvents] = useState([]);
	const [groupTasks, setGroupTasks] = useState([]);
	const [eventType, setEventType] = useState('Event');
	const [eventName,setEventName] = useState('');
	const [groupName,setGroupName] = useState(name)
	const [groupDesc,setGroupDesc] = useState(description)
	const [eventLocation, setEventLocation] = useState('');
	const [eventStart, setEventStart] = useState('');
	const [eventEnd, setEventEnd] = useState('');
	const [eventDescription, setEventDescription] = useState('');
	const [loadCreatePost, setLoadCreatePost] = useState(false);
	const [groupUsers, setGroupUsers] = useState([]);
	const [joinedGroup, setJoinedGroup] = useState(location.state.isMember);
	const [makeAdmin, setMakeAdmin] = useState(false);
	const [delEvent,setDelEvent] = useState(false);
	const [userWindow, setUserWindow] = useState(false);
	const [value, setValue] = useState(0);
	const [post, setPost] = useState([]);

	if(description == null){
		description = "this is where a description would be if it had one :(";
	}


	if(isAdmin === 1){
		owner = true;
	}
	else{
		owner = false;
	}
	var userId = currentUser['id'];
	const history = useHistory();
	function goBack(name,id){
		var push = ''
		if(prevPage === "connect"){
			push = '/connect'
		}
		else{
			push = '/groups'
		}
		history.push({
			 pathname: push,
		});
	}





			useEffect(() => {
				var events = []
				var reminders = []
				var tasks = []
				var groupPromise = api.schedule.getEntityScheduleById(groupId);
					groupPromise.then(data => {
						console.log(data)
						for(var post = 0; post<data.length; post++){
							if(data[post].type === 'event'){
								console.log(data[post].start)
								data[post].end =  "Time: " + data[post].start.substring(11,16) + " - " + data[post].end.substring(11,16)
								data[post].start = "Date: " + data[post].start.substring(0,10);
								console.log(data[post].start)
								events.push(data[post]);
							}
							if(data[post].type === 'task'){
								data[post].assigned = "Assigned: " + data[post].assigned.substring(0,10) + " | " + data[post].assigned.substring(11,16);
								data[post].due = "Due: " + data[post].due.substring(0,10) + " | " + data[post].due.substring(11,16);
								tasks.push(data[post]);
							}
						}
						events.sort(function(a, b){
							if(a.start.substring(12,16) + a.start.substring(22,28) < b.start.substring(12,16) + b.start.substring(22,28)){
								return -1;
							}
							else{
								return 1;
							}
						})
						tasks.sort(function(a, b){
							if(a.due.substring(16,20) < b.due.substring(16,20)){
								return -1;
							}
							else{
								return 1;
							}
						})
						var userPromise = api.memberships.getUsersOfGroup(groupId)
						userPromise.then((users) => {
							console.log(users)
							setGroupUsers(users)
						})
						setGroupEvents(events);
						setGroupTasks(tasks);
						setLoadCreatePost(false);
						setMakeAdmin(false);
						setDelEvent(false);
						var getGroupInfo = api.groups.getById(groupId)
						getGroupInfo.then((group) => {
							console.log(group)
							setGroupName(group.name)
							setGroupDesc(group.description)
						})
					});
				}, [loadCreatePost, joinedGroup,makeAdmin,delEvent]);


			function leaveGroup(){
				if(joinedGroup){
				var reqObj = { user_id: userId, group_id: groupId};
				console.log(reqObj.user_id)
				console.log(reqObj.group_id)
				const promise = api.memberships.deleteMembership(reqObj);
				promise.then((resp) => {
					owner=false
					setJoinedGroup(false)
				})
			}
			else{
				var addData = {user_id: userId, group_id: groupId, is_admin: 0}
				var newGroupPromise = api.memberships.create(addData);
				newGroupPromise.then((resp) => {
					console.log(resp);
				})
				setJoinedGroup(true)
			}
			}
			function createPost(){
				console.log("Start: " + eventStart)
				console.log("End: " + eventEnd)
				if(eventType === "Event"){
					var requestVar = {entity_id: groupId, title: eventName, location: eventLocation, description: eventDescription,start:eventStart,end:eventEnd}
				var reqEvent =	api.schedule.createEvent(requestVar);
				reqEvent.then((resp) => {
					console.log(resp)
					setEventWindow(false);
					setLoadCreatePost(true);
				})
				}
				else{
					var request = {entity_id: groupId, title: eventName, location: eventLocation, description: eventDescription,assigned: eventStart, due: eventEnd}
					var reqEventt = api.schedule.createTask(request)
					reqEventt.then((resp) => {
						setEventWindow(false);
						setLoadCreatePost(true);
					})
				}
			}
			function makeAdminFunc(id){
				var reqAdmin = {user_id: id, group_id: groupId}
				var reqAdminEvent = api.memberships.makeAdmin(reqAdmin)
				reqAdminEvent.then((resp) => {
					  console.log(resp)
						setMakeAdmin(true)
				})
			}
			function deleteEventFunc(id){
				var delEvent = api.schedule.deleteScheduleItemById(id)
				delEvent.then((resp) => {
					  console.log(resp)
						setDelEvent(true)
				})
			}
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



	        const classes = useStyles()
	        return (
			        <div>
			          <div>
										 <Button variant="outlined" color="primary" onClick={() => { goBack();}} style={{marginTop: 8}}>
													 Back
										 </Button>
			         </div>
							 <TopMenu groupName={groupName} setInformationWindow={setInfoWindow} setUserDisplay={setUserWindow} users={groupUsers} leave={leaveGroup} joined={joinedGroup} isOwner={owner} groupID={groupId} namee={groupName} email={groupEmail} desc={groupDesc} />
							 <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
				 		 			<Tab label={groupEvents.length + " Events"} {...a11yProps(0)}/>
				 					<Tab label={groupTasks.length + " Tasks"} {...a11yProps(1)}/>
			 				 </Tabs>
							 <UserDisplay users={groupUsers} window={userWindow} openWindow={setUserWindow} isOwner={owner} makeAdmin={makeAdminFunc}/>



							<TabPanel value={value} index={0}>
			         <GroupEventsDisplay events={groupEvents} groupOwner={owner} deleteEvent={deleteEventFunc} />

			       </TabPanel>
			       <TabPanel value={value} index={1}>
			       <GroupTasksDisplay tasks={groupTasks} groupOwner={owner} deleteEvent={deleteEventFunc} />

			       </TabPanel>



			{owner === true ? (
				         <div className={classes.createPostButton}>
				         		<Button variant="outlined" color="primary" onClick={() => { setEventWindow(true); }}>
				                		Create Event
				         		</Button>
										<CreatePost evntEnd={eventEnd}evntStart={eventStart} makePost={createPost} evntWindow={eventWindow} setEvntWindow={setEventWindow} setEvntName={setEventName} setEvntDesc={setEventDescription} setEvntStart={setEventStart} setEvntEnd={setEventEnd} setEvntLoc={setEventLocation} evntType={eventType} setEvntType={setEventType}/>
				         </div>
		   ) : null}

				</div>
		      );

}
