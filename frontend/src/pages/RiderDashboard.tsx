import { useState, useEffect } from "react";
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiderDashboard;