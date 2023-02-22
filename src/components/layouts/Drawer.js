import React, { Fragment, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core';
import {
  Drawer,
  List,
  Collapse,
  Chip,
  Typography,
  Divider,
  ListItem,
  IconButton,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';

import { toggleDrawer } from '../../store/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

//icons
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FaceIcon from '@material-ui/icons/Face';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import WorkIcon from '@material-ui/icons/Work';
import StorefrontSharpIcon from '@material-ui/icons/StorefrontSharp';
import AssessmentSharpIcon from '@material-ui/icons/AssessmentSharp';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  show: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  chipStyles: {
    marginBottom: '1.5rem',
  },
}));

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [openIndex, setOpenIndex] = useState(0);

  let navigate = useNavigate();

  let dispatch = useDispatch();

  let token = useSelector((state) => state.auth.accessToken);
  let name = useSelector((state) => state.auth.fullName);
  let isDrawerOpen = useSelector((state) => state.auth.isDrawerOpen);
  let permissions = useSelector((state) => state.auth.routes);

  const handleDrawerClose = () => {
    dispatch(toggleDrawer());
  };

  const handleClick = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const onToggle = () => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    dispatch(toggleDrawer());
  };

  const onRoute = (path) => {
    navigate(path);

    dispatch(toggleDrawer());
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role='presentation'
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <div style={{ textAlign: 'center' }} className={classes.show}>
        <Typography
          variant='h6'
          style={{ marginTop: '1rem', marginBottom: '0.5rem' }}
        >
          TechJobz.co
        </Typography>

        {token && (
          <Fragment>
            <Chip
              icon={<FaceIcon />}
              label={name}
              variant='outlined'
              className={classes.chipStyles}
            />
          </Fragment>
        )}
      </div>
      <Divider />
      <List>
        {permissions &&
          permissions.map((route, index) => (
            <Fragment key={index}>
              <ListItem button onClick={(e) => handleClick(index)}>
                <ListItemIcon>
                  {index === 0 && <SupervisorAccountOutlinedIcon />}
                  {index === 1 && <LocalActivityIcon />}
                  {index === 2 && <WorkIcon />}
                  {index === 3 && <StorefrontSharpIcon />}
                  {index === 4 && <AssessmentSharpIcon />}
                </ListItemIcon>
                <ListItemText primary={route.name} />
                {index === openIndex ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              {route.children.length && (
                <Collapse
                  in={openIndex === index ? true : false}
                  timeout='auto'
                  unmountOnExit
                >
                  <List component='div' disablePadding>
                    {route.children.map((child, idx) => (
                      <ListItem
                        button
                        className={classes.nested}
                        key={idx}
                        onClick={() => onRoute(child.path)}
                      >
                        <ListItemText primary={child.name} />
                      </ListItem>
                    ))}
                  </List>
                  <Divider />
                </Collapse>
              )}
            </Fragment>
          ))}
      </List>
    </div>
  );

  return (
    <div>
      {token && (
        <Drawer
          anchor='left'
          open={isDrawerOpen}
          onClose={onToggle('left', false)}
          variant='persistent'
        >
          {list('left')}
        </Drawer>
      )}
    </div>
  );
}
