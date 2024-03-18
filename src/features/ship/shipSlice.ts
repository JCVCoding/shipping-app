import { createSlice } from '@reduxjs/toolkit';

type ShipFormFields = {
  name:
    | 'shipperName'
    | 'shipperCountry'
    | 'shipperAddress'
    | 'shipperAddress2'
    | 'shipperCity'
    | 'shipperState'
    | 'shipperPhone'
    | 'shipperEmail'
    | 'recipientName'
    | 'recipientCountry'
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
    shipperCountry: 'US',
    shipperAddress: '',
    shipperAddress2: '',
    shipperCity: '',
    shipperState: '',
    shipperPhone: '',
    shipperEmail: '',
    recipientName: '',
    recipientCountry: 'US',
    recipientAddress: '',
    recipientAddress2: '',
    recipientCity: '',
    recipientState: '',
    recipientPhone: '',
    recipientEmail: '',
  },
  reducers: {
    updateShipForm: (state, action) => {
      console.log(action);
      const { name, value }: { name: ShipFormFields['name']; value: string } =
        action.payload;
      state[name] = value;
    },
  },
});

export const { updateShipForm } = shipSlice.actions;

export default shipSlice.reducer;
