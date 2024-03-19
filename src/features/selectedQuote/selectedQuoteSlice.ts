import { createSlice } from '@reduxjs/toolkit';
import { QuoteData } from '../../components/QuoteCard';

const initialState: QuoteData = {
    service: '',
    deliveryDate: '',
    price: ''
}

export const selectedQuoteSlice = createSlice({
  name: 'selectedQuote',
  initialState,
  reducers: {
    selectQuote: (state, action) => {
        const {service, deliveryDate, price} = action.payload;
        state.service = service;
        state.deliveryDate = deliveryDate;
        state.price = price
    },
  },
});

export const { selectQuote } = selectedQuoteSlice.actions;

export default selectedQuoteSlice.reducer;
