import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let accessToken = "";

export function setAccessToken(newAccessToken: string) {
  accessToken = newAccessToken;
}

axiosInstance.interceptors.request.use((config: any) => {
  if (!config.headers.authorization && accessToken) {
    config.headers.authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    const prevRequest = error.config;

    if (
      error.response?.status === 403 &&
      !prevRequest.sent &&
      !prevRequest.url?.includes("/auth/refreshTokens")
    ) {
      try {
        const response = await axiosInstance.get("/auth/refreshTokens");
        const newAccessToken = response.data.data.accessToken;
        setAccessToken(newAccessToken);
        prevRequest.sent = true;
        prevRequest.headers.authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(prevRequest);
      } catch (refreshError) {
        // Если обновление токена не удалось, перенаправляем на страницу авторизации
        window.location.href = "/auth";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
