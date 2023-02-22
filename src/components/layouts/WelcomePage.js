import {Grid, Paper} from '@material-ui/core';
import React from 'react';
import {useStyles} from "../../styles/styles";
import {useSelector } from "react-redux";

import photo from '../../assets/welcome.png';

export default function WelcomePage() {

  const classes = useStyles();

  let name = useSelector((state) => state.auth.name);

  return (
    <Grid className={classes.welcomeRoot}>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid item xs={8}>
          <Paper className={classes.paperCard} elevation={2}>
            <img src={photo} alt="Permission denied" className={classes.welcomeImg} />
            <h2>
                Welcome 
            </h2>          
            <h3 className={classes.name}>{name}</h3>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}
