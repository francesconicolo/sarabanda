import axios from 'axios';

// Set config defaults when creating the instance
export const Axios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});
