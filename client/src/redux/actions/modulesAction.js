import { FETCH_MODULES, FETCH_VISITED_MODULES } from "../types";
import { fetchModulesApi, fetchVisitedModulesApi } from "../../http/modulesApi";

export function fetchModules() {
  return async dispatch => {
    const response = await fetchModulesApi();
    
    dispatch({
      type: FETCH_MODULES,
      data: response
    });
  }
}

export function fetchVisitedModules() {
  return async dispatch => {
    const modules = await fetchVisitedModulesApi();
    
    dispatch({
      type: FETCH_VISITED_MODULES,
      data: modules
    });
  }
}