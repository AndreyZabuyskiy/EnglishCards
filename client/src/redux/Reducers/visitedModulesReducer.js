import { FETCH_VISITED_MODULES } from "../types";

const initialState = {
  modules: []
}

export const visitedModulesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VISITED_MODULES:
      return {
        ...state,
        modules: action.data
      }
    
    default:
      return state;
  }
}