import React, { ReactElement } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Link, LinkProps, useHistory } from 'react-router-dom';
import actions from '../ducks/actions';
import { connect } from 'react-redux';
import * as t from '../ducks/types';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

interface IListItemProps {
  icon: React.ReactElement<typeof HomeIcon>,
  primary: string,
  to: string
}

interface IMainAppProps {
  loggedInUser: t.ILoggedInUser | null,
  logoutAction: () => t.ActionTypes
}

function ListItemLink(props : IListItemProps) {
  const { icon, primary, to } = props;

  interface LinkPropsOmit extends Omit<LinkProps, 'to'> {}
  const renderLink = React.useMemo(
    () => React.forwardRef<any, LinkPropsOmit>((itemProps, ref) => (
      <Link to={to} ref={ref} {...itemProps} />
    )),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

const MainApp : React.FC<IMainAppProps> = ({loggedInUser, logoutAction}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onLogout = () => {
    logoutAction();
    history.push('/login');
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {['Uploads', 'New Upload'].map((text, index) => (
          <ListItemLink key={text} icon={index === 0 ? <HomeIcon /> : <AttachFileIcon />} primary={text} to={`/${text.toLowerCase()}`}/>
        ))}
      </List>
      <Divider />
      <List>
        {['Settings', 'About Us', 'Logout'].map((text, index) => {
          if(text !== 'Logout') {
            return <ListItemLink key={text} icon={index === 0 ? <SettingsIcon /> : <InfoIcon />} primary={text} to={`/${text.toLowerCase()}`}/>
          }
          return (
            <ListItem key={text} button onClick={onLogout}>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        })}
      </List>
    </div>
  );

//   const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Responsive drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
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
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
        <div className={classes.toolbar} />
          <Switch>
            <Route path="/new upload">
              <Typography variant="h2">New Upload</Typography>
            </Route>
            <Route path="/">
              <Typography variant="h2">Uploads</Typography>
            </Route>
          </Switch>
      </main>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = ({ loggedInUser }: t.IAppState) => ({
  loggedInUser
});

const mapDispatchToProps = {
  logoutAction: actions.logout
}

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
