import React, { useContext } from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import { EditOutlined as EditIcon } from '@material-ui/icons';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { AppContext } from '../../AppContext';
import { auth, db } from '../../firebase';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  actionBtn: {
    zIndex: '98',
    position: 'absolute',
    marginLeft: '220px',
    marginTop: '30px',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      marginLeft: '70px',
      marginTop: '-15px',
      marginRight: '10px',
    },
    [theme.breakpoints.down('xl')]: {
      marginLeft: '200px',
      marginTop: '30px',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '150px',
      marginTop: '35px',
      marginRight: '10px',
    },
  },
  actionBtnSize: {
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
    <div className={classes.actionBtn}>
      <IconButton onClick={() => editBtnHandler(noteId)}>
        <EditIcon color='secondary' className={classes.actionBtnSize} />
      </IconButton>
      <IconButton onClick={() => deleteBtnHandler(noteId)}>
        <DeleteOutlineIcon
          color='error'
          className={classes.actionBtnSize}
        />
      </IconButton>
    </div>
  );
};

export default NoteCardBtn;
