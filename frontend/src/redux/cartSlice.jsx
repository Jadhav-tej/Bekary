import { createSlice } from "@reduxjs/toolkit";


const savedCart = JSON.parse(localStorage.getItem("cart")) || {
  products: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: savedCart,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.products.find(
        (item) => item._id === newItem._id
      );
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.products.push({
          _id: newItem._id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          image: newItem.image,
        });
      }
      state.totalPrice += newItem.price;
      state.totalQuantity++;

      
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const findItem = state.products.find((item) => item._id === id);

      if (findItem) {
        state.totalPrice -= findItem.totalPrice;
        state.totalQuantity -= findItem.quantity;
        state.products = state.products.filter((item) => item._id !== id);
      }

      
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart(state) {
      state.products = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;

      
      localStorage.setItem("cart", JSON.stringify(state));
    },

    increaseQuantity(state, action) {
      const id = action.payload;
      const findItem = state.products.find((item) => item._id == id);
      if (findItem) {
        findItem.quantity++;
        findItem.totalPrice += findItem.price;
        state.totalPrice += findItem.price;
        state.totalQuantity++;
      }

      
      localStorage.setItem("cart", JSON.stringify(state));
    },

    decreaseQuantity(state, action) {
      const id = action.payload;
      const findItem = state.products.find((item) => item._id == id);
      if (findItem && findItem.quantity > 1) {
        findItem.quantity--;
        findItem.totalPrice -= findItem.price;
        state.totalPrice -= findItem.price;
        state.totalQuantity--;
      } else if (findItem && findItem.quantity === 1) {
        // remove item if quantity becomes 0
        state.totalPrice -= findItem.price;
        state.totalQuantity--;
        state.products = state.products.filter((item) => item._id !== id);
      }

      
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  clearCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
