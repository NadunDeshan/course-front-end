import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../src/components/loader";
import OrderTracker from "../src/components/orderTracker";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoding] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");

      if (token == null) {
        navigate("/login");
        return;
      }

      axios
        .get(import.meta.env.VITE_API_URL + "/api/orders/my-orders", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setOrders(response.data);
          if (response.data.length > 0) {
            setSelectedOrder(response.data[0]);
          }
          setIsLoding(false);
        })
        .catch((err) => {
          console.error("Failed to load orders", err);
          setIsLoding(false);
        });
    }
  }, [isLoading, navigate]);

  function getStatusStyle(status) {
    if (status === "Delivered") {
      return "bg-green-100 text-green-700";
    }
    if (status === "Cancelled") {
      return "bg-red-100 text-red-700";
    }
    if (status === "Shipped") {
      return "bg-blue-100 text-blue-700";
    }
    return "bg-yellow-100 text-yellow-700";
  }

  return (
    <div className="w-full min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-xl bg-white/20 text-white hover:bg-white/30"
        >
          ← Back
        </button>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* LEFT SIDE - ORDER LIST */}
        <div className="xl:col-span-2 rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/10 bg-white/5">
            <h1 className="text-2xl font-bold text-white">My Orders</h1>
            <p className="text-white/70 text-sm mt-1">
              Track your placed orders and current status
            </p>
          </div>

          {isLoading ? (
            <div className="p-6">
              <Loader />
            </div>
          ) : orders.length === 0 ? (
            <div className="p-6 text-white/70">No orders found</div>
          ) : (
            <div className="divide-y divide-white/10 max-h-[75vh] overflow-y-auto">
              {orders.map((order) => (
                <button
                  key={order.orderID}
                  onClick={() => setSelectedOrder(order)}
                  className={`w-full text-left px-5 py-4 transition hover:bg-white/10 ${
                    selectedOrder?.orderID === order.orderID
                      ? "bg-white/10"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-white font-bold">{order.orderID}</p>
                      <p className="text-white/60 text-sm mt-1">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                      <p className="text-white/70 text-sm mt-1">
                        {order.items?.length || 0} item(s)
                      </p>
                    </div>

                    <div
                      className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </div>
                  </div>

                  <div className="mt-3 text-white font-semibold">
                    LKR {order.total?.toFixed(2)}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE - ORDER DETAILS */}
        <div className="xl:col-span-3 rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/10 bg-white/5">
            <h2 className="text-2xl font-bold text-white">Order Details</h2>
            <p className="text-white/70 text-sm mt-1">
              Customer side order tracker preview
            </p>
          </div>

          {!selectedOrder ? (
            <div className="p-6 text-white/70">
              Select an order to view details
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {/* Top info */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-white/60 text-sm">Order ID</p>
                  <h3 className="text-xl font-bold text-white">
                    {selectedOrder.orderID}
                  </h3>
                </div>

                <div
                  className={`px-4 py-2 rounded-xl text-sm font-bold w-fit ${getStatusStyle(
                    selectedOrder.status,
                  )}`}
                >
                  {selectedOrder.status}
                </div>
              </div>

              {/* Tracker */}
              <div className="rounded-3xl bg-white/70 p-5">
                <h4 className="text-secondary font-bold mb-4">
                  Order Progress
                </h4>
                <OrderTracker status={selectedOrder.status} />
              </div>

              {/* Info cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/70 p-4">
                  <p className="text-secondary/60 text-sm">Customer Name</p>
                  <p className="text-secondary font-semibold">
                    {selectedOrder.customerName}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/70 p-4">
                  <p className="text-secondary/60 text-sm">Email</p>
                  <p className="text-secondary font-semibold">
                    {selectedOrder.email}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/70 p-4">
                  <p className="text-secondary/60 text-sm">Phone</p>
                  <p className="text-secondary font-semibold">
                    {selectedOrder.phone}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/70 p-4">
                  <p className="text-secondary/60 text-sm">Date</p>
                  <p className="text-secondary font-semibold">
                    {new Date(selectedOrder.date).toLocaleDateString()}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/70 p-4 md:col-span-2">
                  <p className="text-secondary/60 text-sm">Address</p>
                  <p className="text-secondary font-semibold">
                    {selectedOrder.address}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="rounded-3xl bg-white/70 p-5">
                <h4 className="text-secondary font-bold mb-4">Ordered Items</h4>

                <div className="space-y-3">
                  {selectedOrder.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-secondary/10 bg-white px-4 py-3"
                    >
                      <div>
                        <p className="text-secondary font-semibold">
                          {item.name || item.productName || "Product"}
                        </p>
                        <p className="text-secondary/60 text-sm">
                          Qty: {item.qty || item.quantity || 1}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-secondary font-bold">
                          LKR {(item.price || 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-end">
                <div className="rounded-2xl bg-accent px-6 py-4 text-white shadow-lg">
                  <p className="text-sm text-white/80">Total Amount</p>
                  <p className="text-2xl font-bold">
                    LKR {selectedOrder.total?.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
