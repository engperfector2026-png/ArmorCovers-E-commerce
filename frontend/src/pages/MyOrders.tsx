import { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  phoneNumber: string;
  deliveryAddress: string;
  createdAt: string;
}

function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/orders"
        );

        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen py-10 px-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <p className="text-gray-500">
              No orders found.
            </p>
          </div>
        ) : (
          <div className="space-y-5">

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-bold text-gray-900">
                  Order #{order._id.slice(-6)}
                </h2>

                <p className="text-orange-500 font-semibold mt-2">
                  {order.status}
                </p>

                <p className="mt-3 text-gray-700">
                  Total: KES {order.totalAmount.toLocaleString()}
                </p>

                <p className="text-gray-600">
                  Phone: {order.phoneNumber}
                </p>

                <p className="text-gray-600">
                  Address: {order.deliveryAddress}
                </p>

                <p className="text-gray-400 text-sm mt-3">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default MyOrders;