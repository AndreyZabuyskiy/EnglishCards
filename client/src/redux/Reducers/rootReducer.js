import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { modulesReducer } from "./modulesReducer";
import { moduleReducer } from "./moduleReducer";
import { learnModuleReducer } from "./learnModuleReducer";
import { resultModuleReducer } from "./resultModuleReducer";
import { uploadImagesReducer } from "./uploadImagesReducer";


export const rootReducer = combineReducers({
  authReducer,
  modulesReducer,
  moduleReducer,
  learnModuleReducer,
  resultModuleReducer,
  uploadImagesReducer
});