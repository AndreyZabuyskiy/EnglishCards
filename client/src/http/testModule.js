import { $authHost } from "./index";

export const fetchTestModuleApi = async (id) => {
  const { data } = await $authHost.get(`http://localhost:5000/api/test-module/${id}`);
  return data;
}