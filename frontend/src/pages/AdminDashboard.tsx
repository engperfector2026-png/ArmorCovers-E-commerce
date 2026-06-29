import { useState, useEffect } from 'react';
import { Users, Package, DollarSign, AlertTriangle, Shield, TrendingUp } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats] = useState({
    totalUsers: 1243,
    totalSellers: 89,
    totalOrders: 4567,
    totalRevenue: 12456700,
    pendingOrders: 67,
  });

  return (
    <div className="bg-slate-100 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Platform Overview & Management</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow">
            <Shield className="text-green-500" size={28} />
            <span className="font-medium">Platform Secure</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-3xl p-8 shadow">
            <Users className="text-blue-500 mb-4" size={36} />
            <h3 className="text-5xl font-bold">{stats.totalUsers}</h3>
            <p className="text-gray-600 mt-2">Total Users</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow">
            <Package className="text-orange-500 mb-4" size={36} />
            <h3 className="text-5xl font-bold">{stats.totalSellers}</h3>
            <p className="text-gray-600 mt-2">Active Sellers</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow">
            <DollarSign className="text-green-500 mb-4" size={36} />
            <h3 className="text-5xl font-bold">KSh {(stats.totalRevenue / 1000000).toFixed(1)}M</h3>
            <p className="text-gray-600 mt-2">Total Revenue</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow">
            <AlertTriangle className="text-red-500 mb-4" size={36} />
            <h3 className="text-5xl font-bold text-red-500">{stats.pendingOrders}</h3>
            <p className="text-gray-600 mt-2">Pending Orders</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-3xl p-8 shadow">
            <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => navigate("/admin/users")}
                className="bg-blue-50 hover:bg-blue-100 p-8 rounded-3xl text-left transition border border-transparent hover:border-blue-200"
              >
                <Users className="text-blue-500 mb-4" size={32} />
                <h3 className="font-semibold text-lg">Manage Users</h3>
                <p className="text-sm text-gray-600 mt-2">View, suspend, or delete users</p>
              </button>

              <button 
                onClick={() => navigate("/admin/orders")}
                className="bg-orange-50 hover:bg-orange-100 p-8 rounded-3xl text-left transition border border-transparent hover:border-orange-200"
              >
                <Package className="text-orange-500 mb-4" size={32} />
                <h3 className="font-semibold text-lg">Manage Orders</h3>
                <p className="text-sm text-gray-600 mt-2">Review and process orders</p>
              </button>

              <button className="bg-green-50 hover:bg-green-100 p-8 rounded-3xl text-left transition border border-transparent hover:border-green-200">
                <DollarSign className="text-green-500 mb-4" size={32} />
                <h3 className="font-semibold text-lg">Payment Reports</h3>
                <p className="text-sm text-gray-600 mt-2">View all transactions</p>
              </button>

              <button className="bg-purple-50 hover:bg-purple-100 p-8 rounded-3xl text-left transition border border-transparent hover:border-purple-200">
                <Shield className="text-purple-500 mb-4" size={32} />
                <h3 className="font-semibold text-lg">Platform Settings</h3>
                <p className="text-sm text-gray-600 mt-2">System configuration</p>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-3xl p-8 shadow">
            <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="font-medium">New seller registered</p>
                <p className="text-sm text-gray-500">John Doe • 2 minutes ago</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="font-medium">Order #ORD-7845 flagged</p>
                <p className="text-sm text-gray-500">Suspicious activity • 15 minutes ago</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="font-medium">Payment confirmed</p>
                <p className="text-sm text-gray-500">Mary Jane • 1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;