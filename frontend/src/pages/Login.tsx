import { useState, useEffect } from 'react';
import { Plus, Package, DollarSign, Users, TrendingUp, Eye, User, Edit3 } from 'lucide-react';

const SellerDashboard = () => {
  // Seller Profile State
  const [sellerProfile, setSellerProfile] = useState({
    name: "John Doe",
    storeName: "Armor Covers KE",
    email: "seller@armor.com",
    phone: "+254 712 345 678",
    location: "Nairobi, Kenya",
    bio: "Quality vehicle covers and accessories",
  });

  // Stats (will update dynamically)
  const [stats, setStats] = useState({
    totalProducts: 12,
    totalOrders: 45,
    totalEarnings: 124500,
    pendingOrders: 8,
  });

  const [recentOrders] = useState([
    { id: 1, product: "Armor Cover - Toyota Prado", amount: 8500, status: "Pending" },
    { id: 2, product: "Leather Seat Cover", amount: 12500, status: "Delivered" },
  ]);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [formData, setFormData] = useState(sellerProfile);

  // Auto-refresh simulation (you can connect to backend later)
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        pendingOrders: Math.max(0, prev.pendingOrders - 1),
      }));
    }, 15000); // Simulate every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const openProfileModal = () => {
    setFormData(sellerProfile);
    setIsProfileModalOpen(true);
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setSellerProfile(formData);
    setIsProfileModalOpen(false);
    
    // Show success message (you can improve this)
    alert("✅ Store Profile Updated Successfully!");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-slate-100 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {sellerProfile.name.split(" ")[0]}!</p>
          </div>
          <button
            onClick={() => window.location.href = '/my-products?mode=new'}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3 font-semibold transition hover:scale-105"
          >
            <Plus size={24} />
            Add New Product
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-10 flex flex-col md:flex-row gap-6 items-center">
          <div className="w-24 h-24 bg-orange-100 rounded-2xl flex items-center justify-center text-5xl">
            👤
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{sellerProfile.storeName}</h2>
            <p className="text-gray-600">{sellerProfile.name}</p>
            <p className="text-sm text-gray-500 mt-1">{sellerProfile.email} • {sellerProfile.phone}</p>
            <p className="text-sm text-gray-500">{sellerProfile.location}</p>
          </div>
          <button
            onClick={openProfileModal}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-5 py-3 rounded-2xl text-gray-700 font-medium transition"
          >
            <Edit3 size={20} />
            Update Profile
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-3xl shadow-sm p-8 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Products</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">{stats.totalProducts}</p>
              </div>
              <Package className="text-orange-500" size={48} />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Earnings</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">KSh {stats.totalEarnings.toLocaleString()}</p>
              </div>
              <DollarSign className="text-orange-500" size={48} />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Orders</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">{stats.totalOrders}</p>
              </div>
              <Users className="text-orange-500" size={48} />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending Orders</p>
                <p className="text-4xl font-bold text-orange-600 mt-2">{stats.pendingOrders}</p>
              </div>
              <TrendingUp className="text-orange-500" size={48} />
            </div>
          </div>
        </div>

        {/* Rest of your dashboard (Recent Orders + Quick Actions) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-3xl shadow-sm p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Recent Orders</h3>
              <button className="text-orange-500 hover:text-orange-600 flex items-center gap-2">
                View All <Eye size={20} />
              </button>
            </div>
            {/* ... existing recent orders code ... */}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl shadow-sm p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <button onClick={() => window.location.href = '/my-products'} className="w-full bg-slate-50 hover:bg-slate-100 p-5 rounded-2xl text-left flex justify-between items-center transition">
                <span className="font-medium text-gray-900">Manage My Products</span>
                <Package className="text-orange-500" />
              </button>
              <button onClick={() => window.location.href = '/my-orders'} className="w-full bg-slate-50 hover:bg-slate-100 p-5 rounded-2xl text-left flex justify-between items-center transition">
                <span className="font-medium text-gray-900">View All Orders</span>
                <Users className="text-orange-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8">
            <h2 className="text-2xl font-bold mb-6">Update Store Profile</h2>
            
            <form onSubmit={handleProfileUpdate} className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-1">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-4 border border-gray-200 rounded-2xl" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Store Name</label>
                <input type="text" name="storeName" value={formData.storeName} onChange={handleInputChange} className="w-full p-4 border border-gray-200 rounded-2xl" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Phone Number</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-4 border border-gray-200 rounded-2xl" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full p-4 border border-gray-200 rounded-2xl" />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsProfileModalOpen(false)} className="flex-1 py-4 border border-gray-300 rounded-2xl font-medium">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-orange-500 text-white py-4 rounded-2xl font-semibold hover:bg-orange-600">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;