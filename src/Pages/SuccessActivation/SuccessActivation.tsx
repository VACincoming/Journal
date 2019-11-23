import React from 'react'
import './successActivation.css'
import { Link } from 'react-router-dom'

export default function SuccessActivation(){
  return(
    <>
      <h2>Activation success</h2>
      <Link to="/">Go to Login Page and sign in</Link>
    </>
  )
}