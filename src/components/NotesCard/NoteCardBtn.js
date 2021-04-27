import React, { useContext } from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import { EditOutlined as EditIcon } from '@material-ui/icons';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { AiFillPushpin, AiOutlinePushpin } from 'react-icons/ai';

import { AppContext } from '../../AppContext';
import { auth, db } from '../../firebase';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  actionBtn: {
    zIndex: '98',
    position: 'absolute',
    // marginLeft: '220px',
    // marginTop: '30px',
    cursor: 'pointer',

    [theme.breakpoints.down('xl')]: {
      marginLeft: '165px',
      marginTop: '30px',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '114px',
      marginTop: '30px',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '115px',
      marginTop: '35px',
    },
  },
  actionBtnSize: {
    width: '26px',
    height: '26px',
  },
}));

const NoteCardBtn = ({ noteId, pin }) => {
  const classes = useStyles();
  const history = useHistory();

  console.log(pin);

  const noteRef = db.collection(`notesKeeper/notes/${auth.currentUser.uid}`);

  const { dispatch } = useContext(AppContext);

  const pinBtnHandler = async (noteId) => {
    try {
      // update note information
      await noteRef.doc(noteId).update({ pin: !pin });
      // if pin false then note pinned
      !pin
        ? toast.info('Note Pinned Successfully')
        : toast.info('Note Unpinned Successfully');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const editBtnHandler = async (noteId) => {
    const payload = (await noteRef.doc(noteId).get()).data();
    dispatch({ type: 'SET_EDITOR_TEXT', payload });
    history.push(`/edit/${noteId}`);
  };

  const deleteBtnHandler = async (noteId) => {
    noteRef.doc(noteId).delete();
  };

  return (
    <>
      <div className={classes.actionBtn}>
        <IconButton onClick={() => editBtnHandler(noteId)}>
          <EditIcon color='secondary' className={classes.actionBtnSize} />
        </IconButton>
        <IconButton onClick={() => pinBtnHandler(noteId)}>
          {pin ? <AiFillPushpin /> : <AiOutlinePushpin />}
        </IconButton>
        <IconButton onClick={() => deleteBtnHandler(noteId)}>
          <DeleteOutlineIcon color='error' className={classes.actionBtnSize} />
        </IconButton>
      </div>
    </>
  );
};

export default NoteCardBtn;
