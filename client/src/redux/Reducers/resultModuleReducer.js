import { GET_RESULT_MODULE, REMOVE_LEARN_MODULE } from "../types";

const inititalState = {
  module: null,
  cards: null
}

export const resultModuleReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GET_RESULT_MODULE:
      return {
        ...state,
        module: action.action.writeModule,
        cards: action.action.cards
      }
    
    case REMOVE_LEARN_MODULE: {
      return {
        ...state,
        module: null,
        cards: null
      }
    }

    default:
      return state;
  }
}