import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import TextEditor from '../../TextEditor/TextEditor';
import { AppContext } from '../../AppContext';
import { auth, db, timestamp } from '../../firebase';
import { removeHTMLTags } from '../../utils.js/RemoveHtml';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: 'calc(100% - 35px)',
    position: 'absolute',
    left: '0',
    width: '300px',
    boxShadow: '0px 0px 2px black',
  },
  titleInput: {
    height: '50px',
    boxSizing: 'border-box',
    border: 'none',
    padding: '5px',
    fontSize: '24px',
    width: 'calc(100% - 300px)',
    backgroundColor: '#29487d',
    color: 'white',
    paddingLeft: '50px',
  },
  editIcon: {
    position: 'absolute',
    left: '310px',
    top: '12px',
    color: 'white',
    width: '10',
    height: '10',
  },
  editorContainer: {
    height: '50%',
    boxSizing: 'border-box',
    color: 'white',
    width: '50%',
  },
  textField: {
    width: '498px',
    [theme.breakpoints.down('md')]: {
      width: 'auto',
    },
  },
}));

const AddNote = () => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const { dispatch } = useContext(AppContext);

  const noteRef = db.collection(`notesKeeper/notes/${auth.currentUser.uid}`);

  const onBodyChange = (val) => {
    setBody(val);
  };

  const addNotes = async () => {
    if (!title || !body) {
      toast.error('Please add note title and description field');
    } else {
      const bodyWithoutHtml = removeHTMLTags(body);
      setTitle('');
      setBody('');
      try {
        await noteRef.add({
          title,
          body: bodyWithoutHtml || '-',
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
      {/* <div className={classes.editorContainer}> */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          margin: 'auto',
          maxWidth: '80vw',
        }}
      >
        <p style={{ fontSize: '26px', marginBottom: '4rem', color: 'white' }}>
          The simplest way to keep notes :{'}'}
        </p>

        <TextField
          id='outlined-flexible'
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
          style={{ marginBottom: '1.7rem' }}
        />
        <TextEditor value={body} onChange={onBodyChange} />
      </div>

      <Button
        variant='contained'
        onClick={addNotes}
        style={{ marginTop: '50px' }}
      >
        Add Note
      </Button>
    </>
  );
};

export default AddNote;
