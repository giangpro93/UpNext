import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types';
// import AppBar from '@material-ui/core/AppBar';
import { Tabs, Tab, AppBar, Button, Typography, Box, makeStyles } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person'
// import Tab from '@material-ui/core/Tab';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
import Conversations from './Conversations';
import NewConversationModal from './NewConversationModal'
// import Contacts from './Contacts'
import Modal from '@material-ui/core/Modal'
const api = require('../../api-client/api.js')

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}S
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'red',
    width: '100%'
  },
  boxStyles: {
    position: 'relative',
    cursor: 'pointer',
  },
  iconStyles: {
    width: 40,
    height: 40,
    bottom: 0
  },
  tabStyles : {
    width: '100%'
  },
  tabPanels: {
    marginTop: '5px',
    marginBottom: '5px',
    backgroundColor: theme.palette.background.paper
  }
}));

export default function MessageSidebar() {
  const currentUser = useSelector(state => state.users.currentUser);
	var id = currentUser['id'];
  console.log(api.friends.getUserFriends(id))
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false)
  const [userFriendsBox, setUserFriendsBox] = useState([])


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
      setOpen(false)
  }

  function changeBackground(e) {
    e.target.style.opacity = '0.5';
 }

 function changeBack(e){
  e.target.style.opacity = '1';
}

  useEffect(() => {
    var userFriendsPromise = api.friends.getUserFriends(id)
    userFriendsPromise.then((friends)=> {
      if(friends !== "" && friends !== null) {
        setUserFriendsBox(friends)
      }
    })
  }, [id]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab className={classes.tabStyles} label="Conversations" {...a11yProps(0)} />
        </Tabs>
      </AppBar>
      {
        userFriendsBox.map(friend => (
          <div className={classes.tabPanels}>
            <TabPanel className={classes.boxStyles} value={value} index={0} onMouseOver={changeBackground} onMouseOut={changeBack}>
                {friend.name}
            </TabPanel>
          </div>
        ))
      }
    </div>
  );
}