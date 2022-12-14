import { $authHost } from "./index";

export const fetchLearnModulesApi = async (moduleId) => {  
  try {
    const data = await $authHost.get(`api/learn-module/${moduleId}`);
    return data;
  } catch (e) {
    console.log(e.message);
  }
}