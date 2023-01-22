import { REGISTER, LOADER_REGISTER_ON, LOADER_REGISTER_OFF, LOGIN, LOADER_LOGIN_ON, LOADER_LOGIN_OFF, CHECK_AUTH, FETCH_MODULES, FETCH_MODULE, CREATE_MODULE, UPDATE_MODULE, LOGOUT, FETCH_LEARN_MODULE, CHECK_ANSWER, GET_RESULT_MODULE, REMOVE_LEARN_MODULE, SAVE_USER_ANSWER, NEXT_QUESTION, FETCH_IMAGES, CLEAR_IMAGES, FETCH_LEARN_CARD, USER_SELECTED_OPTION, CORRECT_LEARN_CARD_ANSWER, INCORRECT_LEARN_CARD_ANSWER, CONTINUE_LEARN_CARD, FETCH_LEARN_ROUND, LEARN_ROUND_DONE, FETCH_LEARN_OPTIONS, SHOW_LEARN_CARD, CLEAR_LEARN_CARD, LOAD_CORRECT_ANSWER, INCORRECT_LEARN_WRITE_CARD_ANSWER, CORRECT_LEARN_WRITE_CARD_ANSWER, LEARN_MODULE_DONE, DELETE_LEARN_MODULE, START_OVER_LEARN_MODULE, UNKNOW_LEARN_CARD, GET_COUNT_LEARNED_CARDS, FETCH_WRITE_MODULE, CREATE_MODULE_REDUCER_CLEAR, FETCH_VISITED_MODULES } from "./types";
import { checkApi, loginApi, registerApi } from "../http/userApi";
import { fetchModulesApi, fetchVisitedModulesApi } from "../http/modulesApi";
import { createModuleApi, fetchImagesApi, fetchModuleByIdApi, updateModuleApi } from "../http/moduleApi";
import { checkWriteCardAnswerApi, fetchWriteModulesApi, getResultWriteModuleApi, removeWriteModuleApi } from "../http/writeModuleApi";
import Cookies from "js-cookie";
import { checkTestCardApi, fetchLearnRoundByModuleIddApi, fetchLearnModuleApi, fetchLearnCardApi, fetchLearnRoundById, getResultRoundApi, getOptionsByCardIdApi, checkLearnWriteCardApi, createLearnRoundApi, completionCheckModuleApi, deleteLearnModuleByIdApi, getCountLearnedCardsApi } from "../http/learnModuleApi";

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
      data: response.data.module._id
    });
  }
}

