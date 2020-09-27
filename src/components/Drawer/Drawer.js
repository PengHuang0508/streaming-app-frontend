import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enqueueSnackbar } from '../../redux/actions/snackbarActions';
import { useLocation } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import history from '../../history';
//  MUI
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// Icons
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import GradeIcon from '@material-ui/icons/Grade';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
// Files
import logo from '../../images/logo.png';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
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
  drawerPaper: {
    width: drawerWidth,
  },
  linkButton: {
    fontFamily: 'Baloo Tammudu 2',
    fontSize: '1.15em',
    fontWeight: 'bold',
    color: '#555',

    textDecoration: 'none',
  },
}));

function ResponsiveDrawer(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const location = useLocation();
  const permission = useSelector((state) => state.user.permission);
  const currentPath = location.pathname;

  const { mobileOpen, handleDrawerToggle } = props;

  const scrollWithOffset = (el, offset) => {
    const elementPosition = el.offsetTop - offset;

    window.scroll({
      top: elementPosition,
      left: 0,
      behavior: 'smooth',
    });
  };
  const handleClickUpload = () => {
    if (permission === 'premium' || permission === 'admin') {
      history.push('/upload');
    } else {
      dispatch(
        enqueueSnackbar({
          message: `Sorry, you don't have the permission to upload.`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'warning',
          },
        })
      );
    }
  };

  const drawer = (
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
        <Link
          className={classes.linkButton}
          to='/#Trending'
          scroll={(el) => scrollWithOffset(el, 80)}
          smooth
        >
          <ListItem button>
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText primary='Trending' disableTypography />
          </ListItem>
        </Link>
        <Link
          className={classes.linkButton}
          to='/#Free'
          scroll={(el) => scrollWithOffset(el, 80)}
          smooth
        >
          <ListItem button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>

            <ListItemText primary='Free' disableTypography />
          </ListItem>
        </Link>
        <Link
          className={classes.linkButton}
          to='/#Premium'
          scroll={(el) => scrollWithOffset(el, 80)}
          smooth
        >
          <ListItem button>
            <ListItemIcon>
              <GradeIcon />
            </ListItemIcon>
            <ListItemText primary='Premium' disableTypography />
          </ListItem>
        </Link>
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
            onClick={handleClickUpload}
            disableTypography
          />
        </ListItem>
      </List>
    </React.Fragment>
  );

  return (
    <nav className={classes.drawer} aria-label='nav bar'>
      <Hidden mdUp implementation='js'>
        <Drawer
          variant='temporary'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation='js'>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant='permanent'
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default ResponsiveDrawer;
