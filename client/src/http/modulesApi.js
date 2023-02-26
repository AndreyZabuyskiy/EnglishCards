import { $authHost } from './index';

export const fetchModulesApi = async () => {
  const { data } = await $authHost.get('api/module/');
  return data;
}

export const fetchVisitedModulesApi = async () => {
  const { data } = await $authHost.post('api/module/visited-modules');
  return data;
}

export const deleteModuleByIdApi = async (id) => {
  const { data } = await $authHost.delete(`api/module/${id}`);
  return data;
}