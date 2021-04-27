import { Button, Divider, makeStyles, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { auth, db } from '../../firebase';
import firebase from '../../firebase';
import TextEditor from '../../TextEditor/TextEditor';
import { AppContext } from '../../AppContext';

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
    width: '500px',
    marginBottom: '1.7rem',
    [theme.breakpoints.down('md')]: {
      width: '400px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '290px',
    },
  },
  updateBtn: {
    marginTop: '50px',
    marginBottom:'38vh',
    [theme.breakpoints.down('sm')]: {
      marginTop: '73px',
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

const UpdateNote = () => {
  const classes = useStyles();
  const { noteId } = useParams();
  const history = useHistory();

  const {
    state: { editorText },
  } = useContext(AppContext);

  console.log({ editorText });

  const noteRef = db.collection(`notesKeeper/notes/${auth.currentUser.uid}`);
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const onBodyChange = (val) => {
    setBody(val);
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // load notes
  const getNote = async () => {
    const { title, body } = (await noteRef.doc(noteId).get()).data();
    setTitle(title);
    setBody(body);
  };
  useEffect(() => {
    getNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateNote = async () => {
    // const bodyWithoutHtml = removeHTMLTags(body);
    if (!title || !body) {
      toast.error('Please add note title and description field');
    } else {
      try {
        // update note information
        await noteRef
          .doc(noteId)
          .update({ title, body, updatedAt: timestamp() });
        history.push('/');
        toast.success('Note Updated Successfully');
      } catch (err) {
        toast.error(err.message);
      }
    }
  };
  return (
    <>
      <div className={classes.container}>
        <p className={classes.heading}>Update Note</p>
        <Divider />

        <div>
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
        </div>
        <Button
          variant='contained'
          onClick={updateNote}
          className={classes.updateBtn}
          color='secondary'
        >
          Update Note
        </Button>
      </div>
    </>
  );
};

export default UpdateNote;
