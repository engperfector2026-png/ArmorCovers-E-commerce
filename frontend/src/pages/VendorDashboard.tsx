import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Package, DollarSign, Users, TrendingUp, Edit3, LogOut, Shield, CheckCircle, X } from 'lucide-react';
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

const VendorDashboard = () => {
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
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationTokenInput, setVerificationTokenInput] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [user, setUser] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(currentUser);

    if (!currentUser.id) {
      navigate('/login');
      return;
    }

    const storedToken = localStorage.getItem(`vendor_verification_token_${currentUser.id}`);
    setIsVerified(!!storedToken);
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        const productsRes = await axios.get(`http://localhost:5000/api/products/seller/${currentUser.id || ''}`);
        const ordersRes = await axios.get(`http://localhost:5000/api/orders/seller/${currentUser.id || ''}`);

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
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  const handleProtectedAction = (path: string) => {
    if (!isVerified) {
      setShowVerificationModal(true);
      return;
    }
    window.location.href = path;
  };

  const handleManualVerification = async () => {
    if (!verificationTokenInput.trim()) return;

    setVerifying(true);
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    await new Promise(resolve => setTimeout(resolve, 1000));

    localStorage.setItem(`vendor_verification_token_${currentUser.id}`, verificationTokenInput.trim());
    setIsVerified(true);
    setShowVerificationModal(false);
    setVerificationTokenInput("");
    setVerifying(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Loading dashboard...</div>;

  return (
    <div className="bg-slate-100 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
              {user?.name?.charAt(0) || 'V'}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
              <p className="text-gray-600">Vendor Dashboard</p>
            </div>
          </div>

          <div className="flex gap-3">
            {!isVerified && (
              <button 
                onClick={() => setShowVerificationModal(true)}
                className="bg-amber-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3 font-semibold hover:bg-amber-700 transition"
              >
                <Shield size={20} /> Verify Identity
              </button>
            )}
            <button onClick={handleLogout} className="border border-red-500 text-red-500 px-6 py-3 rounded-2xl flex items-center gap-3 hover:bg-red-50 transition">
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>

        {/* Verification Banner */}
        {!isVerified && (
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 mb-10 flex items-center gap-6">
            <Shield className="text-amber-500" size={48} />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-amber-800">Identity Verification Required</h3>
              <p className="text-amber-700">Please verify your identity to unlock all features.</p>
            </div>
            <button onClick={() => setShowVerificationModal(true)} className="bg-white px-8 py-3 rounded-2xl border border-amber-300 hover:bg-amber-50 font-medium">
              Verify Now
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

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-3xl p-8 shadow">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Quick Actions</h2>
            {isVerified && <span className="flex items-center gap-1 text-green-600 text-sm font-medium"><CheckCircle size={18} /> Verified</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <button 
              onClick={() => handleProtectedAction('/add-product')}
              className={`p-8 rounded-3xl text-left transition-all border ${isVerified ? 'hover:shadow-xl border-gray-200' : 'opacity-60 cursor-not-allowed border-dashed'}`}
            >
              <Plus className="text-orange-500 mb-4" size={40} />
              <h3 className="font-semibold text-lg">Add Product</h3>
              <p className="text-sm text-gray-500 mt-1">List a new item</p>
            </button>

            <button 
              onClick={() => handleProtectedAction('/my-products')}
              className={`p-8 rounded-3xl text-left transition-all border ${isVerified ? 'hover:shadow-xl border-gray-200' : 'opacity-60 cursor-not-allowed border-dashed'}`}
            >
              <Package className="text-orange-500 mb-4" size={40} />
              <h3 className="font-semibold text-lg">Manage Products</h3>
              <p className="text-sm text-gray-500 mt-1">Edit or delete listings</p>
            </button>

            <button 
              onClick={() => handleProtectedAction('/my-orders')}
              className={`p-8 rounded-3xl text-left transition-all border ${isVerified ? 'hover:shadow-xl border-gray-200' : 'opacity-60 cursor-not-allowed border-dashed'}`}
            >
              <Users className="text-orange-500 mb-4" size={40} />
              <h3 className="font-semibold text-lg">View Orders</h3>
              <p className="text-sm text-gray-500 mt-1">Track customer orders</p>
            </button>

            <button 
              onClick={() => handleProtectedAction('/my-products')}
              className={`p-8 rounded-3xl text-left transition-all border ${isVerified ? 'hover:shadow-xl border-gray-200' : 'opacity-60 cursor-not-allowed border-dashed'}`}
            >
              <Edit3 className="text-orange-500 mb-4" size={40} />
              <h3 className="font-semibold text-lg">Edit Products</h3>
              <p className="text-sm text-gray-500 mt-1">Update your listings</p>
            </button>
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8">
            <div className="flex justify-between mb-6">
              <h3 className="text-2xl font-semibold">Identity Verification</h3>
              <button onClick={() => setShowVerificationModal(false)}><X size={28} /></button>
            </div>

            <div className="space-y-6">
              <input
                type="text"
                value={verificationTokenInput}
                onChange={(e) => setVerificationTokenInput(e.target.value)}
                className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter verification token"
              />

              <button
                onClick={handleManualVerification}
                disabled={verifying || !verificationTokenInput.trim()}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-2xl font-semibold disabled:opacity-70"
              >
                {verifying ? "Verifying..." : "Complete Verification"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;