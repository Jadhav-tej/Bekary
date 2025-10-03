import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   isseller: false,
//   showUserLogin: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//     setIsSeller: (state, action) => {
//       state.isseller = action.payload;
//     },
//     setShowUserLogin: (state, action) => {
//       state.showUserLogin = action.payload;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.isseller = false;
//       state.showUserLogin = false;
//     },
//   },
// });

// export const { setUser, setIsSeller, setShowUserLogin,logout } = authSlice.actions;
// export default authSlice.reducer;


// // import { createSlice } from "@reduxjs/toolkit";

// // // Load from localStorage if available
// // const savedAuth = JSON.parse(localStorage.getItem("authState"));

// // const initialState = savedAuth || {
// //   user: null,
// //   isseller: false,
// //   showUserLogin: false,
// // };

// // const authSlice = createSlice({
// //   name: "auth",
// //   initialState,
// //   reducers: {
// //     setUser: (state, action) => {
// //       state.user = action.payload;
// //       saveToLocalStorage(state);
// //     },
// //     setIsSeller: (state, action) => {
// //       state.isseller = action.payload;
// //       saveToLocalStorage(state);
// //     },
// //     setShowUserLogin: (state, action) => {
// //       state.showUserLogin = action.payload;
// //       saveToLocalStorage(state);
// //     },
// //     logout: (state) => {
// //       state.user = null;
// //       state.isseller = false;
// //       state.showUserLogin = false;
// //       localStorage.removeItem("authState");
// //     },
// //   },
// // });

// // // Helper to persist state
// // const saveToLocalStorage = (state) => {
// //   localStorage.setItem("authState", JSON.stringify(state));
// // };

// // export const { setUser, setIsSeller, setShowUserLogin, logout } =
// //   authSlice.actions;
// // export default authSlice.reducer;


const saveToLocalStorage = (state) => {
  localStorage.setItem("authState", JSON.stringify(state));
};

const authSlice = createSlice({
  name: "auth",
  initialState: JSON.parse(localStorage.getItem("authState")) || {
    user: null,
    isseller: true,
    showUserLogin: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      saveToLocalStorage(state);
    },
    setIsSeller: (state, action) => {
      state.isseller = action.payload;
      saveToLocalStorage(state);
    },
    setShowUserLogin: (state, action) => {
      state.showUserLogin = action.payload;
      saveToLocalStorage(state);
    },
    logout: (state) => {
      state.user = null;
      state.isseller = false;
      state.showUserLogin = false;
      localStorage.removeItem("authState");
    },
  },
});
export const { setUser, setIsSeller, setShowUserLogin,logout } = authSlice.actions;
export default authSlice.reducer;
