import axios from 'axios'
import { initialBackend } from '../../constants/AppConst';

const apiAuth = axios.create({
  baseURL: initialBackend,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
},
});
apiAuth.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('token'));
    config.headers.Authorization = `Bearer ${token}`;
    return config;

   } ,
    (error) => {
      return Promise.reject(error);
    }
);
export default apiAuth;


