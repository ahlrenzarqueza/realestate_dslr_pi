import React from 'react'
import {
    Container,
    Typography,
    Grid,
    TextField,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import backimage from '../assets/login-bg.jpg';

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
  


export default function MainApp() {
    const classes = useStyles();
    return (
        <Container>
            <Typography variant="h3">Main Application</Typography>
        </Container>
    )
}
