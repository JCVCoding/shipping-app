import { createSlice } from '@reduxjs/toolkit';

export const loggedInSlice = createSlice({
  name: 'loggedIn',
  initialState: {
    value: false,
  },
  reducers: {
    updateLoggedInState: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateLoggedInState } = loggedInSlice.actions;

export default loggedInSlice.reducer;
