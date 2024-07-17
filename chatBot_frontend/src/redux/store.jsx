import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './slice/authSlice.jsx'

export const store = configureStore({
    reducer: {
        auth: AuthSlice
    },
});