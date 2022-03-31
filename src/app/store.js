import { createStore, applyMiddleware } from 'redux';
import authReducer from './authReducer';
import { composeWithDevTools } from '@redux-devtools/extension';

const store = createStore(
  authReducer,
  composeWithDevTools()
);

export default store;
