import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { authSuccess } = userSlice.actions;

export default userSlice.reducer;
