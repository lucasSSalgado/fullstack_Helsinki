import { createSlice } from "@reduxjs/toolkit";

export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: [],
  reducers: {
    setAllUser(state, action) {
      return action.payload;
    },
  },
});

export const { setAllUser } = allUsersSlice.actions;
export default allUsersSlice.reducer;
