import React, { Component } from 'react';
import { useLocation } from "react-router-dom";
import { makeStyles, Button,IconButton,Tooltip} from '@material-ui/core/';
import {useHistory} from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
	  root: {
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap',
				flexGrow: 1,
		},
		topMenuStyle: {
			display: 'flex',
			flexDirection: 'row',
			flexWrap: 'wrap',
			flexGrow: 1,
			justifyContent: 'flex-end',
		},
		leaveGroupButton: {
			marginLeft: 16,
		},
}));
export default function TopMenu(props) {
const classes = useStyles()

	return(
		<div className={classes.root}>
			<div className={classes.root}>
				<h1>{props.groupName}</h1>
				<Tooltip title="Group Description" placement="top">
				<IconButton size="small" onClick={() => { props.setInformationWindow(true); }}>
								<InfoIcon />
							</IconButton>
				</Tooltip>
				<h4 style={{marginLeft: 8,  cursor:'pointer',marginTop: 16}} onClick={() => { props.setUserDisplay(true); }}>
				{props.users.length} Members
				</h4>
			</div>
		<div className={classes.topMenuStyle}>
			<Button variant="outlined" color="primary" className={classes.leaveGroupButton} onClick={() => { props.leave();}}>
						{props.joined ? 'Leave' : 'Join'}
			</Button>
		</div>
		</div>
	);

}
