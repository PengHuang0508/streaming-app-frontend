import React, { useState } from 'react';
import history from '../../history';
import { useSelector } from 'react-redux';
// MUI
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
// Components
import ResponsiveDrawer from '../Drawer/Drawer';
import UserInformationDisplay from './UserInformationDisplay';

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: 'calc(100% - 240px)',
      marginLeft: 240,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const { isAuthenticated, username } = useSelector((state) => ({
    isAuthenticated: state.user.isAuthenticated,
    username: state.user.username,
  }));

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = Boolean(anchorEl);

  const capitalizeString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const handleMenuToggle = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleCloseAndRedirect = (isRedirect) => {
    setAnchorEl(null);
    isRedirect && history.push('/account');
  };

  return (
    <React.Fragment>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant='h6' noWrap>
            {username
              ? `Welcome back ${capitalizeString(username)}`
              : 'Welcome'}
          </Typography>

          {isAuthenticated ? (
            <UserInformationDisplay />
          ) : (
            <React.Fragment>
              <IconButton
                aria-label='account'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenuToggle}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                anchorEl={anchorEl}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={() => handleCloseAndRedirect(false)}
              >
                <MenuItem onClick={() => handleCloseAndRedirect(true)}>
                  Sign in
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
      <ResponsiveDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </React.Fragment>
  );
};

export default Navbar;
