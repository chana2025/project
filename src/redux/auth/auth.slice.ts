import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { customer } from "../../types/customer.types";


type AuthStateType = {
    isAuthorized: boolean,
    isInitialized: boolean,
    user: customer | null
}

const initialState: AuthStateType = {
    isAuthorized: false,
    isInitialized: false,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<customer>) => {

            state.user = action.payload
            state.isAuthorized = true // האם למשתמש יש הרשאות
            state.isInitialized = true // האם כבר בדקנו את ההרשאות של המשתמש
        },
        setInitialized: (state) => {
            state.isInitialized = true

        },
    }
})

export const { setAuth, setInitialized } = authSlice.actions

export default authSlice.reducer