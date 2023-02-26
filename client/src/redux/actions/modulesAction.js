import { FETCH_MODULES, FETCH_VISITED_MODULES, FETCH_MODULES_ON, FETCH_MODULES_OFF, DELETE_MODULE } from "../types";
import { fetchModulesApi, fetchVisitedModulesApi, deleteModuleByIdApi } from "../../http/modulesApi";

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

export function deleteModuleById(id) {
  return async dispatch => {
    await deleteModuleByIdApi(id);

    dispatch({
      type: DELETE_MODULE,
      payload: id
    });
  }
}