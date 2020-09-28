import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { streamMedia, increaseView } from '../../redux/actions/mediaActions';
import { enqueueSnackbar } from '../../redux/actions/snackbarActions';
import history from '../../history';
// MUI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Files
import imageNotFound from '../../images/imageNotFound.png';

const useStyles = makeStyles((theme) => ({
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
  thumbnailContainer: {
    position: 'relative',
    color: 'white',
  },
  mediaDuration: {
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    padding: '0 4px',

    background: '#111',
  },
}));

const MediaItem = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { itemData } = props;
  const permission = useSelector((state) => state.user.permission);

  const isEligibleToWatch = (minPermission) => {
    return minPermission === 'free' || permission === 'premium';
  };
  const handleStreamMedia = (mediaKey, minPermission) => {
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

  const MediaItemCard = () => (
    <React.Fragment>
      <div className={classes.thumbnailContainer}>
        <img
          className={classes.thumbnail}
          alt={itemData.title}
          src={itemData.thumbnail_url}
          onClick={() =>
            handleStreamMedia(itemData.media_key, itemData.min_permission)
          }
          onError={(e) => {
            e.target.src = imageNotFound;
          }}
        />
        <div className={classes.mediaDuration}>
          {itemData.duration.slice(0, -3)}
        </div>
      </div>
      <Box pr={2}>
        <Typography
          className={classes.mediaTitle}
          gutterBottom
          variant='body2'
          onClick={() =>
            handleStreamMedia(itemData.media_key, itemData.min_permission)
          }
        >
          {itemData.title}
        </Typography>
        <Typography display='block' variant='caption' color='textSecondary'>
          {itemData.uploaded_by}
        </Typography>
        <Typography variant='caption' color='textSecondary'>
          {`${itemData.view} views • ${itemData.created_at.slice(0, 10)}`}
        </Typography>
      </Box>
    </React.Fragment>
  );

  const LoadingSkelton = () => (
    <React.Fragment>
      <Skeleton variant='rect' width={210} height={118} />
      <Grid pt={0.5}>
        <Skeleton width='30%' />
        <Skeleton width='50%' />
      </Grid>
    </React.Fragment>
  );

  return (
    <Grid item xs={12} sm={4} md={4} lg={3} align='center'>
      {itemData ? <MediaItemCard /> : <LoadingSkelton />}
    </Grid>
  );
};

export default MediaItem;
