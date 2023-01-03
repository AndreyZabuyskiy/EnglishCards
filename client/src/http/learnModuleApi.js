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
  return data;
}

export const checkTestCardApi = async (cardId, optionId) => {
  const { data } = await $authHost.post(`api/learn-module/check-test-card/${cardId}`, { optionId });
  console.log('checkTestCard data ===>', data);
  return data;
}