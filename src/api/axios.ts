import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});


export const setAccessToken = (token: string | null) => {
    if (token) {
        localStorage.setItem("accessToken", token);
    }
    else {
        localStorage.removeItem("accessToken");
    }
};

export const setRefreshToken = (token: string | null) => {
    if (token) {
        localStorage.setItem("refreshToken", token);
    }
    else {
        localStorage.removeItem("refreshToken");
    }
};

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest.__isRetryRequest) {
      originalRequest.__isRetryRequest = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await api.post("/auth/refresh", {
            refreshToken,
            expiresInMins: 15,
        });
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);
        setRefreshToken(null);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
