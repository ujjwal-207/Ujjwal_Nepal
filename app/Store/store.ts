"use client";
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/ThemeSlice";
import likeCounterReducer from "./features/LikeCountSlice";
export default configureStore({
  reducer: {
    theme: themeReducer,
    likeCounter: likeCounterReducer,
  },
});
