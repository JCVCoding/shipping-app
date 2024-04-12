import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserAccounts } from "./userSlice";
import { Address } from "../../components/ShippingForm";

const backendURL = "http://localhost:3000";

export const getUserAccounts = createAsyncThunk(
  "user/getUserAccount",
  async (username: string, { rejectWithValue }) => {
    try {
      const accounts = await fetch(`${backendURL}/account/${username}`, {
        method: "get",
        headers: { "Content-Type": "application/json" },
      });
      return (await accounts.json()) as UserAccounts[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getUserAddress = createAsyncThunk(
  "user/getUserAddress",
  async (accountNumber: string, { rejectWithValue }) => {
    try {
      const address = await fetch(`${backendURL}/address/${accountNumber}`, {
        method: "get",
        headers: { "Content-Type": "application/json" },
      });
      return (await address.json()) as Address[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
