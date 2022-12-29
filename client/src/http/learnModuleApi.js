import { $authHost } from './index';

export const fetchLearnModuleApi = async (id) => {
  const { data } = await $authHost.get(`api/learn-module/${id}`);
  return data;
}