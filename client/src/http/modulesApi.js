import { $authHost } from './index';

export const fetchModulesApi = async () => {
  const { data } = await $authHost.get('api/module/');
  return data;
}