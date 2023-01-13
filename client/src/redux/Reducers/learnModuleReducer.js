import { FETCH_LEARN_MODULE, FETCH_LEARN_ROUND, SHOW_RESULT_LEARN_MODULE, LEARN_ROUND_DONE, LEARN_MODULE_DONE, START_OVER_LEARN_MODULE } from "../types";

const initialState = {
  learnModuleId: null,
  isLearnModuleDone: true,
  isLearnRoundDone: false,
  round: null,
  resultRound: null
}

export const learnModuleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEARN_MODULE:
      return {
        ...state,
        learnModuleId: action.data,
        isLearnModuleDone: false,
        isLearnRoundDone: false,
        round: null,
        resultRound: null,
        countLearnedCards: 0
      }
    
    case FETCH_LEARN_ROUND:
      return {
        ...state,
        round: action.data
      }

    case SHOW_RESULT_LEARN_MODULE:
      return {
        ...state,
        isDone: true,
        round: null
      }
    
    case LEARN_ROUND_DONE: {
      return {
        ...state,
        isLearnRoundDone: true,
        resultRound: action.data
      }
    }
      
    case LEARN_MODULE_DONE: {
      return {
        ...state,
        isLearnModuleDone: true,
        isLearnRoundDone: false
      }
    }

    case START_OVER_LEARN_MODULE: {
      return {
        ...state,
        isLearnRoundDone: false
      }
    }
    
    default:
      return state;
  }
}