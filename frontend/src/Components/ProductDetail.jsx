import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../redux/cartSlice.jsx";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // get product id from URL
  const { products } = useSelector((state) => state.product); // all products from redux

  function handleAddToCart(e, product) {
  e.stopPropagation();
  e.preventDefault();
  const cartItem = {
    ...product,
    _id: product._id,
    image: product.image?.url || product.image, // ✅ always flatten
    quantity: 1,
  };
  dispatch(addToCart(cartItem));
  toast.success(`${product.name} added to cart!`);
}


  function handleBuyNow(e, product) {
  e.stopPropagation();
  e.preventDefault();
  const cartItem = {
    ...product,
    _id: product._id,
    image: product.image?.url || product.image, // ✅ same normalization
    quantity: 1,
  };
  dispatch(addToCart(cartItem));
  toast.success(`${product.name} added to cart!`);
  navigate("/cart"); // redirect
}

  // Find product by id (convert id to string for match)
  const product = products.find((p) => p._id.toString() === id);

  // If product not found
  if (!product) {
    return (
      <div className="text-center py-10 text-red-600">Product not found</div>
    );
  }

  return (
    <div className="max-w-6xl w-full mt-10 mb-56 px-6 mx-auto">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500">
        <span>Home</span> / <span>Products</span> /{" "}
        <span>{product.category}</span> /{" "}
        <span className="text-indigo-500">{product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-4">
        {/* Left - Single Image */}
        <div className="flex justify-center md:justify-start">
          <div className="border border-gray-300 w-[400px] h-[400px] rounded overflow-hidden flex items-center justify-center bg-gray-50">
            <img
              src={product.image?.url || product.img}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right - Details */}
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-0.5 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) =>
                product.rating > i ? (
                  <span key={i}>⭐</span>
                ) : (
                  <span key={i} className="text-gray-400">
                    ☆
                  </span>
                )
              )}
            <p className="text-base ml-2">({product.rating || 0})</p>
          </div>

          {/* Price */}
          <div className="mt-6">
            {product.offerPrice ? (
              <>
                <p className="text-gray-500 line-through">
                  MRP: ₹{product.price}
                </p>
                <p className="text-2xl font-medium text-green-600">
                  Offer: ₹{product.offerPrice}
                </p>
              </>
            ) : (
              <p className="text-2xl font-medium">Price: ₹{product.price}</p>
            )}
            <span className="text-gray-500 text-sm">
              (inclusive of all taxes)
            </span>
          </div>

          {/* Description */}
          {product.description && (
            <>
              <p className="text-base font-medium mt-6">About Product</p>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </>
          )}

          {/* Buttons */}
          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={(e) => handleAddToCart(e, product)}
              className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={(e) => handleBuyNow(e, product)}
              className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
