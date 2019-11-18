import React, { Suspense } from 'react'
import './App.css'
import './i18n'
import Login from './Pages/Login'
import Registration from './Pages/Registration'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import GroupList from './Pages/GroupList'
import Shedule from './Pages/Shedule'
import Main from './Pages/Main'
import AdminTools from './Pages/AdminTools'
const App = () => {
    return (
      <Router>
        <Switch>
          <Suspense fallback={null}>
              <Route exact path='/'>      <Login />       </Route>
              <Route path='/registration'><Registration /></Route>
              <Route path='/main'>        <Main />        </Route>
              <Route path='/grouplist'>   <GroupList />   </Route>
              <Route path='/shedule'>     <Shedule />     </Route>
              <Route path='/adminTools'>  <AdminTools />     </Route>
          </Suspense>
        </Switch>
      </Router>
    )
}

export default App
