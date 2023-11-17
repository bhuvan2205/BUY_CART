import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import apiSlice from "../features/apiSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
