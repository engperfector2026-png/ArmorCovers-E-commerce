import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Order {
  _id: string;
  orderNumber: string;
  product: {
    _id?: string;
    name: string;
    image?: string;
  };
  amount: number;
  status: string;
  createdAt: string;
}

function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await axios.get(`http://localhost:5000/api/orders/seller/${user.id || ''}`);
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to load orders", error);
    } finally {
      setLoading(false);
    }
  };

  const requestReturn = (orderId: string) => {
    if (window.confirm("Request return for this order?")) {
      alert(`Return request for Order #${orderId} submitted. We will review it soon.`);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading your orders...</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center">
            <p className="text-2xl">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-8">
                <div className="w-32 h-32 bg-gray-100 rounded-2xl flex-shrink-0 overflow-hidden">
                  <img
                    src={order.product?.image ? `http://localhost:5000${order.product.image}` : "https://via.placeholder.com/150"}
                    alt={order.product?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-xl">{order.product?.name}</h3>
                      <p className="text-gray-500">Order #{order.orderNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-2xl text-orange-600">KSh {order.amount.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <span className={`px-5 py-2 rounded-full text-sm font-medium ${
                      order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    }`}>
                      {order.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:w-48">
                  <button 
                    onClick={() => navigate(`/products/${order.product?._id || order._id}`)}
                    className="border border-orange-500 text-orange-500 py-3 rounded-2xl hover:bg-orange-50 transition"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => requestReturn(order.orderNumber)}
                    className="border border-red-500 text-red-500 py-3 rounded-2xl hover:bg-red-50 transition"
                  >
                    Request Return
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;