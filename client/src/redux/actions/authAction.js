import { REGISTER, LOGIN, CHECK_AUTH, LOGOUT } from '../types';
import { registerApi, loginApi, checkApi, logoutApi } from "../../http/userApi";

export function registerAction(email, password) {
  return async dispatch => {
    const response = await registerApi(email, password);

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

export function logout() {
  return async dispatch => {
    await logoutApi();
    localStorage.removeItem('token');

    dispatch({
      type: LOGOUT
    });
  }
}

export function checkAuth() {
  return async dispatch => {
    const user = await checkApi();

    dispatch({
      type: CHECK_AUTH,
      data: user
    });
  }
}