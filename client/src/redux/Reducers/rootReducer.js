import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { modulesReducer } from "./modulesReducer";
import { moduleReducer } from "./moduleReducer";
import { writeModuleReducer } from "./writeModuleReducer";
import { resultModuleReducer } from "./resultModuleReducer";
import { uploadImagesReducer } from "./uploadImagesReducer";
import { learnModuleReducer } from "./learnModuleReducer";
import { learnCardReducer } from "./learnCardReducer";
import { createModuleReducer } from "./createModuleReducer";
import { visitedModulesReducer } from "./visitedModulesReducer";

export const rootReducer = combineReducers({
  authReducer,
  modulesReducer,
  moduleReducer,
  writeModuleReducer,
  resultModuleReducer,
  uploadImagesReducer,
  learnModuleReducer,
  learnCardReducer,
  createModuleReducer,
  visitedModulesReducer
});