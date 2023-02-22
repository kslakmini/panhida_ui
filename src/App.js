import React, { useEffect, Suspense } from 'react';

import { makeStyles } from '@material-ui/core';
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@material-ui/core/styles';
import NavBar from '../src/components/layouts/NavBar';
import Drawer from './components/layouts/Drawer';

import '../src/index.css';

import purple from '@material-ui/core/colors/purple';
// Redux
import { Provider } from 'react-redux';
import store from './store/store';
import Page404 from './components/layouts/Page404';
import Pages from './pages';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    secondary: {
      main: purple[500],
    },
  },
  overrides: {
    MuiFormLabel: {
      asterisk: {
        color: '#db3131',
        '&$error': {
          color: '#db3131',
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  self: {
    backgroundColor: 'blue',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App(props) {
  const classes = useStyles();
  useEffect(() => {
    //  props.setAuth()
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <div className={classes.root}>
          <NavBar {...props}> </NavBar>
          <ThemeProvider theme={darkTheme}>
            <Drawer />
          </ThemeProvider>

          <Suspense fallback={<Page404 />}>
            <Pages />
          </Suspense>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
// point to dev
