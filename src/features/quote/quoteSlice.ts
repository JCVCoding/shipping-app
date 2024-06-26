import { createSlice } from "@reduxjs/toolkit";

type quotePayload = {
  name: "length" | "width" | "height" | "width";
  value: string;
};

export const quoteSlice = createSlice({
  name: "quote",
  initialState: {
    length: "",
    width: "",
    height: "",
    weight: "",
  },
  reducers: {
    updatePackageDetails: (state, action) => {
      const { name, value } = action.payload as quotePayload;
      state[name] = value;
    },
  },
});

export const { updatePackageDetails } = quoteSlice.actions;

export default quoteSlice.reducer;
