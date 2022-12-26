import { $authHost } from "./index";

export const fetchWriteModulesApi = async (moduleId) => {  
  try {
    const data = await $authHost.get(`api/write-module/${moduleId}`);
    return data;
  } catch (e) {
    console.log(e.message);
  }
}

export const checkWriteCardAnswerApi = async (cardId, answer) => {
  try {
    const data = await $authHost.post(`api/write-module/check-card/${cardId}`, { answer });
    return data;
  } catch (e) {
    console.log(e.message);
  }
}

export const getResultWriteModuleApi = async (moduleId) => {
  try {
    const response = await $authHost.get(`api/write-module/write-module/${moduleId}`);
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
}

export const removeWriteModuleApi = async (moduleId) => {
  try {
    const response = await $authHost.get(`api/write-module/remove-module/${moduleId}`);
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
}