// import { createSlice } from "@reduxjs/toolkit";


// const initialState = {
//   products: [],
//   category: [],
//   searchTerm: "",
// };

// const productSlice = createSlice({
//   name: "product",
//   initialState,
//   reducers: {
//     setProducts(state, action) {
//       state.products = action.payload;
//     },
//     setSearch(state, action) {
//       state.searchTerm = action.payload;
//     },
//     setCategory(state, action) {
//       state.category = action.payload;
//     },
//     addProduct: (state, action) => {
//       state.products.push(action.payload);
//     },
//   },
// });

// export const { setProducts, setSearch, setCategory,addProduct } = productSlice.actions;
// export default productSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products/list",
        // `${process.env.REACT_APP_API_URL}api/products/list`,
         {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Async thunk to delete a product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/products/${productId}`,
        // `${process.env.REACT_APP_API_URL}/api/products/${productId}`,
         {
        withCredentials: true,
      });
      return productId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Async thunk to update a product
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ productId, productData }, thunkAPI) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/products/${productId}`,
        // `${process.env.REACT_APP_API_URL}/api/products/${productId}`,
        productData,
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const initialState = {
  products: [],
  category: [],
  searchTerm: "",
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setSearch(state, action) {
      state.searchTerm = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    addProduct(state, action) {
      state.products.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    // Fetch products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete product
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        state.products = state.products.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProducts, setSearch, setCategory, addProduct } =
  productSlice.actions;
export default productSlice.reducer;
