import React from 'react';
import logo from './logo.svg';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './pages/Login';
import MainApp from './pages/MainApp';
import ProtectedRoute from './utils/ProtectedRoute';
import { makeStyles } from '@material-ui/core/styles';
import classes from '*.module.css';


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%'
  }
}));

function App() {
  const classes = useStyles();
  return (
      <div className={classes.root}>
        {/* <Helmet>
            <title>{ documentTitle }</title>
        </Helmet> */}
        <Router>
          <Switch>
            <ProtectedRoute path="/main" component={MainApp}></ProtectedRoute>
            <Route path="/">
              <Login/>
            </Route>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
