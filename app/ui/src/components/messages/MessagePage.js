import React, { useState, useEffect } from 'react';
import MessageSearchBar from './SearchBar';
import MessageDashBoard from './MessageDashboard'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  page: {
    padding: '20px',
    height: '90vh',
  }
}))

export default function MessagePage() {
  const classes = useStyles()

  return (
    <div className={classes.page}>
      <MessageDashBoard />
    </div>
  );
    
}
