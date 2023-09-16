import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cartArr",
  initialState: {
    cart:[],
  },
  reducers: {
    ADD_TO_CART: (state, action) => {
      state.cart =[...state.cart,...action.payload];
    },
    RESET_CART: (state, action) => {
      state.cart = []
    }
  },
});
export const { ADD_TO_CART, RESET_CART } = cartSlice.actions;
export default cartSlice.reducer;
