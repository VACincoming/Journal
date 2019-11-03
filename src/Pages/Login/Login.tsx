import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './login.css'
//import Logo from '../../assets/logo.png'
import { useTranslation } from 'react-i18next';
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
}));

export default function SignIn(props:any) {
  const classes = useStyles(); 
  const { t, i18n } = useTranslation();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      { /* <img className='logo' src={Logo} alt="logo"></img> */ }
        <Typography component="p" align="center" className='loginTitle'>
          Welcome to the Students System Management <br/>
          Please, log in with your email
        </Typography>
           <Button
            type="submit"
            variant="outlined"
            color="default"
            className='submit'
            style={{marginTop:'20px'}}
            onClick={() => console.log('login')}
          >
            Sign in with Email
          </Button>
      </div> 
    </Container>
  );
}