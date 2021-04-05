import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, FormGroup, FormLabel, FormControl, TextField, Button }from '@material-ui/core';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function NewConversationModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
     <FormGroup>
         <FormLabel>Name</FormLabel>
         <TextField value={value} variant="outlined" color="primary" />
         <FormLabel>Email</FormLabel>
         <TextField value={value} variant="outlined" color="primary" />
         <Button onClick ={handleClose} color="primary" variant="contained" style={{ alignSelf: 'center', width: '250px', margin: '5%'}}>Create</Button>
     </FormGroup>
    </div>
  );

  return (
    <div>
      <Button onClick={handleOpen} color="primary" variant="contained" style={{ alignSelf: 'center', width: '150px'}}>
          Create
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
