import { $authHost, $host } from './index';
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'

export const registerApi = async (login, password) => {
  const { data } = await $host.post('api/user/registration', { login, password });
  Cookies.set('token', data.token);
  return jwt_decode(data.token);
}

export const loginApi = async (login, password) => {
  const { data } = await $host.post('api/user/login', { login, password });
  Cookies.set('token', data.token);
  return jwt_decode(data.token);
}

export const checkApi = async () => {
  const { data } = await $authHost.get('api/user/auth');
  Cookies.set('token', data.token);
  return jwt_decode(data.token);
}