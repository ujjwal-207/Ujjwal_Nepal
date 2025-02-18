import { createSlice } from "@reduxjs/toolkit";

const likeCounterSlice = createSlice({
  name: "likeCounter",
  initialState: {
    value: 0,
  },
  reducers: {
    incremented: (state) => {
      state.value = +1;
    },
    decremented: (state) => {
      state.value = -1;
    },
  },
});
export const { incremented, decremented } = likeCounterSlice.actions;

export default likeCounterSlice.reducer;
