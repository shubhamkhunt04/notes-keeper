import React from 'react';
import { useHistory } from 'react-router';
import { makeStyles, IconButton } from '@material-ui/core';
import { EditOutlined as EditIcon } from '@material-ui/icons';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { AiFillPushpin, AiOutlinePushpin } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { auth, db } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  actionBtn: {
    zIndex: '98',
    position: 'absolute',
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

  const noteRef = db.collection(`notesKeeper/notes/${auth.currentUser.uid}`);

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
    try {
      (await noteRef.doc(noteId).get()).data();
      history.push(`/edit/${noteId}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteBtnHandler = async (noteId) => {
    try {
      await noteRef.doc(noteId).delete();
    } catch (err) {
      toast.error(err.message);
    }
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
