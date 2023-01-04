import { FETCH_LEARN_MODULE, FETCH_LEARN_ROUND, SHOW_RESULT_LEARN_MODULE } from "../types";

const initialState = {
  learnModuleId: null,
  isDone: false,
  round: null
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
    
    default:
      return state;
  }
}