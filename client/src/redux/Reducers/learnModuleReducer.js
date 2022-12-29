import { FETCH_LEARN_MODULE, SHOW_RESULT_LEARN_MODULE } from "../types";

const initialState = {
  learnModuleId: null,
  isDone: false
}

export const learnModuleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEARN_MODULE:
      return {
        ...state,
        learnModuleId: action.data
      }

    case SHOW_RESULT_LEARN_MODULE:
      return {
        ...state,
        isDone: true
      }
    
    default:
      return state;
  }
}