import React from 'react';
import { Box, Card, makeStyles } from '@material-ui/core';
import NoteCardBtn from './NoteCardBtn';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    width: '300px',
    height: '150px',
    padding: '15px',
    borderRadius: '10px',
    background: theme.palette.primary.dark,

    '&:hover': {
      background: theme.palette.primary.main,
      transform: 'translateY(-5px)',
      transition: '0.4s ease-out',
      cursor: 'pointer',
    },

    [theme.breakpoints.down('md')]: {
      width: '250px',
      height: '150px',
    },
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const NoteCard = ({ note }) => {
  const { id, title, body } = note;
  const classes = useStyles();

  return (
      <div style={{position:'relative'}}>
    <Card className={classes.card} title='This is Title'>
      <Box className={classes.box}>
        <div className={classes.cardTitle}>{title}</div>

        <div>
          <p>{body.slice(1,10)}</p>
        </div>
      </Box>
      <NoteCardBtn noteId={id} />
    </Card>
      </div>
  );
};

export default NoteCard;
