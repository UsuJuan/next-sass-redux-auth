import axios from 'axios';
import Router from 'next/router';
const BASE_URL = 'http://localhost:8000';
import { AUTHENTICATE } from '../actionTypes';
import { setCookie } from '../../utils/cookie';

export function login(payload, next = '/') {
  return dispatch =>
    axios
      .post(`${BASE_URL}/api/token/`, payload, { 'Content-Type': 'application/x-www-form-urlencoded' })
      .then(resp => {
        dispatch({
          type: AUTHENTICATE,
          payload: resp.data.access
        });
        setCookie('token', resp.data.access);
        Router.push(next);
      })
      .catch(err => err);
}

export function logout() {
  return dispatch =>
    axios
      .get(`${BASE_URL}/api/logout`)
      .then(() => {
        dispatch({ type: 'LOGOUT' });
        Router.push('/');
      })
      .catch(err => err);
}

export function whoAmI(cookie) {
  return dispatch => {
    return axios
      .get(`${BASE_URL}/api/whoami`, {
        headers: {
          Accept: 'application/json',
          Cookie: cookie
        },
        withCredentials: true
      })
      .then(response => {
        let user = null;
        if (response.data) {
          user = response.data;
        }
        dispatch({
          type: 'SET_USER',
          user
        });
        return user;
      })
      .catch(() => {
        return null;
      });
  };
}
