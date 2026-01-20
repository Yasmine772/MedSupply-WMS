import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  withCredentials: true,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response } = error;

    if (response) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        console.error("Unauthorized: Token removed");
      } else if (response.status === 404) {
        console.error("Resource not found");
      }
    } else {
      console.error("Network error:", error);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
