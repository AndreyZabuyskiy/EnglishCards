import { $authHost } from './index';

export const fetchLearnModuleApi = async (id) => {
  const { data } = await $authHost.get(`api/learn-module/${id}`);
  return data;
}

export const fetchLearnRoundApi = async (id) => {
  const { data } = await $authHost.get(`api/learn-module/get-round/${id}`);
  return data;
}

export const fetchLearnCardApi = async (id) => {
  const { data } = await $authHost.get(`api/learn-module/get-card/${id}`);
  console.log('fetchLearnCardApi data -->', data);
  return data;
}