import axios from "axios";

console.log('=== API CLIENT DEBUG ===');
console.log('VITE_API_URL from env:', import.meta.env.VITE_API_URL);
console.log('All import.meta.env:', import.meta.env);

const baseURL =
  (import.meta.env as any).VITE_API_URL ||
  "http://localhost:3000/api/v1/rent-cars";

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default apiClient;
