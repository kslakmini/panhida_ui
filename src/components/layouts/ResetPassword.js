import { useState } from 'react';
import { Link } from 'react-router-dom';
// material

import { Box, Button, Container, Typography, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ResetPasswordForm from '../../screens/Jobs/ResetPasswordForm';
//
import SentIcon from '../../utils/assets/icon_sent';
import { useStyles } from '../../utils/styles/styles';

export default function ResetPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [alert, setAlert] = useState({
    showAlert: false,
    severity: 'success',
    message: '',
  });
  return (
    <Grid
      container
      className={classes.RootStyle}
      title='Reset Password'
      spacing={1}
    >
      <Container>
        <Box sx={{ maxWidth: 490, mx: 'auto' }}>
          {!sent ? (
            <>
              <Typography variant='h3' paragraph>
                Forgot your password?
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                Please enter the email address associated with your account and
                We will email you a link to reset your password.
              </Typography>

              <ResetPasswordForm
                onSent={() => setSent(true)}
                onSetAlert={(value) => setAlert(value)}
                onGetEmail={(value) => setEmail(value)}
              />

              <br />
              <Link to='/' style={{ textDecoration: 'none' }}>
                <Button
                  fullWidth
                  size='large'
                  variant='contained'
                  color='primary'
                >
                  <span>Back</span>
                </Button>
              </Link>
            </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

              <Typography variant='h3' gutterBottom>
                Request sent successfully
              </Typography>
              <Typography>
                We have sent a confirmation email to &nbsp;
                <strong>{email}</strong>
                <br />
                Please check your email.
              </Typography>

              <br />
              <Link to='/' style={{ textDecoration: 'none' }}>
                <Button
                  fullWidth
                  size='large'
                  variant='contained'
                  color='primary'
                >
                  <span>Back</span>
                </Button>
              </Link>
            </Box>
          )}

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
