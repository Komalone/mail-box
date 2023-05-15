import {createSlice} from '@reduxjs/toolkit';

const initialState= {
    isUserLogin: !!localStorage.getItem("email"),
    token: localStorage.getItem('token'),
    email: localStorage.getItem('email'),
    isRead: false
}

const authSlice= createSlice({
    name:'auth',
    initialState: initialState,
    reducers:{
        login(state, action){
            state.isUserLogin= true;
            state.token= action.payload.token;
            state.email= action.payload.email;
            localStorage.setItem("token", state.token);
            localStorage.setItem("email", state.email);
        },
        logout(state){
            state.isUserLogin= false;
            localStorage.removeItem("token");
            localStorage.removeItem("email");
        },
        openReadMassage(state){
            state.isRead=true;
        },
        closeReadMassage(state){
            state.isRead=false;
        }
    }
})

export const authAction= authSlice.actions;
export default authSlice.reducer;