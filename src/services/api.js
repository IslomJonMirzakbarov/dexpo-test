import axios from 'axios';

export const customAPI = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

export const securedAPI = (token) =>
  axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
