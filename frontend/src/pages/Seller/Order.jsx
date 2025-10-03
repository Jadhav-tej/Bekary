// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// function Order() {
//   const [orders, setOrders] = useState([]);

//   // Fetch orders from backend
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/order/seller/order", {
//           withCredentials: true,
//         });
//         console.log(res.data)
//         setOrders(res.data);
     
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//         toast.error("Failed to fetch orders");
//       }
//     };
//     fetchOrders();
//   }, []);

//   // Update order status
//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/order/${orderId}`,
//         { status: newStatus },
//         { withCredentials: true }
//       );

//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === orderId ? { ...order, status: newStatus } : order
//         )
//       );

//       toast.success("Order status updated!");
//     } catch (err) {
//       console.error("Error updating status:", err);
//       toast.error("Failed to update order status");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-6">Manage Orders</h2>

//       {orders.length === 0 ? (
//         <p className="text-gray-500">No orders found.....</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100 text-left">
//                 <th className="p-3 border">Order ID</th>
//                 <th className="p-3 border">Customer</th>
//                 <th className="p-3 border">Items</th>
//                 <th className="p-3 border">Total</th>
//                 <th className="p-3 border">Date</th>
//                 <th className="p-3 border">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order._id} className="border-b">
//                   <td className="p-3 border">{order._id}</td>
//                   <td className="p-3 border">{order.customerName}</td>
//                   <td className="p-3 border">
//                     <ul className="list-disc pl-4">
//                       {order.items.map((item, index) => (
//                         <li key={index}>
//                           {item.name} × {item.quantity}
//                         </li>
//                       ))}
//                     </ul>
//                   </td>
//                   <td className="p-3 border">₹{order.total}</td>
//                   <td className="p-3 border">
//                     {new Date(order.date).toLocaleString()}
//                   </td>
//                   <td className="p-3 border">
//                     <select
//                       value={order.status}
//                       onChange={(e) =>
//                         handleStatusChange(order._id, e.target.value)
//                       }
//                       className="border rounded p-1"
//                     >
//                       <option value="pending">Pending</option>
//                       <option value="baking">Baking</option>
//                       <option value="out for delivery">Out for Delivery</option>
//                       <option value="delivered">Delivered</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Order;

// // import React from 'react'

// // function Order() {
// //   return (
// //     <div>Order</div>
// //   )
// // }

// // export default Order

// 

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
