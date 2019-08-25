import cookie from 'js-cookie';
import { AUTHENTICATE, DEAUTHENTICATE } from '../actionTypes';
import Router from 'next/router';

export const authenticate = user => dispatch => {

  fetch(`http://localhost:8000/o/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: user
    })
        .then(data => data.json())
        .then(response => {
            // console.log('ok set cookie', response.token);
            setCookie('token', response.access_token);
            Router.push('/');
            dispatch({ type: AUTHENTICATE, payload: response.access_token });
        })
        .catch(err => console.log(err));
}

// gets the token from the cookie and saves it in the store
export const reauthenticate = token => {
  return dispatch => {
      dispatch({ type: AUTHENTICATE, payload: token });
  };
};

// removing the token
export const deauthenticate = () => {
  return dispatch => {
      removeCookie('token');
      Router.push('/');
      dispatch({ type: DEAUTHENTICATE });
  };
};
