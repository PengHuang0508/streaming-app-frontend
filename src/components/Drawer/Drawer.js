import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PersonIcon from '@material-ui/icons/Person';
import GradeIcon from '@material-ui/icons/Grade';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// Files
import logo from '../../images/logo.png';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
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

    backgroundColor: theme.palette.secondary.light,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();

  const { window } = props;

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText primary='Trending' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary='Free' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <GradeIcon />
          </ListItemIcon>
          <ListItemText primary='Premium' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <CloudUploadIcon />
          </ListItemIcon>
          <ListItemText primary='UPLOAD' />
        </ListItem>
      </List>
    </React.Fragment>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label='mailbox folders'>
      <Hidden smUp implementation='js'>
        <Drawer
          container={container}
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
      <Hidden xsDown implementation='js'>
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
