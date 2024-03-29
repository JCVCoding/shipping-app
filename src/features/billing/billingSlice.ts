import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { PaymentFormTypes } from '../../components/PaymentForm';

type PaymentFormFieldNames = {
  name:
    | 'cardName'
    | 'cardNumber'
    | 'billingAddress'
    | 'billingCity'
    | 'billingState'
    | 'billingZip';
};

export type PaymentFormPayload = {
  name: PaymentFormFieldNames['name'];
  value: string;
};

const initialState: PaymentFormTypes = {
  cardName: '',
  cardNumber: '',
  billingAddress: '',
  billingCity: '',
  billingState: '',
  billingZip: '',
};

export const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    updateBilling: (state, action: PayloadAction<PaymentFormPayload>) => {
      const {
        name,
        value,
      }: { name: PaymentFormFieldNames['name']; value: string } =
        action.payload;
      state[name] = value;
    },
  },
});

export const { updateBilling } = billingSlice.actions;

export default billingSlice.reducer;
