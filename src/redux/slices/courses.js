import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseData: JSON.parse(localStorage.getItem("courseData")) || [],
  stdBox: []
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    addCourseData: (state, action) => {
      state.courseData = action.payload;
    },

    appendStdBox: (state, action) => {
      state.stdBox.push(action.payload);
    },

    popStdBox: (state, action) => {
      state.stdBox = state.stdBox.filter(item => item !== action.payload)
    },
    setStdBox: (state, action) => {
      state.stdBox = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCourseData, appendStdBox, popStdBox, setStdBox } =
  courseSlice.actions;

export const selectCourseData = (state) => state.course.courseData;
export const selectStdBox = (state) => state.course.stdBox;

export default courseSlice.reducer;
