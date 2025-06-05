import { useAppDispatch } from "../redux/store"
import { useEffect } from "react"
import { getSession, isValidToken, setSession } from "./auth.utils"
import { customer, eGender, eRole } from "../types/customer.types"
//import { setAuth, setInitialized } from "../redux/auth/auth.slice"

const InitializedAuth = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const initialized = async () => {
            const token = getSession()
            if (token && isValidToken(token)) {
                // לבצע קריאת שרת המקבלת את פרטי המשתמש לפי token
                setTimeout(() => {
                    setSession(token)
                    const user: customer = {
    CustomerId: 1,
    FullName: 'shifra',
    Gender: eGender.FEMAIL,
    Phone: '0534146743',
    Email: 's46743m@gmail.com',
    Heigth: 160,
    Weigth: '60',
    Password: '',
    DietId: 1,
    Role: eRole.ADMIN,
    ImageUrl: ''
}

                    //dispatch(setAuth(user))
                }, 100)
            }
            else {
                //dispatch(setInitialized())
            }
        }
        initialized()
    }, [])

    return null
}

export default InitializedAuth