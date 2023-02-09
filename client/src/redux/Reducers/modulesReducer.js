import { FETCH_MODULES } from "../types";

const initialState = {
  modules: [],
  isCreateModule: false
}

export const modulesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MODULES:
      return {
        ...state,
        modules: action.data
      }
    
    default:
      return state;
  }
}