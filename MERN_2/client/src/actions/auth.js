import axios from 'axios';
import {
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
} from './types';
import { toast } from 'react-toastify';

//user authentication

//first set the token to the header whenever we get a token
//becse at backend we req.header(x-auth-token) so we need to set it here

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('http://localhost:5000/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//register
export const register = ({ user }) => async (dispatch) => {
  try {
    const res = await axios.post(
      'http://localhost:5000/api/users/register',
      user
    );
    console.log(res.data);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    toast.error(err.response.data, {
      position: toast.POSITION.TOP,
    });
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = ({ user, history }) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/api/users/login', user);
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    toast.success('Successfully logged in!', {
      position: toast.POSITION.TOP_CENTER,
    });
    dispatch(loadUser());
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    toast.error(err.response.data, {
      position: toast.POSITION.TOP_CENTER,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
