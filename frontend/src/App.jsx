// import { Suspense, lazy } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
// } from "react-router-dom";
// import "./app.css";
// import { Toaster } from "react-hot-toast";
// import { useSelector } from "react-redux";
// import Category from "./Components/Category";
// import Home from "./Components/Home";
// import Login from "./Components/Login";
// import Navbar from "./Components/Navbar";
// // import ShopPage from "./Components/ShopPage";
// const ShopPage = lazy(() => import("./Components/ShopPage"));
// import Signup from "./Components/Signup";
// import Footer from "./Components/Footer";
// import Cart from "./Components/Cart";
// import Checkout from "./Components/Checkout";
// import MyOrder from "./Components/MyOrder";
// import ProductDetail from "./Components/ProductDetail";
// import SellerLogin from "./Components/SellerLogin";
// import SellerDash from "./Components/SellerDash";
// import AddProduct from "./pages/Seller/AddProduct";
// import ProductList from "./pages/Seller/ProductList";
// import Order from "./pages/Seller/Order";
// import About from "./Components/About";
// import Contact from "./Components/Conctact";
// import FAQ from "./Components/FAQ";
// import Privacy from "./Components/Privacy";
// import EditProduct from "./pages/Seller/EditProduct";

// function App() {
//   const location = useLocation();
//     const { isseller } = useSelector((state) => state.auth);


//   const hideNavbarFooter =
//     location.pathname.startsWith("/seller") ||
//     ["/login", "/signup"].includes(location.pathname);

//   // optional  from chatgpt
//   // const hideNavbarFooter =
//   //   location.pathname.startsWith("/seller") ||
//   //   ["/login", "/signup"].includes(location.pathname);

//   return (
//     <>
//       {!hideNavbarFooter && <Navbar />}

//       {/* Define routes */}

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/product" element={<ShopPage />} />
//         <Route path="/product/:category/:id" element={<ProductDetail />} />
//         <Route path="/categories" element={<Category />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/myorder" element={<MyOrder />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/faq" element={<FAQ/>} />
//         <Route path="/privacy" element={<Privacy/>} />

//         <Route
//           path="/seller"
//           element={isseller ? <SellerDash /> : <SellerLogin />}
//         >
//           <Route index element={<AddProduct />} />   {/* default child */}
//           <Route path="product-list" element={<ProductList />} />
//           <Route path="edit/:id" element={<EditProduct />} /> 
//           <Route path="orders" element={<Order />} />
//         </Route>
      




//       </Routes>
//       {!hideNavbarFooter && <Footer />}
//       <Toaster></Toaster>
//     </>
//   );
// }

// export default App;


import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Lazy-loaded components
const Home = lazy(() => import("./Components/Home"));
const Category = lazy(() => import("./Components/Category"));
const Login = lazy(() => import("./Components/Login"));
const Signup = lazy(() => import("./Components/Signup"));
const ShopPage = lazy(() => import("./Components/ShopPage"));
const Cart = lazy(() => import("./Components/Cart"));
const Checkout = lazy(() => import("./Components/Checkout"));
const MyOrder = lazy(() => import("./Components/MyOrder"));
const ProductDetail = lazy(() => import("./Components/ProductDetail"));
const SellerLogin = lazy(() => import("./Components/SellerLogin"));
const SellerDash = lazy(() => import("./Components/SellerDash"));
const AddProduct = lazy(() => import("./pages/Seller/AddProduct"));
const ProductList = lazy(() => import("./pages/Seller/ProductList"));
const Order = lazy(() => import("./pages/Seller/Order"));
const EditProduct = lazy(() => import("./pages/Seller/EditProduct"));
const About = lazy(() => import("./Components/About"));
const Contact = lazy(() => import("./Components/Conctact"));
const FAQ = lazy(() => import("./Components/FAQ"));
const Privacy = lazy(() => import("./Components/Privacy"));

function App() {
  const location = useLocation();
  const { isseller } = useSelector((state) => state.auth);

  const hideNavbarFooter =
    location.pathname.startsWith("/seller") ||
    ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavbarFooter && <Navbar />}

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ShopPage />} />
          <Route path="/product/:category/:id" element={<ProductDetail />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/myorder" element={<MyOrder />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />

          <Route
            path="/seller"
            element={isseller ? <SellerDash /> : <SellerLogin />}
          >
            <Route index element={<AddProduct />} /> {/* default child */}
            <Route path="product-list" element={<ProductList />} />
            <Route path="edit/:id" element={<EditProduct />} />
            <Route path="orders" element={<Order />} />
          </Route>
        </Routes>
      </Suspense>

      {!hideNavbarFooter && <Footer />}
      <Toaster />
    </>
  );
}

export default App;
