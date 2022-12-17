import { GET_RESULT_MODULE } from "../types";

const inititalState = {
  module: null,
  cards: null
}

export const resultModuleReducer = (state = inititalState, action) => {
  console.log('resultModuleReducer action.data -->', action.action);
  switch (action.type) {
    case GET_RESULT_MODULE:
      return {
        ...state,
        module: action.action.writeModule,
        cards: action.action.cards
      }

    default:
      return state;
  }
}