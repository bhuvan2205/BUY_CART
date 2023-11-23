import { createSlice } from "@reduxjs/toolkit";
import setLocalStorage from "../utils/setLocalStorage";

const initialState = 
  localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const user = action?.payload || {};
      state.user = user;
      setLocalStorage("user", user);
      return state;
    },
    removeUserDetails: (state) => {
      localStorage.removeItem("user");
      state.user = {};
      return state;
    },
  },
});

export const { setUserDetails, removeUserDetails } = userSlice.actions;

export default userSlice.reducer;
