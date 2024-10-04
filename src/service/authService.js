import axios from 'axios';

const API_URL = '/users';

export const signup = async (userData) => {
  return axios.post(`${API_URL}/signup`, userData);
};

export const login = async (loginData) => {
  return axios.post(`${API_URL}/signin`, loginData);
};

export const refreshToken = async () => {
  return axios.get(`${API_URL}/refresh`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};
