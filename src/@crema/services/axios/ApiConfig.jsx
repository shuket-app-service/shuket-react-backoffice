import axios from "axios";
import { initialBackend } from "../../constants/AppConst";
import history from "../../hooks/useHistory";

const apiAuth = axios.create({
   baseURL: initialBackend,
   timeout: 5000,
   headers: {
      "Content-Type": "application/json",
   },
});
apiAuth.interceptors.request.use(
   (config) => {
      const token = JSON.parse(localStorage.getItem("token"));
      console.log("token ===> ", token);
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      } else {
         localStorage.clear();
         history.navigate("/signin");
         history.navigate(0);
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);
apiAuth.interceptors.response.use(
   (response) => {
      return response;
   },
   (error) => {
      if (error.response && error.response.status === 401) {
         localStorage.clear();
         history.navigate("/signin");
         history.navigate(0);

      }
      return Promise.reject(error);
   }
);

export default apiAuth;
