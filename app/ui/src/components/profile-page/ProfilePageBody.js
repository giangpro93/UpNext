import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useAsync from '../../hooks/useAsync';
import api from '../../api-client/api';
import UserTile from '../tiles/UserTile';
import GroupTile from '../tiles/GroupTile';
import { useSelector } from 'react-redux';

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
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ProfilePageBody(props) {
    const { user } = props;
    const currentUser = useSelector(state => state.users.currentUser);
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [reload, setReload] = useState(0);

    const friends = useAsync(() => 
        api.friends.getUserFriends(user.id),
        [user, reload]);
    const groups = useAsync(() => 
        api.memberships.getGroupsOfUser(user.id),
        [user, reload]);
    const unacceptedFriends = useAsync(() => 
        api.friends.getUserUnacceptedFriends(user.id),
        [user, reload]);

    const isMe = currentUser.id === user.id;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs centered value={value} onChange={handleChange}>
                <Tab label="Friends" {...a11yProps(0)} />
                <Tab label="Groups" {...a11yProps(1)} />
                {isMe && <Tab label="Pending Requests" {...a11yProps(2)} />}
                </Tabs>
            </AppBar>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <TabPanel value={value} index={0}>
                    { friends.data &&
                        friends.data.length > 0 
                        ? friends.data.map(u => 
                            <UserTile 
                              key={u.id} 
                              user={u} 
                              onButtonClickSuccess={() => { if(isMe) setReload(x => x + 1); }}
                            />
                        )
                        : <Typography variant='h6'>{`${isMe ? 'You' : 'This user'} has no friends in the friends list`}</Typography>
                    }
                </TabPanel>
                <TabPanel value={value} index={1}>
                    { groups.data &&
                        groups.data.length > 0 
                        ? groups.data.map(g => 
                            <GroupTile 
                              key={g.id} 
                              group={g} 
                              onButtonClickSuccess={() => { if(isMe) setReload(x => x + 1); }}
                            />
                        )
                        : <Typography variant='h6'>{`${isMe ? 'You belong' : 'This user belongs'} to no groups`}</Typography>
                    }
                </TabPanel>
                {isMe && 
                <TabPanel value={value} index={2}>
                    { unacceptedFriends.data &&
                        unacceptedFriends.data.length > 0
                        ? unacceptedFriends.data.map(u => 
                            <UserTile 
                              key={u.id} 
                              user={u} 
                              onButtonClickSuccess={() => { if(isMe) setReload(x => x + 1); }}
                            />
                        )
                        : <Typography variant='h6'>You have no pending friend requests</Typography>
                    }
                </TabPanel>
                }
            </div>
        </div>
    );
}