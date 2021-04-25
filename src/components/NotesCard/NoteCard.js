import React from 'react';
import { makeStyles, CardMedia, Grid, Box, Card } from '@material-ui/core';
import LikeSong from './NoteCardBtn';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  card: {
    width: '350px',
    height: '150px',
    padding: '15px',
    borderRadius: '10px',
    background: theme.palette.grey[50],

    '&:hover': {
      background: theme.palette.primary.dark,
      transform: 'translateY(-5px)',
      transition: '0.4s ease-out',
      cursor: 'pointer',
    },

    [theme.breakpoints.down('md')]: {
      width: '150px',
      height: '210px',
    },
  },
  cardContent: {
    display: 'row',
    alignItems: 'left',
    background: 'red',
    float: 'left',
  },
  box: {
    [theme.breakpoints.down('md')]: {
      width: '125px',
      height: '120px',
    },
  },
  media: {
    width: '150px',
    height: '155px',
    borderRadius: '10px',
    [theme.breakpoints.down('md')]: {
      width: '120px',
      height: '125px',
    },
  },
  cardTitle: {
    fontSize: '1rem',
    margin: '10px auto 3px',
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '13px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  artistName: {
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '13px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  likeBtn: {
    position: 'absolute',
    left: '0px',
    top: '0px',
    zIndex: '-1',
  },
}));

const NoteCard = ({ title, body,noteId }) => {
  const mouseEnterHandler = (songId) => {
    const target = document.getElementById(songId);
    target.src =
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.HJ9lEAbyZFBEQzDmVb8zHwHaF7%26pid%3DApi&f=1';
  };

//   const mouseLeaveHandler = (songId) => {
//     const target = document.getElementById(songId);
//     target.src = musicData.cover;
//   };

  const classes = useStyles();
  return (
    <Grid
      item
      xs={6}
      sm={4}
      md={3}
      lg={4}
      container
      direction='row'
      justify='center'
      alignItems='center'
    >
      <Card
        className={classes.card}
        title='This is Title'
        // onClick={() => cardClickHandler(musicData._id)}
        // onMouseEnter={() => mouseEnterHandler(musicData._id)}
        // onMouseLeave={() => mouseLeaveHandler(musicData._id)}
      >
        <Box className={classes.box}>
          <div className={classes.cardTitle}>{title}</div>
          <div>
            <p className={classes.artistName}>{body}</p>
          </div>
        </Box>
       <LikeSong noteId={noteId} />
      </Card>
    </Grid>
  );
};

export default NoteCard;
