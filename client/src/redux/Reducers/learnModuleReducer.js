import { FETCH_LEARN_MODULE } from "../types";

const inititalState = {
  module: null,
  cards: null,
  index: 0
}

export const learnModuleReducer = (state = inititalState, action) => {
  switch (action.type) {
    case FETCH_LEARN_MODULE:
      return {
        ...state,
        module: action.data.writeModule,
        cards: action.data.cards
      }

    default:
      return state;
  }
}