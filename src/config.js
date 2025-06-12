import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://adasampah-backend3-production.up.railway.app",
});

export const mlAxiosInstance = axios.create({
  baseURL: "https://adasampah-ml-be-production.up.railway.app",
});

export const MAP_SERVICE_API_KEY = import.meta.env.VITE_MAP_SERVICE_API_KEY;
