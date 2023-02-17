import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseData: JSON.parse(localStorage.getItem("courseData")) || [],
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    addCourseData: (state, action) => {
      state.courseData = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { addCourseData } = courseSlice.actions;

export const selectCourseData = (state) => state.course.courseData;

export default courseSlice.reducer;
