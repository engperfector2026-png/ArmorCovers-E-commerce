import { useState, useEffect } from 'react';
import { Users, Package, DollarSign, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSellers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await API.get('/admin/dashboard');
      setStats(res.data);
    } catch (error) {
      console.error("Failed to load dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-10">Platform Overview & Management</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <div className="text-sm text-gray-500">Total Users</div>
            <div className="text-4xl font-bold text-gray-900 mt-2">{stats.totalUsers}</div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <div className="text-sm text-gray-500">Active Sellers</div>
            <div className="text-4xl font-bold text-gray-900 mt-2">{stats.activeSellers}</div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <div className="text-sm text-gray-500">Total Revenue</div>
            <div className="text-4xl font-bold text-gray-900 mt-2">KSh {stats.totalRevenue.toLocaleString()}</div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <div className="text-sm text-gray-500">Pending Orders</div>
            <div className="text-4xl font-bold text-orange-600 mt-2">{stats.pendingOrders}</div>
          </div>
        </div>

        {/* Quick Actions - Clickable */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div onClick={() => navigate("/admin/users")} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition cursor-pointer flex gap-5 items-start">
            <div className="p-4 bg-blue-100 rounded-2xl">
              <Users size={32} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-xl">Manage Users</h3>
              <p className="text-gray-600 text-sm mt-1">View, suspend, delete users</p>
            </div>
          </div>

          <div onClick={() => navigate("/admin/orders")} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition cursor-pointer flex gap-5 items-start">
            <div className="p-4 bg-amber-100 rounded-2xl">
              <Package size={32} className="text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-xl">Manage Orders</h3>
              <p className="text-gray-600 text-sm mt-1">Review and process orders</p>
            </div>
          </div>

          <div onClick={() => navigate("/admin/payments")} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition cursor-pointer flex gap-5 items-start">
            <div className="p-4 bg-emerald-100 rounded-2xl">
              <DollarSign size={32} className="text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-xl">Payment Reports</h3>
              <p className="text-gray-600 text-sm mt-1">View all transactions</p>
            </div>
          </div>

          <div onClick={() => navigate("/admin/settings")} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition cursor-pointer flex gap-5 items-start">
            <div className="p-4 bg-purple-100 rounded-2xl">
              <Settings size={32} className="text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-xl">Platform Settings</h3>
              <p className="text-gray-600 text-sm mt-1">System configuration</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;