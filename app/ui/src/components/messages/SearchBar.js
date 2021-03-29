import React from 'react';
import { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
// import Autocomplete from '@material-ui/AutoComplete'

var recents = [];
export default function MessageSearchBar() {
  const [value, setValue] = useState('')
  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    recents.unshift(value);
    console.log(recents);
    setValue('')
  }
  return (
  <div style={{ width: 300 }}>
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField 
        label="Search"
        variant="outlined"
        value={value}
        onChange={handleChange}
        placeholder="Search..."
      />
      {/* <Button
        size="small"
        color="primary"
        variant="outlined"
      /> */}
    </form>
  </div>
  );
}
