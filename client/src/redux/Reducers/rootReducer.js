import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { modulesReducer } from "./modulesReducer";
import { moduleReducer } from "./moduleReducer";
import { writeModuleReducer } from "./writeModuleReducer";

export const rootReducer = combineReducers({
  authReducer,
  modulesReducer,
  moduleReducer,
  writeModuleReducer
});