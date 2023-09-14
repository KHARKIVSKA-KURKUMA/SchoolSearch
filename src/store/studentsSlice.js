import { createSlice } from '@reduxjs/toolkit';

export const studentsSlice = createSlice({
  name: 'student',
  initialState: [],
  reducers: {
    setData: (_, { payload }) => payload,
  },
});

export const { setData } = studentsSlice.actions;
export const studentsReducer = studentsSlice.reducer;
