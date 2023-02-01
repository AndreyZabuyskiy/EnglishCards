import { $authHost } from "./index";

export const fetchTestModuleApi = async (id) => {
  const { data } = await $authHost.get(`http://localhost:5000/api/test-module/${id}`);
  return data;
}

export const checkTestModuleApi = async (moduleId, testModule) => {
  const { data } = await $authHost.post(`http://localhost:5000/api/test-module/${moduleId}`, testModule);
  return data;
}