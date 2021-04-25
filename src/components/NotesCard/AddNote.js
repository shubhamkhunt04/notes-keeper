import { Button, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import TextEditor from '../../TextEditor/TextEditor';
import { AppContext } from '../../AppContext';
import { auth, db } from '../../firebase';
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
    const bodyWithoutHtml = removeHTMLTags(body);
    try {
      await noteRef.add({ title, body: bodyWithoutHtml || '-' });
      toast.success('New Note Created');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  return (
    <div className={classes.editorContainer}>
      <h1>Tetx TextEditor</h1>
      <input
        className={classes.titleInput}
        placeholder='Note title...'
        onChange={onTitleChange}
      />

      <TextEditor value={body} onChange={onBodyChange} />

      <Button variant='contained' onClick={addNotes}>
        Add Note
      </Button>
    </div>
  );
};

export default AddNote;
