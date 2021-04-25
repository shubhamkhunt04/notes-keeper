import React from 'react';
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
  
  return (
    <>
      <Typography variant='h5' className={classes.heading}>
        Top Trends
      </Typography>
      <div className={classes.root}>
        <Grid container spacing={4}>
          {new Array(10).fill(0).map((song,index) => {
            return <NoteCard key={index} />;
          })}
        </Grid>
      </div>
    </>
  );
};

export default NotesCard;
