import React, { useState } from 'react';
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
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const friends = useAsync(() => 
        api.friends.getUserFriends(user.id),
        [user]);
    const groups = useAsync(() => 
        api.memberships.getGroupsOfUser(user.id),
        [user]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs centered value={value} onChange={handleChange}>
                <Tab label="Friends" {...a11yProps(0)} />
                <Tab label="Groups" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <TabPanel value={value} index={0}>
                    { friends.data &&
                        friends.data.map(u => 
                            <UserTile key={u.id} user={u} />
                        )
                    }
                </TabPanel>
                <TabPanel value={value} index={1}>
                    { groups.data &&
                        groups.data.map(g => 
                            <GroupTile key={g.id} group={g} />
                        )
                    }
                </TabPanel>
            </div>
        </div>
    );
}