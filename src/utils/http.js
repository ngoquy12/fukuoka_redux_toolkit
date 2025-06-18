import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZXZhbnRhbUBnbWFpbC5jb20iLCJpYXQiOjE3NTAwNzkyMjQsImV4cCI6MjY1MDA3OTIyNH0.aRNkcN9qIIiB2f6AX_5HEoCpGFvZ2m_ywwEt1VkNiqk",
  },
});

export default axiosInstance;
