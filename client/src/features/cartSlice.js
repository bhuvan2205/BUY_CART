import { createSlice } from "@reduxjs/toolkit";
import setLocalStorage from "../utils/setLocalStorage";
import calculateCart from "../utils/calculateCart";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "" };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItems: (state, action) => {
      const item = action?.payload || {};
      const itemExists = state?.cartItems?.find(
        (cartItem) => cartItem?._id === item?._id
      );

      if (!itemExists) {
        state.cartItems = [...state.cartItems, item];
      } else {
        state.cartItems = state?.cartItems?.map((cartItem) => {
          if (cartItem._id === item?._id) {
            return item;
          }
          return cartItem;
        });
      }
      calculateCart(state);
      setLocalStorage("cart", state);
      return state;
    },
    removeCartItems: (state, action) => {
      const id = action?.payload || {};
      const items = state?.cartItems?.filter((cartItem) => cartItem?._id !== id);
      state.cartItems = [...items];
      calculateCart(state);
      setLocalStorage("cart", state);
      return state;
    },
    addShippingAddress: (state, action) => {
      const { address } = action?.payload || {};
      state.shippingAddress = address;
      setLocalStorage("cart", state);
      return state;
    },
    addPaymentMethod: (state, action) => {
      const method = action?.payload || {};
      state.paymentMethod = method;
      setLocalStorage("cart", state);
      return state;
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      calculateCart(state);
      setLocalStorage("cart", state);
      return state;
    },
    clearShippingAddress: (state) => {
      state.shippingAddress = {};
      setLocalStorage("cart", state);
      return state;
    },
  },
});

export const {
  addCartItems,
  clearCartItems,
  removeCartItems,
  addShippingAddress,
  addPaymentMethod,
  clearShippingAddress,
} = cartSlice.actions;

export default cartSlice.reducer;
