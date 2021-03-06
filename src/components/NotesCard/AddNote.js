import React, { useState } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { toast } from 'react-toastify';

import TextEditor from '../../TextEditor/TextEditor';
import { auth, db } from '../../firebase';
import firebase from "../../firebase"

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 'auto',
    maxWidth: '80vw',
  },
  textField: {
    width: '40vw',
    marginBottom: '1.7rem',
    [theme.breakpoints.down('md')]: {
      width: '80vw',
    },
    [theme.breakpoints.down('sm')]: {
      width: '90vw',
    },
  },
  addNoteBtn: {
    marginTop: '55px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '78px',
    },
  },
  heading: {
    fontSize: '26px',
    marginBottom: '4rem',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
  },
}));

const AddNote = () => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const noteRef = db.collection(`notesKeeper/notes/${auth.currentUser.uid}`);
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  const onBodyChange = (val) => {
    setBody(val);
  };

  const addNotes = async () => {
    if (!title || !body) {
      toast.error('Please add note title and description field');
    } else {
      setTitle('');
      setBody('');
      try {
        await noteRef.add({
          title,
          body: body || '-',
          pin:false,
          createdAt: timestamp(),
        });
        toast.success('New Note Created');
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const onTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  return (
    <>
      <div className={classes.container}>
        <p className={classes.heading}>
          The simplest way to keep notes : {'}'}
        </p>

        <div>
          <TextField
            label='Note Title'
            variant='outlined'
            color='secondary'
            type='text'
            size='small'
            className={classes.textField}
            onChange={onTitleChange}
            value={title}
            autoComplete='off'
            required
          />
          <TextEditor value={body} onChange={onBodyChange} />
        </div>
      </div>

      <Button
        variant='contained'
        onClick={addNotes}
        color='secondary'
        className={classes.addNoteBtn}
      >
        Add Note
      </Button>
    </>
  );
};

export default AddNote;
