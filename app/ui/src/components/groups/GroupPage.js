import React, { Component } from 'react';
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { useEffect } from "react";
import Snackbar from '../common/Snackbar';
import { useLocation } from "react-router-dom";
import {Tabs,Tab,Button,Typography,Box} from '@material-ui/core';
import { useSelector } from 'react-redux'
import CreatePost from './CreatePost'
import TopMenu from './TopMenu'
import UserDisplay from './UserDisplay'
import { dateInputFormat, toUTC, format, dateStrFormat } from '../schedule/dates';
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
	const [eventStart, setEventStart] = useState('2021-04-24T10:30');
	const [eventEnd, setEventEnd] = useState('2021-04-24T11:30');
	const [eventDescription, setEventDescription] = useState('');
	const [loadCreatePost, setLoadCreatePost] = useState(false);
	const [groupUsers, setGroupUsers] = useState([]);
	const [joinedGroup, setJoinedGroup] = useState(location.state.isMember);
	const [makeAdmin, setMakeAdmin] = useState(false);
	const [delEvent,setDelEvent] = useState(false);
	const [userWindow, setUserWindow] = useState(false);
	const [isAdmin,setIsAdmin] = useState(false);
	const [value, setValue] = useState(0);
	const [post, setPost] = useState([]);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
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

						for(var post = 0; post<data.length; post++){
							if(data[post].type === 'event'){
								events.push(data[post]);
							}
							if(data[post].type === 'task'){
								tasks.push(data[post]);
							}
						}
						events.sort(function(a, b){
							if(a.start < b.start){
								return -1;
							}
							else{
								return 1;
							}
						})
						tasks.sort(function(a, b){
							if(a.assigned < b.assigned){
								return -1;
							}
							else{
								return 1;
							}
						})
						var userPromise = api.memberships.getUsersOfGroup(groupId)
						userPromise.then((users) => {

							setGroupUsers(users)
						})
						setGroupEvents(events);
						setGroupTasks(tasks);
						setLoadCreatePost(false);
						setMakeAdmin(false);
						setDelEvent(false);
						var getGroupInfo = api.groups.getById(groupId)
						getGroupInfo.then((group) => {

							setGroupName(group.name)
							setGroupDesc(group.description)
						})
					});
					var getMembershipInfo = {user_id: userId, group_id: groupId}
					var getMembershipReq = api.memberships.get(getMembershipInfo)
					getMembershipReq.then((group) => {
						console.log(group)
						if(group.is_admin === 1){ setIsAdmin(true);}
						console.log(isAdmin)
					});
				}, [loadCreatePost, joinedGroup,makeAdmin,delEvent,isAdmin]);


			function leaveGroup(){
				if(joinedGroup){
				var reqObj = { user_id: userId, group_id: groupId};

				const promise = api.memberships.deleteMembership(reqObj);
				promise.then((resp) => {
					if(resp){
						setSuccess(true);
					}
					else{
						setError(true);
					}
					setIsAdmin(false)
					setJoinedGroup(false)
				})
				.catch(() => { setError(true); })
			}
			else{
				var addData = {user_id: userId, group_id: groupId, is_admin: 0}
				var newGroupPromise = api.memberships.create(addData);
				newGroupPromise.then((resp) => {
					if(resp){
						setSuccess(true);
					}
					else{
						setError(true);
					}
				})
				.catch(() => { setError(true); })
				setJoinedGroup(true)
			}
			}
			function createPost(){

				if(eventType === "Event"){
					var requestVar = {entity_id: groupId, title: eventName, location: eventLocation, description: eventDescription,start: format(toUTC(dateInputFormat(new Date(eventStart)))),end: format(toUTC(dateInputFormat(new Date(eventEnd))))}
				var reqEvent =	api.schedule.createEvent(requestVar);
				reqEvent.then((resp) => {
					if(resp){
						setSuccess(true);
					}
					else{
						setError(true);
					}
					setEventWindow(false);
					setLoadCreatePost(true);
				})
				.catch(() => { setError(true); })
				}
				else{
					var request = {entity_id: groupId, title: eventName, location: eventLocation, description: eventDescription,assigned: format(toUTC(dateInputFormat(new Date(eventStart)))), due: format(toUTC(dateInputFormat(new Date(eventEnd))))}
					var reqEventt = api.schedule.createTask(request)
					reqEventt.then((resp) => {
						if(resp){
							setSuccess(true);
						}
						else{
							setError(true);
						}
						setEventWindow(false);
						setLoadCreatePost(true);
					})
					.catch(() => { setError(true); })
				}
			}
			function makeAdminFunc(id){
				var reqAdmin = {user_id: id, group_id: groupId}
				var reqAdminEvent = api.memberships.makeAdmin(reqAdmin)
				reqAdminEvent.then((resp) => {
					if(resp){
						setSuccess(true);
					}
					else{
						setError(true);
					}
						setMakeAdmin(true)
				})
				.catch(() => { setError(true); })
			}
			function deleteEventFunc(id){
				var delEvent = api.schedule.deleteScheduleItemById(id)
				delEvent.then((resp) => {
					if(resp){
						setSuccess(true);
					}
					else{
						setError(true);
					}
						setDelEvent(true)
				})
				.catch(() => { setError(true); })
			}
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



	        const classes = useStyles()
	        return (
			        <div>
			          <div>
										 <Button variant="contained" color="primary" onClick={() => { goBack();}} style={{marginTop: 8}}>
													 Back
										 </Button>
			         </div>
							 <TopMenu groupName={groupName} setInformationWindow={setInfoWindow} setUserDisplay={setUserWindow} users={groupUsers} leave={leaveGroup} joined={joinedGroup} isOwner={isAdmin} groupID={groupId} namee={groupName} email={groupEmail} desc={groupDesc} />
							 <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
				 		 			<Tab label={groupEvents.length + " Events"} {...a11yProps(0)}/>
				 					<Tab label={groupTasks.length + " Tasks"} {...a11yProps(1)}/>
			 				 </Tabs>
							 <UserDisplay users={groupUsers} window={userWindow} openWindow={setUserWindow} isOwner={isAdmin} makeAdmin={makeAdminFunc}/>



							<TabPanel value={value} index={0}>
			         <GroupEventsDisplay events={groupEvents} groupOwner={isAdmin} deleteEvent={deleteEventFunc} editLoad={setLoadCreatePost} />

			       </TabPanel>
			       <TabPanel value={value} index={1}>
			       <GroupTasksDisplay tasks={groupTasks} groupOwner={isAdmin} deleteEvent={deleteEventFunc} editLoad={setLoadCreatePost}/>

			       </TabPanel>



			{isAdmin === true ? (
				         <div className={classes.createPostButton}>
				         		<Button variant="contained" color="primary" onClick={() => { setEventWindow(true); }}>
				                		Create Event
				         		</Button>
										<CreatePost evntEnd={eventEnd}evntStart={eventStart} makePost={createPost} evntWindow={eventWindow} setEvntWindow={setEventWindow} setEvntName={setEventName} setEvntDesc={setEventDescription} setEvntStart={setEventStart} setEvntEnd={setEventEnd} setEvntLoc={setEventLocation} evntType={eventType} setEvntType={setEventType}/>
				         </div>
		   ) : null}
			 <Snackbar
					 open={error || success}
					 onClose={() => {
							 setError(false);
							 setSuccess(false);
					 }}
					 severity={error ? 'error' : 'success'}
					 message={error ? 'Error completing transaction' : 'Success'}
			 />
				</div>
		      );

}
