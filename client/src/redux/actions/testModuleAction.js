import { fetchTestModuleApi } from "../../http/testModule"
import { GET_TEST_MODULE } from "../types";

export function getTestModule(moduleId) {
  return async dispatch => {
    const response = await fetchTestModuleApi(moduleId);
    
    dispatch({
      type: GET_TEST_MODULE,
      payload: response
    });
  }
}