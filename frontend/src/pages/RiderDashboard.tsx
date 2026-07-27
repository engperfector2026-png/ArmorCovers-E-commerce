import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Bike,
  Package,
  DollarSign,
  Clock,
  MapPin,
  CheckCircle,
  LogOut,
  Power,
  TrendingUp,
  User,
} from "lucide-react";

function RiderDashboard() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rider, setRider] = useState<any>(null);
  const [stats, setStats] = useState({
    todayDeliveries: 0,
    todayEarnings: 0,
    totalDeliveries: 0,
    rating: 5,
  });
  const [availableOrders, setAvailableOrders] = useState<any[]>([]);
  const [recentDeliveries, setRecentDeliveries] = useState<any[]>([]);

  // Get rider ID from localStorage (saved during registration)
  const riderInfo = JSON.parse(localStorage.getItem("rider") || "{}");

  useEffect(() => {
    if (!riderInfo.id) {
      // If no rider info, still allow viewing with empty state
      setLoading(false);
      return;
    }
    fetchDashboardData();
    fetchAvailableOrders();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/delivery/dashboard/${riderInfo.id}`
      );
      setRider(res.data.rider);
      setStats(res.data.stats);
      setRecentDeliveries(res.data.recentDeliveries || []);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/delivery/available-orders");
      setAvailableOrders(res.data || []);
    } catch (error) {
      console.error("Failed to load available orders:", error);
    }
  };

  const handleAcceptOrder = async (orderId: string) => {
    if (!riderInfo.id) {
      alert("Please register as a rider first");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/delivery/accept-order", {
        orderId,
        riderId: riderInfo.id,
      });

      if (res.data.success) {
        alert("✅ Order accepted successfully!");
        // Refresh data
        fetchAvailableOrders();
        fetchDashboardData();
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to accept order");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("rider");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading Rider Dashboard...
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* HEADER */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center">
              <Bike className="text-orange-500" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Rider Dashboard</h1>
              <p className="text-gray-500 text-sm">
                Welcome back, {rider?.fullName || riderInfo.fullName || "Rider"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition ${
                isOnline ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
              }`}
            >
              <Power size={18} />
              {isOnline ? "Online" : "Offline"}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition text-sm font-medium"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                <Package className="text-orange-500" size={20} />
              </div>
              <p className="text-sm text-gray-500">Today’s Deliveries</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.todayDeliveries}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <DollarSign className="text-green-600" size={20} />
              </div>
              <p className="text-sm text-gray-500">Today’s Earnings</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              KSh {stats.todayEarnings.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-blue-600" size={20} />
              </div>
              <p className="text-sm text-gray-500">Total Deliveries</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalDeliveries}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
                <User className="text-yellow-600" size={20} />
              </div>
              <p className="text-sm text-gray-500">Rating</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.rating} ★</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* AVAILABLE ORDERS */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Available Orders</h2>
                <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-medium">
                  {availableOrders.length} New
                </span>
              </div>

              <div className="divide-y">
                {availableOrders.length > 0 ? (
                  availableOrders.map((order) => (
                    <div key={order._id} className="p-6 hover:bg-slate-50 transition">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            #{order._id.slice(-6).toUpperCase()}
                          </p>
                          <div className="flex items-start gap-2 mb-1">
                            <MapPin size={16} className="text-orange-500 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {order.county || order.shippingAddress?.county || "Nairobi"} •{" "}
                                {order.subCounty || order.shippingAddress?.subCounty || "—"}
                              </p>
                              <p className="text-sm text-gray-500">
                                Customer: {order.buyer?.name || "Customer"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {new Date(order.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            <span className="capitalize">{order.status}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-bold text-orange-500 mb-2">
                            KSh {(order.totalAmount || order.amount || 0).toLocaleString()}
                          </p>
                          <button
                            onClick={() => handleAcceptOrder(order._id)}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
                          >
                            Accept Order
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-gray-500">
                    <Package size={40} className="mx-auto mb-3 text-gray-300" />
                    <p>No available orders at the moment</p>
                    <p className="text-sm mt-1">New orders will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RECENT DELIVERIES */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b">
                <h2 className="text-lg font-bold text-gray-900">Recent Deliveries</h2>
              </div>

              <div className="divide-y">
                {recentDeliveries.length > 0 ? (
                  recentDeliveries.map((delivery) => (
                    <div key={delivery._id} className="p-5">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-gray-900">
                          {delivery.subCounty || delivery.shippingAddress?.subCounty || "Delivery"}
                        </p>
                        <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                          <CheckCircle size={12} />
                          Completed
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>
                          {new Date(delivery.updatedAt).toLocaleDateString()}
                        </span>
                        <span className="font-semibold text-gray-900">
                          KSh {(delivery.totalAmount || delivery.amount || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500 text-sm">
                    No completed deliveries yet
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 bg-orange-50 border border-orange-100 rounded-3xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">💡 Rider Tip</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Stay online during peak hours (11AM–2PM & 5PM–8PM) to get more delivery requests and higher earnings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiderDashboard;