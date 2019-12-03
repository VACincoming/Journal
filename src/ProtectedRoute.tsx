import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
const ProtectedRoute = (data:any) => {
  const { Component, props, user, ...rest} = data
  function checkAuth(location:any){
    let role = user ? user.role : null
    if(role && role === 'ADMIN' && location.pathname === "/adminTools") return true
    else if(role === null && (location.pathname === '/main' || location.pathname === '/grouplist' || location.pathname === '/schedule' || location.pathname === '/adminTools')) return false
    else if(role && !(role === "ADMIN" || role === "MONITOR" || role === "STUDENT")) return false
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