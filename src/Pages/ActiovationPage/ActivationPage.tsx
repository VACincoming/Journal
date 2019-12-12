import React from 'react'
import './activationPage.css'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
export default function ActivationPage(){
  const history = useHistory()
  return(
    <div style={{textAlign: 'center'}}>
      <h2>Please, check your mail and confirm your account</h2>
      <Button variant='contained' color='primary' onClick={() => history.push("/")}>Login Page</Button>
    </div>
    )
}