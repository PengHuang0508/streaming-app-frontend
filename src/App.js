import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
// MUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
// Pages
import Home from './pages/Home';
import MediaPlayer from './pages/MediaPlayer';
import Upload from './pages/Upload';
// Components
import Notifier from './components/Snackbar/Notifier';
// Files
import history from './history.js';
import muiTheme from './utils/theme';

const theme = createMuiTheme(muiTheme);

const Routes = (
  <React.Fragment>
    <Route exact path='/'>
      <Home />
    </Route>
    <Route path='/watch'>
      <MediaPlayer />
    </Route>
    <Route exact path='/upload'>
      <Upload />
    </Route>
  </React.Fragment>
);

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider>
          <Notifier />
          <Router history={history}>
            <Switch>{Routes}</Switch>
          </Router>
        </SnackbarProvider>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
