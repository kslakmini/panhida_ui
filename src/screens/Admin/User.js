import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useStyles } from '../../utils/styles/styles';

import Button from '../../components/UI/ReusableButton';
import CircularProgress from '../../components/UI/CircularProgress';
import Title from '../../components/UI/Title';
import { useNavigate, useLocation } from 'react-router-dom';

import axios from 'axios';

// validation
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { validationSchema } from '../../utils/validations/admin/user';

import { countries } from 'countries-list';

//convert countries obj to array
const allCountries = Object.keys(countries).map((index) => {
  let country = countries[index];
  return country;
});

export default function User(props) {
  const classes = useStyles();
  const { state } = useLocation();
  let navigate = useNavigate();

  // data
  // eslint-disable-next-line
  const [initialValues, setInitialValues] = useState({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    contactNumber: '',
    country: 'Sri Lanka',
    confirmEmail: '',
  });

  const titles = [
    {
      value: 'Ms',
      text: 'Ms',
    },
    {
      value: 'Mrs',
      text: 'Mrs',
    },
    {
      value: 'Mr',
      text: 'Mr',
    },
    {
      value: 'Dr',
      text: 'Dr',
    },
  ];

  const roles = [
    {
      value: 'admin',
      text: 'Admin',
    },
    {
      value: 'moderator',
      text: 'Moderator',
    },
    {
      value: 'companyAdmin',
      text: 'Company Admin',
    },
    {
      value: 'companyStaff',
      text: 'Company Staff',
    },
    {
      value: 'candidate',
      text: 'Candidate',
    },
    {
      value: 'salesExecutive',
      text: 'Sales executive',
    },
    {
      value: 'batchRef',
      text: 'Batch ref',
    },
  ];

  // eslint-disable-next-line
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
        await axios.post('/user/', e);
        resetForm();
        setAlert({
          showAlert: true,
          severity: 'success',
          message: 'User created successfully!',
        });
      } catch (error) {
        if (error.response.data === 'Email already exists!') {
          setAlert({
            showAlert: true,
            severity: 'error',
            message: 'User already exists!',
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
    } else {
      try {
        setCallingBackend(true);
        await axios.put(`/user/${state.id}`, e);
        navigate('/users');
      } catch (error) {
        if (error.response.data === 'status not matched!') {
          setAlert({
            showAlert: true,
            severity: 'error',
            message: 'status not matched!',
          });
        } else if (error.response.data === 'User role is not matched!') {
          setAlert({
            showAlert: true,
            severity: 'error',
            message: 'User role is not matched!',
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
  // eslint-disable-next-line
  const get = async (id) => {
    try {
      const data = await axios.get(`/user/${id}`);

      setInitialValues({
        title: data.data.title,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        fullName: data.data.fullName,
        role: data.data.role,
        contactNumber: data.data.contactNumber,
        country: data.data.country,
        email: data.data.email,
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
      <Grid container item xs={12} sm={12} md={12}>
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
                        ? 'Create an User Account'
                        : 'Update the User Account'
                    }
                  />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Title>Title</Title>
                      <Grid item xs={12} sm={12} md={12}>
                        <FormControl component='fieldset'>
                          <RadioGroup
                            aria-label='title'
                            name='title'
                            row
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                          >
                            {titles.map((title, i) => (
                              <Box key={i} display='inline' marginRight={3}>
                                <FormControlLabel
                                  value={title.value}
                                  control={<Radio />}
                                  label={title.text}
                                />
                              </Box>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Field
                          name='firstName'
                          label='First Name'
                          component={TextField}
                          variant='outlined'
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Field
                          name='lastName'
                          label='Last Name'
                          component={TextField}
                          variant='outlined'
                          fullWidth
                          required
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                        <Field
                          name='email'
                          label='Email Address'
                          component={TextField}
                          variant='outlined'
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid
                        style={
                          componentType === 'create'
                            ? { display: 'block' }
                            : { display: 'none' }
                        }
                        item
                        xs={12}
                        sm={12}
                        md={6}
                      >
                        <Field
                          name='confirmEmail'
                          label='Confirm Email'
                          component={TextField}
                          variant='outlined'
                          fullWidth
                          required={componentType === 'update' ? false : true}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                        <Field
                          name='country'
                          label='Country'
                          component={TextField}
                          variant='outlined'
                          placeholder='Country'
                          fullWidth
                          select
                          SelectProps={{ native: true }}
                        >
                          {' '}
                          <option />
                          {allCountries.map((option) => (
                            <option key={option.continent} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </Field>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Field
                          name='contactNumber'
                          label='Contact Number'
                          component={TextField}
                          variant='outlined'
                          placeholder='Contact Number'
                          fullWidth
                        />
                      </Grid>
                      <Title>Role</Title>
                      <Grid item xs={12} sm={12} md={12}>
                        <FormControl component='fieldset'>
                          <RadioGroup
                            aria-label='role'
                            name='role'
                            row
                            value={values.role}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                          >
                            {roles.map((role, i) => (
                              <Box key={i} display='inline' marginRight={3}>
                                <FormControlLabel
                                  value={role.value}
                                  control={<Radio />}
                                  label={role.text}
                                />
                              </Box>
                            ))}
                          </RadioGroup>
                        </FormControl>
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
