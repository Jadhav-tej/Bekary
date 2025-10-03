import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import ChangeAddress from "./ChangeAddress";
import { placeOrder } from "../redux/orderSlice";
import { MdOutlineCurrencyRupee } from "react-icons/md";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} from "../redux/cartSlice";
import toast from "react-hot-toast";
import axios from "axios";

function Cart() {
const dispatch = useDispatch();
const navigate=useNavigate()
  const [showAddress, setShowAddress] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const { user } = useSelector((state) => state.auth); 
  const { products, totalPrice } = useSelector(
    (state) => state.cart
  );
  console.log("product",products)
  
  function handleRemove(product){
     dispatch(removeFromCart(product))
     toast.success("Removed From cart")
  }

  
  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-indigo-500">{products.length}</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {products.map((product,_id) => (
          <div
            key={product._id}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                <img
                  className="max-w-full  object-cover"
                  
                  src={product.image }
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>
                    Size: <span>{product.size || "N/A"}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      className={`px-2 py-1 border rounded ${
                        product.quantity <= 1 ? "cursor-not-allowed" : ""
                      }`}
                      onClick={() => dispatch(decreaseQuantity(product._id))}
                    >
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() => dispatch(increaseQuantity(product._id))}
                    >
                      +
                    </button>
                  </div>

                  {/* <div className='flex items-center'>
                                        <p>Qty:</p>
                                        <select className='outline-none'>
                                            {Array(5).fill('').map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div> */}
                </div>
              </div>
            </div>
            <p className=" flex items-center mx-auto">
              <MdOutlineCurrencyRupee></MdOutlineCurrencyRupee>
              {product.price * product.quantity}
            </p>
            <button
              className="cursor-pointer mx-auto"
              onClick={() =>handleRemove(product._id)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                  stroke="#FF532E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}

        <Link
          to={"/product"}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium"
        >
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
              stroke="#615fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Continue Shopping
        </Link>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {showAddress ? showAddress : "Add adress"}
            </p>
            {/* <button onClick={() => setShowAddress(!showAddress)} className="text-indigo-500 hover:underline cursor-pointer"> */}
            <button
              onClick={() => setIsModelOpen(true)}
              className="text-indigo-500 hover:underline cursor-pointer"
            >
              Change
            </button>

            {/* {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                <p onClick={() => setShowAddress(false)} className="text-gray-500 p-2 hover:bg-gray-100">
                                    New York, USA
                                </p>
                                <p onClick={() => setShowAddress(false)} className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10">
                                    Add address
                                </p>
                            </div>
                        )} */}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <div className="flex justify-between">
            <span>Price</span>
            <div className="flex items-center ">
              <MdOutlineCurrencyRupee></MdOutlineCurrencyRupee>
              {totalPrice}
            </div>
          </div>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax 2% </span>
            <span className="text-green-600">
              {(totalPrice * 0.02).toFixed(2)}
            </span>
          </p>

          <div className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <div className="flex items-center">
              <MdOutlineCurrencyRupee></MdOutlineCurrencyRupee>
              {totalPrice * 0.02 + totalPrice}
            </div>
          </div>
        </div>

        <button
          // onClick={()=>navigate("/checkout")}
          onClick={async() => {
    if (products.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!showAddress) {
      toast.error("Please add a delivery address before placing the order.");
      setIsModelOpen(true); // open modal directly
      return;
    }
    
  //   dispatch(
  //     placeOrder({
  //       id: Date.now(),
  //       items: products,
  //       total: totalPrice * 1.02, // tax included
  //       date: new Date().toLocaleString(),
  //     })
  //   );
  //   dispatch(clearCart());
  //    toast.success("Order placed successfully!");
  //   navigate("/myorder");
  // }}
  try {
      const orderData = {
      
        items: products.map((p) => ({
          product: p._id,
          quantity: p.quantity,
          image:p.image?.url
        })),
        address: showAddress,
      };

      // console.log("orderdata",orderData)

      // call backend API
      const res = await axios.post(
        "http://localhost:5000/api/order/cod",
        orderData,
        { withCredentials: true } // needed if AuthUser middleware checks cookies
      );

      if (res.status === 200) {
        dispatch(clearCart());
        toast.success("Order placed successfully!");
        navigate("/myorder");
      }
    } catch (error) {
     const msg = error.response?.data?.message || "Failed to place order";

  if (error.response?.status === 401) {
    toast.error("Please login first to place an order");
    // dispatch(setShowUserLogin(true)); // 👈 auto-open login modal
  } else {
    toast.error(msg);
  }
    }
  }}

         className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
         >
          Place Order
        </button>
      </div>
      <Modal setIsModelOpen={setIsModelOpen} isModelOpen={isModelOpen}>
        <ChangeAddress
          setIsModelOpen={setIsModelOpen}
          setShowAddress={setShowAddress}
        ></ChangeAddress>
      </Modal>
    </div>
  );
}

export default Cart;
