import axios from "axios";

export const MAP_SERVICE_API_KEY = "L1V7oYaAoswTHnKhMMJ8";
export const BASE_URL = "https://citycare-api.dicoding.dev/v1";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:9000",
});
