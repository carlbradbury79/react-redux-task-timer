import { createSlice } from '@reduxjs/toolkit';

export const stopwatchSlice = createSlice({
  name: 'stopwatch',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addTask } = stopwatchSlice.actions;

export default stopwatchSlice.reducer;
