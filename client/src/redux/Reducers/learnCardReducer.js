import { FETCH_LEARN_CARD } from "../types";

const initialState = {
  card: null
}

export const learnCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEARN_CARD:
      return {
        ...state,
        card: action.data
      }
    
    default:
      return state;
  }
}