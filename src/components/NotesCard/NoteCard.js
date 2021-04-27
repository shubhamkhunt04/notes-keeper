import React, { useContext } from 'react';
import { Box, Card, makeStyles } from '@material-ui/core';
import NoteCardBtn from './NoteCardBtn';
import { removeHTMLTags } from '../../utils.js/RemoveHtml';
import { auth, db } from '../../firebase';
import { toast } from 'react-toastify';
import { AppContext } from '../../AppContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    width: '300px',
    height: '170px',
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
      height: '170px',
    },
  },
  control: {
    padding: theme.spacing(2),
  },
  box: {
    height: '6.5rem',
  },
  cardTitle: {
    fontSize: '20px',
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
  },
  lineBorder: {
    borderBottom: '1px solid white',
    marginTop: '0.5rem',
  },
}));

const NoteCard = ({ note }) => {
  const { id, title, body,pin } = note;

  console.log("Note card",note.pin,"pin",pin)
  const classes = useStyles();
  const {state} = useContext(AppContext)

  const noteRef = db.collection(`notesKeeper/notes/${auth.currentUser.uid}`);

  const pinBtnHandler = async (id) => {
    console.log(id);
    console.log('pin called');
    try {
      // const targetRecord = state.notes.filter((note)=>note.id===id)
      // console.log("targetRecord",targetRecord)
      // update note information
      await noteRef.doc(id).update({ title, body, pin: true });
      // history.push('/');
      toast.info('Note Pinned Successfully');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <Card className={classes.card} title='This is Title'>
        <Box className={classes.box}>
          <div className={classes.cardTitle}>{title}</div>
          <div className={classes.lineBorder} />
          <div>
            {body?.length > 74 ? (
              <p>{`${removeHTMLTags(body.slice(0, 125))} ... `}</p>
            ) : (
              <p>{removeHTMLTags(body)}</p>
            )}
          </div>
        </Box>
        <NoteCardBtn noteId={id} pin={pin} />
      </Card>
    </div>
  );
};

export default NoteCard;
