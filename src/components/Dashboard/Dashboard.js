import { makeStyles } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { AppContext } from '../../AppContext';
import { auth, db } from '../../firebase';
import AppNavBar from '../AppNavBar/AppNavBar';
import AddNote from '../NotesCard/AddNote';
import Notes from '../NotesCard/Notes';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 'auto',
    maxWidth: '80vw',
    paddingBottom:'10rem'
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  const { dispatch } = useContext(AppContext);

  const getData = () => {
    db.collection(`notesKeeper/notes/${auth.currentUser.uid}`).onSnapshot(
      (querySnapShot) => {
        const payload = querySnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // sort the notes by createdAt
        payload.sort((first, second) => {
          return second.createdAt - first.createdAt;
        });

        // filter all pinned notes
        const pinnedNotes = payload.filter((note) => note.pin);
        console.log('pinnedNotes data', pinnedNotes);
        // filter all unpinned notes
        const unPinnedNotes = payload.filter((note) => !note.pin);
        console.log('unPinnedNotes data2', unPinnedNotes);
        // merge pinned notes first and then unpinned notes
        const result = [...pinnedNotes, ...unPinnedNotes];
        console.log(result);

        dispatch({ type: 'SET_NOTES', payload: result });
      }
    );
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ToastContainer />
      <AppNavBar />
      <div className={classes.container}>
        <AddNote />
        <Notes />
      </div>
    </>
  );
};

export default Dashboard;
