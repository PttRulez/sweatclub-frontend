import axios from "axios";
import store from '../app/store';

function getTokenFromStore() {
  return store.getState().auth?.authToken?.token;
}

// axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
// axios.defaults.headers.post['Accept'] = 'application/json';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common = {'Authorization': `Bearer ZZ ${ getTokenFromStore() }`}
// axios.defaults.withCredentials = true;

// axios.interceptors.request.use(function (config){
//   const token = getTokenFromStore();
//   config.headers.Authorization = token ? `Bearer interceptor ${token}` : '';
//   return config;
// });

let api = axios.create({
  withCredentials: true,
  baseURL: 'http://127.0.0.1:8000/api'
});

api.interceptors.request.use(request => {
  request.headers.common['Accept'] = 'application/json';
  request.headers.common['Content-Type'] = 'application/json';
  request.headers.common['Authorization'] = `Bearer ${ getTokenFromStore() }`;
  return request;
})

api.interceptors.response.use(
  response => { return response; },
  error => { return Promise.reject(error)}
)

export default api;