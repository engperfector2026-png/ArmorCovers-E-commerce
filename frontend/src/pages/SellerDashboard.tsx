import { useState } from 'react';
import { Plus, Package, DollarSign, Users, TrendingUp, Eye, Edit3 } from 'lucide-react';

const SellerDashboard = () => {
  const [sellerProfile] = useState({
    name: "John Doe",
    storeName: "Armor Covers KE",
    email: "seller@armor.com",
  });

  const [stats] = useState({
    totalProducts: 12,
    totalOrders: 45,
    totalEarnings: 124500,
    pendingOrders: 8,
  });

  const [recentOrders] = useState([
    { id: 1, product: "Armor Cover - Toyota Prado", amount: 8500, status: "Pending" },
    { id: 2, product: "Leather Seat Cover", amount: 12500, status: "Delivered" },
  ]);

  return (
    <div className="bg-slate-100 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {sellerProfile.name.split(" ")[0]} • {sellerProfile.storeName}</p>
          </div>
          
          <button
            onClick={() => window.location.href = '/add-product'}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-2xl flex items-center gap-3 font-semibold transition-all hover:scale-105 shadow-sm"
          >
            <Plus size={24} />
            Add New Product
          </button>
        </div>

        {/* Profile Summary Card */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-10 flex items-center gap-6">
          <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0">
            👤
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-900">{sellerProfile.storeName}</h2>
            <p className="text-gray-600">{sellerProfile.name}</p>
            <p className="text-sm text-gray-500">{sellerProfile.email}</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 rounded-2xl text-gray-700 transition">
            <Edit3 size={20} />
            Edit Profile
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-3xl shadow-sm p-8 hover:shadow transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Products</p>
                <p className="text-4xl font-bold text-gray-900 mt-3">{stats.totalProducts}</p>
              </div>
              <Package className="text-orange-500" size={52} />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8 hover:shadow transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Earnings</p>
                <p className="text-4xl font-bold text-gray-900 mt-3">KSh {stats.totalEarnings.toLocaleString()}</p>
              </div>
              <DollarSign className="text-orange-500" size={52} />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8 hover:shadow transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Orders</p>
                <p className="text-4xl font-bold text-gray-900 mt-3">{stats.totalOrders}</p>
              </div>
              <Users className="text-orange-500" size={52} />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8 hover:shadow transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending Orders</p>
                <p className="text-4xl font-bold text-orange-600 mt-3">{stats.pendingOrders}</p>
              </div>
              <TrendingUp className="text-orange-500" size={52} />
            </div>
          </div>
        </div>

        {/* Recent Orders & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-3xl shadow-sm p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Recent Orders</h3>
              <button className="text-orange-500 hover:text-orange-600 flex items-center gap-2 text-sm font-medium">
                View All <Eye size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl">
                  <div>
                    <p className="font-medium text-gray-900">{order.product}</p>
                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">KSh {order.amount}</p>
                    <p className={`text-sm ${order.status === 'Delivered' ? 'text-green-600' : 'text-orange-600'}`}>
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl shadow-sm p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <button 
                onClick={() => window.location.href = '/add-product'}
                className="w-full bg-orange-50 hover:bg-orange-100 p-6 rounded-2xl text-left flex justify-between items-center transition"
              >
                <div>
                  <p className="font-semibold text-lg">Add New Product</p>
                  <p className="text-sm text-gray-500">List a new item for sale</p>
                </div>
                <Plus className="text-orange-500" size={28} />
              </button>

              <button 
                onClick={() => window.location.href = '/my-products'}
                className="w-full bg-slate-50 hover:bg-slate-100 p-6 rounded-2xl text-left flex justify-between items-center transition"
              >
                <div>
                  <p className="font-semibold text-lg">Manage Products</p>
                  <p className="text-sm text-gray-500">Edit or view your listings</p>
                </div>
                <Package className="text-orange-500" size={28} />
              </button>

              <button 
                onClick={() => window.location.href = '/my-orders'}
                className="w-full bg-slate-50 hover:bg-slate-100 p-6 rounded-2xl text-left flex justify-between items-center transition"
              >
                <div>
                  <p className="font-semibold text-lg">View Orders</p>
                  <p className="text-sm text-gray-500">Track customer orders</p>
                </div>
                <Users className="text-orange-500" size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;