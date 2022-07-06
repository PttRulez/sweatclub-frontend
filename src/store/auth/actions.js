import { SET_AUTH } from './types';
import { history } from '../../index';
import { createAuthObj } from '../../app/helpers';
import api from '../../api/api';

export const authAction = authObj => {
  return { type: SET_AUTH, payload: authObj };
};

export const login = formData => {
  return function (dispatch) {
    return api
      .post('login', formData)
      .then(res => {
        if (res.data.status === 200) {
          dispatch(setAuthThunk(res.data));
        }
        return res;
      })
      .then(res => {
        if (res.data.status === 200) {
          history.push('/ratings-table');
        }
      });
  };
};

export const logout = () => {
  return function (dispatch) {
    api
      .post('logout')
      .then(
        res => console.log('Has been logouted'),
        err => console.log('>>ERR after click logout>>', err)
      )
      .finally(() => {
        dispatch(setAuthThunk({
          authToken: {
            token: null,
            abilities: [],
          },
          isAuth: false,
          user: {
            nickname: '',
            avatarUrl: '',
            role: '',
          },
        }))
      });
  };
};

const setAuthThunk = authData => dispatch => {
  const authObj = createAuthObj(authData);
  dispatch({ type: 'SET_AUTH', payload: authObj });
  localStorage.setItem('auth', JSON.stringify(authObj));
};
