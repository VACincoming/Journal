import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './login.css'
import Logo from '../../assets/img/logo.png'
import TextField from '@material-ui/core/TextField'
import {Link} from 'react-router-dom'
const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    width: 380,
  },
  dense: {
    marginTop: 19,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  textFieldData: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
}));

export default function SignIn(props:any) {
  const classes = useStyles(); 
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img className='logo' src={Logo} alt="logo"></img>
        <h3 style={{textAlign: 'center'}}>Welcome to the Students System Management</h3>
        <h3 style={{marginBottom: '0px'}}>Please Log in with your email or username</h3>
        <TextField
          id="standard-input"
          label="Email/Username"
          className={classes.textFieldData}
          type="mail"
          margin="normal"
        />
        <TextField
          id="standard-password-input"
          label="Password"
          className={classes.textFieldData}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
          <Link to='/main'>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className='submit'
              style={{marginTop:'20px', minWidth: '200px'}}
            >
            SIGN IN
            </Button>
          </Link>
          <Link to='/registration'>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className='submit'
              style={{marginTop:'20px', minWidth: '200px'}}
            >
              Registration
            </Button>
          </Link>
      </div> 
    </Container>
  );
}