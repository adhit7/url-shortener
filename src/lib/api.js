import axios from 'axios';

const INTERNAL_SERVER_ERROR = 'Something went wrong, please try again later.';
const api = axios.create({
  baseURL: 'https://trimmr.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;
export { INTERNAL_SERVER_ERROR };
