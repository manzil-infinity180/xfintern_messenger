import {createSlice} from '@reduxjs/toolkit'

const initialAuthState = {
    isAuthenticated: false,
    loading: false,
    user: null
};

const authSlice = createSlice({
    name:"authSlice",
    initialState: initialAuthState,
    reducers:{
        loginSucess : (state,action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        loginFailed: (state, action) => {
            state.isAuthenticated = false;
        }
    }
});

export const {
    loginFailed,
    loginSucess
} = authSlice.actions;
export default authSlice.reducer;