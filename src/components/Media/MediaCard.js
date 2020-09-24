import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const MediaCard = (props) => {
  const classes = useStyles();
  const { title, description, duration } = props;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image='/' title={title} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          Play
        </Button>
      </CardActions>
    </Card>
  );
};

export default MediaCard;

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
      {item.channel}
    </Typography>
    <Typography variant='caption' color='textSecondary'>
      {`${item.views} • ${item.createdAt}`}
    </Typography>
  </Box>
) : (
  <Box pt={0.5}>
    <Skeleton />
    <Skeleton width='60%' />
  </Box>
)}
</Box> */
}
{
  /* <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image='/static/images/cards/contemplative-reptile.jpg'
          title='Contemplative Reptile'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Lizard
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          Share
        </Button>
        <Button size='small' color='primary'>
          Learn More
        </Button>
      </CardActions>
    </Card> */
}
