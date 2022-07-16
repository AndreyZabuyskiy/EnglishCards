import { REGISTER, LOADER_REGISTER_ON, LOADER_REGISTER_OFF, LOGIN, LOADER_LOGIN_ON, LOADER_LOGIN_OFF, CHECK_AUTH, FETCH_MODULES } from "./types";
import { checkApi, loginApi, registerApi } from "../http/userApi";
import { fetchModulesApi } from "../http/moduleApi";

export function register(login, password) {
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

export function fetchModules() {
  return async dispatch => {
    const response = await fetchModulesApi();
    console.log('response -->', response);
    
    dispatch({
      type: FETCH_MODULES,
      data: response
    });
  }
}