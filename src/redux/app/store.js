import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../slices/student";
import courseReducer from "./../slices/courses";
import classHubReducer from "./../slices/classHub"

export const store = configureStore({
  reducer: {
    student: studentReducer,
    course: courseReducer,
    classHub: classHubReducer,
  },
});
