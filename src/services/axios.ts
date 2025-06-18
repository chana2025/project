import axios, { AxiosResponse, AxiosError } from "axios"
import { removeSession } from "../auth/auth.utils"

const baseURL = 'https://localhost:7091/api'

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

export default axiosInstance




