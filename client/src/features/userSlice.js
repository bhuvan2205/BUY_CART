import { createSlice } from "@reduxjs/toolkit";
import setLocalStorage from "../utils/setLocalStorage";

const initialState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const user = action?.payload || {};
      state.user = user;
      setLocalStorage("auth", { user });
      return state;
    },
    removeUserDetails: (state) => {
      state.user = {};
      localStorage.removeItem("user");
      return state;
    },
  },
});

export const { setUserDetails, removeUserDetails } = userSlice.actions;

export default userSlice.reducer;
