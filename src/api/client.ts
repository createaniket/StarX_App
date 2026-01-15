import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@env";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// ✅ Attach token automatically from storage
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    // ✅ optional: debug
    console.log("API Request:", config.method?.toUpperCase(), config.url);

    return config;
  },
  (error) => Promise.reject(error)
);
