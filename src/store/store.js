import { createStore, applyMiddleware } from 'redux';
import authReducer from './auth/authReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

const store = createStore(
  authReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;
