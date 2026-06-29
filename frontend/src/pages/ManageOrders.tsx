import { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Order {
  _id: string;
  orderNumber: string;
  buyerName: string;
  productName: string;
  amount: number;
  status: string;
  createdAt: string;
}

const ManageOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/admin/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (id: string, newStatus: string) => {
    if (!window.confirm(`Mark this order as ${newStatus}?`)) return;

    try {
      await axios.put(`http://localhost:5000/api/admin/orders/${id}/status`, { status: newStatus });
      fetchOrders();
      alert("Order status updated");
    } catch (error) {
      alert("Failed to update order");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading orders...</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Manage Orders</h1>
            <p className="text-gray-600 mt-2">Total Orders: {orders.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-8 py-5 text-left font-medium">Order ID</th>
                <th className="px-8 py-5 text-left font-medium">Buyer</th>
                <th className="px-8 py-5 text-left font-medium">Product</th>
                <th className="px-8 py-5 text-left font-medium">Amount</th>
                <th className="px-8 py-5 text-left font-medium">Date</th>
                <th className="px-8 py-5 text-left font-medium">Status</th>
                <th className="px-8 py-5 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-8 py-6 font-medium">{order.orderNumber}</td>
                  <td className="px-8 py-6">{order.buyerName}</td>
                  <td className="px-8 py-6">{order.productName}</td>
                  <td className="px-8 py-6 font-bold">KSh {order.amount.toLocaleString()}</td>
                  <td className="px-8 py-6 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                      order.status === "Delivered" ? "bg-green-100 text-green-700" :
                      order.status === "Pending" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center flex gap-3 justify-center">
                    {order.status !== "Delivered" && (
                      <button
                        onClick={() => updateOrderStatus(order._id, "Delivered")}
                        className="px-5 py-2 text-sm border border-green-200 text-green-600 rounded-xl hover:bg-green-50 transition"
                      >
                        <CheckCircle size={18} className="inline" /> Mark Delivered
                      </button>
                    )}
                    {order.status === "Pending" && (
                      <button
                        onClick={() => updateOrderStatus(order._id, "Cancelled")}
                        className="px-5 py-2 text-sm border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition"
                      >
                        <XCircle size={18} className="inline" /> Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;