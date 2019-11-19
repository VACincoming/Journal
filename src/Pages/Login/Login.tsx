import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './login.css'
import Logo from '../../assets/img/logo.png'
import TextField from '@material-ui/core/TextField'
import {Link, useHistory} from 'react-router-dom'
import { withJournalService } from '../../hoc';
import {fetchUserLoaded} from '../../actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
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
    width: 200,
  },
}));

function SignIn(props:any) {
  let history = useHistory();
  const classes = useStyles(); 
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const {fetchUserLoaded} = props
  async function signIn(){
    try{
    let user = await props.journalService.signIn(login, password)
    await fetchUserLoaded(user.data.username)
    history.push("/main")
    }catch(err){
      console.log(err)
    }
  }
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
          value={login}
          onChange={(e)=>setLogin(e.target.value)}
        />
        <TextField
          id="standard-password-input"
          label="Password"
          className={classes.textFieldData}
          type="password"
          autoComplete="current-password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className='submit'
              style={{marginTop:'20px', minWidth: '200px'}}
              onClick={signIn}
            >
            SIGN IN
            </Button>
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

const mapDispatchToProps = (dispatch:any) => {
  return bindActionCreators({
    fetchUserLoaded: fetchUserLoaded()
  }, dispatch)
}
/* const mapStateToProps = ({user}:{user:any}) => {
  return {user}
} */

export default withJournalService()(
  connect(null, mapDispatchToProps)(SignIn))