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

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: 'flex',
  // },
  heading: {
    marginBottom: '10px',
    align: 'left',
    fontStyle: 'bold',
    color: 'white',
    marginTop: '20px',
  },
  // card: {
  //   width: '150px',
  //   height: '190px',
  // },
  // media: {
  //   width: '120px',
  //   height: '120px',
  // },
  dividerMargin: {
    marginBottom: '2rem',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 300,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

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
          <Divider className={classes.dividerMargin} />
          <Typography variant='h5' className={classes.heading}>
            All Notes
          </Typography>
          <Divider className={classes.dividerMargin} />
        </>
      )}

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={2}>
            {notes?.map((note) => (
              <Grid key={note.id} item>
                <NoteCard note={note} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Notes;
