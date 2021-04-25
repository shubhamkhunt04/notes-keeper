import React, { useContext, useState } from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import {
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  FavoriteOutlined as FavoriteOutlinedIcon,
  EditOutlined as EditIcon,
} from '@material-ui/icons';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { AppContext } from '../../AppContext';
import { auth, db } from '../../firebase';
import { useHistory } from 'react-router';
// import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  likeBtn: {
    zIndex: '98',
    position: 'absolute',
    marginLeft: '185px', // 106
    marginTop: '30px', // 175
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      marginTop: '175px',
      marginRight: '10px',
    },
  },
  likeBtnSize: {
    width: '26px',
    height: '26px',
  },
}));

const NoteCardBtn = ({ noteId }) => {
  const classes = useStyles();
  const history = useHistory();

  const noteRef = db.collection(`notesKeeper/notes/${auth.currentUser.uid}`);

  const { dispatch } = useContext(AppContext);

  const editBtnHandler = async (noteId) => {
    console.log('Edit called', noteId);
    const payload = (await noteRef.doc(noteId).get()).data();
    dispatch({ type: 'SET_EDITOR_TEXT', payload });
    history.push(`/edit/${noteId}`);
  };

  const deleteBtnHandler = async (noteId) => {
    noteRef.doc(noteId).delete();
  };

  return (
    <div className={classes.likeBtn}>
    <>
      <IconButton onClick={() => deleteBtnHandler(noteId)}>
        <DeleteOutlineIcon color='secondary' className={classes.likeBtnSize} />
      </IconButton>
      <IconButton onClick={() => editBtnHandler(noteId)}>
        <EditIcon color='secondary' className={classes.likeBtnSize} />
      </IconButton>
    </>
    </div>
  );
};

export default NoteCardBtn;
