import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';

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
    paddingBottom: '10rem',
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
        // filter all unpinned notes
        const unPinnedNotes = payload.filter((note) => !note.pin);
        // merge pinned notes first and then unpinned notes
        const result = [...pinnedNotes, ...unPinnedNotes];

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
      <AppNavBar />
      <a href="https://github.com/shubhamkhunt04/notes-keeper"><img loading="lazy" width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_left_white_ffffff.png?resize=149%2C149" class="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1" /></a>
      <div className={classes.container}>
        <AddNote />
        <Notes />
      </div>
    </>
  );
};

export default Dashboard;
