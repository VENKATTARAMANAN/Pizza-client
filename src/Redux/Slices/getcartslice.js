import { createSlice } from "@reduxjs/toolkit";
export const getCartSlice=createSlice({
name:"getCartArr",
initialState:{
getcart:[]
},
reducers:{
    GET_TO_CART:(state,action)=>{
state.getcart=[action.payload]
    },
},
});
export const { GET_TO_CART } = getCartSlice.actions;
export default getCartSlice.reducer;