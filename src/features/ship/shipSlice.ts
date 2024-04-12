import { createSlice } from "@reduxjs/toolkit";

type ShipFormFields = {
  name:
    | "recipientName"
    | "recipientAddress"
    | "recipientAddress2"
    | "recipientCity"
    | "recipientState"
    | "recipientEmail";
};

export const shipSlice = createSlice({
  name: "ship",
  initialState: {
    recipientName: "",
    recipientAddress: "",
    recipientAddress2: "",
    recipientCity: "",
    recipientState: "",
    recipientPhone: "",
    recipientEmail: "",
  },
  reducers: {
    updateShipForm: (state, action) => {
      const { name, value }: { name: ShipFormFields["name"]; value: string } =
        action.payload;
      state[name] = value;
    },
  },
});

export const { updateShipForm } = shipSlice.actions;

export default shipSlice.reducer;
