import axios from 'axios';

export const customAPI = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});
