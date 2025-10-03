// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate }  from "react-router-dom";
// import {productdata} from '../assets/Data'
// export const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(false);
//   const [isseller, setIsSeller] = useState(false);
//   const [showUserLogin, setShowUserLogin] = useState(false);
//   const[products,setProducts]=useState([])
//   const fetchProducts=async()=>{
//     setProducts(productdata)
//   }
//   useEffect(()=>{
//         fetchProducts() 
//   },[])

//   const value = {
//     navigate,
//     user,
//     setUser,
//     isseller,
//     setIsSeller,
//     showUserLogin,
//     setShowUserLogin,
//     products
//   };
//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => {
//   return useContext(AppContext);
// };
