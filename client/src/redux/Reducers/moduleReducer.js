import { FETCH_MODULE } from "../types";

const initialState = {
  module: null
}

export const moduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MODULE:
      return {
        ...state,
        module: action.data
      }
    
    default:
      return state;
  }
}