import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, 
  GridList, 
  GridListTile,
  GridListTileBar, 
  Button, 
  TextField
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import placeholder from '../../media/home-placeholder-img.jpg';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%'
  },
  gridList: {
    flex: 2,
    alignContent: 'flex-start',
    marginBottom: '10px !important'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  footerbutton: {
    flexBasis: '50px'
  }
}));

const MainProject = ({ dispatch, projectName }) => {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    let projectNameInput = useRef('');
    const classes = useStyles();

    const tileData = [
      {
        img: placeholder,
        title: 'Garden',
        author: 'author',
      },
      {
        img: placeholder,
        title: 'Room A',
        author: 'author',
      },
      {
        img: placeholder,
        title: 'Room B',
        author: 'author',
      }
    ];
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = () => {
        // console.log('Value: ', projectName);
        // props.setProject(projectName);
        // history.push('/camera');
    };

    useEffect(() => {
      if(!projectName) {
        history.push('/');
      }
    }, []);
    return (
        <Grid container direction="column" className={classes.root}>
            <h2>Project: {projectName}</h2>
            <GridList cellHeight={180} className={classes.gridList}>
                {tileData.map((tile) => (
                <GridListTile key={tile.title}>
                    <img src={tile.img} alt={tile.title} />
                    <GridListTileBar
                    title={tile.title}
                    subtitle={<span>by: {tile.author}</span>}
                    actionIcon={
                        <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                        <InfoIcon />
                        </IconButton>
                    }
                    />
                </GridListTile>
                ))}
            </GridList>
            
            <Button variant="contained" color="primary" className={classes.footerbutton} onClick={handleClickOpen}>
                Add An Image
            </Button>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
  projectName: state.projectName
})

export default connect(mapStateToProps)(MainProject);