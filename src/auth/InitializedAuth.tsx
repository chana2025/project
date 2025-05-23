import { useAppDispatch } from "../redux/store"
import { useEffect } from "react"
import { getSession, isValidToken, setSession } from "./auth.utils"
import { RoleType } from "../types/user.types"
import { setAuth, setInitialized } from "../redux/auth/auth.slice"

const InitializedAuth = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const initialized = async () => {
            const token = getSession()
            if (token && isValidToken(token)) {
                // לבצע קריאת שרת המקבלת את פרטי המשתמש לפי token
                setTimeout(() => {
                    setSession(token)
                    const user = {
                        id: 1,
                        name: 'shifra',
                        role: RoleType.Admin,
                        phone: '0534146743',
                        email: 's46743m@gmail.com',
                        address: '',
                    }
                    dispatch(setAuth(user))
                }, 100)
            }
            else {
                dispatch(setInitialized())
            }
        }
        initialized()
    }, [])

    return null
}

export default InitializedAuth