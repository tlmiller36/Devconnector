import {SET_CURRENT_USER, GET_ERRORS} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';



//Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch(
        {
          type: GET_ERRORS,
          payload: err.response.data
        }
      ));
};

//Set token at login to use in all pages
export const loginUser = userData => dispatch => {
    axios
    .post('/api/users/login', userData)
    .then(res => {
      // save the token to local storage
      const {token} = res.data;
      localStorage.setItem ('jwtToken', token);

      // set token to the auth header
      setAuthToken(token);

      //Decode token to get user data
      const decoded = jwt_decode(token);

      //Store user data in Redux
      dispatch (setCurrentUser (decoded));

    })
      .catch (err => dispatch ({
        type: GET_ERRORS,
        payload: err.response.data
      }));
    };

// Set logged in user    
export const setCurrentUser = decoded => {
  return{
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem ('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

