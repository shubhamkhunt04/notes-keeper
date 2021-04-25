import { Grid, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../AppContext';
import { auth, db } from '../../firebase';
import TextEditor from '../../TextEditor/TextEditor';
import AppNavBar from '../AppNavBar/AppNavBar';
import AddNote from '../NotesCard/AddNote';
import NotesCard from '../NotesCard/NotesCard';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '340px',
    height: '97px',
    margin: '20px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    fontSize: '22px',
    padding: '15px',
    letterSpacing: '3px',
    background: theme.palette.primary.dark,
    '&:hover': {
      background: theme.palette.grey[50],
      transform: 'translateY(-5px)',
      transition: '0.4s ease-out',
    },
  },
  cardTitle: {
    padding: '0.1rem',
    opacity: '0.9',
    fontSize: '1.5rem',
  },
  cardValue: {
    fontStyle: 'italic',
    padding: '10px',
  },
}));

const Dashboard = () => {

  const { dispatch } = useContext(AppContext);
  const getData = () => {
    db.collection(`notesKeeper/notes/${auth.currentUser.uid}`).onSnapshot(
      (querySnapShot) => {
        const payload = querySnapShot.docs.map((doc) => ({ id:doc.id,...doc.data() }));
        dispatch({ type: 'SET_NOTES', payload });
      }
    );
  };
  useEffect(() => {
    getData();
  }, []);

  const classes = useStyles();

  return (
    <>
      <AppNavBar />
      <div
        style={{
          backgroundColor: '',
          marginLeft: '200px',
          marginRight: '200px',
        }}
      >
        {/* <TextEditor /> */}
        <AddNote/>
        <NotesCard />
      </div>
    </>
  );
};

export default Dashboard;
