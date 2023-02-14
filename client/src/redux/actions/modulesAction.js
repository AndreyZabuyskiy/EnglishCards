import { FETCH_MODULES, FETCH_VISITED_MODULES, FETCH_MODULES_ON, FETCH_MODULES_OFF } from "../types";
import { fetchModulesApi, fetchVisitedModulesApi } from "../../http/modulesApi";

export function fetchModules() {
  return async dispatch => {
    try {
      dispatch({
        type: FETCH_MODULES
      });

      const response = await fetchModulesApi();

      dispatch({
        type: FETCH_MODULES_ON,
        payload: response
      });
    } catch (err) {
      dispatch({
        type: FETCH_MODULES_OFF,
        payload: err.message
      });
    }
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