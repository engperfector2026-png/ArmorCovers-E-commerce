import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Package, User, MapPin, CreditCard, LogOut, Settings } from 'lucide-react';

const BuyerDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-slate-100 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Welcome Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome back, {user?.name?.split(" ")[0] || "Valued Buyer"}!
            </h1>
            <p className="text-gray-600 mt-1">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 text-red-600 hover:bg-red-50 rounded-2xl transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>

        {/* Account Overview */}
        <div className="bg-white rounded-3xl p-8 mb-10 shadow">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center text-5xl">
              👤
            </div>
            <div>
              <h2 className="text-3xl font-semibold">{user?.name}</h2>
              <p className="text-gray-500">{user?.email}</p>
              <div className="inline-flex items-center gap-2 mt-3 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Active Member
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs / Quick Links */}
        <h2 className="text-2xl font-bold mb-6">My Account</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          <Link to="/cart" className="group bg-white p-8 rounded-3xl hover:shadow-xl transition flex flex-col">
            <ShoppingCart className="text-orange-500 mb-6" size={48} />
            <h3 className="font-semibold text-2xl mb-2 group-hover:text-orange-600">My Cart</h3>
            <p className="text-gray-500">Review and checkout your items</p>
          </Link>

          <Link to="/wishlist" className="group bg-white p-8 rounded-3xl hover:shadow-xl transition flex flex-col">
            <Heart className="text-orange-500 mb-6" size={48} />
            <h3 className="font-semibold text-2xl mb-2 group-hover:text-orange-600">Wishlist</h3>
            <p className="text-gray-500">Saved items you love</p>
          </Link>

          <Link to="/my-orders" className="group bg-white p-8 rounded-3xl hover:shadow-xl transition flex flex-col">
            <Package className="text-orange-500 mb-6" size={48} />
            <h3 className="font-semibold text-2xl mb-2 group-hover:text-orange-600">My Orders</h3>
            <p className="text-gray-500">Track your purchases</p>
          </Link>

          <Link to="/profile" className="group bg-white p-8 rounded-3xl hover:shadow-xl transition flex flex-col">
            <User className="text-orange-500 mb-6" size={48} />
            <h3 className="font-semibold text-2xl mb-2 group-hover:text-orange-600">Profile</h3>
            <p className="text-gray-500">Update personal information</p>
          </Link>

          <Link to="/addresses" className="group bg-white p-8 rounded-3xl hover:shadow-xl transition flex flex-col">
            <MapPin className="text-orange-500 mb-6" size={48} />
            <h3 className="font-semibold text-2xl mb-2 group-hover:text-orange-600">Addresses</h3>
            <p className="text-gray-500">Manage delivery locations</p>
          </Link>

          <Link to="/payment-methods" className="group bg-white p-8 rounded-3xl hover:shadow-xl transition flex flex-col">
            <CreditCard className="text-orange-500 mb-6" size={48} />
            <h3 className="font-semibold text-2xl mb-2 group-hover:text-orange-600">Payment Methods</h3>
            <p className="text-gray-500">Saved cards & M-Pesa</p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="bg-white rounded-3xl p-8 shadow">
            <p className="text-gray-500 text-center py-12">Your recent orders and activity will appear here.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BuyerDashboard;