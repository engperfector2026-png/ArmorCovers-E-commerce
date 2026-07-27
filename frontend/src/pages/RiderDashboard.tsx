import { useState, useEffect } from "react";
<<<<<<< HEAD
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
=======
import { MapPin, Navigation, User, Clock, CheckCircle, LogOut, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RiderDashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [riderProfile, setRiderProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch Rider Profile from MongoDB
  useEffect(() => {
    const fetchRiderProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user.id) {
          navigate("/login");
          return;
        }

        const res = await axios.get(`http://localhost:5000/api/rider/profile/${user.id}`);
        setRiderProfile(res.data);
      } catch (error) {
        console.error("Failed to load rider profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRiderProfile();
  }, [navigate]);

  const toggleOnline = () => {
    setIsOnline(!isOnline);
    // In real app: send status to backend
    console.log("Rider status changed to:", !isOnline);
  };

  const logout = () => {
    if (window.confirm("Logout?")) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const deregister = async () => {
    if (!window.confirm("Deregister rider account? This cannot be undone.")) return;

    try {
      await axios.delete("http://localhost:5000/api/rider/deregister");
      alert("Rider account deregistered.");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      alert("Failed to deregister.");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading your profile...</div>;

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-bold">Boda Rider Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome, {riderProfile?.fullName?.split(" ")[0] || "Rider"}</p>
          </div>

          <div className="flex gap-4">
            <button onClick={toggleOnline} className={`px-8 py-4 rounded-3xl font-bold ${isOnline ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
              {isOnline ? "Go Offline" : "Go Online"}
            </button>
            <button onClick={logout} className="px-6 py-4 border rounded-3xl flex items-center gap-2">
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Profile Card */}
          <div className="md:col-span-4">
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="font-semibold text-xl mb-6">My Profile</h3>

              {riderProfile && (
                <div className="space-y-5 text-sm">
                  <div><span className="text-gray-500">Name:</span> <strong>{riderProfile.fullName}</strong></div>
                  <div><span className="text-gray-500">Phone:</span> <strong>{riderProfile.phone}</strong></div>
                  <div><span className="text-gray-500">Bike Plate:</span> <strong>{riderProfile.bikePlate}</strong></div>
                  <div><span className="text-gray-500">Sub-County:</span> <strong>{riderProfile.subCounty}</strong></div>

                  <div className="pt-4 border-t">
                    <p className="text-green-600">✅ License: Verified</p>
                    <p className="text-green-600">✅ ID: Verified</p>
                  </div>
                </div>
              )}

              <button onClick={deregister} className="mt-10 w-full flex items-center justify-center gap-2 text-red-600 py-3 border border-red-200 rounded-2xl hover:bg-red-50">
                <Trash2 size={18} /> Deregister Rider
              </button>
            </div>
          </div>

          {/* Delivery Area */}
          <div className="md:col-span-8">
            <div className="bg-white rounded-3xl p-10 shadow-sm">
              <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Navigation className="text-orange-500" /> Current Delivery
              </h3>

              {currentOrder ? (
                <div className="space-y-6">
                  <p><strong>Order ID:</strong> #{currentOrder._id}</p>
                  <button onClick={() => alert("Delivered!")} className="w-full bg-green-600 text-white py-5 rounded-2xl font-semibold">Mark as Delivered</button>
                </div>
              ) : (
                <div className="text-center py-20 text-gray-500">
                  <MapPin size={90} className="mx-auto mb-6 opacity-40" />
                  <p className="text-2xl">No Active Delivery</p>
                  <p>Go online to start receiving orders</p>
                </div>
              )}
>>>>>>> cbfa4a1c5f0c8a894f3e86903e97080616510176
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiderDashboard;