import { REGISTER, LOADER_REGISTER_ON, LOADER_REGISTER_OFF, LOGIN, LOADER_LOGIN_ON, LOADER_LOGIN_OFF, CHECK_AUTH, FETCH_MODULES, FETCH_MODULE, CREATE_MODULE, UPDATE_MODULE, LOGOUT, FETCH_LEARN_MODULE, CHECK_ANSWER } from "./types";
import { checkApi, loginApi, registerApi } from "../http/userApi";
import { fetchModulesApi } from "../http/modulesApi";
import { createModuleApi, fetchModuleByIdApi, updateModuleApi } from "../http/moduleApi";
import { checkAnswerApi, fetchCheckAnswerApi, fetchLearnModulesApi } from "../http/learnModuleApi";
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
      data: response.data
    });
  }
}

export function createModule(module) {
  return async dispatch => {
    let cards = [];

    for(let card in module.cards) {
      cards.push({
        value: module.cards[card].value,
        translate: module.cards[card].translate,
        imgUrl: module.cards[card].imgUrl
      });
    }
    
    const createdModule = {
      title: module.title,
      description: module.description,
      cards
    }

    const response = await createModuleApi(createdModule);
    dispatch({
      type: CREATE_MODULE,
      data: response
    });
  }
}

export function updateModule(id, module) {
  return async dispatch => {
    let cards = [];

    for(let card in module.cards) {
      cards.push({
        value: module.cards[card].value,
        translate: module.cards[card].translate,
        imgUrl: module.cards[card].imgUrl
      });
    }
    
    const createdModule = {
      title: module.title,
      description: module.description,
      cards
    }

    const response = await updateModuleApi(id, createdModule);
    dispatch({
      type: UPDATE_MODULE,
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

export function fetchLearnModule(id) {
  return async dispatch => {
    const response = await fetchLearnModulesApi(id);
    
    dispatch({
      type: FETCH_LEARN_MODULE,
      data: response.data
    });
  }
}

export function checkAnswer(cardId, answer) {
  return async dispatch => {
    const response = await checkAnswerApi(cardId, answer);

    dispatch({
      type: CHECK_ANSWER,
      data: response.data
    });
  }
}