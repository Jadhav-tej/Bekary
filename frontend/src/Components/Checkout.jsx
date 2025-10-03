import React, { useState } from "react";
import { FaAngleDown, FaAngleUp, FaRupeeSign } from "react-icons/fa";
import { useSelector } from "react-redux";

function Checkout() {
  const [billingToggle, setBillingToggle] = useState(false);
  const [shippingToggle, setShippingToggle] = useState(false);
  const [paymentToggle, setPaymentToggle] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    pincode: "",
    city: "",
  });

  const { products, totalPrice } = useSelector((state) => state.cart);
  return (
    <div className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
      <h3 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h3>

      <div className="flex flex-col md:flex-row max-w-6xl w-full px-6 mx-auto gap-6">
        {/* Left Side */}
        <div className="md:w-2/3 space-y-6">
          {/* Billing Info */}
          <div className="border rounded-lg shadow-sm p-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setBillingToggle(!billingToggle)}
            >
              <h3 className="text-lg font-semibold text-gray-800">
                Billing Info
              </h3>
              {billingToggle ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            <div className={`${billingToggle ? "mt-4 space-y-4" : "hidden"}`}>
              <div>
                <label className="block text-gray-600">Name</label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-gray-600">Email</label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                  type="email"
                />
              </div>
              <div>
                <label className="block text-gray-600">Phone</label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                  type="text"
                />
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="border rounded-lg shadow-sm p-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShippingToggle(!shippingToggle)}
            >
              <h3 className="text-lg font-semibold text-gray-800">
                Shipping Info
              </h3>
              {shippingToggle ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            <div className={`${shippingToggle ? "mt-4 space-y-4" : "hidden"}`}>
              <div>
                <label className="block text-gray-600">Address</label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                  type="text"
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-600">City</label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                  type="text"
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      city: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-600">Pincode</label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                  type="text"
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      pincode: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="border rounded-lg shadow-sm p-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setPaymentToggle(!paymentToggle)}
            >
              <h3 className="text-lg font-semibold text-gray-800">Payment</h3>
              {paymentToggle ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            <div className={`${paymentToggle ? "mt-4 space-y-4" : "hidden"}`}>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <label className="text-gray-700">Cash On Delivery</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "UPI"}
                  onChange={() => setPaymentMethod("UPI")}
                />
                <label className="text-gray-700">UPI Payment</label>
              </div>
            </div>

            {paymentMethod === "UPI" && (
              <div className="mt-4 space-y-3">
                <h3 className="font-semibold text-gray-800 mb-2">Card Info</h3>
                <div>
                  <label>Card Number</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
                <div>
                  <label>Card Holder Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
                <div>
                  <label>CVV</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Place Order Button */}
          <button className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
            Place Order
          </button>
        </div>

        {/* Right Side - Order Summary */}
        <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md border space-y-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Order Summary
          </h3>
          {products.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-3 mb-3"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md border"
                />
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <FaRupeeSign className="text-xs"></FaRupeeSign>
                    {item.price} × {item.quantity}
                  </p>
                </div>
              </div>
              <p className="font-semibold text-gray-800 flex items-center">
                <FaRupeeSign></FaRupeeSign>
                {item.price * item.quantity}
              </p>
            </div>
          ))}

          <div className="flex justify-between font-bold text-lg text-gray-800 pt-3 border-t">
            <span>Total</span>
            <span className="flex items-center">
              <FaRupeeSign></FaRupeeSign>
              {totalPrice.toFixed(2)}
            </span>
          </div>

          <button className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

// import React, { useState } from "react";
// import { FaAngleDown, FaAngleUp } from "react-icons/fa";

// function Checkout() {
//   const [billingToggle, setBillingToggle] = useState(true);
//   const [shippingToggle, setShippingToggle] = useState(true);
//   const [paymentToggle, setPaymentToggle] = useState(true);
//   const [paymentMethod, setPaymentMethod] = useState("cod");

//   return (
//     <>
//       <div className="constiner mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
//         <h3 className=" text-2xl font-semibold mb-4 ">Check Out</h3>
//         <div className="flex flex-col md:flex-row  max-w-6xl w-full px-6 mx-auto">
//           <div className="md:w-2/3">
//             {/* Biiling Info */}
//             <div className="border p-2 mb-6">
//               <div
//                 className="flex items-center  justify-between"
//                 onClick={() => setBillingToggle(!billingToggle)}
//               >
//                 <h3 className="text-lg font-semibold mb-2">Billing Info</h3>
//                 {billingToggle ? (
//                   <FaAngleDown></FaAngleDown>
//                 ) : (
//                   <FaAngleUp></FaAngleUp>
//                 )}
//               </div>
//               <div className={`${billingToggle ? "" : "hidden"}`}>
//                 <div>
//                   <label className="block text-gray-700">Name</label>
//                   <input className="w-full px-3 py-2 border" type="text" />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700">Email</label>
//                   <input className="w-full px-3 py-2 border" type="email" />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700">Phone</label>
//                   <input className="w-full px-3 py-2 border" type="text" />
//                 </div>
//               </div>
//             </div>
//             {/* Shipping Info */}
//             <div className="border p-2 mb-6">
//               <div
//                 className="flex items-center  justify-between"
//                 onClick={() => setShippingToggle(!shippingToggle)}
//               >
//                 <h3 className="text-lg font-semibold mb-2">Shipping Info</h3>
//                 {billingToggle ? (
//                   <FaAngleDown></FaAngleDown>
//                 ) : (
//                   <FaAngleUp></FaAngleUp>
//                 )}
//               </div>
//               <div className={`${shippingToggle ? "" : "hidden"}`}>
//                 <div>
//                   <label className="block text-gray-700">Address</label>
//                   <input className="w-full px-3 py-2 border" type="text" />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700">City</label>
//                   <input className="w-full px-3 py-2 border" type="text" />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700">Pincode</label>
//                   <input className="w-full px-3 py-2 border" type="text" />
//                 </div>
//               </div>
//             </div>
//             {/* payment Info */}
//             <div className="border p-2 mb-6">
//               <div
//                 className="flex items-center  justify-between"
//                 onClick={() => setPaymentToggle(!paymentToggle)}
//               >
//                 <h3 className="text-lg font-semibold mb-2">Payment</h3>
//                 {billingToggle ? (
//                   <FaAngleDown></FaAngleDown>
//                 ) : (
//                   <FaAngleUp></FaAngleUp>
//                 )}
//               </div>
//               <div className={`${paymentToggle ? "" : "hidden"}`}>
//                 <div className="flex items-center mb-2 space-x-2">
//                   <input
//                     type="radio"
//                     name="payment"
//                     checked={paymentMethod === "cod"}
//                     onChange={() => setPaymentMethod("cod")}
//                   />
//                   <label className="block text-gray-700">
//                     Cash On Delivery
//                   </label>
//                 </div>
//                 <div className="flex items-center mb-2 space-x-2">
//                   <input
//                     type="radio"
//                     name="payment"
//                     checked={paymentMethod === "UPI"}
//                     onChange={() => setPaymentMethod("UPI")}
//                   />
//                   <label className="block text-gray-700">UPI Payment</label>
//                 </div>
//               </div>
//               {paymentMethod === "UPI" && (
//                 <div>
//                         <h3> Debit cart Info</h3>
//                         <div>
//                             <label htmlFor=""> Card Number</label>
//                             <input type="text" />
//                         </div>
//                         <div>
//                             <label htmlFor=""> Card Holder Number</label>
//                             <input type="text" />
//                         </div>
//                         <div>
//                             <label htmlFor=""> CVV</label>
//                             <input type="text" />
//                         </div>

//                 </div>)}
//             </div>
//           </div>

//           <div className="md:w-1/3 bg-wh p-6 rounded-lg shadow-md border">
//             hii
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Checkout;
