import React, { useContext } from 'react';
import { Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import NoteCard from './NoteCard';
import { AppContext } from '../../AppContext';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: '10px',
    align: 'left',
    fontStyle: 'bold',
    color: 'white',
    marginTop: '20px',
  },
  dividerMargin: {
    marginBottom: '2rem',
    background:theme.palette.divider,
  
  },
  root: {
    flexGrow: 1,
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
          <Divider className={classes.dividerMargin}/>
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
