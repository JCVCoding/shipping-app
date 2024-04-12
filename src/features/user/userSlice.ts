import { createSlice } from "@reduxjs/toolkit";
import { Address } from "../../components/ShippingForm";
import { getUserAccounts, getUserAddress } from "./userAction";

export type UserAccounts = {
  accountNumber: string;
};

type UsersState = {
  accounts: UserAccounts[];
  address: Address;
  selectedAccount: string;
};

const initialState: UsersState = {
  accounts: [{ accountNumber: "" }],
  address: {
    city: "",
    state: "",
    street: "",
    street_2: "",
    zip: "",
  },
  selectedAccount: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedAccount: (state, { payload }) => {
      state.selectedAccount = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAccounts.fulfilled, (state, { payload }) => {
        state.accounts = payload;
      })
      .addCase(getUserAddress.fulfilled, (state, { payload }) => {
        console.log(payload[0]);
        state.address = payload[0];
      });
  },
});

export const { setSelectedAccount } = userSlice.actions;

export default userSlice.reducer;
