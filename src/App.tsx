import React, { Suspense } from 'react'
import './App.css'
import './i18n'
import Login from './Pages/Login'
import Registration from './Pages/Registration'
import { Switch, Route } from "react-router-dom"
import GroupList from './Pages/GroupList'
import Shedule from './Pages/Shedule'
import Main from './Pages/Main'
import AdminTools from './Pages/AdminTools'
import { withJournalService } from './hoc'
import ActivationPage from './Pages/ActiovationPage'
const App = () => {
  return (
    <Switch>
      <Suspense fallback={null}>
          <Route exact path='/'>        <Login />       </Route>
          <Route path='/registration'>  <Registration /></Route>
          <Route path='/main'>          <Main />        </Route>
          <Route path='/grouplist'>     <GroupList />   </Route>
          <Route path='/shedule'>       <Shedule />     </Route>
          <Route path='/adminTools'>    <AdminTools />  </Route>
          <Route path='/activationPage'><ActivationPage/></Route>
      </Suspense>
    </Switch>
  )
}

export default withJournalService()(App)
