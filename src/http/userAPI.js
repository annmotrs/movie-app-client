import { $host, $authHost } from './index.js';
import { jwtDecode } from 'jwt-decode';

export const registration = async (userData) => {
  const { data } = await $host.post('api/user/registration', { ...userData });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', { email, password });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const checkAuth = async () => {
  const { data } = await $authHost.get('api/user/auth');
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const checkEmail = async (email) => {
  const { data } = await $host.post('api/user/check_email', { email });
  return data;
};

export const checkNickname = async (nickname) => {
  const { data } = await $host.post('api/user/check_nickname', { nickname });
  return data;
};

export const updateDataUser = async (userData) => {
  const { data } = await $host.put('api/user/', { ...userData });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};
