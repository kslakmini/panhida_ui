import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
// material
import { Box, Button, Container, Typography, Grid } from '@material-ui/core';
import { useStyles } from '../../utils/styles/styles';
// layouts
// components
import SetPasswordForm from '../../screens/Jobs/SetPasswordForm';

export default function SetPassword() {
  const classes = useStyles();
  let isOpen = false;
  const { email, verificationToken, isOpenEndpoint } = useParams();
  const [alert, setAlert] = useState({
    showAlert: false,
    severity: 'success',
    message: '',
  });

  if (isOpenEndpoint === 'true') {
    isOpen = true;
  }

  const values = {
    email,
    verificationToken,
    isOpenEndpoint: isOpen,
  };

  return (
    <Grid
      container
      className={classes.RootStyle}
      title='Set Password'
      spacing={1}
    >
      {/* <LogoOnlyLayout /> */}

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          <>
            <Typography variant='h3' paragraph>
              Enter your password?
            </Typography>

            <SetPasswordForm
              paramValues={values}
              onSetAlert={(value) => setAlert(value)}
            />

            <Grid item xs={12} sm={12} md={12}>
              <div className={classes.button}>
                <Link to='/' style={{ textDecoration: 'none' }}>
                  <Button variant='contained' color='primary'>
                    <span>Go to Home</span>
                  </Button>
                </Link>
              </div>
            </Grid>
          </>
          <div style={{ marginTop: '5%' }}>
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
          </div>
        </Box>
      </Container>
    </Grid>
  );
}
