import { $authHost } from "./index";

export const fetchLearnModulesApi = async (moduleId) => {  
  try {
    const data = await $authHost.get(`api/learn-module/${moduleId}`);
    return data;
  } catch (e) {
    console.log(e.message);
  }
}

export const checkAnswerApi = async (cardId, answer) => {
  try {
    const data = await $authHost.post(`api/learn-module/check-card/${cardId}`, { answer });
    return data;
  } catch (e) {
    console.log(e.message);
  }
}

export const getResultModuleApi = async (moduleId) => {
  try {
    const response = await $authHost.get(`api/learn-module/write-module/${moduleId}`);
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
}

export const removeLearnModuleApi = async (moduleId) => {
  try {
    const response = await $authHost.get(`api/learn-module/remove-module/${moduleId}`);
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
}