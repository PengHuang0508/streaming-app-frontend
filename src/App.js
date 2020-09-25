import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
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
import Navbar from './components/Nav/Navbar';
// Files
import history from './history.js';
import muiTheme from './utils/theme';

const theme = createMuiTheme(muiTheme);

const Routes = (
  <React.Fragment>
    <Route exact path='/' component={Home} />
    <Route path='/watch' component={MediaPlayer} />
    <Route exact path='/upload' component={Upload} />
  </React.Fragment>
);

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider>
          <Notifier />
          <Router history={history}>
            <div style={{ display: 'flex' }}>
              <Navbar />
              <Switch>{Routes}</Switch>
            </div>
          </Router>
        </SnackbarProvider>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
