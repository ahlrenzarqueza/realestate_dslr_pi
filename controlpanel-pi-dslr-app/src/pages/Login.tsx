import React, { useState, useEffect } from 'react'
import { 
    Typography,
    Grid,
    TextField,
    Button,
    Box
 } from '@material-ui/core';
 import { Redirect } from "react-router-dom";
import { makeStyles, Theme } from '@material-ui/core/styles';
import actions from '../ducks/actions';
import * as t from '../ducks/types';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme : Theme) => ({
    root: {
      width: '100%',
      height: '100%'
    },
    bgimgcont: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },
    bgimg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        filter: 'blur(5px) brightness(0.3)',
        transform: 'scale(1.1)',
        objectFit: 'cover'
    },
    logincont: {
        width: '30vw',
        minWidth: 300,
        height: 400,
        backgroundColor: theme.palette.background.default,
        zIndex: 2,
        padding: '10px 20px',
        borderRadius: 2
    },
    loginform: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    logingrid: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    input: {
        width: '100%'
    }
}));

interface IProps {
    postLogin: (creds: t.ILoginCredentials) => t.ActionTypes,
    loggedInUser: t.ILoggedInUser | null
}
  

const Login : React.FC<IProps> = ({ postLogin, loggedInUser }) => {
    const classes = useStyles();
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const handleLogin = (event : React.SyntheticEvent) => {
        event.preventDefault();
        postLogin({email, password});
    }
    return (
        loggedInUser ? 
            (<Redirect to="/main"></Redirect>) : 
            <Grid container justify="center" alignItems="center" className={classes.root}>
                {/* <div className={classes.bgimgcont}>
                    <img className={classes.bgimg} src={backimage}></img>
                </div> */}
                <Box className={classes.logincont} boxShadow={3}>
                    <form className={classes.loginform} onSubmit={handleLogin}>
                        <Grid container direction="column" justify="space-around" className={classes.logingrid}>
                            <div>
                                <Typography color="textPrimary" variant="h4">Login</Typography>
                                <Typography color="textPrimary" variant="subtitle1">to Pi-DSLR Web Portal</Typography>
                            </div>
                            <div>
                                <TextField
                                    className={classes.input}
                                    required
                                    id="filled-required"
                                    label="Email"
                                    type="email"
                                    defaultValue=""
                                    variant="filled"
                                    onChange={(e) => setEmail(e.target.value)}/>
                                <TextField
                                    className={classes.input}
                                    id="filled-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="filled"
                                    onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <Button variant="contained" size="large" color="primary" type="submit">
                                Login
                            </Button>
                        </Grid>
                    </form>
                </Box>
            </Grid>
    )
}

const mapStateToProps = ({ loggedInUser }: t.IAppState) => ({
    loggedInUser
});

const mapDispatchToProps = {
    postLogin: actions.login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
