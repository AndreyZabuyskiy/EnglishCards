import { $host, $authHost } from "./index";

export const fetchModuleByIdApi = async (id) => {
  const { data } = await $host.get(`api/module/${id}`);
  return data;
}

export const createModuleApi = async (module) => {
  try {
    console.log('create module api --> ', module);
    const { data } = await $authHost.post('api/module/', module);
    console.log('response --> ', data);
    return data;
  } catch(e) {
    console.log(e.message);
  }
}