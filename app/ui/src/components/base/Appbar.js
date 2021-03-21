import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu'
import Sidebar from './Sidebar';
import { logout as logoutAction } from '../../state/users/slice'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }
}));

export default function Appbar() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  }

  const handleProfileButtonClick = (event) => {
    if (Boolean(anchorEl)) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  }

  const handleLogout = () => {
    // dispatch to redux
    dispatch(logoutAction());
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="sticky">
        <Toolbar>
          <IconButton
            onClick={handleMenuToggle}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            UpNext
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleProfileButtonClick}
              color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleProfileButtonClick}
            >
              <Link to='/profile' className={classes.link}>
                <MenuItem onClick={handleProfileButtonClick}>Profile</MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Sidebar
        open={menuOpen}
        onClose={handleMenuToggle}
      />
    </div>
  )
}
