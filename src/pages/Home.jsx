import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMediaList } from '../redux/actions/mediaActions';
// Hooks
import { useWindowSize } from '../hooks/useWindowSize';
// Components
import Media from '../components/Media/Media';
import Footer from '../components/Footer/Footer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  homeRoot: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,

    minHeight: '100vh',
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const windowSize = useWindowSize();
  const showFooter = windowSize.height > 700;

  useEffect(() => {
    dispatch(getMediaList());
    return () => {};
  }, [dispatch]);

  return (
    <div className={classes.homeRoot}>
      <Media />
      {showFooter && <Footer />}
    </div>
  );
};

export default Home;
