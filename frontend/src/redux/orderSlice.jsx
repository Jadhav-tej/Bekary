
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSellerOrders = createAsyncThunk(
  "order/fetchSellerOrders",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        // "http://localhost:5000/api/order/seller/orders", 
        `${process.env.REACT_APP_API_URL}/api/order/seller/orders`,
        {
        withCredentials: true,  
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({orderId,status }, thunkAPI) => {
    try {
      const res = await axios.patch(
        // `http://localhost:5000/api/order/seller/orders/${orderId}`,
        `${process.env.REACT_APP_API_URL}/api/order/seller/orders/${orderId}`,
        { status },
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData, thunkAPI) => {
    try {
      const res = await axios.post(
        // "http://localhost:5000/api/order/cod",
        `${process.env.REACT_APP_API_URL}/api/order/cod`,
         orderData,
        { withCredentials: true

        }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


export const fetchUserOrders = createAsyncThunk(
  "order/fetchUserOrders",
  async (_,thunkAPI) => {
    try {
      const res = await axios.post(
        // "http://localhost:5000/api/order/user",
        `${process.env.REACT_APP_API_URL}/api/order/user`,
        {},{withCredentials:true});
      return res.data;
      
    } catch(err){
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    userOrders: [],  
    sellerOrders: [], 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {

     builder
      .addCase(fetchSellerOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerOrders = action.payload;
      })
      .addCase(fetchSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        state.sellerOrders = state.sellerOrders.map((o) =>
          o._id === updated._id ? updated : o
        );
      });

    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        // Optional: add the new order to the list immediately
        state.userOrders.unshift(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
