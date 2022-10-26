import { FETCH_MODULES, CREATE_MODULE, UPDATE_MODULE } from "../types";

const initialState = {
  modules: [],
  isCreateModule: false
}

export const modulesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MODULES:
      console.log('modulesReducer --> ', action.data.modules);
      return {
        ...state,
        modules: action.data.modules
      }

      case CREATE_MODULE:
        return {
          ...state
      }
    
    case UPDATE_MODULE:
      return {
        ...state
      }
    
    default:
      return state;
  }
}