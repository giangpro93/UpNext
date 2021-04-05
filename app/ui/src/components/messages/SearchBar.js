import React          from 'react';
import { useState }   from 'react';
import { TextField }  from '@material-ui/core';
import SearchIcon     from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';



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
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
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
