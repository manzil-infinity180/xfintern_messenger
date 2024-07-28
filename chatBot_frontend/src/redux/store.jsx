import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './slice/authSlice.jsx';
import GroupSlice from './slice/groupSlice.jsx';

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        group: GroupSlice
    },
});