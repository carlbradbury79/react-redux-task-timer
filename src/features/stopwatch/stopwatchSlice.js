import { createSlice } from '@reduxjs/toolkit';

export const stopwatchSlice = createSlice({
  name: 'stopwatch',
  initialState: [],
  reducers: {
    // Push new object into the array
    addTask: (state, action) => {
      state.push(action.payload);
    },
    // Map through state array, find matching taskName and edit the time value
    editTask: (state, action) => {
      state.map((task) => {
        if (task.taskName === action.payload.taskName) {
          task.time = action.payload.time;
        }
        return task;
      });
    },
    // Filter the array, keeping the data not matching the payload taskName
    removeTask: (state, action) => {
      return state.filter((task) => {
        return task.taskName !== action.payload.taskName;
      });
    },
  },
});

export const { addTask, editTask, removeTask } = stopwatchSlice.actions;

export default stopwatchSlice.reducer;
