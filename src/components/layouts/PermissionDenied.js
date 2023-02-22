import { Button, Grid, Paper} from '@material-ui/core';
import React from 'react';
import {useStyles} from "../../styles/styles";
import { useNavigate} from 'react-router-dom'
import photo from '../../assets/guard.png';

export default function PermissionDenied() {

  const classes = useStyles();
  let history = useNavigate();

  return (
    <Grid className={classes.errorRoot}>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid item xs={8}>
          <Paper className={classes.paperCard} elevation={2}>
            <img src={photo} alt="Permission denied" className={classes.errorImg} />
            <h2>
            Permission Denied
            </h2>          
            <Button variant='contained' className={classes.errorButton} onClick={() => history.goBack()}>
              Go Back
            </Button>       
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}
