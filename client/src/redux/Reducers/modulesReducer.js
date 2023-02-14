import { FETCH_MODULES, FETCH_MODULES_ON, FETCH_MODULES_OFF } from "../types";

const initialState = {
  modules: null,
  isLoadModules: false,
  messageErrorLoad: null,
  isCreateModule: false
}

export const modulesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MODULES:
      return {
        ...state,
        isLoadModules: false,
      }
    
    case FETCH_MODULES_ON:
      return {
        ...state,
        modules: action.payload,
        isLoadModules: true
      }
    
    case FETCH_MODULES_OFF:
      return {
        ...state,
        modules: null,
        isLoadModules: true,
        messageErrorLoad: action.payload
      }
    
    default:
      return state;
  }
}