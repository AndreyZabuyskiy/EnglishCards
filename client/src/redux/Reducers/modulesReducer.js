import { FETCH_MODULES, FETCH_MODULES_ON, FETCH_MODULES_OFF, DELETE_MODULE } from "../types";

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
    
    case DELETE_MODULE:
      const newModules = deleteModuleById(state.modules, action.payload);
      return {
        ...state,
        modules: newModules
      }
    
    default:
      return state;
  }
}

function deleteModuleById(modules, moduleId) {
  modules.forEach(group => {
    const moduleIndex = group.data.findIndex(module => module._id === moduleId);

    if (moduleIndex !== -1) {
      const moduleOne = group.data.slice(0, moduleIndex)
      const moduleTwo = group.data.slice(moduleIndex + 1);

      group.data = [...moduleOne, ...moduleTwo];
    }
  });

  return [...modules];
}