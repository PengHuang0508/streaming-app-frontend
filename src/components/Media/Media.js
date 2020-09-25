import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMediaList } from '../../redux/actions/mediaActions';
// MUI
import { makeStyles } from '@material-ui/core/styles';
// Components
import MediaList from './MediaList';

const useStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
    maxWidth: '100%',
    paddingTop: 80,
    paddingLeft: theme.spacing(7),
    paddingRight: theme.spacing(7),

    backgroundColor: '#eee',

    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },

    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
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

  const createCategory = () => {
    let categoryList = {};
    let mediaListComponent = [];

    let result = 0;
    categoryList['Trending'] = mediaList.filter((attr) => {
      return attr.view > 0 && result++ < 6;
    });

    categoryList['Free'] = mediaList.filter((attr) => {
      return attr.min_permission == 'free';
    });
    categoryList['Premium'] = mediaList.filter((attr) => {
      return attr.min_permission == 'premium';
    });

    for (const category in categoryList) {
      // If the category contains no videos, don't display it
      if (Object.keys(categoryList[category]).length === 0) {
        continue;
      }

      mediaListComponent.push(
        <MediaList
          key={category}
          categoryName={category}
          mediaList={categoryList[category]}
        />
      );
    }

    return mediaListComponent;
  };

  return <div className={classes.main}>{createCategory()}</div>;
};

export default Media;
