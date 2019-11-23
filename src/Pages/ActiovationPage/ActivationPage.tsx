import React from 'react'
import './activationPage.css'
import { Link } from 'react-router-dom'
export default function ActivationPage(){
  return(
    <>
      <h2>Please, check your mail and confirm your account</h2>
      <Link to="/"><h3>Login Page</h3></Link>
    </>
    )
}