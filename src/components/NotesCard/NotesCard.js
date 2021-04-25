import React, { useContext } from 'react';
import {
  Box,
  Card,
  CardMedia,
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

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  heading: {
    marginBottom: '10px',
    align: 'left',
    fontStyle: 'bold',
  },
  card: {
    width: '150px',
    height: '190px',
  },
  media: {
    width: '120px',
    height: '120px',
  },
});

const NotesCard = () => {
  const classes = useStyles();
  const {state :{notes = [] }} = useContext(AppContext)
  return (
    <>
      <Typography variant='h5' className={classes.heading}>
        Top Trends
      </Typography>
      <div className={classes.root}>
        <Grid container spacing={4}>
          {notes?.map((note) => {
            return <NoteCard key={note.id} title={note.title} body={note.body} noteId={note.id} />;
          })}
        </Grid>
      </div>
    </>
  );
};

export default NotesCard;
