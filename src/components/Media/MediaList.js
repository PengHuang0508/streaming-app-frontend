import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { streamMedia, increaseView } from '../../redux/actions/mediaActions';
import { enqueueSnackbar } from '../../redux/actions/snackbarActions';
import history from '../../history';
// Hooks
import { useWindowSize } from '../../hooks/useWindowSize';
// MUI
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
  },
  thumbnail: {
    width: 240,
    maxWidth: '100%',
    height: 150,

    '&:hover': {
      cursor: 'pointer',
    },

    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: 260,
    },
  },
  mediaTitle: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  mediaItem: {
    backgroundColor: '#eee',
  },
  divider: {
    height: 5,
    margin: theme.spacing(10, 0, 2, 0),
  },
  moreContentContainer: {
    width: '100%',
  },
  expandContentWrapper: {
    paddingTop: theme.spacing(3),
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
  const dispatch = useDispatch();
  const { categoryName, mediaList } = props;
  const { loading, permission } = useSelector((state) => ({
    loading: state.ui.loading,
    permission: state.user.permission,
  }));
  const [open, setOpen] = React.useState(false);

  const handleExpandMore = () => {
    setOpen(!open);
  };

  const isEligibleToWatch = (minPermission) => {
    return minPermission === 'free' || permission === 'premium';
  };

  const handleWatch = (mediaKey, minPermission) => {
    if (isEligibleToWatch(minPermission)) {
      dispatch(streamMedia(mediaKey));
      dispatch(increaseView(mediaKey));
      history.push('/watch');
    } else {
      dispatch(
        enqueueSnackbar({
          message: `Sorry, you don't have the permission required to watch this video.`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'warning',
          },
        })
      );
    }
  };

  // Determine number of videos to display first. The rest will be hidden first.
  const windowSize = useWindowSize();

  let numberOfVideoToDisplay = 0;

  if (windowSize.width >= 1280) {
    numberOfVideoToDisplay = 8;
  } else if (windowSize.width >= 600) {
    numberOfVideoToDisplay = 6;
  } else {
    numberOfVideoToDisplay = mediaList.length;
  }

  const GridView = (
    <Grid className={classes.categoryGrid} container spacing={2}>
      {(loading
        ? Array.from(new Array(6))
        : mediaList.slice(0, numberOfVideoToDisplay)
      ).map((item, index) => (
        <Grid
          className={classes.mediaItem}
          key={index}
          item
          xs={12}
          sm={4}
          md={4}
          lg={3}
          align='center'
        >
          {item ? (
            <img
              className={classes.thumbnail}
              alt={item.title}
              src={item.thumbnail_url}
              onClick={() => handleWatch(item.media_key)}
            />
          ) : (
            <Skeleton variant='rect' width={210} height={118} />
          )}

          {item ? (
            <Box pr={2}>
              <Typography
                className={classes.mediaTitle}
                gutterBottom
                variant='body2'
                onClick={() => handleWatch(item.media_key)}
              >
                {item.title}
              </Typography>
              <Typography
                display='block'
                variant='caption'
                color='textSecondary'
              >
                {item.uploaded_by}
              </Typography>
              <Typography variant='caption' color='textSecondary'>
                {`${item.view} views • ${item.created_at.slice(0, 10)}`}
              </Typography>
            </Box>
          ) : (
            <Grid pt={0.5}>
              <Skeleton width='30%' />
              <Skeleton width='50%' />
            </Grid>
          )}
        </Grid>
      ))}
    </Grid>
  );

  const moreContent = (
    <div className={classes.expandContentWrapper}>
      <Collapse in={open} timeout='auto' unmountOnExit>
        {mediaList.slice(numberOfVideoToDisplay).map((item, index) => (
          <Grid key={index} item xs={12} sm={4} md={4} lg={3}>
            {item ? (
              <img
                className={classes.thumbnail}
                alt={item.title}
                src={item.thumbnail_url}
                onClick={() => handleWatch(item.media_key, item.min_permission)}
              />
            ) : (
              <Skeleton variant='rect' width={210} height={118} />
            )}

            {item ? (
              <Box pr={2}>
                <Typography
                  className={classes.mediaTitle}
                  gutterBottom
                  variant='body2'
                  onClick={() =>
                    handleWatch(item.media_key, item.min_permission)
                  }
                >
                  {item.title}
                </Typography>
                <Typography
                  display='block'
                  variant='caption'
                  color='textSecondary'
                >
                  {item.uploaded_by}
                </Typography>
                <Typography variant='caption' color='textSecondary'>
                  {`${item.view} views • ${item.created_at.slice(0, 10)}`}
                </Typography>
              </Box>
            ) : (
              <Grid pt={0.5}>
                <Skeleton width='30%' />
                <Skeleton width='50%' />
              </Grid>
            )}
          </Grid>
        ))}
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

      {mediaList.length > numberOfVideoToDisplay && moreContent}

      <Divider className={classes.divider} />
    </React.Fragment>
  );
};

export default MediaList;
