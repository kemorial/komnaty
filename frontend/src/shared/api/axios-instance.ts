import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  timeout: 30000,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
