import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:9000",
});

export const mlAxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export const MAP_SERVICE_API_KEY = "t4KoKVORHKjBl7Y8myEK";
export const BASE_URL = "https://citycare-api.dicoding.dev/v1";
