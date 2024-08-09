import axios from "axios";
import { jwtDecode } from "jwt-decode";
const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor to include JWT and CSRF tokens
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

    if (token) {
      const currentTime = new Date();

      const decoded = jwtDecode(token);
      console.log("Decoded JWT:", decoded);
      if (decoded.exp * 1000 < currentTime.getTime()) {
        console.log("expire");
      } else {
        console.log("not expore");
      }

      config.headers.Authorization = `Bearer ${token}`;
    } else {
      return Promise.reject("Unauthticated");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
