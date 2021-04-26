import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Button, IconButton } from '@material-ui/core';
import DeleteSweepOutlinedIcon from '@material-ui/icons/DeleteSweepOutlined';
import { auth, db } from '../../firebase';
import { AppContext } from '../../AppContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const AppNavBar = () => {
  const classes = useStyles();
  const {
    state: { notes = [] },
    dispatch,
  } = useContext(AppContext);

  return (
    <div className={classes.root} >
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
          ></IconButton>
          <Typography className={classes.title} variant='h6' noWrap>
            Notes Keeper
          </Typography>

          <Button
            variant='contained'
            onClick={() => auth.signOut()}
            style={{ float: 'right' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppNavBar;
