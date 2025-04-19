import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    // автоматически подставлять токен, если он есть
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  },
});

export default api;