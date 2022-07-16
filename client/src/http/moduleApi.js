import { $host } from "./index";

export const fetchModuleByIdApi = async (id) => {
  const { data } = await $host.get(`api/module/${id}`);
  return data;
}