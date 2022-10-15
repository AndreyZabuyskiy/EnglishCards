import { $host, $authHost } from "./index";

export const fetchModuleByIdApi = async (id) => {
  const { data } = await $host.get(`api/module/${id}`);
  return data;
}

export const createModuleApi = async (module) => {
  try {
    const { data } = await $authHost.post('api/module/', module);
    return data;
  } catch(e) {
    console.log(e.message);
  }
}

export const updateModuleApi = async (id, module) => {
  try {
    const { data } = await $authHost.patch(`api/module/${id}`, module);
    return data;
  } catch(e) {
    console.log(e.message);
  }
}

export const uploadFileApi = async (img) => {
  try {
    const formData = new FormData();
    const file = img;
    formData.append('image', file);
    const { data } = await $authHost.post('api/module/upload-image', formData);
    return data;
  } catch (e) {
    console.log(e.message)
  }
}

export const removeFileApi = async (img) => {
  try {
    const { data } = await $authHost.delete(`api/module/remove-image/${img}`);
    return data;
  } catch (e) {
    console.log(e.message)
  }
}