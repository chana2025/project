import axios, { AxiosResponse, AxiosError } from "axios";
import { removeSession } from "../auth/auth.utils";
import { WeeklyTracking } from "../types/weeklyTracking.types";

const baseURL = "https://localhost:7091";

const axiosInstance = axios.create({ baseURL });

// הוספת interceptor לטיפול בשגיאות 401 (Unauthorized)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      removeSession();
      // אפשרות להפניה לדף כניסה:
      // window.location.href = '/auth/login'
    }
    return Promise.reject(error);
  }
);

// הוספת טוקן ל־header בכל בקשה
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// קריאה לקבלת כל רשומות המעקב של לקוח ספציפי (custId בפרמטר query)
export const getTrackingDataByCustomer = async (custId: number): Promise<WeeklyTracking[]> => {
  const res = await axiosInstance.get("/api/WeeklyTracking", {
    params: { custId },
  });
  return res.data;
};

// הוספת רשומה חדשה
export const addTrackingEntry = async (data: WeeklyTracking): Promise<WeeklyTracking> => {
  const res = await axiosInstance.post("/api/WeeklyTracking", data);
  return res.data;
};

export default axiosInstance;
