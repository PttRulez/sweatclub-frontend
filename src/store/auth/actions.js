
import { SET_AUTH } from './types';

export const authAction = (authObj) => {
  return { type: SET_AUTH, payload: authObj }
}