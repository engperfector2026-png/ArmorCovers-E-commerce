import { Plus, Package, DollarSign, Users, TrendingUp, Eye } from 'lucide-react';
import { useState } from 'react';

const SellerDashboard = () => {
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
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's your account overview</p>
          </div>
          <button
            onClick={() => window.location.href = '/my-products?mode=new'}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3 font-semibold transition hover:scale-105"
          >
            <Plus size={24} />
            Add New Product
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-3xl shadow-sm p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Recent Orders</h3>
              <button className="text-orange-500 hover:text-orange-600 flex items-center gap-2">
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
                onClick={() => window.location.href = '/my-products'}
                className="w-full bg-slate-50 hover:bg-slate-100 p-5 rounded-2xl text-left flex justify-between items-center transition"
              >
                <span className="font-medium text-gray-900">Manage My Products</span>
                <Package className="text-orange-500" />
              </button>

              <button 
                onClick={() => window.location.href = '/my-orders'}
                className="w-full bg-slate-50 hover:bg-slate-100 p-5 rounded-2xl text-left flex justify-between items-center transition"
              >
                <span className="font-medium text-gray-900">View All Orders</span>
                <Users className="text-orange-500" />
              </button>

              <button className="w-full bg-slate-50 hover:bg-slate-100 p-5 rounded-2xl text-left flex justify-between items-center transition">
                <span className="font-medium text-gray-900">Update Store Profile</span>
                <Eye className="text-orange-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;