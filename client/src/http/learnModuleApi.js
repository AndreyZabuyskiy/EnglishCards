import { $authHost } from './index';

export const fetchLearnModuleApi = async (id) => {
  const { data } = await $authHost.get(`api/learn-module/${id}`);
  return data;
}

export const fetchLearnRoundByModuleIddApi = async (id) => {
  const { data } = await $authHost.get(`api/learn-module/get-round-by-module/${id}`);
  return data;
}

export const fetchLearnRoundById = async (id) => {
  const { data } = await $authHost.get(`api/learn-module/get-round/${id}`);
  return data;
}

export const fetchLearnCardApi = async (id) => {
  const { data } = await $authHost.get(`api/learn-module/get-card/${id}`);
  return data;
}

export const checkTestCardApi = async (cardId, optionId) => {
  const { data } = await $authHost.post(`api/learn-module/check-test-card/${cardId}`, { optionId });
  return data;
}

export const getResultRoundApi = async (roundId) => {
  const { data } = await $authHost.get(`api/learn-module/result-round/${roundId}`);
  return data;
}