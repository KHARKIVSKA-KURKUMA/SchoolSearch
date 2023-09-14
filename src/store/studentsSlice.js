import { createSlice } from '@reduxjs/toolkit';

export const studentsSlice = createSlice({
  name: 'student',
  initialState: [],
  reducers: {
    setStudents: (_, { payload }) => payload,
  },
});

export const { setStudents } = studentsSlice.actions;
export const studentsReducer = studentsSlice.reducer;
