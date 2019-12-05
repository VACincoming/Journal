import React, {useState} from 'react';
//import Button from '@material-ui/core/Button';
import { Rabbit as Button } from 'react-button-loaders'
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './login.css'
import Logo from '../../assets/img/logo.png'
import TextField from '@material-ui/core/TextField'
import {Link, useHistory} from 'react-router-dom'
import { withJournalService } from '../../hoc';
import {fetchUserLoaded, fetchLoaderOn, fetchLoaderOff, fetchUserRequest} from '../../actions'
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
    width: 300,
  },
}));

function SignIn(props:any) {
  let history = useHistory();
  const classes = useStyles(); 
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)
  const [errorText, setErrorText] = useState(null)
  const [isLoading, setIsLoading] = useState('')
  const {fetchUserLoaded, journalService} = props
  React.useEffect(() => {
    fetchUserRequest()
  }, [])
  async function signIn(){
    setIsLoading("loading")
    try{
      let user = await journalService.signIn(login, password)
      await fetchUserLoaded({"username": user.username, "role": user.role})
      setIsLoading('')
      history.push("/main")
    }catch(err){
      setIsLoading('')
      history.push("/")
      setErrorText(err.message.toString())
      setIsError(true)
    }
  }
  function signInEnter(event: React.KeyboardEvent){
    if(event.key === 'Enter'){
      signIn()
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
          id="outlined-basic"
          label="Email/Username"
          className={classes.textFieldData}
          type="mail"
          margin="normal"
          value={login}
          variant="outlined"
          onChange={(e)=>setLogin(e.target.value)}
        />
        <TextField
          variant="outlined"
          id="standard-password-input"
          label="Password"
          className={classes.textFieldData}
          type="password"
          autoComplete="current-password"
          margin="normal"
          value={password}
          onKeyPress={signInEnter}
          onChange={(e) => setPassword(e.target.value)}
        />
        {
          isError ? <h3 style={{"color": "#c70000f2"}}>{errorText}</h3> : null
        }
           {/*  <Button
              type="submit"
              variant="contained"
              color="primary"
              className='submit'
              style={{marginTop:'20px', minWidth: '200px'}}
              onClick={signIn}
              disabled={props.loading}
            > */}
            <Button
            onClick={signIn}
            state={isLoading}
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
    fetchUserLoaded: fetchUserLoaded(),
    fetchLoaderOn: fetchLoaderOn(),
    fetchLoaderOff: fetchLoaderOff(),
  }, dispatch)
};

const mapStateToProps = (state:any) => {
  if(state){
    return {loading: state.loading}
  }
  return {state}
};

export default withJournalService()(
  connect(mapStateToProps, mapDispatchToProps)(SignIn))