import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  show: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    setNotification(state, action) {
      return {
        message: action.payload,
        show: true,
      };
    },
    clearNotification(state, action) {
      return initialState;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
