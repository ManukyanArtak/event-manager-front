import axios from "axios";
import { getStorage, setStorage } from "../../../utils/storage";
import { ROUTES } from "../../../constants/routes";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = getStorage("accessToken");
    config.headers.set("Authorization", `Bearer ${accessToken}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getStorage("refreshToken");
        const response = await axios.post("/api/refresh-token", {
          refreshToken,
        });
        const { token } = response.data;

        setStorage("accessToken", token);

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        window.location.replace(ROUTES.Login);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
