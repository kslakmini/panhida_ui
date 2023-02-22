import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../../utils/assets/error.png';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    button: {
      display: 'flex',
      flexDirection: 'row-reverse',
      flexGrow: 1,
    },
  },
}));
const Page404 = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.root} spacing={1}>
        <Grid container justify='center'>
          <Grid container justify='center' item xs={12} sm={12} md={12}>
            <img style={{}} alt='' src={PageNotFound} />
          </Grid>
          <Grid style={{ textAlign: 'center' }} item xs={12} sm={12} md={12}>
            <div className={classes.button}>
              <Link to='/' style={{ textDecoration: 'none' }}>
                <Button variant='contained' color='primary'>
                  <span>Go to Home</span>
                </Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Page404;
