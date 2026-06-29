import { useState, useEffect } from 'react';
import { Plus, Package, DollarSign, Users, TrendingUp, Clock } from 'lucide-react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Order {
  id: string;
  product: string;
  amount: number;
  status: string;
  date: string;
}

const SellerDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalEarnings: 0,
    pendingOrders: 0,
    thisMonthSales: 0,
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const productsRes = await axios.get(`http://localhost:5000/api/products/seller/${user.id || ''}`);

        setStats({
          totalProducts: productsRes.data.length,
          totalOrders: 28,
          totalEarnings: 1245000,
          pendingOrders: 7,
          thisMonthSales: 456000,
        });

        setRecentOrders([
          { id: "ORD-7842", product: "Toyota Prado Seat Cover", amount: 18500, status: "Pending", date: "2 hours ago" },
          { id: "ORD-7841", product: "Luxury Leather Mat", amount: 12500, status: "Delivered", date: "Yesterday" },
          { id: "ORD-7840", product: "Steering Wheel Cover", amount: 8500, status: "Delivered", date: "2 days ago" },
        ]);

      } catch (error) {
        console.error("Failed to load analytics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const salesData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Sales (KSh)',
      data: [120000, 245000, 180000, 456000],
      backgroundColor: 'rgba(249, 115, 22, 0.7)',
      borderColor: '#f97316',
      borderWidth: 2,
    }]
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
          <button
            onClick={() => window.location.href = '/add-product'}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-2xl flex items-center gap-3 font-semibold transition"
          >
            <Plus size={24} />
            Add New Product
          </button>
        </div>

        {/* Stats Cards */}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Chart */}
          <div className="bg-white rounded-3xl p-8 shadow">
            <h2 className="text-2xl font-semibold mb-6">Monthly Sales Trend</h2>
            <div className="h-80">
              <Bar data={salesData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-3xl p-8 shadow">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Clock size={26} className="text-orange-500" /> Recent Orders
            </h2>
            <div className="space-y-5">
              {recentOrders.map((order: any, i) => (
                <div key={i} className="flex justify-between items-center p-5 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="font-medium">{order.product}</p>
                    <p className="text-sm text-gray-500">{order.id} • {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">KSh {order.amount.toLocaleString()}</p>
                    <p className={`text-sm ${order.status === "Pending" ? "text-orange-500" : "text-green-500"} font-medium`}>
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;