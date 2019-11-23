import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

const logMiddleware = (store:any) => (next:any) => (action:any) => {
  return next(action);
}
const stringMiddleware = () => (next:any) => (action:any) => {
  if(typeof action === 'string') {
    return next({
      type: action
    });
  }
  return next(action)
}

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunkMiddleware, stringMiddleware, logMiddleware)
));


export default store;