import { FETCH_LEARN_MODULE, CHECK_ANSWER, GET_RESULT_MODULE, REMOVE_LEARN_MODULE, SAVE_USER_ANSWER,NEXT_QUESTION, FETCH_WRITE_MODULE } from "../types";
import {checkWriteCardAnswerApi, fetchWriteModulesApi, getResultWriteModuleApi, removeWriteModuleApi} from "../../http/writeModuleApi"

export function fetchWriteModule(id) {
  return async dispatch => {
    const { data } = await fetchWriteModulesApi(id);
    dispatch({
      type: FETCH_WRITE_MODULE,
      data
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