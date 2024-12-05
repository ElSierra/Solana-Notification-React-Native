import axios from "axios";
import { getValueFor } from "./secureStore";
import { useTokenStore } from "../store/auth";

const apiClient = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/secure`,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token =
      useTokenStore.getState().token || (await getValueFor("token")); // Fallback to SecureStore
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
