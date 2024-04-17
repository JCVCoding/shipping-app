import { createSlice } from "@reduxjs/toolkit";
import { QuoteData } from "../../components/QuoteCard";

const initialState: QuoteData = {
  service: "",
  deliveryDate: "",
  price: "",
};

export const selectedQuoteSlice = createSlice({
  name: "selectedQuote",
  initialState,
  reducers: {
    selectQuote: (state, { payload }) => {
      const { service, price, deliveryDate } = payload;
      state.service = service;
      state.price = price;
      state.deliveryDate = deliveryDate;
    },
  },
});

export const { selectQuote } = selectedQuoteSlice.actions;

export default selectedQuoteSlice.reducer;
