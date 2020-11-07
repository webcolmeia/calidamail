import React from 'react';
import { useLocation } from 'react-router-dom';
import { CssBaseline, makeStyles, Toolbar } from '@material-ui/core';
import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar';
import Router from './router';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App(props) {

  const classes = useStyles();

  const location = useLocation();
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      {(location.pathname !== '/login' && location.pathname !== '/register') && (<Header />)}
      {(location.pathname !== '/login' && location.pathname !== '/register') && (<Sidebar />)}
      <main className={classes.content}>
        {(location.pathname !== '/login' && location.pathname !== '/register') && (<Toolbar />)}
        <Router />
      </main>
    </div>
  );
}

export default App;
