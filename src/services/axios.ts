import axios, { AxiosResponse, AxiosError } from "axios"
import { removeSession } from "../auth/auth.utils"

const baseURL = "https://localhost:7091"


const axiosInstance = axios.create({ baseURL })

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            removeSession()
            // אפשרות: הפנייה אוטומטית לדף כניסה
            // window.location.href = '/auth/login'
        }
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});


export default axiosInstance




