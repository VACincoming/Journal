import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import JournalService from './services/journal-service'
import { JournalServiceProvider } from './journal-service-context'
import store from './store'

const journalService = new JournalService();

ReactDOM.render(
  <Provider store={store}>
    <JournalServiceProvider value={journalService} >
      <Router>
        <App />
      </Router>
    </JournalServiceProvider>
  </Provider>,
  document.getElementById('root'));
  
serviceWorker.unregister();
