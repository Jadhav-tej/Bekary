
// import { useEffect, useState } from "react";
// import { FaBowlFood } from "react-icons/fa6";
// import { FaShoppingCart } from "react-icons/fa";
// import { IoMdSearch } from "react-icons/io";
// import { Link, useNavigate } from "react-router-dom";
// import { CgProfile } from "react-icons/cg";
// import { useSelector, useDispatch } from "react-redux";
// import { setUser, setIsSeller, setShowUserLogin } from "../redux/authSlice";
// import { setSearch } from "../redux/productSlice";
// import axios from "axios";
// import toast from "react-hot-toast";
// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // ✅ Access values from Redux
//   const { searchTerm } = useSelector((state) => state.product);
//   const { user, showUserLogin} = useSelector((state) => state.auth);

//   // function handleLogout() {
//   //   dispatch(setUser(false)); // set user to logged out
//   //   dispatch(setIsSeller(false));
//   //   navigate("/");
//   // }
//   async function handleLogout() {
//   try {
//     await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });

//     dispatch(setUser(false));
//     dispatch(setIsSeller(false));
//     navigate("/");
//     toast.success("Logged Out successfully")
//   } catch (error) {
//     console.error("Logout failed:", error.response?.data || error.message);
//   }
// }
// function handleSearch() {
//   if (searchTerm.trim() === "") return;
//   navigate(`/product?search=${encodeURIComponent(searchTerm)}`); 
//   dispatch(setSearch("")); 
// }

// const products= useSelector(state=>state.cart.products)
// // console.log("product from nav",products)

//   return (
//     <nav className="flex items-center justify-between px-2 md:px-16 lg:px-24 xl:px-12 py-4 border-b border-gray-300 bg-white relative transition-all">
//       {/* Logo */}
//       <Link to={"/"} onClick={() => setOpen(false)} className="flex text-2xl items-center gap-2">
//         <FaBowlFood />
//         <p className="text-black">Bakery</p>
//       </Link>

//       {/* Desktop Menu */}
//       <div className="hidden sm:flex items-center gap-8">
//         <Link to={"/"}>Home</Link>
//         <Link to={"/product"}>Product</Link>

//         {/* Search Bar */}
//         <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
//           <input
//             className="py-1.5 w-full border-none bg-transparent outline-none placeholder-gray-500"
//             type="text"
//             value={searchTerm}
//             placeholder="Search products"
//            onChange={(e)=>dispatch(setSearch(e.target.value))}
            
              
//           />
//           <button onClick={handleSearch}>
//             <IoMdSearch className="text-2xl my-2" />
//           </button>
//         </div>

//         {/* Cart */}
//         <div  className="relative  cursor-pointer items-center">
//           <Link to={'/cart'}>
//           <FaShoppingCart />
//             {products.length>0?(
//               <div className="absolute  px-1 -top-2 -right-3 text-xs bg-green-500 hover:bg-green-600 text-white w-[14px] h-[14px] rounded-full">
//                   {products.length}
//               </div>
//             ):(<></>)}
        
//           </Link>
//         </div>
//         {/* <div className="flex items-center space-x-1">
//           <Link to={"/cart" } className="relative">
//             <FaShoppingCart></FaShoppingCart>
//             <span className="absolute -top-2   -right-3 text-xs bg-green-500 hover:bg-green-600 text-white w-[14px] h-[14px] rounded-full">
//               {products.length}
//             </span>
//           </Link>

//         </div> */}


//         {/* Auth Buttons */}
//         {!user ? (
//           <Link
//             to={"/login"}
//             onClick={() => dispatch(setShowUserLogin(true))}
//             className="cursor-pointer px-8 py-2 bg-green-500 hover:bg-green-600 transition text-white rounded-full"
//           >
//             Login
//           </Link>
//         ) : (
//           <div className="relative group">
//             <CgProfile className="w-6 h-6 cursor-pointer"  onClick={() => setProfileOpen(!profileOpen)} />
//            {profileOpen && (
//       <ul className="absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-32 rounded-md text-sm z-40">
//         <li
//           onClick={() => {
//             navigate("/myorder");
//             setProfileOpen(false); // close after click
//           }}
//           className="p-1.5 pl-3 hover:bg-green-500/10 cursor-pointer"
//         >
//           My Order
//         </li>
//         <li
//           onClick={() => {
//             handleLogout();
//             setProfileOpen(false); // close after logout
//           }}
//           className="p-1.5 pl-3 hover:bg-green-500/10 cursor-pointer"
//         >
//           Logout
//         </li>
//       </ul>
//     )}
//           </div>
//         )}
//       </div>

//       {/* Mobile Menu Button */}

//       <div className="flex items-center sm:hidden gap-6">
//          {/* Cart */}
//         <div  className="relative  cursor-pointer items-center">
//           <Link to={'/cart'}>
//           <FaShoppingCart />
//             {products.length>0?(
//               <div className="absolute  px-1 -top-2 -right-3 text-xs bg-green-500 hover:bg-green-600 text-white w-[14px] h-[14px] rounded-full">
//                   {products.length}
//               </div>
//             ):(<></>)}
        
//           </Link>
//         </div>
        
