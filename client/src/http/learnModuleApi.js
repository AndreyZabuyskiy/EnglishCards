import { $authHost } from "./index";

export const fetchLearnModulesApi = async (moduleId) => {
  console.log('fetchLearnModulesApi moduleId --> ', moduleId);
  
  try {
    const data = await $authHost.get(`api/learn-module/${moduleId}`);
    console.log('fetchLearnModules data --> ', data);
    return data;
  } catch (e) {
    console.log(e.message);
  }
}