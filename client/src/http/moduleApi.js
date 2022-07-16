import { $authHost } from './index';

export const fetchModulesApi = async () => {
  const { data } = await $authHost.get('api/module/');
  console.log('data -->', data);
  return data;
}


/*
export const registerApi = async (login, password) => {
  const { data } = await $host.post('api/user/registration', { login, password });
  Cookies.set('token', data.token);
  return jwt_decode(data.token);
}
*/