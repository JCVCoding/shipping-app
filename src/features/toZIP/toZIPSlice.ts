import { createSlice } from '@reduxjs/toolkit';

export const toZIPSlice = createSlice({
  name: 'toZIP',
  initialState: {
    value: '',
  },
  reducers: {
    updateToZIP: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateToZIP } = toZIPSlice.actions;

export default toZIPSlice.reducer;
