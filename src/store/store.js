import { configureStore } from '@reduxjs/toolkit';
import { studentsReducer } from './studentsSlice';

const reducer = {
  students: studentsReducer,
};

export const store = configureStore({
  reducer,
});
