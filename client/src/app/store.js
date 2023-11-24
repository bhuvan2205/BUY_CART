import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import userReducer from "../features/userSlice";
import themeReducer from "../features/themeSlice";
import apiSlice from "../features/apiSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: userReducer,
    theme: themeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
