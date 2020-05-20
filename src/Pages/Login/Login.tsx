import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { Rabbit as Button } from 'react-button-loaders'
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './login.css'
import Logo from '../../assets/img/logo.png'
import TextField from '@material-ui/core/TextField'
import {useHistory} from 'react-router-dom'
import { withJournalService } from '../../hoc';
import {fetchUserLoaded, fetchLoaderOn, fetchLoaderOff, fetchUserRequest, fetchGetUser} from '../../actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ButtonGroup from '@material-ui/core/ButtonGroup';
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
  const {fetchUserLoaded, journalService, fetchGetUser} = props
  React.useEffect(() => {
    fetchUserRequest()
  }, [])
  async function signIn(){
    setIsLoading("loading")
    try{
      let user = await journalService.signIn(login, password)
      await fetchUserLoaded({"username": user.username, "role": user.role})
      await fetchGetUser()
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
        <h3 style={{textAlign: 'center'}}>Welcome to Students Management System</h3>
        <h3 style={{marginBottom: '0px', textAlign:'center'}}>Please Log in with your email or username</h3>
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
        <Grid item>
          <ButtonGroup color="primary" aria-label="small primary button group" style={{marginTop: "16px"}}>
            <Button
            onClick={signIn}
            state={isLoading}
            className='submit'
            >
              SIGN IN
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className='submit reg'
              onClick={() => history.push("/registration")}
            >
              Registration
            </Button>
          </ButtonGroup>
        </Grid>
      </div> 
    </Container>
  );
}

const mapDispatchToProps = (dispatch:any, ownProps:any) => {
  const {journalService} = ownProps;
  return bindActionCreators({
    fetchGetUser: fetchGetUser(journalService),
    fetchUserLoaded: fetchUserLoaded(),
    fetchLoaderOn: fetchLoaderOn(),
    fetchLoaderOff: fetchLoaderOff(),
  }, dispatch)
};

const mapStateToProps = ({loading}:{loading:boolean}) => {
  return {loading}
};

export default withJournalService()(
  connect(mapStateToProps, mapDispatchToProps)(SignIn))