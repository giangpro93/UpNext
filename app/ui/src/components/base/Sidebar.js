import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import GroupIcon from '@material-ui/icons/Group';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MessageIcon from '@material-ui/icons/Message';

const useStyles = makeStyles(theme => ({
    drawerPaper: { width: 'inherit' },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary
    }
}));

export default function Sidebar(props) {
    const { open, onClose } = props;
    const classes = useStyles();

    return (
    <div style={{display: 'flex'}}>
        <Drawer
            style={{width: '200px'}}
            variant='temporary'
            anchor='left'
            open={open}
            onClose={onClose}
            classes={{ paper: classes.drawerPaper }}>
            <List>
                <SidebarItem onClose={onClose} to="/" text='Dashboard' icon={<HomeIcon />} />
                <SidebarItem onClose={onClose} to="/schedule" text='Schedule' icon={<CalendarTodayIcon />} />
                <SidebarItem onClose={onClose} to="/groups" text='Groups' icon={<GroupIcon />} />
                <SidebarItem onClose={onClose} to="/connect" text='Connect' icon={<GroupAddIcon />} />
                <SidebarItem onClose={onClose} to="/create" text='Create' icon={<AddCircleIcon />} />
                <SidebarItem onClose={onClose} to="/messages" text='Messages' icon={<MessageIcon />} />
            </List>
        </Drawer>
    </div>
    );
}

export function SidebarItem(props) {
    const { to, text, icon, onClose, ...other } = props;
    const classes = useStyles();

    return (
        <NavLink to={to} className={classes.link}>
        <div
            role='button'
            onClick={onClose}>
            <ListItem button>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>

        </div>
        </NavLink>
    );
}
