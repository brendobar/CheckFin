import { configureStore } from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector, useStore} from "react-redux";
import {apiSlice} from "@/shared/redux/appApi";
import {tablesSlice} from "@/widgets/tables/api/tablesSlice";
import {userSlice} from "@/entities/user/api/userSlice";
import {operationSlice} from "@/entities/operation/api/operationSlice";
import {categorySlice} from "@/entities/сategory/api/categorySlice";


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        user: userSlice.reducer,
        tables: tablesSlice.reducer,
        operation: operationSlice.reducer,
        category: categorySlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware)
});


export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppStore = typeof store

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore