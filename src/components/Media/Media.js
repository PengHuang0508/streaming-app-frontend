import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMediaList, streamMedia } from '../../redux/actions/mediaActions';
// MUI
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// Components
import MediaList from './MediaList';

const useStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
    padding: theme.spacing(10, 5),

    backgroundColor: '#eee',
  },
}));

const Media = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { mediaList } = useSelector((state) => ({
    mediaList: state.media.mediaList,
  }));

  useEffect(() => {
    dispatch(getMediaList());
    return () => {};
  }, [dispatch]);

  const categoryList = {};

  // Can also use tags to filter (eg. 'hot', 'popular', 'most viewed' ...)
  categoryList['Free'] = mediaList.filter((attr) => {
    return attr.min_permission == 'free';
  });

  categoryList['Premium'] = mediaList.filter((attr) => {
    return attr.min_permission == 'premium';
  });

  let mediaListComponent = [];

  for (const category in categoryList) {
    mediaListComponent.push(
      <MediaList
        key={category}
        categoryName={category}
        mediaList={categoryList[category]}
      />
    );
  }

  return <div className={classes.main}>{mediaListComponent}</div>;
};

export default Media;
