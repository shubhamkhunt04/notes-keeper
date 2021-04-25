import React, { useContext, useState } from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import {
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  FavoriteOutlined as FavoriteOutlinedIcon,
  EditOutlined as EditIcon,
} from '@material-ui/icons';
import { AppContext } from '../../AppContext';
import { auth, db } from '../../firebase';
import { useHistory } from 'react-router';
// import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  likeBtn: {
    zIndex: '98',
    position: 'absolute',
    marginLeft: '115px', // 106
    marginTop: '210px', // 175
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

const LikeSong = ({ noteId }) => {
  const classes = useStyles();
  const history = useHistory()
  const [like, setLike] = useState(false);
  const {
    dispatch,
  } = useContext(AppContext);

  const editBtnHandler = async (noteId) => {
    console.log('Edit called', noteId);
    const payload = (
      await db
        .collection(`notesKeeper/notes/${auth.currentUser.uid}`)
        .doc(noteId)
        .get()
    ).data();
    dispatch({ type: 'SET_EDITOR_TEXT', payload });
    console.log("Hello payload", payload);
    history.push(`/edit/${noteId}`)
  };
  return (
    // <div className={classes.likeBtn} onClick={() => likeSong(noteId)}>
      <>
        <IconButton>
          <FavoriteBorderOutlinedIcon
            color='secondary'
            className={classes.likeBtnSize}
          />
        </IconButton>
        <IconButton onClick={() => editBtnHandler(noteId)}>
          <EditIcon color='secondary' className={classes.likeBtnSize} />
        </IconButton>
      </>
    // </div>
  );
};

export default LikeSong;
