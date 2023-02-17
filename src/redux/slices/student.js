import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentData: JSON.parse(localStorage.getItem("studentsData")) || [],
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    addStudentData: (state, action) => {
      state.studentData = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { addStudentData } = studentSlice.actions;

export const selectStudentData = (state) => state.student.studentData;

export default studentSlice.reducer;
