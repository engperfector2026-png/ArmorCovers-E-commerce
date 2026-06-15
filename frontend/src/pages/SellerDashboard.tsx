import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Package, DollarSign, Users, TrendingUp, Eye, Edit3, LogOut, Heart, Clock } from 'lucide-react';

const SellerDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    storeName: "",
    email: ""
  });

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalEarnings: 0,
    pendingOrders: 0,
  });

  // Load user data from login
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name');

    if (!token) {
      navigate('/login');
      return;
    }

    setUser({
      name: name || "Seller",
      storeName: name ? `${name}'s Store` : "My Store",
      email: "seller@armor.com"
    });

    // TODO: Later fetch real stats from backend
    // For now, using demo data
    setStats({
      totalProducts: 12,
      totalOrders: 45,
      totalEarnings: 124500,
      pendingOrders: 8,
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="bg-slate-100 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back, {user.name.split(" ")[0]} • {user.storeName}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Link to="/add-product" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3 font-semibold">
              <Plus size={22} />
              Add New Product
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 px-5 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>

        {/* Profile */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-10 flex items-center gap-6">
          <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center text-5xl">👤</div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{user.storeName}</h2>
            <p className="text-gray-600">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 rounded-2xl">
            <Edit3 size={20} />
            Edit Profile
          </button>
        </div>

        {/* Dynamic Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-3xl shadow-sm p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Products</p>
                <p className="text-4xl font-bold mt-3">{stats.totalProducts}</p>
              </div>
              <Package className="text-orange-500" size={52} />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Earnings</p>
                <p className="text-4xl font-bold mt-3">KSh {stats.totalEarnings.toLocaleString()}</p>
              </div>
              <DollarSign className="text-orange-500" size={52} />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Orders</p>
                <p className="text-4xl font-bold mt-3">{stats.totalOrders}</p>
              </div>
              <Users className="text-orange-500" size={52} />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending Orders</p>
                <p className="text-4xl font-bold text-orange-600 mt-3">{stats.pendingOrders}</p>
              </div>
              <TrendingUp className="text-orange-500" size={52} />
            </div>
          </div>
        </div>

        {/* Functional Tabs / Quick Links */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Link to="/my-products" className="bg-white rounded-3xl p-8 hover:shadow-lg transition">
            <Package className="text-orange-500 mb-4" size={40} />
            <h3 className="text-xl font-semibold">Manage Products</h3>
            <p className="text-gray-500 mt-2">View, edit & update your listings</p>
          </Link>

          <Link to="/my-orders" className="bg-white rounded-3xl p-8 hover:shadow-lg transition">
            <Clock className="text-orange-500 mb-4" size={40} />
            <h3 className="text-xl font-semibold">Manage Orders</h3>
            <p className="text-gray-500 mt-2">Track and fulfill orders</p>
          </Link>

          <Link to="/wishlist" className="bg-white rounded-3xl p-8 hover:shadow-lg transition">
            <Heart className="text-orange-500 mb-4" size={40} />
            <h3 className="text-xl font-semibold">Wishlist</h3>
            <p className="text-gray-500 mt-2">Saved favorite products</p>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SellerDashboard;