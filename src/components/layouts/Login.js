import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { login } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import photo from '../../utils/assets/login.png';
import styles from '../../utils/styles/Login.module.css';
import { useNavigate } from 'react-router-dom';

// validation
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// import FormikField from "../formikField/FormikField";
import { TextField } from 'formik-material-ui';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    height: '100%',
  },
  center: {
    textAlign: 'center',
  },
  padding: {
    padding: theme.spacing(3),
  },
}));

let initialValues = {
  email: '',
  password: '',
};

let SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required!')
    .trim()
    .matches(
      // eslint-disable-next-line
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter a valid email'
    )
    .max(320, 'Must be less than 320 digits'),
  password: Yup.string()
    .required('Password is required!')
    .trim()
    .max(8, 'Must Contain 8 Characters'),
});
function Login(props) {
  const classes = useStyles();

  const [alert, setAlert] = useState({
    showAlert: false,
    severity: 'success',
    message: '',
  });
  let navigate = useNavigate();

  const submit = async (e) => {
    try {
      const data = await axios.post('/user/login/', {
        email: e.email,
        password: e.password,
      });
      const { fullName, role, accessToken, permissions, id } = data.data;

      props.login(fullName, role, accessToken, permissions, id);
      navigate('/users');
    } catch (error) {
      if (error.response.status === 401) {
        setAlert({
          showAlert: true,
          severity: 'error',
          message: 'Unauthorized!',
        });
      } else if (
        error.response.data ===
        'User status not set, please contact administrator'
      ) {
        setAlert({
          showAlert: true,
          severity: 'error',
          message: 'User status not set, please contact administrator!',
        });
      } else if (
        error.response.data ===
        'You are temporary block, please contact administrator'
      ) {
        setAlert({
          showAlert: true,
          severity: 'error',
          message: 'You are temporary block, please contact administrator!',
        });
      } else if (
        error.response.data ===
        'You are status not active yet, please contact administrator'
      ) {
        setAlert({
          showAlert: true,
          severity: 'error',
          message:
            'You are status not active yet, please contact administrator!',
        });
      } else if (
        error.response.data ===
        'You are status inactive yet, please contact administrator'
      ) {
        setAlert({
          showAlert: true,
          severity: 'error',
          message: 'You are status inactive yet, please contact administrator!',
        });
      } else if (
        error.response.data ===
        'Your password is not set, please contact administrator'
      ) {
        setAlert({
          showAlert: true,
          severity: 'error',
          message: 'Your password is not set, please contact administrator!',
        });
      } else if (
        error.response.data === 'Please check your email and password'
      ) {
        setAlert({
          showAlert: true,
          severity: 'error',
          message: 'Please check your email and password!',
        });
      } else {
        setAlert({
          showAlert: true,
          severity: 'error',
          message: 'Server error!',
        });
      }
    }
  };

  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      className={classes.root}
      spacing={1}
    >
      <div className={styles.Wrapper}>
        <div className={styles.Left}>
          <div id={styles.Img_Pane}>
            <img className={classes.img} src={photo} alt='Login' />
          </div>
        </div>
        <div className={styles.Right}>
          <div className={styles.Login}>
            <Grid item md={12}>
              <Card className={classes.padding} variant='outlined'>
                <CardHeader
                  title='Welcome back! 👩‍💻'
                  className={classes.center}
                ></CardHeader>

                <Formik
                  initialValues={initialValues}
                  onSubmit={submit}
                  validationSchema={SignUpSchema}
                >
                  {({ dirty, isValid }) => {
                    return (
                      <Form>
                        <CardContent>
                          <Field
                            name='email'
                            label='Email'
                            component={TextField}
                            variant='outlined'
                            fullWidth
                            margin='dense'
                          ></Field>

                          <Field
                            name='password'
                            label='Password'
                            component={TextField}
                            variant='outlined'
                            fullWidth
                            margin='dense'
                            type='password'
                          ></Field>
                        </CardContent>
                        <CardActions>
                          <Button
                            variant='contained'
                            color='primary'
                            fullWidth
                            disabled={!dirty || !isValid}
                            type='submit'
                          >
                            login
                          </Button>
                        </CardActions>
                      </Form>
                    );
                  }}
                </Formik>
              </Card>
            </Grid>
            {alert.showAlert && (
              <Grid item md={12}>
                <Alert
                  severity={alert.severity}
                  onClose={() =>
                    setAlert({
                      ...alert,
                      showAlert: false,
                    })
                  }
                >
                  {alert.message}
                </Alert>
              </Grid>
            )}
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default connect(null, { login })(Login);
