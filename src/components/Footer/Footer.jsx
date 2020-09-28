import React from 'react';
// MUI
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    width: '100%',
    padding: theme.spacing(6, 0),

    color: '#fff',

    backgroundColor: theme.palette.primary.dark,
  },
  footerTitle: {
    fontFamily: 'Rubik',
  },
  footerSubtitle: {
    fontFamily: 'Baloo Tammudu 2',
    fontStyle: 'italic',
  },
  footerNote: {
    margin: '50px 0 25px 0',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth='lg'>
        <Typography
          className={classes.footerTitle}
          variant='h4'
          align='center'
          gutterBottom
        >
          Mellon
        </Typography>
        <Typography
          className={classes.footerSubtitle}
          variant='subtitle2'
          align='center'
          component='p'
        >
          The playground of the internet
        </Typography>
        <Typography
          className={classes.footerNote}
          variant='body2'
          align='center'
        >
          {'Source code is avaible on '}
          <Link
            color='inherit'
            href='https://github.com/PengHuang0508/streaming-app-frontend'
          >
            Github
          </Link>
          {'.'}
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
