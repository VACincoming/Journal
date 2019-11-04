import React, { Suspense } from 'react'
import './App.css'
import './i18n'
import LangSwitcher from './Components/LangSwitcher'
import Login from './Pages/Login'
import Registration from './Pages/Registration'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

const App = () => {
    return (
      <Router>
        <Switch>
          <Suspense fallback={null}>
              <LangSwitcher />
              <Route exact path='/'><Login /></Route>
              <Route path='/registration'><Registration /></Route>
              <Route path='/main'></Route>
          </Suspense>
        </Switch>
      </Router>
    )
}

export default App