export function clearCreateModuleReducer() {
  return async dispatch => {
    dispatch({
      type: CREATE_MODULE_REDUCER_CLEAR
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
    const learnModule = await fetchLearnModuleApi(id);
    dispatch({
      type: FETCH_LEARN_MODULE,
      data: learnModule._id
    });
    
    const round = await fetchLearnRoundByModuleIddApi(learnModule._id);
    dispatch({
      type: FETCH_LEARN_ROUND,
      data: round
    });
    
    if (round.passedCards >= round.totalNumberCards) {
      const resultRound = await getResultRoundApi(round._id);
    
      dispatch({
        type: LEARN_ROUND_DONE,
        data: resultRound
      });
    } else {
      try {
        const { learnCard, options } = await fetchLearnCardApi(round._id);
        
        dispatch({
          type: FETCH_LEARN_CARD,
          data: {
            card: learnCard,
            options: options,
            value: learnCard.value
          }
        });
      } catch (exp) {
        console.log('fetchLearnModule exp.message', exp.message);
      }
    }
  }
}

export function fetchLearnCard(id) {
  return async dispatch => {
    const { learnCard, options } = await fetchLearnCardApi(id);
    
    dispatch({
      type: FETCH_LEARN_CARD,
      data: {
        card: learnCard,
        options: options,
        value: learnCard.value
      }
    });
  }
}

export function checkTestCard(cardId, option, roundId, learnModuleId) {
  return async dispatch => {
    dispatch({
      type: USER_SELECTED_OPTION,
      data: option._id
    });

    if (option.isRight) {
      dispatch({
        type: CORRECT_LEARN_CARD_ANSWER
      });
    } else {
      dispatch({
        type: INCORRECT_LEARN_CARD_ANSWER
      });
    }

    await checkTestCardApi(cardId, option._id, roundId);

    if (option.isRight) {
      const round = await fetchLearnRoundById(roundId);
      dispatch({
        type: FETCH_LEARN_ROUND,
        data: round
      });

      if (round.passedCards >= round.totalNumberCards) {
        const isLearnModuleDone = await completionCheckModuleApi(learnModuleId);
        
        if (isLearnModuleDone) {
          dispatch({
            type: LEARN_MODULE_DONE
          });
        } else {
          const resultRound = await getResultRoundApi(roundId);

          dispatch({
            type: LEARN_ROUND_DONE,
            data: resultRound
          });

          await createLearnRoundApi(learnModuleId);
        }
      } else {
        const { learnCard, options } = await fetchLearnCardApi(roundId);
        
        dispatch({
          type: FETCH_LEARN_CARD,
          data: {
            card: learnCard,
            options: options,
            value: learnCard.value
          }
        });
      }
    }
  }
}

export function checkLearnWriteCard(answer, correctAnswer, cardId, roundId, learnModuleId) {
  return async dispatch => {
    const isCorrectAnswer = answer === correctAnswer;
    
    if (isCorrectAnswer) {
      dispatch({
        type: CORRECT_LEARN_WRITE_CARD_ANSWER,
        data: { correctAnswer, userAnswer: answer }
      });
    } else {
      dispatch({
        type: INCORRECT_LEARN_WRITE_CARD_ANSWER,
        data: { correctAnswer, userAnswer: answer }
      });
    }

    await checkLearnWriteCardApi(cardId, isCorrectAnswer);

    if (isCorrectAnswer) {
      const round = await fetchLearnRoundById(roundId);
      dispatch({
        type: FETCH_LEARN_ROUND,
        data: round
      });

      if (round.passedCards >= round.totalNumberCards) {
        const isLearnModuleDone = await completionCheckModuleApi(learnModuleId);

        if (isLearnModuleDone) {
          dispatch({
            type: LEARN_MODULE_DONE
          });

          await deleteLearnModuleByIdApi(learnModuleId);
        } else {
          const resultRound = await getResultRoundApi(roundId);
          dispatch({
            type: LEARN_ROUND_DONE,
            data: resultRound
          });

          await createLearnRoundApi(learnModuleId);
        }
      } else {
        const { learnCard, options } = await fetchLearnCardApi(roundId);
        
        dispatch({
          type: FETCH_LEARN_CARD,
          data: {
            card: learnCard,
            options: options,
            value: learnCard.value
          }
        });
      }
    }
  }
}

export function clearLearnCard() {
  return dispatch => {
    dispatch({
      type: CLEAR_LEARN_CARD
    });
  }
}

export function nextLearnQuestion(roundId, learnModuleId) {
  return async dispatch => {
    const round = await fetchLearnRoundById(roundId);
    dispatch({
      type: FETCH_LEARN_ROUND,
      data: round
    });

    if (round.passedCards >= round.totalNumberCards) {
      const isLearnModuleDone = await completionCheckModuleApi(learnModuleId);

      if (isLearnModuleDone) {
        dispatch({
          type: LEARN_MODULE_DONE
        });
      } else {
        const resultRound = await getResultRoundApi(roundId);

        dispatch({
          type: LEARN_ROUND_DONE,
          data: resultRound
        });

        await createLearnRoundApi(learnModuleId);
      }
    } else {
      const { learnCard, options } = await fetchLearnCardApi(roundId);
      dispatch({
        type: FETCH_LEARN_CARD,
        data: {
          card: learnCard,
          options: options,
          value: learnCard.value
        }
      });
    }
  }
}

export function startOverLearnModule(moduleId) {
  return async dispatch => {
    dispatch({
      type: START_OVER_LEARN_MODULE
    });
    
    const learnModule = await fetchLearnModuleApi(moduleId);
    dispatch({
      type: FETCH_LEARN_MODULE,
      data: learnModule._id
    });
    
    const round = await fetchLearnRoundByModuleIddApi(learnModule._id);
    dispatch({
      type: FETCH_LEARN_ROUND,
      data: round
    });

    const { learnCard, options } = await fetchLearnCardApi(round._id);

    dispatch({
      type: FETCH_LEARN_CARD,
      data: {
        card: learnCard,
        options: options,
        value: learnCard.value
      }
    });
  }
}

export function unknowAnswer(cardId) {
  return async dispatch => {
    dispatch({
      type: UNKNOW_LEARN_CARD
    });

    await checkLearnWriteCardApi(cardId, false);
  }
}

export function fetchVisitedModules() {
  return async dispatch => {
    const modules = await fetchVisitedModulesApi();
    
    console.log('fetchVisitedModules modules -->', modules);

    dispatch({
      type: FETCH_VISITED_MODULES,
      data: modules
    });
  }
}