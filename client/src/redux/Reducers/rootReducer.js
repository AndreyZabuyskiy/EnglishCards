import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { moduleReducer } from "./moduleReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  module: moduleReducer
});