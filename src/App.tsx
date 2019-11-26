import React, { Suspense } from 'react'
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
const App = () => {
  return (
    <Switch>
      <Suspense fallback={null}>
          <Route exact path='/'><Login /></Route>
          <ProtectedRoute path='/registration' Component={Registration}/>
          <ProtectedRoute path='/main' Component={Main}/>
          <ProtectedRoute path='/grouplist' Component={GroupList}/>
          <ProtectedRoute path='/schedule' Component={Schedule}/>
          <ProtectedRoute path='/adminTools' Component={AdminTools}/>
          <Route path='/activationPage'><ActivationPage/></Route>
          <Route path='/successActivation'><SuccessActivation/></Route>
      </Suspense>
    </Switch>
  )
}

export default withJournalService()(App)
