import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './cartSlice'
import productSlice from './productSlice'
import authSlice from "./authSlice";
import orderSlice from"./orderSlice"
const store=configureStore({
    reducer:{
         auth: authSlice,
        cart:cartSlice,
        product:productSlice,
        order: orderSlice,
        
    }
})

export default store