import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await api.post("/auth/refresh-token");
          const { token } = response.data;

          localStorage.setItem("authToken", token);
          originalRequest.headers.Authorization = `Bearer ${token}`;

          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export const authAPI = {
  firebaseLogin: (firebaseData) => api.post("/v1/auth/firebase", firebaseData),
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  refreshToken: () => api.post("/auth/refresh-token"),
  getProfile: () => api.get("/auth/profile"),
  logout: () => api.post("/auth/logout"),
};

export default api;
