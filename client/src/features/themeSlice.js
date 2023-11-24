import { createSlice, current } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: "dark" },
  reducers: {
    toggleTheme: (state) => {
      const theme = current(state)?.mode === "dark" ? "light" : "dark";
      state.mode = theme;
      return state;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
