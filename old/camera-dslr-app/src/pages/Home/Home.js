import React, {useState, useRef} from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Button, TextField} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      height: '100%'
    },
    footerbutton: {
        flexBasis: '50px'
    }
  }));  

const Home = ({ dispatch }) => {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [projectName, setProjectName] = useState('');
    const classes = useStyles();
    let projectNameInput = useRef('');
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = () => {
        // console.log('Value: ', projectName);
        dispatch({type:"CREATE_PROJECT", projectName: projectName});
        // props.setProject(projectName);
        history.push('/project');
    };

    return (
        <Grid container
            direction="column"
            justify="flex-end"
            alignItems="stretch"
            className={classes.root}>
            
            <Button variant="contained" color="primary" className={classes.footerbutton} onClick={handleClickOpen}>
                Create New Project
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <DialogContentText>
                    Enter project name:
                    </DialogContentText>
                    <TextField
                        ref={projectNameInput}
                        autoFocus
                        margin="dense"
                        id="projectname"
                        label="Project Name"
                        type="email"
                        fullWidth
                        onChange={e=> setProjectName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                    Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default connect()(Home)