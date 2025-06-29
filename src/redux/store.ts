import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./products/product.slice";
import authSlice from "./auth/auth.slice";
import dietsReducer from "../redux/diets/Diet.slice";

import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    products: productSlice,
    auth: authSlice,
    diets: dietsReducer, // ✅ מחובר מצוין
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
