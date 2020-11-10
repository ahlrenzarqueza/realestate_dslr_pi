import React, { useState } from 'react'
import { 
    Typography,
    Grid,
    TextField,
    Button
 } from '@material-ui/core';
 import { Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import backimage from '../assets/login-bg.jpg';
import actions from '../ducks/actions';
import * as t from '../ducks/types';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
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
        filter: 'blur(5px) brightness(0.7)',
        transform: 'scale(1.1)',
        objectFit: 'cover'
    },
    logincont: {
        width: 400,
        height: 400,
        backgroundColor: '#ffffff',
        zIndex: 2,
        padding: '10px 20px',
        borderRadius: 2
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
  

const Login = ({ postLogin, loggedInUser }) => {
    const classes = useStyles();
    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const handleLogin = () => {
        postLogin({email, password});
    }
    return (
        loggedInUser ? 
            (<Redirect to="/main"></Redirect>) : 
            <Grid container justify="center" alignItems="center" className={classes.root}>
                <div className={classes.bgimgcont}>
                    <img className={classes.bgimg} src={backimage}></img>
                </div>
                <form className={classes.logincont} onSubmit={handleLogin}>
                    <Grid container direction="column" justify="space-around" className={classes.logingrid}>
                        <Typography variant="h4">Login</Typography>
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
                        <Button variant="contained" size="large" color="primary" onClick={handleLogin}>
                            Login
                        </Button>
                    </Grid>
                </form>
            </Grid>
    )
}

export default connect(
    ({ loggedInUser }: t.IAppState) => ({
        loggedInUser
    }), {
        postLogin: actions.login
    })(Login);
