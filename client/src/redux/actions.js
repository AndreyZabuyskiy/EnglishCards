import { REGISTER, LOADER_REGISTER_ON, LOADER_REGISTER_OFF, LOGIN, LOADER_LOGIN_ON, LOADER_LOGIN_OFF, CHECK_AUTH, FETCH_MODULES, FETCH_MODULE, CREATE_MODULE } from "./types";
import { checkApi, loginApi, registerApi } from "../http/userApi";
import { fetchModulesApi } from "../http/modulesApi";
import { createModuleApi, fetchModuleByIdApi } from "../http/moduleApi";

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
    
    dispatch({
      type: FETCH_MODULES,
      data: response
    });
  }
}

export function fetchModuleById(id) {
  return async dispatch => {
    const response = await fetchModuleByIdApi(id);

    dispatch({
      type: FETCH_MODULE,
      data: response
    });
  }
}

export function createModule(module) {
  return async dispatch => {
    let words = [];
    for(let card in module.cards) {
      words.push({
        value: module.cards[card].value,
        translate: module.cards[card].translate,
        imgUrl: ''
      });
    }
    
    const createdModule = {
      title: module.title, words
    }

    const response = await createModuleApi(createdModule);
    dispatch({
      type: CREATE_MODULE,
      data: response
    });
  }
}