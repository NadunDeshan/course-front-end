import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function OrderDetailsModal({
  isModelOpen,
  selectedOrder,
  closeModel,
  refresh,
}) {
    const[status,setStatus]= useState(selectedOrder?.status);
  if (!isModelOpen || !selectedOrder) return null;

  return (
    <div
      className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center p-4"
      onClick={closeModel}
    >
      <div
        className="w-full max-w-3xl bg-primary rounded-2xl shadow-2xl border border-black/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10">
          <div>
            <h2 className="text-xl font-bold text-secondary">
              Order Details — {selectedOrder.orderID}
            </h2>
            <p className="text-secondary/70 text-sm">
              {new Date(selectedOrder.date).toLocaleString()}
            </p>
          </div>

          <button
            className="w-10 h-10 rounded-full bg-accent text-primary font-bold flex items-center justify-center hover:opacity-90"
            onClick={closeModel}
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">
          {/* CUSTOMER + SUMMARY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/60 rounded-xl p-4 border border-black/10">
              <h3 className="text-secondary font-semibold mb-3">Customer</h3>
              <div className="space-y-2 text-secondary text-sm">
                <p><b>Name:</b> {selectedOrder.customerName}</p>
                <p><b>Email:</b> {selectedOrder.email}</p>
                <p><b>Phone:</b> {selectedOrder.phone}</p>
                <p><b>Address:</b> {selectedOrder.address}</p>
              </div>
            </div>

            <div className="bg-white/60 rounded-xl p-4 border border-black/10">
              <h3 className="text-secondary font-semibold mb-3">Summary</h3>
              <div className="space-y-2 text-secondary text-sm">
                <p><b>Total Items:</b> {selectedOrder.items.length}</p>
                <p><b>Total:</b> {"LKR " + selectedOrder.total.toFixed(2)}</p>
                <p>
                  <b>Status:</b>{" "}
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-primary">
                    {selectedOrder.status}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* ITEMS */}
          <div className="bg-white/60 rounded-xl border border-black/10 overflow-hidden">
            <div className="px-4 py-3 border-b border-black/10">
              <h3 className="text-secondary font-semibold">Items</h3>
            </div>

            <div className="max-h-[300px] overflow-y-auto">
              {selectedOrder.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 px-4 py-3 border-b border-black/5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover border border-black/10"
                  />

                  <div className="flex-1">
                    <p className="text-secondary font-semibold">
                      {item.name}
                    </p>
                    <p className="text-secondary/70 text-sm">
                      Product ID: {item.productID}
                    </p>
                  </div>

                  <div className="text-right text-secondary text-sm">
                    <p>Qty: {item.quantity}</p>
                    <p>Price: {"LKR " + item.price.toFixed(2)}</p>
                    <p className="font-bold">
                      {"LKR " + (item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3">
            <select
            defaultValue={selectedOrder.status}
            onChange={(e) => setStatus(e.target.value)}
  className="w-full px-4 py-2 rounded-xl bg-white/70 border border-black/10 
             text-secondary font-medium 
             focus:outline-none focus:ring-2 focus:ring-accent 
             hover:bg-white transition"
                >
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
                <option value="pending">Pending</option>
                </select>

            <button
              className="px-5 py-2 rounded-xl border border-black/10 bg-white/70 text-secondary hover:bg-white"
              onClick={()=>{
                const token = localStorage.getItem("token");
                axios
                .put(import.meta.env.VITE_API_URL + "/api/orders/status/" + selectedOrder.orderID, {status : status},{
                  headers: {
                    Authorization: "Bearer " + token
                  }}
                
            )
            .then(()=> {
                toast.success("Order updated successfully");
                closeModel();
                refresh();
              })
              .catch((err) => {
                console
                toast.error("Failed to update order")
              })
              
              }}disabled = {status == selectedOrder.status}
            >
              Update
            </button>

            <button
              className="px-5 py-2 rounded-xl bg-accent text-primary font-semibold hover:opacity-90"
              onClick={refresh}
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
