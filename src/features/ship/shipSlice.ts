import { createSlice } from '@reduxjs/toolkit';

type ShipFormFields = {
  name:
    | 'shipperName'
    | 'shipperAddress'
    | 'shipperAddress2'
    | 'shipperCity'
    | 'shipperState'
    | 'shipperPhone'
    | 'shipperEmail'
    | 'recipientName'
    | 'recipientAddress'
    | 'recipientAddress2'
    | 'recipientCity'
    | 'recipientState'
    | 'recipientPhone'
    | 'recipientEmail';
};

export const shipSlice = createSlice({
  name: 'ship',
  initialState: {
    shipperName: '',
    shipperAddress: '',
    shipperAddress2: '',
    shipperCity: '',
    shipperState: '',
    shipperPhone: '',
    shipperEmail: '',
    recipientName: '',
    recipientAddress: '',
    recipientAddress2: '',
    recipientCity: '',
    recipientState: '',
    recipientPhone: '',
    recipientEmail: '',
  },
  reducers: {
    updateShipForm: (state, action) => {
      const { name, value }: { name: ShipFormFields['name']; value: string } =
        action.payload;
      state[name] = value;
    },
  },
});

export const { updateShipForm } = shipSlice.actions;

export default shipSlice.reducer;
