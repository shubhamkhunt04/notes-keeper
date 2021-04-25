import React, { useContext } from 'react';
import {
  Box,
  Card,
  CardMedia,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import NoteCard from './NoteCard';
import { AppContext } from '../../AppContext';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  heading: {
    marginBottom: '10px',
    align: 'left',
    fontStyle: 'bold',
    color: 'white',
    marginTop: '20px',
  },
  card: {
    width: '150px',
    height: '190px',
  },
  media: {
    width: '120px',
    height: '120px',
  },
  dividerMargin :{
    marginBottom:'2rem'
  }
});

const Notes = () => {
  const classes = useStyles();
  const {
    state: { notes = [] },
  } = useContext(AppContext);
  return (
    <>
      {notes?.length === 0 ? (
        <div className={classes.heading}>
          <Alert severity='info'> No Note found yet !! please add notes</Alert>
        </div>
      ) : (
        <>
        <Typography variant='h5' className={classes.heading}>
          All Notes
        </Typography>
        <Divider className={classes.dividerMargin}/>
        </>
      )}
      <div className={classes.root}>
        <Grid container spacing={4}>
          {notes?.map((note) => {
            return (
              <NoteCard
                key={note.id}
                title={note.title}
                body={note.body}
                noteId={note.id}
              />
            );
          })}
        </Grid>
      </div>
    </>
  );
};

export default Notes;
