import axios from "axios";

const baseURL =
  (import.meta.env as any).VITE_API_URL ||
  "http://localhost:3000/api/v1/rent-cars";

console.log("🚀 Production API URL:", baseURL);
console.log("🚀 All env vars:", import.meta.env);
console.log("🌍 NODE_ENV:", import.meta.env.MODE);

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default apiClient;
