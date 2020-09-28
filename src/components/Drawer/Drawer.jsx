import React from 'react';
//  MUI
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// Components
import DrawerSections from './DrawerSections';

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: 240,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: 240,
  },
}));

const ResponsiveDrawer = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { mobileOpen, handleDrawerToggle } = props;

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
          {/* {drawer} */}
          <DrawerSections />
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
          <DrawerSections />
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default ResponsiveDrawer;
