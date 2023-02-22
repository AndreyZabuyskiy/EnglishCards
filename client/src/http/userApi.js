import { $authHost, $host } from './index';

export const registerApi = async (email, password) => {
  const { data } = await $authHost.post('api/user/registration', { email, password });
  localStorage.setItem('token', data.accessToken);
  return data.user;
}

export const loginApi = async (email, password) => {
  const { data } = await $authHost.post('api/user/login', { email, password });
  localStorage.setItem('token', data.accessToken);
  return data.user;
}

export const logoutApi = async () => {
  await $host.post('api/user/logout');
}

export const checkApi = async () => {
  const { data } = await $host.get('/api/user/refresh');
  localStorage.setItem('token', data.accessToken);
  return data.user;
}