import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, ShoppingCart, Heart, Package, LogOut, 
  MapPin, CreditCard, Star, ShoppingBag 
} from 'lucide-react';

const BuyerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-slate-100 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-sm p-10 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-28 h-28 bg-orange-100 rounded-3xl flex items-center justify-center text-7xl flex-shrink-0">
              👤
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900">
                Welcome back, {user?.name?.split(" ")[0] || 'Valued Buyer'}!
              </h1>
              <p className="text-gray-600 text-lg mt-1">{user?.email}</p>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium mt-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Active Buyer
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/products')}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl flex items-center gap-2 font-medium transition"
              >
                <ShoppingBag size={20} />
                Start Shopping
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow transition cursor-pointer" onClick={() => navigate('/cart')}>
            <ShoppingCart className="text-orange-500 mb-4" size={40} />
            <h3 className="text-4xl font-bold text-gray-900">3</h3>
            <p className="text-gray-600">Items in Cart</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow transition cursor-pointer" onClick={() => navigate('/buyer-dashboard')}>
            <Heart className="text-orange-500 mb-4" size={40} />
            <h3 className="text-4xl font-bold text-gray-900">12</h3>
            <p className="text-gray-600">Wishlist Items</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow transition cursor-pointer" onClick={() => navigate('/my-orders')}>
            <Package className="text-orange-500 mb-4" size={40} />
            <h3 className="text-4xl font-bold text-gray-900">8</h3>
            <p className="text-gray-600">Total Orders</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow transition cursor-pointer">
            <Star className="text-orange-500 mb-4" size={40} />
            <h3 className="text-4xl font-bold text-gray-900">4.8</h3>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Recent Orders */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-sm p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Recent Orders</h2>
              <button 
                onClick={() => navigate('/my-orders')}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                View All →
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Example Order */}
              <div className="p-6 bg-slate-50 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <p className="font-medium">Toyota Prado Full Set Seat Covers</p>
                  <p className="text-sm text-gray-500">Order #ORD-7842 • Jun 8, 2026</p>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-semibold">Delivered</p>
                  <p className="text-sm text-gray-500">Ksh 24,500</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-5 bg-white rounded-3xl shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            
            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => navigate('/products')}
                className="w-full text-left p-6 hover:bg-slate-50 rounded-2xl flex justify-between items-center border border-transparent hover:border-gray-200 transition"
              >
                <div>
                  <span className="font-medium text-lg">Browse Products</span>
                  <p className="text-sm text-gray-500">Discover new arrivals</p>
                </div>
                <ShoppingBag size={28} className="text-orange-500" />
              </button>

              <button 
                onClick={() => navigate('/cart')}
                className="w-full text-left p-6 hover:bg-slate-50 rounded-2xl flex justify-between items-center border border-transparent hover:border-gray-200 transition"
              >
                <div>
                  <span className="font-medium text-lg">View Cart</span>
                  <p className="text-sm text-gray-500">Complete your purchase</p>
                </div>
                <ShoppingCart size={28} className="text-orange-500" />
              </button>

              <button 
                onClick={() => navigate('/buyer-dashboard')} // Will be wishlist page later
                className="w-full text-left p-6 hover:bg-slate-50 rounded-2xl flex justify-between items-center border border-transparent hover:border-gray-200 transition"
              >
                <div>
                  <span className="font-medium text-lg">My Wishlist</span>
                  <p className="text-sm text-gray-500">Saved items</p>
                </div>
                <Heart size={28} className="text-orange-500" />
              </button>

              <button 
                className="w-full text-left p-6 hover:bg-slate-50 rounded-2xl flex justify-between items-center border border-transparent hover:border-gray-200 transition"
              >
                <div>
                  <span className="font-medium text-lg">Manage Addresses</span>
                  <p className="text-sm text-gray-500">Delivery locations</p>
                </div>
                <MapPin size={28} className="text-orange-500" />
              </button>

              <button 
                className="w-full text-left p-6 hover:bg-slate-50 rounded-2xl flex justify-between items-center border border-transparent hover:border-gray-200 transition"
              >
                <div>
                  <span className="font-medium text-lg">Payment Methods</span>
                  <p className="text-sm text-gray-500">Saved cards</p>
                </div>
                <CreditCard size={28} className="text-orange-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;