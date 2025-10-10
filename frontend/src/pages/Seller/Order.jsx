

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSellerOrders,
  updateOrderStatus,
} from "../../redux/orderSlice";
import toast from "react-hot-toast";

export default function Order() {
  const dispatch = useDispatch();
  const {sellerOrders, loading } = useSelector((s) => s.order);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchSellerOrders());
  }, [dispatch]);

  const changeStatus = async (orderId, newStatus) => {
    try {
      await dispatch(updateOrderStatus({ orderId, status: newStatus })).unwrap();
      toast.success(`Order marked as ${newStatus}`);
    } catch (err) {
      toast.error(err);
    }
  };

  const filteredOrders =
    filter === "all" ? sellerOrders : sellerOrders.filter((o) => o.status === filter);

    // console.log("filterorders",filteredOrders)
  return (
    <div className="p-6">
      <h2 className="text-2xl  mb-4"> Orders</h2>

      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All</option>
          <option value="order Placed">Order Placed</option>
          <option value="Accepted">Accepted</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Items</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Address</th>
              <th className="p-2 text-left">Payment</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-4 text-center">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="p-2">{order._id}</td>
                  <td className="p-2">{order.address ? order.address.split(",")[0] : "—"}</td>
                  <td className="p-2">
                    {order.item.map((i, idx) =>(
                      <div key={idx} className="text-sm">
                        {i.name} x {i.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="p-2">₹{order.amount}</td>
                  <td className="p-2">{order.address}</td>
                  <td className="p-2">
                    {order.paymentType} {order.isPaid ? "(Paid)" : "(Unpaid)"}
                  </td>
                  <td className="p-2">{order.status}</td>
                  <td className="p-2">
                    {order.status === "order Placed" && (
                      <button
                        onClick={() => changeStatus(order._id, "Accepted")}
                        className="px-2 py-1 text-sm bg-green-500 text-white rounded mr-2"
                      >
                        Accept
                      </button>
                    )}
                    {order.status === "Accepted" && (
                      <button
                        onClick={() => changeStatus(order._id, "Shipped")}
                        className="px-2 py-1 text-sm bg-blue-500 text-white rounded mr-2"
                      >
                        Ship
                      </button>
                    )}
                    {order.status === "Shipped" && (
                      <button
                        onClick={() => changeStatus(order._id, "Delivered")}
                        className="px-2 py-1 text-sm bg-purple-500 text-white rounded mr-2"
                      >
                        Deliver
                      </button>
                    )}
                    {order.status !== "Rejected" &&
                      order.status !== "Delivered" && (
                        <button
                          onClick={() => changeStatus(order._id, "Rejected")}
                          className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                        >
                          Reject
                        </button>
                      )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
