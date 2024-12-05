import axios from "axios";
import { getValueFor } from "./secureStore";
import { useTokenStore } from "../store/auth";

const apiClient = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/secure`,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;
  if (token) {
    config.headers.token = token;
  }
  return config;
});

export default apiClient;
