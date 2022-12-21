import axios from "axios";
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
  console.log('removeFileApi img -->', img);
  
  try {
    const { data } = await $authHost.delete(`api/module/remove-image/${img}`);
    return data;
  } catch (e) {
    console.log(e.message)
  }
}

export const fetchImagesApi = async (searchQuery) => {
  try {
    const key = 'y0nalq7ojG9Rvm75ByY5vYuNeSjsXjU9h7oW6oQ5opc'
    const { data } = await axios.get(`https://api.unsplash.com/search/photos?client_id=${key}&page=1&query=${searchQuery}`);

    const urls = [];
    data.results.forEach(img => {
      urls.push(img.urls.regular);
    });
    
    return urls;
  } catch (e) {
    console.log(e.message);
  }
}