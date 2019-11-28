import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
const ProtectedRoute = (data:any) => {
  const { Component, props, user, ...rest} = data
  function checkAuth(location:any){
    let roles = user ? user.roles : null
    if(roles && roles.includes("ADMIN") && location.pathname === "/adminTools") return true
    else if(roles && !(roles.includes("ADMIN") || roles.includes("MONITOR") || roles.includes("STUDENT")))return false
    else if (location.pathname !== "/adminTools") return true
  }
  return(
    <Route 
      {...rest}
      render = {(props) => {
        if(checkAuth(props.location)){
          return <Component />
        }else{
          return(
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  )
}

const mapStateToProps = (state:any) => {
  if(state){
    return {user:state.user}
  }
  return {state}
}

export default connect(mapStateToProps)(ProtectedRoute)