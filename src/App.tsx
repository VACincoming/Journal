import React, { Suspense, useEffect } from 'react'
import './App.css'
import './i18n'
import Login from './Pages/Login'
import Registration from './Pages/Registration'
import { Switch, Route } from "react-router-dom"
import GroupList from './Pages/GroupList'
import Schedule from './Pages/Schedule'
import Main from './Pages/Main'
import AdminTools from './Pages/AdminTools'
import { withJournalService } from './hoc'
import ActivationPage from './Pages/ActiovationPage'
import SuccessActivation from './Pages/SuccessActivation'
import ProtectedRoute from './ProtectedRoute'
import { bindActionCreators } from 'redux'
import { fetchGetUser, fetchLoaderOn, fetchLoaderOff } from './actions'
import {connect} from 'react-redux'
import Spinner from './Components/Spinner'
const App = (props:any) => {
  const {fetchGetUser, fetchLoaderOn, fetchLoaderOff, loading} = props
  useEffect(() => {
    if(localStorage.getItem("Token")){
      fetchLoaderOn()
      fetchGetUser().then(() => fetchLoaderOff())
    }else fetchLoaderOff()
  }, [fetchLoaderOn, fetchGetUser, fetchLoaderOff])
  return (
    <Switch>
      <Suspense fallback={null}>
          { loading === false ? 
          <>
            <Route exact path='/'><Login /></Route>
            <ProtectedRoute path='/registration' Component={Registration}/>
            <ProtectedRoute path='/main' Component={Main}/>
            <ProtectedRoute path='/grouplist' Component={GroupList}/>
            <ProtectedRoute path='/schedule' Component={Schedule}/>
            <ProtectedRoute path='/adminTools' Component={AdminTools}/>
            <Route path='/activationPage'><ActivationPage/></Route>
            <Route path='/successActivation'><SuccessActivation/></Route>
          </> : <Spinner/>
          }
      </Suspense>
    </Switch>
  )
}

const mapStateToProps = (state:any) => {
  if(state){
    return {
      user: state.user,
      loading: state.loading
    }
  }
  return {state}
}

const mapDispatchToProps = (dispatch:any, ownProps:any) => {
  const {journalService} = ownProps;
  return bindActionCreators({
    fetchGetUser: fetchGetUser(journalService),
    fetchLoaderOff: fetchLoaderOff(),
    fetchLoaderOn: fetchLoaderOn()
  }, dispatch)
}

export default withJournalService()(connect(mapStateToProps, mapDispatchToProps)(App))
