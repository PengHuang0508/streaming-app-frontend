import React from 'react';
import { useSelector } from 'react-redux';
// Hooks
import { useWindowSize } from '../../hooks/useWindowSize';
// MUI
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Components
import MediaItem from './MediaItem';

const useStyles = makeStyles((theme) => ({
  categoryTitle: {
    paddingBottom: theme.spacing(3),

    fontFamily: 'Rubik, sans-serif',
    fontSize: '3em',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  categoryGrid: {
    width: '100%',
    background: 'red',
  },
  divider: {
    height: 5,
    margin: theme.spacing(10, 0, 2, 0),
  },
  expandContentWrapper: {
    width: '100%',
  },
  expandButton: {
    width: '100%',
    marginTop: theme.spacing(1),

    textAlign: 'center',
    backgroundColor: '#ddd',
  },
}));

const MediaList = (props) => {
  const classes = useStyles();
  const { categoryName, mediaList } = props;
  const { loading } = useSelector((state) => ({
    loading: state.ui.loading,
  }));
  const windowSize = useWindowSize();
  const [open, setOpen] = React.useState(false);

  const handleExpandMore = () => {
    setOpen(!open);
  };

  const setMaxVideoToDisplay = () => {
    if (windowSize.width >= 1280) {
      return 8;
    } else if (windowSize.width >= 600) {
      return 6;
    } else {
      return mediaList.length;
    }
  };

  // Determine number of mediaItem to display first. The rest will be hidden.
  const maxNumberItemToDisplay = setMaxVideoToDisplay();

  const GridView = (
    <Grid className={classes.categoryGrid} container spacing={2}>
      {(loading
        ? Array.from(new Array(6))
        : mediaList.slice(0, maxNumberItemToDisplay)
      ).map((itemData, index) => (
        <MediaItem key={`MediaItem-${index}`} itemData={itemData} />
      ))}
    </Grid>
  );

  const moreContent = (
    <div className={classes.expandContentWrapper}>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <Grid className={classes.categoryGrid} container spacing={2}>
          {mediaList.slice(maxNumberItemToDisplay).map((itemData, index) => (
            <MediaItem key={`MediaItem-${index}`} itemData={itemData} />
          ))}
        </Grid>
      </Collapse>
      <Button className={classes.expandButton} onClick={handleExpandMore}>
        {open ? 'LESS' : 'MORE'}
      </Button>
    </div>
  );

  return (
    <React.Fragment>
      <Typography
        id={categoryName}
        className={classes.categoryTitle}
        component='h2'
        variant='h3'
      >
        {categoryName}
      </Typography>

      {GridView}

      {mediaList.length > maxNumberItemToDisplay && moreContent}

      <Divider className={classes.divider} />
    </React.Fragment>
  );
};

export default MediaList;
