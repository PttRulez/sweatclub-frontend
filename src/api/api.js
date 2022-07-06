import axios from "axios";
import store from '../store/store';
import { logout } from '../store/auth/actions';

function getTokenFromStore() {
  return store.getState().auth?.authToken?.token;
}

let api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use(request => {
  request.headers.common['Accept'] = 'application/json';
  request.headers.common['Content-Type'] = 'application/json';
  request.headers.common['Authorization'] = `Bearer ${ getTokenFromStore() }`;
  return request;
})

api.interceptors.response.use(
  response => { return response; },
  error => {
    if(store.getState().auth.authToken.token) {
      store.dispatch(logout());
      window.location.href = '/';
    }
    return Promise.reject(error)
  }
)

export default api;