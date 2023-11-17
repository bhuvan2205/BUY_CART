import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state) => {
      const items = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
      state.cartItems = items;
    },
    addCartItems: (state, action) => {
      state.cartItems = { ...state?.cartItems, ...action?.payload };
      localStorage.setItem("cart", state);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      localStorage.clear("cart");
    },
  },
});

export const { addCartItems, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;
