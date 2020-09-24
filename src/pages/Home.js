import React from 'react';
// Components
import Navbar from '../components/Nav/Navbar';
import Drawer from '../components/Drawer/Drawer';
import Media from '../components/Media/Media';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <Drawer />
      <Media />
    </div>
  );
};

export default Home;
