import { Button, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill'; // ES6
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { auth, firestore } from '../firebase';
import { removeHTMLTags } from '../utils.js/RemoveHtml';

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

const TextEditor = () => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [state, setState] = useState(null);

  const editorRef = firestore.collection(
    `notesKeeper/notes/${auth.currentUser.uid}`
  );

  const onBodyChange = (val) => {
    setBody(val);
  };

  const getData = async () => {
    // editorRef.doc('notes').get().then((r)=>console.log(r))
    await firestore
      .collection(`notesKeeper/notes/${auth.currentUser.uid}`)
      .onSnapshot(function (querySnapShot) {
        setState(
          querySnapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))
        );
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const addNotes = () => {
    console.log("add notes called")
    const bodyWithoutHtml = removeHTMLTags(body);
    console.log(bodyWithoutHtml)
   editorRef.add({title,body:bodyWithoutHtml || '-'})
  };
  const deleteBtnHandler = (id)=>{
    editorRef.doc(id).delete()
  }

  const onTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  console.log(state);
  return (
    <div className={classes.editorContainer}>
      <h1>Tetx TextEditor</h1>
      {/* <BorderColorIcon className={classes.editIcon}></BorderColorIcon> */}
      <input
        className={classes.titleInput}
        placeholder='Note title...'
        onChange={onTitleChange}
      />
      <ReactQuill
        value={body}
        onChange={onBodyChange}
        placeholder='Note description'
        style={{width:'800px',height:'200px'}}
      ></ReactQuill>
      <Button variant='contained' onClick={addNotes}>
        Add Note
      </Button>
      {state?.map((note) => {
        return (
          <>
          <div style={{color:'white '}}>
            {JSON.stringify(note)}
            <h4>{note.title}</h4>
            <h4>{note.body}</h4>
            <Button variant='outlined' color='secondary' onClick={()=>deleteBtnHandler(note.id)}>Delete</Button>
          </div>
          </>
        );
      })}
    </div>
  );
};

export default TextEditor;
