import axios from "axios";

export const MAP_SERVICE_API_KEY = "L1V7oYaAoswTHnKhMMJ8";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:9000",
});
