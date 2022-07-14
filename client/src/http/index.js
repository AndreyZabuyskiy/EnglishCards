import axios from 'axios';
import { REACT_APP_API_URL } from './baseUrl';
import Cookies from 'js-cookie'

const $host = axios.create({
  baseURL: REACT_APP_API_URL
});

const $authHost = axios.create({
  baseURL: REACT_APP_API_URL
});

const authInterceptor = config => {
  config.headers.authorization = `Bearer ${Cookies.get('token')}`
  return config;
}

$authHost.interceptors.request.use(authInterceptor);

export {
  $host,
  $authHost
}