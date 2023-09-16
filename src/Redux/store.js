import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slices/pizzaSlice";
import getcartslice from "./Slices/getcartslice";

export default configureStore({
  reducer: {
    cartArr: cartSlice,
    getCartArr: getcartslice,
  },
});
