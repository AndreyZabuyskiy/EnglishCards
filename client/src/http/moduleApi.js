import { $host, $authHost } from "./index";

export const fetchModuleByIdApi = async (id) => {
  const { data } = await $host.get(`api/module/${id}`);
  return data;
}

export const createModuleApi = async (module) => {
  try {
    const { data } = await $authHost.post('api/module/', module);
    return data;
  } catch(e) {
    console.log(e.message);
  }
}