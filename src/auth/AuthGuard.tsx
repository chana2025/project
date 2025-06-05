import { ReactNode } from "react"
import { Navigate } from "react-router"
import { useAppSelector } from "../redux/store"
import { selectAuth } from "../redux/auth/auth.selector"
import { Paths } from "../routes/paths"
import { eRole } from "../types/customer.types"


type Props = {
    children: ReactNode,
    roles?: eRole[]
}

const AuthGuard = ({ children, roles }: Props) => {
    const { isAuthorized, isInitialized, user } = useAppSelector(selectAuth)

    if (!isInitialized) {
        return <h1>Loading...</h1>
    }

    if (!isAuthorized) {
        return <Navigate to={`/${Paths.auth}/${Paths.login}`} />
    }

    if (roles && roles.length && !roles.includes(user!.Role)) {
        return <h1>unauthorized</h1>
    }



    return <>{children}</>
}

export default AuthGuard