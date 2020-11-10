import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import {
  Container, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@material-ui/core';
import {
  Home as HomeIcon,
  CameraAlt as CameraIcon,
  PhotoLibrary as ProjectIcon,
  Menu as MenuIcon,
  MoveToInbox as InboxIcon,
  Mail as MailIcon
 } from '@material-ui/icons';

import Home from './pages/Home/Home';
import Camera from './pages/Camera/Camera';
import MainProject from './pages/MainProject/MainProject';
import './App.css';

// Store Dependencies
import configureStore from './configureStore';
import { Provider } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250
  }
}));

function App() {
  const classes = useStyles();
  const [openedDrawer, setOpenedDrawer] = useState(false);
  const store = configureStore();
  const icons = {
    "Home": HomeIcon,
    "Active Project": ProjectIcon,
    "Camera": CameraIcon
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenedDrawer(open);
  };

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Home', 'Active Project', 'Camera'].map((text, index) => {
          const Icon = icons[text];
          return (
          <ListItem button key={text}>
           <ListItemIcon> <Icon/> </ListItemIcon>
           <ListItemText primary={text} />
          </ListItem>
          )}
        )}
      </List>
      <Divider />
      <List>
        {['About Us'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );  

  return (
    <Provider store={store}>
      <Router>
        <Container maxWidth="sm" className="app-container">
        <AppBar position="relative">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} onClick={toggleDrawer(true)} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Web to Pi-DSLR
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={openedDrawer} onClose={toggleDrawer(false)}>
          {list("left")}
        </Drawer>
        <Container className="content-container">
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/camera">
              <Camera />
            </Route>
            <Route path="/project">
              <MainProject />
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </Container>
      </Container>
      </Router>
    </Provider>
  );
}

export default App;
