import { SET_AUTH } from './types';
import {history} from '../../index';
import {createAuthObj} from '../../app/helpers';
import api from '../../api/api';

export const authAction = (authObj) => {
  return { type: SET_AUTH, payload: authObj }
}

export const login = (formData, setFormData) => { 
  fetch("${")
  return function (dispatch) {
    return api
      .post('login', formData)
      .then((res) => {
        if (res.data.status === 200) {
          dispatch(setAuthThunk(res.data))
        }
        return res;
      })
      .then((res) => {
        if (res.data.status === 200) {
          console.log('history')
          history.push('/ratings-table');
        }
      })   
  }
}

const setAuthThunk = (authData) => (dispatch) => {
  const authObj = createAuthObj(authData);
  dispatch({ type: 'SET_AUTH', payload: authObj })
  localStorage.setItem('auth', JSON.stringify(authObj));
}