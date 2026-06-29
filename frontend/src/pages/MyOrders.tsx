import { useEffect, useState } from 'react';
import { Package, Truck, RotateCcw } from 'lucide-react';

interface Order {
  id: string;
  productName: string;
  price: number;
  status: string;
  date: string;
  image?: string;
}

function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-7842",
      productName: "Leather Seat Cover - Prado",
      price: 8500,
      status: "Delivered",
      date: "2026-06-20",
      image: "/uploads/prado-cover.jpg"
    },
    {
      id: "ORD-7841",
      productName: "Custom Armor Cover",
      price: 12500,
      status: "Delivered",
      date: "2026-06-18",
    },
  ]);

  const [returnRequest, setReturnRequest] = useState<string | null>(null);

  const handleReturn = (orderId: string) => {
    const reason = prompt("Please state reason for return (e.g., Wrong item, Damaged, Not satisfied):");
    if (reason) {
      alert(`✅ Return request for Order ${orderId} has been submitted.\nReason: ${reason}\nOur team will contact you shortly.`);
      // In real app, send to backend
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center">
            <Package size={80} className="mx-auto text-gray-300 mb-6" />
            <p className="text-2xl text-gray-500">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-3xl shadow p-8 flex flex-col md:flex-row gap-8">
                {/* Image */}
                <div className="w-48 h-48 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                  {order.image ? (
                    <img src={`http://localhost:5000${order.image}`} alt={order.productName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="h-full flex items-center justify-center text-6xl">📦</div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{order.date}</p>
                      <h3 className="text-2xl font-semibold mt-1">{order.productName}</h3>
                    </div>
                    <p className="text-2xl font-bold text-orange-600">KSh {order.price.toLocaleString()}</p>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <span className={`px-5 py-2 rounded-full text-sm font-medium ${
                      order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {order.status}
                    </span>
                    <span className="text-gray-500">• Order ID: {order.id}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 md:w-52">
                  {order.status === "Delivered" && (
                    <button
                      onClick={() => handleReturn(order.id)}
                      className="flex items-center justify-center gap-2 border border-red-500 text-red-600 hover:bg-red-50 py-4 rounded-2xl transition font-medium"
                    >
                      <RotateCcw size={20} />
                      Request Return
                    </button>
                  )}

                  <button className="border border-gray-300 py-4 rounded-2xl hover:bg-gray-50 transition">
                    View Details
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