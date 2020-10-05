import React from 'react';
import { useSelector } from 'react-redux';
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

    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },

    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
  },
}));

const Media = () => {
  const classes = useStyles();
  const mediaList = useSelector((state) => state.media.mediaList);

  const Categories = () => {
    let categoryList = {};
    let mediaListComponent = [];

    let result = 0;
    categoryList['Trending'] = mediaList.filter((attr) => {
      return attr.view > 0 && result++ < 6;
    });

    categoryList['Free'] = mediaList.filter((attr) => {
      return attr.min_permission === 'free';
    });
    categoryList['Premium'] = mediaList.filter((attr) => {
      return attr.min_permission === 'premium';
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

  return (
    <div className={classes.main}>
      <Categories />
    </div>
  );
};

export default Media;
