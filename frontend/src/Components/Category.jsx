// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";

// import  categories   from "../assets/Data.jsx";
// import { useDispatch, useSelector } from "react-redux";
// import { setCategory } from "../redux/productSlice.jsx";


// function Category() {
//   const dispatch=useDispatch()

//   useEffect(()=>{
//     dispatch(setCategory(categories))
//   },[])

// const  category  = useSelector((state) => state.product.category);
// // console.log("cat",category)

//   return (
//     <div className="max-w-10xl mx-auto p-4 bg-gradient-to-r from-pink-200 to-pink-800   ">
//       <h5 className="text-xl  mb-2 text-center">You'll Love</h5>
//       <h2 className="text-4xl font-bold text-red-500 mb-6 text-center">Our Products</h2>

//       {/* Responsive grid */}
//       <div className="grid gap-6  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

//         {categories.map((cat) => (
//           <Link
//             // to={cat.path}
//             to={`/product?category=${cat.name}`}
//           //  to={`/product/${Category.path.toLowerCase()}`}
//             key={cat.id}
//             className="flex flex-col  items-center  p-4 bg-blak rounded-full  hover: transition transform hover:scale-110"

//           >
//             <img
//               src={cat.img}
//               alt={cat.name}
//               className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-red-200"
//             />
//             <h3 className="mt-3 text-lg font-semibold text-center">{cat.name}</h3>
//           </Link>
//         ))}
//       </div>
      
//     </div>
//   );
// }

// export default Category;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import categories from "../assets/Data.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../redux/productSlice.jsx";

function Category() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategory(categories));
  }, [dispatch]);

  const category = useSelector((state) => state.product.category);

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 bg-gradient-to from-pink-50 via-white to-pink-100">
      <h5 className="text-xl text-gray-600 mb-2 text-center tracking-wide uppercase">
        You'll Love
      </h5>
      <h2 className="text-4xl font-extrabold text-pink-600 mb-12 text-center drop-shadow-lg">
        Our Products
      </h2>

      {/* Responsive grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link
            to={`/product?category=${cat.name}`}
            key={cat.id}
            className="group flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="relative w-28 h-28 md:w-32 md:h-32">
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full rounded-full object-cover border-4 border-pink-200 group-hover:border-pink-500 transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-pink-600/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
              {cat.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;
