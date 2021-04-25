import { Button, Divider, makeStyles, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { AppContext } from '../../AppContext';
import { auth, db } from '../../firebase';
import TextEditor from '../../TextEditor/TextEditor';
import { removeHTMLTags } from '../../utils.js/RemoveHtml';
import Loader from '../Loader/Loader';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: '3rem',
    width: '375px',
  },
  updateBtn: {
    marginTop: '70px',
  },
}));

const UpdateNote = () => {
  const classes = useStyles();
  const { noteId } = useParams();
  const history = useHistory();

  const noteRef = db.collection(`notesKeeper/notes/${auth.currentUser.uid}`);
  const {
    state: { loading },
    dispatch,
  } = useContext(AppContext);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const onBodyChange = (val) => {
    setBody(val);
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const getNote = async () => {
    const { title, body } = (await noteRef.doc(noteId).get()).data();
    setTitle(title);
    setBody(body);
  };
  useEffect(() => {
    getNote();
  }, []);

  const updateNote = async () => {
    const bodyWithoutHtml = removeHTMLTags(body);
    if (!title || !body) {
      toast.error('Please add note title and description field');
    } else {
      try {
        await noteRef.doc(noteId).update({ title, body: bodyWithoutHtml });
        history.push('/');
        toast.success('Note Updated Successfully');
      } catch (err) {
        toast.error(err.message);
      }
    }
  };
  console.log(loading);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <h1 style={{ color: 'white' }}>Update Note</h1>
          <Divider />{' '}
          {/* <input
          // className={classes.titleInput}
          placeholder='Note title...'
          onChange={onTitleChange}
          value={title}
        /> */}
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
          />
          <TextEditor value={body} onChange={onBodyChange} />
          <Button
            variant='contained'
            onClick={updateNote}
            className={classes.updateBtn}
          >
            Update Note
          </Button>
        </div>
      )}
    </>
  );
};

export default UpdateNote;
