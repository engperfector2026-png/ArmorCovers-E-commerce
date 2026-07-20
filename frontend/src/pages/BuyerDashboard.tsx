import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Package, LogOut, Clock, ArrowRight } from 'lucide-react';
import API from '../api/axios';

const BuyerDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);

    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(savedCart.length);

    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistCount(savedWishlist.length);

    fetchBuyerData(storedUser);
  }, []);

  const fetchBuyerData = async (storedUser: any) => {
    if (!storedUser.id) {
      setLoading(false);
      return;
    }

    try {
      const res = await API.get(`/orders/buyer/${storedUser.id}`);
      setRecentOrders(res.data.slice(0, 5));
    } catch (error) {
      console.error("Failed to load orders", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const trackOrder = (trackingNumber: string) => {
    navigate(`/track-order?trackingNumber=${trackingNumber}`);
  };

  return (
    <div className="bg-slate-100 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-sm p-10 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-28 h-28 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl flex items-center justify-center text-7xl text-white flex-shrink-0 shadow-inner">
              👤
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900">
                Welcome back, {user?.name?.split(" ")[0] || 'Valued Buyer'}!
              </h1>
              <p className="text-gray-600 text-lg mt-1">{user?.email}</p>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium mt-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Active Buyer Account
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 px-6 py-3 rounded-2xl border border-red-200 hover:bg-red-50 transition"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div 
            onClick={() => navigate("/cart")}
            className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition cursor-pointer"
          >
            <ShoppingCart className="text-orange-500 mb-4" size={40} />
            <h3 className="text-5xl font-bold text-gray-900">{cartCount}</h3>
            <p className="text-gray-600 mt-2">Items in Cart</p>
          </div>

          <div 
            onClick={() => navigate("/wishlist")}
            className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition cursor-pointer"
          >
            <Heart className="text-red-500 mb-4" size={40} />
            <h3 className="text-5xl font-bold text-gray-900">{wishlistCount}</h3>
            <p className="text-gray-600 mt-2">Wishlist Items</p>
          </div>

          <div 
            onClick={() => navigate("/my-orders")}
            className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition cursor-pointer"
          >
            <Package className="text-blue-500 mb-4" size={40} />
            <h3 className="text-5xl font-bold text-gray-900">{recentOrders.length}</h3>
            <p className="text-gray-600 mt-2">Recent Orders</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-3xl shadow-sm p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Recent Orders</h2>
            <button 
              onClick={() => navigate("/track-order")}
              className="text-orange-500 hover:underline text-sm font-medium flex items-center gap-2"
            >
              Track Order <Clock size={18} />
            </button>
          </div>

          <div className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order: any) => (
                <div key={order._id} className="flex justify-between items-center p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition">
                  <div>
                    <p className="font-medium text-gray-900">{order.product?.name || "Product"}</p>
                    <p className="text-sm text-gray-500">Order #{order.orderNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">KSh {order.amount?.toLocaleString()}</p>
                    <p className={`text-sm font-medium ${order.status === 'Delivered' ? 'text-green-600' : 'text-orange-600'}`}>
                      {order.status}
                    </p>
                  </div>
                  <button 
                    onClick={() => navigate(`/track-order?trackingNumber=${order.trackingNumber}`)}
                    className="ml-6 text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center gap-1"
                  >
                    Track <ArrowRight size={16} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-12">No recent orders yet. Start shopping!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;