import { createSlice } from "@reduxjs/toolkit";
import { signupUser, loginUser } from "./authAction";

const userToken = sessionStorage.getItem("token")
  ? sessionStorage.getItem("token")
  : null;

type authState = {
  loading: boolean;
  username: string | null;
  userToken: string | null;
  error: null | string;
  loggedIn: boolean;
  success: boolean;
  email: string;
};

const initialState: authState = {
  loading: false,
  username: null,
  userToken: userToken,
  error: null,
  loggedIn: false,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      sessionStorage.removeItem("token");
      state.error = null;
      state.loggedIn = false;
      state.loading = false;
      state.success = false;
      state.userToken = null;
      state.username = null;
      state.email = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.loggedIn = true;
        state.username = payload.user;
      })
      .addCase(signupUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.error;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.username = payload.user;
        state.userToken = payload.token;
        state.loggedIn = true;
        state.success = true;
        state.email = payload.email;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
