import { FETCH_MODULE } from "../types";
import { fetchModuleByIdApi } from "../../http/moduleApi";

export function fetchModuleById(id) {
  return async dispatch => {
    const response = await fetchModuleByIdApi(id);
    
    dispatch({
      type: FETCH_MODULE,
      data: response.data
    });
  }
}