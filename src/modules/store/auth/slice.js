import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Login, resetAccount } from "./thunk";
import { PURGE } from "redux-persist";
import { switchAccount } from "./thunk";


const initialState = {
  isLoading: false,
  error: null,
  token:"",
  isAuthenticated: false,
  user: undefined
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    Logout: (state, action) => {
        state.token = "";
        state.user = undefined
        state.isAuthenticated = false;
        state.isLoading = false
        state.error = null
        localStorage.removeItem("token")
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Login.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = {...action.payload.data, role_list : ['admin', 'user']}
        state.token= action.payload.data.token
        localStorage.setItem('token', JSON.stringify(action.payload.data.token));
        state.isLoading = false;
      })
      .addCase(switchAccount.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = {...action.payload.data, role_list : ['user']}
        state.token= action.payload.data.token
        localStorage.setItem('token', JSON.stringify(action.payload.data.token));
        state.isLoading = false;
      })
      .addCase(resetAccount.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = {...action.payload.data, role_list : ['admin', 'user']}
        state.token= action.payload.data.token
        localStorage.setItem('token', JSON.stringify(action.payload.data.token));
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          Login.pending,
          switchAccount.pending,
          resetAccount.pending
        ),
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          Login.rejected,
          switchAccount.rejected,
          resetAccount.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.error
        }
      )
  },
});

export const {
    Logout
  } = authSlice.actions;
  
export default authSlice.reducer;