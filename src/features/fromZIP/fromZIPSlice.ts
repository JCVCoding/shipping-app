import { createSlice } from '@reduxjs/toolkit';

export const fromZIPSlice = createSlice({
  name: 'fromZIP',
  initialState: {
    value: '',
  },
  reducers: {
    updateFromZIP: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateFromZIP } = fromZIPSlice.actions;

export default fromZIPSlice.reducer;
