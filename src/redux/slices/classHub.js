import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  classHubData: JSON.parse(localStorage.getItem("classData")) || [],
};

export const classHubSlice = createSlice({
  name: "classHub",
  initialState,
  reducers: {
    addClassHub: (state, action) => {
      state.classHubData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addClassHub } = classHubSlice.actions;

export const selectClassHub = (state) => state.classHub.classHubData;

export default classHubSlice.reducer;
