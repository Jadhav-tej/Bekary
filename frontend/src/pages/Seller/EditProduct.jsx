import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProducts, updateProduct } from "../../redux/productSlice";
import toast from "react-hot-toast";
import axios from "axios";
function EditProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // product ID from route

  const { products, loading } = useSelector((state) => state.product);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    offerPrice: "",
    stock: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Load product details into form
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    } else {
      const product = products.find((p) => p._id === id);
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          category: product.category,
          price: product.price,
          offerPrice: product.offerPrice,
          stock: product.inStock,
        });
        setPreview(product.image?.url);
      }
    }
  }, [products, id, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("offerPrice", formData.offerPrice);
    // data.append("stock", formData.stock);
    if (imageFile) data.append("image", imageFile);

     try {
    await axios.put(`http://localhost:5000/api/products/edit/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    toast.success("Product updated successfully");
    navigate("/seller/product-list"); // optional: redirect to product list after update
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to update product");
  }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1">Offer Price</label>
            <input
              type="number"
              name="offerPrice"
              value={formData.offerPrice}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
        </div>

        {/* <div>
          <label className="block mb-1">In Stock</label>
          <input
            type="checkbox"
            name="stock"
            checked={formData.stock}
            onChange={handleChange}
          />{" "}
          Available
        </div> */}

        <div>
          <label className="block mb-1">Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <img src={preview} alt="Preview" className="w-32 h-32 mt-2 object-cover rounded" />
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
