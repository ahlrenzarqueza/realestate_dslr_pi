import React from 'react';
import {Grid, Fab} from '@material-ui/core';
import {
    Camera as CameraIcon,
    KeyboardArrowUp, 
    KeyboardArrowDown, 
    KeyboardArrowLeft, 
    KeyboardArrowRight
} from '@material-ui/icons';
import './Camera.css';

export default function Camera () {
    return (
        <Grid container
        direction="column"
        alignItems="center" justify="space-around" className="camera-grid">
            <Grid className="camera-canvas-cont" item xs={4}>
                <img className="camera-canvas" src=""></img>
            </Grid>
            <Grid container
                direction="column"
                alignItems="center" 
                className="directional">
                    <Fab className="direction-n-btn">
                        <KeyboardArrowUp/>
                    </Fab>
                    <Grid container justify="center" spacing={4}>
                        <Grid item>
                            <Fab className="direction-w-btn">
                                <KeyboardArrowLeft/>
                            </Fab>
                        </Grid>
                        <Grid item>
                            <Fab className="direction-e-btn">
                                <KeyboardArrowRight/>
                            </Fab>
                        </Grid>
                    </Grid>
                    <Fab className="direction-s-btn">
                        <KeyboardArrowDown/>
                    </Fab>
            </Grid>
            <div className="shutter">
                <Fab className="shutter-btn">
                    <CameraIcon/>
                </Fab>
            </div>
        </Grid>
    )
}
