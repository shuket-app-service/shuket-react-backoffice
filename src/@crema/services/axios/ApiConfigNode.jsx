import axios from 'axios'
import { initialBackendNode } from '../../constants/AppConst';

const apiAuthNode = axios.create({
  baseURL: initialBackendNode,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
},
});
apiAuthNode.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('token'));
    config.headers.Authorization = `Bearer ${token}`;
    return config;

   } ,
    (error) => {
      return Promise.reject(error);
    }
);
export default apiAuthNode;


