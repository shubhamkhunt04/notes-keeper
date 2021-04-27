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
        // sort the data by createdAt
        payload.sort((first, second) => {
          return second.createdAt - first.createdAt;
        });

        const data = payload.filter((note)=>note.pin)
        console.log("pin data",data)
        const data2 = payload.filter((note)=>!note.pin)
        console.log("pin data2",data2)
        let result=  [...data,...data2]
        console.log(result)
        

         dispatch({ type: 'SET_NOTES', payload:result });
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
