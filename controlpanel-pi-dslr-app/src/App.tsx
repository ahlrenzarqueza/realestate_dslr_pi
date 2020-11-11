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
import backimage from './assets/login-bg.jpg';


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  bgimgcont: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: -1
  },
  bgimg: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      filter: 'blur(5px) brightness(0.3)',
      transform: 'scale(1.1)',
      objectFit: 'cover'
  }
}));

function App() {
  const classes = useStyles();
  return (
      <div className={classes.root}>
        {/* <Helmet>
            <title>{ documentTitle }</title>
        </Helmet> */}
        <div className={classes.bgimgcont}>
            <img className={classes.bgimg} src={backimage}></img>
        </div>
        <Router>
          <Switch>
            {/* <ProtectedRoute path="/main" component={MainApp}></ProtectedRoute> */}
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/" component={MainApp}></Route>
            <Redirect to="/login"></Redirect>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
