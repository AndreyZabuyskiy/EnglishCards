import { FETCH_MODULES, CREATE_MODULE } from "../types";

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

      case CREATE_MODULE:
        console.log('modules reducer --> ', action.data);
        return {
          ...state
        }
    
    default:
      return state;
  }
}