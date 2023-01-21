import { CREATE_MODULE, UPDATE_MODULE, CREATE_MODULE_REDUCER_CLEAR } from "../types"

const initialState = {
  isCreateOrUpdateModule: false,
  newModuleId: null
}

export const createModuleReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MODULE:
      return {
        ...state,
        isCreateOrUpdateModule: true,
        newModuleId: action.data
      }
    
    case UPDATE_MODULE:
      return {
        ...state,
        isCreateOrUpdateModule: true,
        newModuleId: action.data
      }
    
    case CREATE_MODULE_REDUCER_CLEAR: {
      return {
        ...state,
        isCreateOrUpdateModule: false,
        newModuleId: null
      }
    }
    
    default:
      return state;
  }
}