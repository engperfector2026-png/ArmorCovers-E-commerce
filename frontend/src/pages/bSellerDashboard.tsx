import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Package, DollarSign, Users, TrendingUp, Edit3, LogOut, Shield, Upload } from 'lucide-react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const SellerDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalEarnings: 0,
    pendingOrders: 0,
    thisMonthSales: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const navigate = useNavigate();

  // Check verification status
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.id) {
      navigate('/login');
      return;
    }

    const storedToken = localStorage.getItem(`seller_verification_token_${user.id}`);
    setIsVerified(!!storedToken);
  }, [navigate]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const productsRes = await axios.get(`http://localhost:5000/api/products/seller/${user.id || ''}`);
        const ordersRes = await axios.get(`http://localhost:5000/api/orders/seller/${user.id || ''}`);

        setStats({
          totalProducts: productsRes.data.length,
          totalOrders: ordersRes.data.length,
          totalEarnings: ordersRes.data.reduce((sum: number, o: any) => sum + (o.amount || 0), 0),
          pendingOrders: ordersRes.data.filter((o: any) => o.status === "Pending").length,
          thisMonthSales: 456000,
        });

        setRecentOrders(ordersRes.data.slice(0, 5).map((o: any) => ({
          id: o.orderNumber,
          product: o.product?.name || "Product",
          amount: o.amount,
          status: o.status,
          date: new Date(o.createdAt).toLocaleDateString()
        })));
      } catch (error) {
        console.error("Failed to load seller data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerData();
  }, []);

  const salesTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales (KSh)',
      data: [85000, 125000, 98000, 210000, 178000, 456000],
      borderColor: '#f97316',
      backgroundColor: 'rgba(249, 115, 22, 0.1)',
      tension: 0.4,
      borderWidth: 3,
    }]
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const forgetVerification = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.id) {
      localStorage.removeItem(`seller_verification_token_${user.id}`);
    }
    setIsVerified(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading your analytics...</div>;
  }

  return (
    <div className="bg-slate-100 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Seller Analytics</h1>
            <p className="text-gray-600 mt-1">Real-time business performance</p>
          </div>
          <div className="flex gap-4">
            {!isVerified && (
              <button
                onClick={() => setShowVerification(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-2xl flex items-center gap-3 font-semibold transition-all"
              >
                <Shield size={20} />
                Verify Identity
              </button>
            )}

            <button
              onClick={() => window.location.href = '/add-product'}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-2xl flex items-center gap-3 font-semibold transition-all hover:scale-105"
            >
              <Plus size={24} />
              Add New Product
            </button>

            <button
              onClick={handleLogout}
              className="border border-red-500 text-red-500 px-6 py-3.5 rounded-2xl flex items-center gap-3 font-semibold hover:bg-red-50 transition"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>

        {!isVerified && (
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 mb-8 text-center">
            <Shield className="mx-auto text-amber-500 mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-2">Identity Verification Required</h3>
            <p className="text-gray-600 mb-4">Please verify your identity to access Quick Actions and full features.</p>
            <button
              onClick={() => setShowVerification(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-2xl font-semibold"
            >
              Start Verification
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-3xl p-8 shadow">
            <Package className="text-orange-500 mb-4" size={36} />
            <h3 className="text-5xl font-bold">{stats.totalProducts}</h3>
            <p className="text-gray-600 mt-2">Total Products</p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow">
            <DollarSign className="text-green-500 mb-4" size={36} />
            <h3 className="text-5xl font-bold">KSh {stats.totalEarnings.toLocaleString()}</h3>
            <p className="text-gray-600 mt-2">Total Earnings</p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow">
            <Users className="text-blue-500 mb-4" size={36} />
            <h3 className="text-5xl font-bold">{stats.totalOrders}</h3>
            <p className="text-gray-600 mt-2">Total Orders</p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow">
            <TrendingUp className="text-orange-500 mb-4" size={36} />
            <h3 className="text-5xl font-bold text-orange-500">KSh {stats.thisMonthSales.toLocaleString()}</h3>
            <p className="text-gray-600 mt-2">This Month</p>
          </div>
        </div>

        {/* Rest of your dashboard content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow">
            <h2 className="text-2xl font-semibold mb-6">Sales Trend</h2>
            <div className="h-80">
              <Line data={salesTrendData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow">
            <h2 className="text-2xl font-semibold mb-6">Recent Orders</h2>
            <div className="space-y-5">
              {recentOrders.map((order, i) => (
                <div key={i} className="flex justify-between items-center p-5 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="font-medium">{order.product}</p>
                    <p className="text-sm text-gray-500">{order.id} • {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">KSh {order.amount.toLocaleString()}</p>
                    <p className={`text-sm ${order.status === "Pending" ? "text-orange-500" : "text-green-500"}`}>
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions - Only show if verified */}
        {isVerified && (
          <div className="mt-12 bg-white rounded-3xl p-8 shadow">
            <h2 className="text-2xl font-semibold mb-8">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Your quick action buttons here */}
              <button onClick={() => window.location.href = '/add-product'} className="...">Add Product</button>
              <button onClick={() => window.location.href = '/my-products'} className="...">Manage Products</button>
              <button onClick={() => window.location.href = '/my-orders'} className="...">View Orders</button>
              <button onClick={() => window.location.href = '/my-products'} className="...">Edit Products</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;