//       <button
//         onClick={() => (open ? setOpen(false) : setOpen(true))}
//         aria-label="Menu"
//         className="sm:hidden"
//       >
//         <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <rect width="21" height="1.5" rx=".75" fill="#426287" />
//           <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
//           <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
//         </svg>
//       </button>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div
//           className={`${
//             open ? "flex" : "hidden"
//           } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
//         >
//           <Link to={"/"} onClick={() => setOpen(false)}>
//             Home
//           </Link>
//           <Link to={"/product"} onClick={() => setOpen(false)}>
//             Product
//           </Link>

//           {/* When user is logged in */}
//           {user && (
//             <Link to={"/myorder"} onClick={() => setOpen(false)}>
//               My Orders
//             </Link>
//           )}

//           {!user ? (
//             <button
//               onClick={() => {
//                 setOpen(false);
//                 dispatch(setShowUserLogin(true));
//               }}
//               className="cursor-pointer px-6 py-2 mt-2 bg-green-500 hover:bg-green-600 transition text-white rounded-full text-sm"
//             >
//               Login
//             </button>
//           ) : (
//             <button
//               onClick={handleLogout}
//               className="cursor-pointer px-6 py-2 mt-2 bg-green-500 hover:bg-green-600 transition text-white rounded-full text-sm"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


import { useEffect, useState } from "react";
import { FaBowlFood } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setIsSeller, setShowUserLogin } from "../redux/authSlice";
import { setSearch } from "../redux/productSlice";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  const products = useSelector((state) => state.cart.products);

  // Sticky navbar shadow effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleLogout() {
    try {
      await axios.post(
        // "http://localhost:5000/api/users/logout",
        `${import.meta.env.VITE_API_URL}/api/users/logout`,  
         {}, { withCredentials: true });
      dispatch(setUser(false));
      dispatch(setIsSeller(false));
      navigate("/");
      toast.success("Logged Out successfully");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  }

  function handleSearch() {
    if (searchTerm.trim() === "") return;
    navigate(`/product?search=${encodeURIComponent(searchTerm)}`);
    dispatch(setSearch(""));
    setSearchActive(false);
  }

  return (
    <nav
      className={`flex items-center justify-between px-4 md:px-16 py-4 fixed w-full z-50 top-0 transition-all ${
        isScrolled ? "bg-white shadow-md" : "bg-white/90 backdrop-blur"
      }`}
    >
      {/* Logo */}
      <Link to={"/"} className="flex text-2xl items-center gap-2 font-bold text-green-600 hover:scale-105 transition">
        <FaBowlFood className="text-orange-500" />
        <p>Bakery</p>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8 text-gray-700 font-medium">
        <Link to={"/"} className="hover:text-green-600 transition">Home</Link>
        <Link to={"/product"} className="hover:text-green-600 transition">Product</Link>

        {/* Search Bar */}
        <div
          className={`flex items-center gap-2 border border-gray-300 rounded-full px-3 transition-all duration-300 overflow-hidden ${
            searchActive ? "w-64" : "w-10 cursor-pointer"
          }`}
          onClick={() => setSearchActive(true)}
        >
          {searchActive && (
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              placeholder="Search products..."
              className="w-full py-1 bg-transparent outline-none border border-none"
              onBlur={() => !searchTerm && setSearchActive(false)}
            />
          )}
          <button onClick={handleSearch}>
            <IoMdSearch className="text-xl text-gray-600" />
          </button>
        </div>

        {/* Cart */}
        <div className="relative cursor-pointer">
          <Link to={"/cart"}>
            <FaShoppingCart className="text-xl hover:scale-110 transition" />
            {products.length > 0 && (
              <div className="absolute -top-2 -right-3 text-xs bg-green-500 text-white px-1.5 rounded-full animate-bounce">
                {products.length}
              </div>
            )}
          </Link>
        </div>

        {/* Auth Buttons */}
        {!user ? (
          <Link
            to={"/login"}
            className="cursor-pointer px-6 py-2 bg-green-500 hover:bg-green-600 transition text-white rounded-full shadow-md"
          >
            Login
          </Link>
        ) : (
          <div className="relative">
            <CgProfile
              className="w-7 h-7 cursor-pointer hover:text-green-600 transition"
              onClick={() => setProfileOpen(!profileOpen)}
            />
            {profileOpen && (
              <ul className="absolute top-10 right-0 bg-white shadow-lg border rounded-md py-2 w-36 animate-fadeIn">
                <li
                  onClick={() => {
                    navigate("/myorder");
                    setProfileOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                >
                  My Orders
                </li>
                <li
                  onClick={() => {
                    handleLogout();
                    setProfileOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-red-100 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="sm:hidden flex items-center gap-4">
        {/* Cart */}
        <Link to={"/cart"} className="relative">
          <FaShoppingCart className="text-xl" />
          {products.length > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-green-500 text-white px-1.5 rounded-full">
              {products.length}
            </span>
          )}
        </Link>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} aria-label="Menu" className="text-gray-700">
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="absolute top-[65px] left-0 w-full bg-white shadow-md flex flex-col gap-3 px-5 py-4 text-gray-700 font-medium animate-slideDown">
          <Link to={"/"} onClick={() => setOpen(false)}>Home</Link>
          <Link to={"/product"} onClick={() => setOpen(false)}>Product</Link>
          {user && <Link to={"/myorder"} onClick={() => setOpen(false)}>My Orders</Link>}

          {!user ? (
            <Link
              to={"/login"}
              onClick={() => setOpen(false)}
              className="bg-green-500 text-white py-2 rounded-full text-center"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 rounded-full"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
