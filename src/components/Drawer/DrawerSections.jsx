import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enqueueSnackbar } from '../../redux/actions/snackbarActions';
import { useLocation } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import history from '../../history';
//  MUI
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Icons
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EditIcon from '@material-ui/icons/Edit';
import GradeIcon from '@material-ui/icons/Grade';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
// Files
import logo from '../../images/logo.png';

const useStyles = makeStyles((theme) => ({
  drawerLogoContainer: {
    display: 'flex',
    alignItems: 'center',
    height: 64,
    minHeight: 64,
    marginLeft: 15,

    color: '#d54062',
  },
  drawerLogo: {
    width: 36,
    height: 41,
    marginRight: 10,
  },
  drawerTitle: {
    fontFamily: 'Rubik, sans-serif',
    fontSize: '2em',
    fontWeight: 'bold',
  },
  linkButton: {
    fontFamily: 'Baloo Tammudu 2',
    fontSize: '1.15em',
    fontWeight: 'bold',
    color: '#555',

    textDecoration: 'none',
  },
}));

const DrawerSection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const permission = useSelector((state) => state.user.permission);
  const location = useLocation();
  const currentPath = location.pathname;

  const scrollWithOffset = (el, offset) => {
    const elementPosition = el.offsetTop - offset;

    window.scroll({
      top: elementPosition,
      left: 0,
      behavior: 'smooth',
    });
  };

  const handleRedirectAuthRoute = (page) => {
    if (permission === 'premium' || permission === 'admin') {
      history.push(`/${page}`);
    } else {
      dispatch(
        enqueueSnackbar({
          message: `Sorry, only premium members can do this.`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'warning',
          },
        })
      );
    }
  };

  return (
    <React.Fragment>
      <div className={classes.drawerLogoContainer}>
        <img className={classes.drawerLogo} src={logo} alt='Mellon Logo' />
        <Typography className={classes.drawerTitle} component='h1' variant='h6'>
          Mellon
        </Typography>
      </div>

      <Divider />

      <List>
        <Link
          className={classes.linkButton}
          to='/'
          scroll={(el) => scrollWithOffset(el, 80)}
          smooth
        >
          <ListItem button disabled={currentPath === '/'}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Home' disableTypography />
          </ListItem>
        </Link>
        {['Trending', 'Free', 'Premium'].map((sectionName, index) => (
          <Link
            key={`${sectionName}-${index}`}
            className={classes.linkButton}
            to={`/#${sectionName}`}
            scroll={(el) => scrollWithOffset(el, 80)}
            smooth
          >
            <ListItem button>
              <ListItemIcon>
                {[<TrendingUpIcon />, <PersonIcon />, <GradeIcon />][index]}
              </ListItemIcon>
              <ListItemText primary={sectionName} disableTypography />
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider />

      <List subheader={<ListSubheader>Premium Only</ListSubheader>}>
        <ListItem button>
          <ListItemIcon>
            <CloudUploadIcon />
          </ListItemIcon>
          <ListItemText
            className={classes.linkButton}
            primary='Upload'
            onClick={() => handleRedirectAuthRoute('upload')}
            disableTypography
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText
            className={classes.linkButton}
            primary='Edit'
            onClick={() => handleRedirectAuthRoute('edit')}
            disableTypography
          />
        </ListItem>
      </List>
    </React.Fragment>
  );
};

export default DrawerSection;
