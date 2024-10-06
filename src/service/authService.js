import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_URL}`
    },
    withCredentials: true
});

export const signup = async (userData) => {
  return axiosInstance.post(`/users/signup`, userData);
};

export const login = async (loginData) => {
  return axiosInstance.post(`/users/signin`, loginData);
};

export const refreshToken = async () => {
  return axiosInstance.get(`/users/refresh`, {
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
