"use client";
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/ThemeSlice";
export default configureStore({
  reducer: {
    theme: themeReducer,
  },
});
