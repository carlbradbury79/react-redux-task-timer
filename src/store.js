import { configureStore } from '@reduxjs/toolkit';
import stopwatchReducer from './features/stopwatch/stopwatchSlice';

export default configureStore({
  reducer: {
    stopwatch: stopwatchReducer,
  },
});
