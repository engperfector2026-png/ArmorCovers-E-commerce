import { useState, useEffect } from 'react';
import { Trash2, XCircle } from 'lucide-react';
import API from '../api/axios';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await API.get('/admin/orders');
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to load orders", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (id: string) => {
    if (!window.confirm("Cancel this order?")) return;
    
    try {
      await API.put(`/admin/orders/${id}/cancel`);
      alert("✅ Order cancelled successfully");
      fetchOrders(); // Refresh list
    } catch (error) {
      alert("❌ Failed to cancel order");
    }
  };

  const deleteOrder = async (id: string) => {
    if (!window.confirm("Delete this order permanently?")) return;
    
    try {
      await API.delete(`/admin/orders/${id}`);
      alert("✅ Order deleted permanently");
      fetchOrders(); // Refresh list
    } catch (error) {
      alert("❌ Failed to delete order");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading orders...</div>;

  return (
    <div className="bg-slate-100 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Manage Orders</h1>
            <p className="text-gray-600 mt-1">Total Orders: {orders.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-6 font-medium text-gray-600">Order ID</th>
                <th className="text-left p-6 font-medium text-gray-600">Buyer</th>
                <th className="text-left p-6 font-medium text-gray-600">Product</th>
                <th className="text-left p-6 font-medium text-gray-600">Amount</th>
                <th className="text-left p-6 font-medium text-gray-600">Date</th>
                <th className="text-left p-6 font-medium text-gray-600">Status</th>
                <th className="text-left p-6 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order: any) => (
                  <tr key={order._id} className="border-b hover:bg-slate-50 transition">
                    <td className="p-6 font-mono text-sm">{order.orderNumber}</td>
                    <td className="p-6">{order.buyer?.name || "Unknown"}</td>
                    <td className="p-6">{order.product?.name || "N/A"}</td>
                    <td className="p-6 font-semibold">KSh {order.amount?.toLocaleString()}</td>
                    <td className="p-6 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-6">
                      <span className={`px-4 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex gap-3">
                        <button 
                          onClick={() => cancelOrder(order._id)}
                          className="flex items-center gap-2 px-5 py-2 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 transition text-sm"
                        >
                          <XCircle size={18} /> Cancel
                        </button>
                        <button 
                          onClick={() => deleteOrder(order._id)}
                          className="flex items-center gap-2 px-5 py-2 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition text-sm"
                        >
                          <Trash2 size={18} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-16 text-center text-gray-500">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;