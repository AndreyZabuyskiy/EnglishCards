import { REGISTER, LOADER_REGISTER_ON, LOADER_REGISTER_OFF, LOGIN, LOADER_LOGIN_ON, LOADER_LOGIN_OFF, CHECK_AUTH, FETCH_MODULES, FETCH_MODULE, CREATE_MODULE, UPDATE_MODULE, LOGOUT, FETCH_LEARN_MODULE, CHECK_ANSWER, GET_RESULT_MODULE, REMOVE_LEARN_MODULE, SAVE_USER_ANSWER, NEXT_QUESTION, FETCH_IMAGES, CLEAR_IMAGES } from "./types";
import { checkApi, loginApi, registerApi } from "../http/userApi";
import { fetchModulesApi } from "../http/modulesApi";
import { createModuleApi, fetchImagesApi, fetchModuleByIdApi, updateModuleApi } from "../http/moduleApi";
import { checkWriteCardAnswerApi, fetchWriteModulesApi, getResultWriteModuleApi, removeWriteModuleApi } from "../http/writeModuleApi";
import Cookies from "js-cookie";
import { fetchLearnModuleApi } from "../http/learnModuleApi";

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
        pathToFile: module.cards[card].pathToFile,
        isUrlImage: module.cards[card].isUrlImage,
        urlToImage: module.cards[card].urlToImage
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

export function fetchWriteModule(id) {
  return async dispatch => {
    const response = await fetchWriteModulesApi(id);
    
    dispatch({
      type: FETCH_LEARN_MODULE,
      data: response.data
    });
  }
}

export function checkWriteCardAnswer(cardId, answer) {
  return async dispatch => {
    const response = await checkWriteCardAnswerApi(cardId, answer);

    dispatch({
      type: CHECK_ANSWER,
      data: response.data
    });
  }
}

export function getResultWriteModule(moduleId) {
  return async dispatch => {
    const data = await getResultWriteModuleApi(moduleId);

    dispatch({
      type: GET_RESULT_MODULE,
      action: data
    });
  }
}

export function removeWriteModule(moduleId) {
  return async dispatch => {
    const data = await removeWriteModuleApi(moduleId);

    dispatch({
      type: REMOVE_LEARN_MODULE,
      action: data
    });

    const response = await fetchWriteModulesApi(moduleId);
    
    dispatch({
      type: FETCH_LEARN_MODULE,
      data: response.data
    });
  }
}

export function saveUserAnswer(userAnswer) {
  return async dispatch => {
    dispatch({
      type: SAVE_USER_ANSWER,
      data: userAnswer
    });
  }
}

export function nextQuestion() {
  return async dispatch => {
    dispatch({
      type: NEXT_QUESTION
    });
  }
}

export function fetchImages(searchQuery) {
  return async dispatch => {
    const response = await fetchImagesApi(searchQuery);

    dispatch({
      type: FETCH_IMAGES,
      data: response
    });
  }
}

export function clearImages() {
  return async dispatch => {
    dispatch({
      type: CLEAR_IMAGES
    });
  }
}

export function fetchLearnModule(id) {
  return async dispatch => {
    const response = await fetchLearnModuleApi(id);
    
    dispatch({
      type: FETCH_LEARN_MODULE,
      data: response._id
    });
  }
}