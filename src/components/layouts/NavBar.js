import React, { Fragment } from 'react';
import { AppBar, Toolbar, IconButton, Button, Chip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import FaceIcon from '@material-ui/icons/Face';
import { makeStyles } from '@material-ui/core';
import { logout, toggleDrawer } from '../../store/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import navBarImg from '../../utils/assets/TEch jobs (1).jpg';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  self: {
    backgroundColor: '#3f51b5',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  flexGrow: {
    marginRight: 'auto',
  },
  chipStyles: {
    marginLeft: '1rem',
    marginRight: '1rem',
    marginTop: '0.1rem',
    backgroundColor: 'white',
  },
  mobile: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  button: {
    display: 'flex',
    flexDirection: 'row-reverse',
    flexGrow: 1,
  },
}));

function NavBar(props) {
  const classes = useStyles();

  let navigate = useNavigate();

  let dispatch = useDispatch();

  let token = useSelector((state) => state.auth.accessToken);

  let name = useSelector((state) => state.auth.fullName);

  const onLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggle = () => {
    dispatch(toggleDrawer());
  };

  return (
    <div>
      <AppBar className={classes.self} position='fixed'>
        <Toolbar>
          {token && (
            <IconButton
              onClick={toggle}
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
            >
              <MenuIcon />
            </IconButton>
          )}

          <img src={navBarImg} alt='' width={299} height={59} />

          {token && (
            <Fragment>
              <div className={classes.mobile}>
                <Chip
                  icon={<FaceIcon />}
                  label={name}
                  variant='outlined'
                  className={classes.chipStyles}
                />
              </div>
              <div className={classes.button}>
                <Button
                  style={{ color: 'white' }}
                  variant='outlined'
                  onClick={() => onLogout()}
                >
                  <span style={{ marginRight: '0.2rem' }}>logout </span>
                  <ExitToAppIcon style={{ color: 'green' }} />
                </Button>
              </div>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
