import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/productSlice";
import toast from "react-hot-toast";
import axios from 'axios'
function AddProduct() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    image: null,
    name: "",
    description: "",
    category: "",
    price: "",
    offerPrice: "",
  });

  // handle change
  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "image") {
      setFormData({ ...formData, image: files[0] }); // file object
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("image", formData.image);
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("offerPrice", formData.offerPrice);

      const res = await axios.post(
        // "http://localhost:5000/api/products/add",
        `${process.env.REACT_APP_API_URL}/api/products/add`, 
        data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
         withCredentials: true,
      });
      dispatch(addProduct(res.data.product));

      toast.success("Product added successfully!");
      setFormData({
        image: null,
        name: "",
        description: "",
        category: "",
        price: "",
        offerPrice: "",
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="flex flex-col justify-between bg-white">
      <form
        onSubmit={handleSubmit}
        className="md:p-10 p-4 space-y-5 max-w-lg"
      >
        {/* Product Image */}
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="mt-2">
            <label htmlFor="image">
              <input 
                accept="image/*"
                type="file"
                id="image"
                hidden
                onChange={handleChange}
              />
              <img
                className="max-w-24 cursor-pointer"
                src={
               formData.image
            ? URL.createObjectURL(formData.image) // ✅ preview uploaded image
            : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
        }
                alt="uploadArea"
                width={100}
                height={100}
              />
            </label>
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="name">
            Product Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            placeholder="Type here"
            onChange={handleChange}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="description">
            Product Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
          ></textarea>
        </div>

        {/* Category */}
        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          >
            <option value="">Select Category</option>
            {["cake", "bread", "pestries"].map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Price and Offer Price */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="price">
              Product Price
            </label>
            <input
              id="price"
              type="number"
              value={formData.price}
              placeholder="0"
              onChange={handleChange}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offerPrice">
              Offer Price
            </label>
            <input
              id="offerPrice"
              type="number"
              value={formData.offerPrice}
              placeholder="0"
              onChange={handleChange}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded"
        >
          ADD
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
