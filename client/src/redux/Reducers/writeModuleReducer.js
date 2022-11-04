import { FETCH_WRITE_MODULES } from "../types";

const initialState = {
  modules: null
}

export const writeModuleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WRITE_MODULES: {
      return {
        ...state,
        modules: action
      }
    }
      
    default:
      return state;
  }
}