
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice.jsx";
import { setProducts, setSearch } from "../redux/productSlice";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";

function ShopPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, searchTerm } = useSelector((state) => state.product);
  const location = useLocation();
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          // "http://localhost:5000/api/products/list", 
          `${import.meta.env.VITE_API_URL}/api/products/list`,
          {
          withCredentials: true,
        });
        dispatch(setProducts(res.data));
      } catch (err) {
        console.error("Error fetching products:", err.message);
        toast.error("Failed to load products");
      }
    };
    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search") || "";
    dispatch(setSearch(searchQuery));
  }, [location.search, dispatch]);

  function handleAddToCart(e, product) {
    e.stopPropagation();
    e.preventDefault();
    const cartItem = {
      ...product,
      _id: product._id,
      image: product.image?.url || product.image,
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
    toast.success(`${product.name} added to cart!`);
  }

  // Filter + search
  const filteredProducts = products
    .filter((p) => (category === "all" ? true : p.category.toLowerCase() === category.toLowerCase()))
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "price-low") return (a.offerPrice || a.price) - (b.offerPrice || b.price);
    if (sort === "price-high") return (b.offerPrice || b.price) - (a.offerPrice || a.price);
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "newest") return new Date(b.date) - new Date(a.date);
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto my-16 p-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="all">All Categories</option>
          <option value="cake">Cakes</option>
          <option value="bread">Bread</option>
          <option value="cookie">Cookies</option>
          <option value="pastries">Pastries</option>
        </select>

        <select 
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((p) => (
            <div
              key={p._id}
              onClick={() => {
                navigate(`/product/${p.category.toLowerCase()}/${p._id}`);
                scrollTo(0, 0);
              }}
              className="bg-white rounded-lg shadow hover:shadow-lg p-4 transition transform hover:scale-105 cursor-pointer relative"
            >
              {/* Discount Badge */}
              {p.offerPrice && p.offerPrice < p.price && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                  {Math.round(((p.price - p.offerPrice) / p.price) * 100)}% OFF
                </span>
              )}

              <img
                src={p.image?.url || p.image}
                alt={p.name}
                className="w-full h-52 pt-2 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-gray-600 capitalize">{p.category}</p>

              {/* Price */}
              <div className="mt-2 flex items-center gap-2">
                {p.offerPrice && p.offerPrice < p.price ? (
                  <>
                    <p className="text-gray-500 line-through text-sm flex items-center">
                      <MdOutlineCurrencyRupee /> {p.price}
                    </p>
                    <p className="font-bold text-green-600 text-lg flex items-center">
                      <MdOutlineCurrencyRupee /> {p.offerPrice}
                    </p>
                  </>
                ) : (
                  <p className="font-bold text-lg flex items-center">
                    <MdOutlineCurrencyRupee /> {p.price}
                  </p>
                )}
              </div>

              {/* Rating + Add to Cart */}
              <div className="flex items-center justify-between mt-3">
                <p className="text-yellow-500">⭐ {p.rating || 0}</p>
                <button 
                  className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium hover:bg-indigo-200 transition"
                  onClick={(e) => handleAddToCart(e, p)}
                >
                  <FaShoppingCart /> Add
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}

export default ShopPage;
