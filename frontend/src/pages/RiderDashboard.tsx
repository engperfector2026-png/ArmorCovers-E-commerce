import { useEffect, useState } from "react";
import { MapPin, Navigation, User } from "lucide-react";

interface Order {
  _id: string;
  buyer?: {
    name: string;
  };
}

function RiderDashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.error("Location error:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const toggleAvailability = () => {
    setIsOnline(!isOnline);
    // TODO: Send location to backend
    console.log("Rider availability toggled:", !isOnline);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-bold text-gray-900">Boda Rider Dashboard</h1>
            <p className="text-gray-600 mt-2">Real-time Delivery Partner</p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`px-6 py-3 rounded-2xl font-medium flex items-center gap-2 ${isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              {isOnline ? "Online" : "Offline"}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Status Card */}
          <div className="bg-white rounded-3xl p-10 shadow-sm">
            <div className="text-center">
              <User size={80} className="mx-auto mb-6 text-orange-500" />
              <h2 className="text-3xl font-bold mb-4">Welcome, Rider</h2>
              
              <button
                onClick={toggleAvailability}
                className={`w-full py-5 rounded-2xl text-xl font-semibold transition-all ${
                  isOnline 
                    ? "bg-red-500 hover:bg-red-600 text-white" 
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {isOnline ? "Go Offline" : "Go Online & Accept Orders"}
              </button>
            </div>
          </div>

          {/* Current Order */}
          <div className="bg-white rounded-3xl p-10 shadow-sm">
            <h3 className="font-bold text-2xl mb-6 flex items-center gap-3">
              <Navigation className="text-orange-500" /> Current Delivery
            </h3>

            {currentOrder ? (
              <div>
                <p className="text-lg">Order ID: <strong>#{currentOrder._id}</strong></p>
                <p className="mt-3">Customer: {currentOrder.buyer?.name || "Unknown"}</p>
                <div className="mt-8 bg-orange-50 p-6 rounded-2xl">
                  <p className="text-orange-600 font-medium">Live Tracking Active</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <MapPin size={60} className="mx-auto mb-4 opacity-50" />
                <p className="text-xl">No active delivery</p>
                <p className="mt-2">Go online to receive orders</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiderDashboard;