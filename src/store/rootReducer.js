import { combineReducers } from 'redux'
import auth from './auth/authReducer'
import general from './general/generalReducer'

export default combineReducers({
  auth,
  general
})