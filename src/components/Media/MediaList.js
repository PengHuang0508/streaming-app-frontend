import React from 'react';
import { useSelector } from 'react-redux';
// MUI
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { CardContent, Divider } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
// Components
import MediaCard from './MediaCard';

const useStyles = makeStyles((theme) => ({
  mediaListTitle: {
    marginBottom: theme.spacing(3),

    color: '#555',
  },
  categoryGrid: {
    width: '100%',
  },
  divider: {
    height: 5,
    margin: theme.spacing(5, 0),
  },
}));
const MediaList = (props) => {
  const classes = useStyles();
  const { categoryName, mediaList } = props;
  const { loading } = useSelector((state) => ({
    loading: state.ui.loading,
  }));

  return (
    <React.Fragment>
      {categoryName && (
        <Typography
          className={classes.mediaListTitle}
          component='h2'
          variant='h3'
        >
          {categoryName}
        </Typography>
      )}
      <Grid className={classes.categoryGrid} container spacing={3}>
        {(loading ? Array.from(new Array(6)) : mediaList).map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            {item ? (
              <img
                style={{ width: 210, height: 118 }}
                alt={item.title}
                src={item.thumbnail}
              />
            ) : (
              <Skeleton variant='rect' width={210} height={118} />
            )}

            {item ? (
              <Box pr={2}>
                <Typography gutterBottom variant='body2'>
                  {item.title}
                </Typography>
                <Typography
                  display='block'
                  variant='caption'
                  color='textSecondary'
                >
                  {item.description}
                </Typography>
                <Typography variant='caption' color='textSecondary'>
                  {`• ${item.created_at}`}
                </Typography>
              </Box>
            ) : (
              <Grid pt={0.5}>
                <Skeleton />
                <Skeleton width='60%' />
              </Grid>
            )}
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default MediaList;

// https://s3-us-west-2.amazonaws.com/thumbnails.mellon.com/elastic-transcoder/hls/3e31ce55aaaebaf1bbd39ff77d549005801b405e18dbf49e1cd7123f125d1a83/00001.png

{
  /* <Box key={index} width={210} marginRight={0.5} my={5}>
{item ? (
  <img
    style={{ width: 210, height: 118 }}
    alt={item.title}
    src={item.src}
  />
) : (
  <Skeleton variant='rect' width={210} height={118} />
)}

{item ? (
  <Box pr={2}>
    <Typography gutterBottom variant='body2'>
      {item.title}
    </Typography>
    <Typography
      display='block'
      variant='caption'
      color='textSecondary'
    >
      {item.description}
    </Typography>
    <Typography variant='caption' color='textSecondary'>
      {`• ${item.created_at}`}
    </Typography>
  </Box> */
}
{
  /* <Grid container spacing={2}>
{mediaList.map((media) => (
  <Grid
    key={`${media.media_key}-${media.created_at}`}
    item
    xs={12}
    md={4}
    lg={3}
  >
    <MediaCard
      title={media.title}
      description={media.description}
      duration={media.duration}
    />
  </Grid>
))}
</Grid>
<Divider className={classes.divider} /> */
}

// <Grid container wrap='nowrap'>
// {Array.from(new Array(3)).map((index) => (
//   <Box key={index} width={210} marginRight={0.5} my={5}>
//     <Skeleton variant='rect' width={210} height={118} />

//     <Box pt={0.5}>
//       <Skeleton />
//       <Skeleton width='60%' />
//     </Box>
//   </Box>
// ))}
// </Grid>
