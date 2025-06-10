import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://adasampah-backend3-production.up.railway.app",
});

export const mlAxiosInstance = axios.create({
  baseURL: "https://adasampah-ml-be-production.up.railway.app",
});

export const MAP_SERVICE_API_KEY = "t4KoKVORHKjBl7Y8myEK";
export const BASE_URL = "https://citycare-api.dicoding.dev/v1";
