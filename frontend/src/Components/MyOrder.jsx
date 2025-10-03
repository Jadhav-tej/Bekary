

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { fetchUserOrders } from "../redux/orderSlice";

function MyOrder() {
  const dispatch = useDispatch();
  const { userOrders , loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);
console.log("orders",userOrders)
  useEffect(() => {
    if (user) {
      dispatch(fetchUserOrders());
    }
  }, [dispatch,user]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="mt-16 pb-16 px-6 max-w-5xl mx-auto">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-indigo-500 rounded-full"></div>
      </div>

      {userOrders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {userOrders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-300 rounded-lg p-5 bg-white shadow-sm"
            >
              {/* Order Header */}
              <div className="flex justify-between mb-3">
                <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Order Status */}
              <div className="mb-3">
                <span className="font-medium">Status: </span>
                <span
                  className={`font-semibold ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Shipped"
                      ? "text-blue-600"
                      : "text-orange-500"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Order Items */}
              <div className="divide-y">
                {order.item.map((item,index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image?.url || "/placeholder.png"}
                        alt={item.image.name}
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    {/* <p className="flex items-center font-medium">
                      <MdOutlineCurrencyRupee />
                      {(item.product.Price*item.quantity).toFixed(2)}
                    </p> */}
                  </div>
                ))}
              </div>

              {/* Total Amount */}
              <div className="flex justify-between mt-4 font-medium">
                <span>Total:</span>
                <span className="flex items-center">
                  <MdOutlineCurrencyRupee />
                  {order.amount.toFixed(2)}
                </span>
              </div>

              {/* Optional: Track Order Button */}
              {/* <div className="mt-3">
                <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
                  Track Order
                </button>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrder;

