import { FETCH_LEARN_MODULE, FETCH_LEARN_ROUND, SHOW_RESULT_LEARN_MODULE, LEARN_ROUND_DONE } from "../types";

const initialState = {
  learnModuleId: null,
  isLearnModuleDone: false,
  isLearnRoundDone: false,
  round: null,
  resultRound: null
}

export const learnModuleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEARN_MODULE:
      return {
        ...state,
        learnModuleId: action.data
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
      console.log('LEARN_ROUND_DONE action.data -->', action.data);
      return {
        ...state,
        isLearnRoundDone: true,
        resultRound: action.data
      }
    }
    
    default:
      return state;
  }
}