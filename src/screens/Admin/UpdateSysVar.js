import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  CardHeader,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useStyles } from '../../utils/styles/styles';

import Button from '../../components/UI/ReusableButton';
import CircularProgress from '../../components/UI/CircularProgress';

import { useNavigate, useLocation } from 'react-router-dom';

import axios from 'axios';

// validation
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { validationSchema } from '../../utils/validations/jobs/SysVarValidation';
export default function UpdateSysVar(props) {
  const classes = useStyles();
  const { state } = useLocation();
  let navigate = useNavigate();

  // data
  const [initialValues, setInitialValues] = useState({
    id: '',
    label: '',
    value: '',
  });

  const [componentType, setComponentType] = useState('create');
  const [callingBackend, setCallingBackend] = useState(false);
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);

  const [alert, setAlert] = useState({
    showAlert: false,
    severity: 'success',
    message: '',
  });

  // create method
  const submit = async (e, { resetForm }) => {
    if (componentType === 'create') {
      try {
        setCallingBackend(true);
        await axios.post('/jobrole/', e);
        resetForm();
        setAlert({
          showAlert: true,
          severity: 'success',
          message: 'Job role created successfully!',
        });
      } catch (error) {
        if (error.response.status === 403) {
          setAlert({
            showAlert: true,
            severity: 'error',
            message: 'Job role already exists!',
          });
        } else {
          setAlert({
            showAlert: true,
            severity: 'error',
            message: 'Job role create failed!',
          });
        }
      } finally {
        setCallingBackend(false);
      }
    } else {
      try {
        setCallingBackend(true);
        await axios.put(`/sysvar/${state.id}`, e);
        navigate('/system-var');
      } catch (error) {
        if (error.response.status === 403) {
          setAlert({
            showAlert: true,
            severity: 'error',
            message: 'System variable already exists!',
          });
        } else if (error.response.status === 401) {
          setAlert({
            showAlert: true,
            severity: 'error',
            message: 'Unauthorized Access!',
          });
        } else {
          setAlert({
            showAlert: true,
            severity: 'error',
            message: 'Something went wrong!',
          });
        }
      } finally {
        setCallingBackend(false);
      }
    }
  };

  // get user
  const get = async (id) => {
    try {
      const data = await axios.get(`/sysvar/${id}`);

      setInitialValues({
        id: data.data.id,
        label: data.data.label,
        value: data.data.value,
      });
    } catch (error) {
      setAlert({
        showAlert: true,
        severity: 'error',
        message: 'Data loading failed!',
      });
    }
  };

  //use effect hook
  useEffect(() => {
    if (state && state?.id) {
      setComponentType('update');
      get(state.id);
    }
    setTimeout(() => setIsLoading(false), 1000);
    // eslint-disable-next-line
  }, [state?.id]);

  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid fullWidth item xs={12} sm={12} md={12}>
        <Formik
          initialValues={initialValues}
          onSubmit={submit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({ isValid, dirty, handleChange, handleBlur, values }) => {
            return (
              <Form>
                <Card variant='outlined'>
                  <CardHeader
                    title={
                      componentType === 'create'
                        ? 'Create a System Variables'
                        : 'Update a System Variable'
                    }
                  />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={6}>
                        <Field
                          name='label'
                          label='Label'
                          component={TextField}
                          variant='outlined'
                          fullWidth
                          required
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                        <Field
                          name='value'
                          label='Value'
                          component={TextField}
                          variant='outlined'
                          fullWidth
                          required
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    {callingBackend ? (
                      <CircularProgress />
                    ) : (
                      <Button
                        variant='contained'
                        className={classes.button}
                        color={
                          componentType === 'create' ? 'primary' : 'secondary'
                        }
                        type='submit'
                        disabled={!dirty || !isValid}
                      >
                        {componentType === 'create' ? 'create' : 'update'}
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Form>
            );
          }}
        </Formik>
      </Grid>
      {alert.showAlert && (
        <Grid item md={12}>
          <Alert
            severity={alert.severity}
            onClose={() => setAlert({ ...alert, showAlert: false })}
          >
            {alert.message}
          </Alert>
        </Grid>
      )}
    </Grid>
  );
}
