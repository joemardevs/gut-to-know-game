import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    error: null,
    isLoading: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: state => {
            state.isLoading = true;
        },
        signInSuccess: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        signUpStart: state => {
            state.isLoading = true;
        },
        signUpSuccess: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        signUpFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        signOutStart: state => {
            state.isLoading = true;
        },
        signOutSuccess: state => {
            state.user = null;
            state.isLoading = false;
            state.error = null;
        },
        signOutFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
})

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    signUpStart,
    signUpSuccess,
    signUpFailure,
    signOutStart,
    signOutSuccess,
    signOutFailure,
} = userSlice.actions;

export default userSlice.reducer;