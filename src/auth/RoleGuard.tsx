import { ReactNode } from "react"
import { useAppSelector } from "../redux/store"
import { selectAuth } from "../redux/auth/auth.selector"
import { eRole } from "../types/customer.types"
import React from 'react';

type Props = {
    children: ReactNode,
    roles?: eRole[]
}

const RoleGuard = ({ children, roles }: Props) => {
    const { isAuthorized, isInitialized, user } = useAppSelector(selectAuth)


    if (!isInitialized || !isAuthorized || (roles?.length && !roles.includes(user!.Role))) {
        return null
    }

    return <>{children}</>
}

export default RoleGuard