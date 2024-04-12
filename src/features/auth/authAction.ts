import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:3000";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (
    { firstName, lastName, email, username, password },
    { rejectWithValue }
  ) => {
    try {
      await fetch(`${backendURL}/signup`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          username,
          password,
        }),
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const sendCredentials = await fetch("http://localhost:3000/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const status = sendCredentials.ok;
      const response = await sendCredentials.json();
      if (status) {
        sessionStorage.setItem("token", response.token);
        return response;
      } else {
        throw new Error(response);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
