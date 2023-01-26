import { REGISTER, LOGIN, CHECK_AUTH, LOGOUT } from '../types';
import { registerApi, loginApi, checkApi } from "../../http/userApi";
import Cookies from "js-cookie";

export function registerAction(login, password) {
  return async dispatch => {
    const response = await registerApi(login, password);
    dispatch({
      type: REGISTER,
      data: response
    });
  }
}

export function loginAction(login, password) {
  return async dispatch => {
    const response = await loginApi(login, password);
    dispatch({
      type: LOGIN,
      data: response
    });
  }
}

export function checkAuth() {
  return async dispatch => {
    const response = await checkApi();
    dispatch({
      type: CHECK_AUTH,
      data: response
    });
  }
}

export function logout() {
  return async dispatch => {
    Cookies.remove('token');

    dispatch({
      type: LOGOUT
    });
  }
}