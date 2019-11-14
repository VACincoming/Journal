import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = (data:any) => {
  const { Component, props, ...rest} = data
  function checkAuth(location:any){
    let role = localStorage.getItem('role');
    let isUser = Number(role) === 0;
    let isAdmin = Number(role) === 1;
    let isSuperAdmin = Number(role) === 2;
    if((isAdmin || isSuperAdmin) && (location.pathname === "/adminCatalog" || location.pathname === "/adminDashboard")) return true 
    else if(isSuperAdmin && location.pathname === '/adminTools') return true
    else if(isUser && (location.pathname === "/userCatalog" || location.pathname === "/userDashboard"))  return true
    else return false
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

export default ProtectedRoute