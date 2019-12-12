import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link, useHistory} from 'react-router-dom'
import { withJournalService } from '../../hoc';
import {fetchUserLoaded, fetchLoaderOn, fetchLoaderOff} from '../../actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp(props:any) {
  let history = useHistory();
  const classes = useStyles();
  const {fetchLoaderOn, fetchLoaderOff} = props
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isFilledFields, setIsFilledFields] = useState(true)
  const [errorMsg, setErrMsg] = useState([])
  const [isError, setIsError] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    username: ''
  })
  const isValid = () => {
    if(formData.firstName.length > 1 && formData.lastName.length > 1 && formData.email.length > 1 && formData.username.length > 1 && formData.password.length > 1 && (confirmPassword === formData.password)){
      return true
    }else return false
  }
  async function signUp(){
    if(isValid()){
     // fetchLoaderOn()
      try{
        setIsError(false)
        await props.journalService.signUp(formData)
        history.push("/ActivationPage")
      }catch(err){
        let error = err.message.split("; ")
        setErrMsg(error)
        setIsError(true)
      }
      //fetchLoaderOff()
    }
   else setIsFilledFields(false)
  }

  function handleSubmit(event:any){
    event.preventDefault()
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" onClick={()=>console.log(errorMsg, isError)}>
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="filled"
                required
                fullWidth
                id="name"
                label="First Name"
                autoFocus
                onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="Username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                name="confirm_password"
                label="Confirm Password"
                type="password"
                id="confirm_password"
                autoComplete="current-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            { !isFilledFields ?  <p style={{color:"#c70000f2"}}>Filled all fields</p> : null }
            <div style={{textAlign: 'center'}}>
            { isError ? errorMsg.map((err:any) => {
                return(
                  <p style={{color:"#c70000f2"}} key={err}>{err}</p>
                )
              }) : null
            }
          </div>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
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
}

const mapStateToProps = (state:any) => {
  if(state){
    return {loading: state.loading}
  }
  return {state}
}

export default withJournalService()(
  connect(mapStateToProps, mapDispatchToProps)(SignUp))