<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package, 
  ArrowUpRight,
  AlertTriangle,
  Settings,
  FileText,
  CreditCard,
  Edit,
  FolderTree,
  Download,
  Bike,          // Riders
  Truck,         // Deliveries
  RotateCcw      // Returns
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const COLORS = ['#f97316', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#3b82f6', '#ec4899', '#14b8a6', '#a855f7', '#64748b'];

const MAIN_CATEGORIES = [
  "Electronics", "Vehicles", "Fashion", "Home", "Agriculture",
  "Beauty", "Sports", "Health", "Stationery", "Education"
];

const StatCard = ({ title, value, trend, trendUp, icon: Icon }: any) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-1 text-gray-900">{value}</p>
        <p className={`text-sm mt-2 ${trendUp ? 'text-emerald-600' : 'text-gray-500'}`}>{trend}</p>
      </div>
      <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
        <Icon size={22} />
      </div>
    </div>
  </div>
);

const QuickActions = () => {
  const actions = [
    { title: 'Manage Products', icon: <Edit size={20} />, path: '/admin/products' },
    { title: 'Manage Users', icon: <Users size={20} />, path: '/admin/users' },
    { title: 'Manage Orders', icon: <ShoppingCart size={20} />, path: '/admin/orders' },
    { title: 'Manage Riders', icon: <Bike size={20} />, path: '/admin/riders' },
    { title: 'Deliveries', icon: <Truck size={20} />, path: '/admin/deliveries' },
    { title: 'Returns', icon: <RotateCcw size={20} />, path: '/admin/returns' },
    { title: 'Categories', icon: <FolderTree size={20} />, path: '/admin/categories' },
    { title: 'System Report', icon: <FileText size={20} />, path: '/admin-dashboard#system-report' },
    { title: 'Financial Report', icon: <CreditCard size={20} />, path: '/admin/payments' },
    { title: 'System Settings', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {actions.map((action) => (
        <Link
          key={action.title}
          to={action.path}
          className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition flex flex-col items-center gap-3 text-center"
        >
          <div className="w-11 h-11 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
            {action.icon}
          </div>
          <span className="text-sm font-medium text-gray-800">{action.title}</span>
        </Link>
      ))}
    </div>
  );
};

const AdminDashboard = () => {
  const [admin, setAdmin] = useState<any>(null);
  const [stats, setStats] = useState({
    revenue: { value: 'KSh 0', trend: 'Loading...', trendUp: true },
    orders: { value: '0', trend: 'Loading...', trendUp: true },
    users: { value: '0', trend: 'Loading...', trendUp: true },
    products: { value: '0', trend: 'Loading...', trendUp: true },
  });

  const [systemReport, setSystemReport] = useState({
    activeSellers: 0,
    activeBuyers: 0,
    inStock: 0,
    outOfStock: 0,
    totalRiders: 0,
    approvedRiders: 0,
    pendingRiders: 0,
    totalDeliveries: 0,
    deliveredCount: 0,
    inTransitCount: 0,
    totalReturns: 0,
    pendingReturns: 0,
    refundedReturns: 0,
    categoryStats: [] as { name: string; count: number }[],
  });

  const [orders, setOrders] = useState<any[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);
  const [topSellers, setTopSellers] = useState<any[]>([]);
  const [recentDeliveries, setRecentDeliveries] = useState<any[]>([]);
  const [recentReturns, setRecentReturns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        setAdmin(user);

        const headers = { Authorization: `Bearer ${token}` };

        // ===== Products =====
        const productsRes = await axios.get("http://localhost:5000/api/products", { headers });
        const products = productsRes.data || [];

        // ===== Users =====
        let users: any[] = [];
        try {
          const usersRes = await axios.get("http://localhost:5000/api/admin/users", { headers });
          users = usersRes.data || [];
        } catch {
          console.log("Users endpoint not ready");
        }

        // ===== Orders =====
        let allOrders: any[] = [];
        try {
          const ordersRes = await axios.get("http://localhost:5000/api/admin/orders", { headers });
          allOrders = ordersRes.data || [];
        } catch {
          console.log("Orders endpoint not ready");
        }

        // ===== Riders =====
        let riders: any[] = [];
        try {
          const ridersRes = await axios.get("http://localhost:5000/api/delivery/riders", { headers });
          riders = ridersRes.data?.data || ridersRes.data || [];
        } catch {
          console.log("Riders endpoint not ready");
        }

        // ===== Deliveries =====
        let deliveries: any[] = [];
        try {
          const deliveriesRes = await axios.get("http://localhost:5000/api/delivery", { headers });
          deliveries = deliveriesRes.data?.data || deliveriesRes.data || [];
        } catch {
          console.log("Deliveries endpoint not ready");
        }

        // ===== Returns =====
        let returns: any[] = [];
        try {
          const returnsRes = await axios.get("http://localhost:5000/api/returns", { headers });
          returns = returnsRes.data?.data || returnsRes.data || [];
        } catch {
          console.log("Returns endpoint not ready");
        }

        // ===== Calculations =====
        const totalRevenue = allOrders.reduce((sum: number, o: any) => sum + (o.total || 0), 0);
        const lowStock = products.filter((p: any) => (p.stock || 0) < 5).slice(0, 5);
        const inStock = products.filter((p: any) => (p.stock || 0) > 0).length;
        const outOfStock = products.filter((p: any) => (p.stock || 0) === 0).length;

        const activeSellers = users.filter((u: any) => u.role === "seller" || u.role === "vendor").length;
        const activeBuyers = users.filter((u: any) => u.role === "buyer").length;

        const approvedRiders = riders.filter((r: any) => r.status === "approved" || r.isActive).length;
        const pendingRiders = riders.filter((r: any) => r.status === "pending").length;

        const deliveredCount = deliveries.filter((d: any) => d.status === "delivered").length;
        const inTransitCount = deliveries.filter((d: any) =>
          ["picked_up", "in_transit", "assigned"].includes(d.status)
        ).length;

        const pendingReturns = returns.filter((r: any) =>
          ["requested", "approved", "pickup_scheduled"].includes(r.status)
        ).length;
        const refundedReturns = returns.filter((r: any) => r.status === "refunded").length;

        const categoryMap: any = {};
        MAIN_CATEGORIES.forEach(cat => categoryMap[cat] = 0);
        products.forEach((p: any) => {
          const cat = p.category || "Others";
          if (categoryMap[cat] !== undefined) {
            categoryMap[cat]++;
          } else {
            categoryMap["Others"] = (categoryMap["Others"] || 0) + 1;
          }
        });

        const categoryStats = Object.entries(categoryMap)
          .map(([name, count]) => ({ name, count: count as number }))
          .sort((a, b) => b.count - a.count);

        setStats({
          revenue: { value: `KSh ${totalRevenue.toLocaleString()}`, trend: '+12% vs last month', trendUp: true },
          orders: { value: allOrders.length.toString(), trend: '+8% vs last month', trendUp: true },
          users: { value: users.length.toString(), trend: '+15% vs last month', trendUp: true },
          products: { value: products.length.toString(), trend: '+5% vs last month', trendUp: true },
        });

        setSystemReport({
          activeSellers,
          activeBuyers,
          inStock,
          outOfStock,
          totalRiders: riders.length,
          approvedRiders,
          pendingRiders,
          totalDeliveries: deliveries.length,
          deliveredCount,
          inTransitCount,
          totalReturns: returns.length,
          pendingReturns,
          refundedReturns,
          categoryStats,
        });

        setOrders(allOrders.slice(0, 5));
        setLowStockProducts(lowStock);
        setRecentDeliveries(deliveries.slice(0, 5));
        setRecentReturns(returns.slice(0, 5));

        // Top sellers
        const sellersMap: any = {};
        products.forEach((p: any) => {
          const sellerName = p.seller?.name || p.sellerName || 'Unknown Seller';
          if (!sellersMap[sellerName]) {
            sellersMap[sellerName] = { name: sellerName, sales: 0, revenue: 0 };
          }
          sellersMap[sellerName].sales += 1;
          sellersMap[sellerName].revenue += p.price || 0;
        });

        const sortedSellers = Object.values(sellersMap)
          .sort((a: any, b: any) => b.sales - a.sales)
          .slice(0, 5)
          .map((s: any) => ({
            ...s,
            revenue: `KSh ${s.revenue.toLocaleString()}`
          }));

        setTopSellers(sortedSellers);

      } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // ========== DOWNLOAD SYSTEM REPORT ==========
  const downloadSystemReport = () => {
    const date = new Date().toLocaleString();
    let report = `ARMORCOVERS SYSTEM REPORT\n`;
    report += `Generated on: ${date}\n`;
    report += `Generated by: ${admin?.name || "Admin"}\n`;
    report += `========================================\n\n`;

    report += `SUMMARY\n`;
    report += `--------\n`;
    report += `Total Revenue: ${stats.revenue.value}\n`;
    report += `Total Orders: ${stats.orders.value}\n`;
    report += `Active Users: ${stats.users.value}\n`;
    report += `Products Listed: ${stats.products.value}\n\n`;

    report += `SYSTEM STATS\n`;
    report += `------------\n`;
    report += `Active Sellers: ${systemReport.activeSellers}\n`;
    report += `Active Buyers: ${systemReport.activeBuyers}\n`;
    report += `Goods In Stock: ${systemReport.inStock}\n`;
    report += `Goods Out of Stock: ${systemReport.outOfStock}\n\n`;

    report += `RIDERS\n`;
    report += `------\n`;
    report += `Total Riders: ${systemReport.totalRiders}\n`;
    report += `Approved Riders: ${systemReport.approvedRiders}\n`;
    report += `Pending Approval: ${systemReport.pendingRiders}\n\n`;

    report += `DELIVERIES\n`;
    report += `----------\n`;
    report += `Total Deliveries: ${systemReport.totalDeliveries}\n`;
    report += `Delivered: ${systemReport.deliveredCount}\n`;
    report += `In Transit / Assigned: ${systemReport.inTransitCount}\n\n`;

    report += `RETURNS\n`;
    report += `-------\n`;
    report += `Total Returns: ${systemReport.totalReturns}\n`;
    report += `Pending / In Progress: ${systemReport.pendingReturns}\n`;
    report += `Refunded: ${systemReport.refundedReturns}\n\n`;

    report += `GOODS PER CATEGORY\n`;
    report += `------------------\n`;
    systemReport.categoryStats.forEach((cat) => {
      report += `${cat.name}: ${cat.count}\n`;
    });

    report += `\n========================================\n`;
    report += `End of Report\n`;

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ArmorCovers_System_Report_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string): string => {
    const colors: any = {
      Delivered: 'bg-emerald-100 text-emerald-700',
      delivered: 'bg-emerald-100 text-emerald-700',
      Processing: 'bg-blue-100 text-blue-700',
      Shipped: 'bg-amber-100 text-amber-700',
      Pending: 'bg-gray-100 text-gray-700',
      pending: 'bg-gray-100 text-gray-700',
      Cancelled: 'bg-rose-100 text-rose-700',
      assigned: 'bg-blue-100 text-blue-700',
      picked_up: 'bg-amber-100 text-amber-700',
      in_transit: 'bg-amber-100 text-amber-700',
      failed: 'bg-rose-100 text-rose-700',
      requested: 'bg-gray-100 text-gray-700',
      approved: 'bg-blue-100 text-blue-700',
      refunded: 'bg-emerald-100 text-emerald-700',
      rejected: 'bg-rose-100 text-rose-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getAdminPhoto = () => {
    if (admin?.photo) return admin.photo.startsWith("http") ? admin.photo : `http://localhost:5000${admin.photo}`;
    if (admin?.avatar) return admin.avatar.startsWith("http") ? admin.avatar : `http://localhost:5000${admin.avatar}`;
    if (admin?.passport) return admin.passport.startsWith("http") ? admin.passport : `http://localhost:5000${admin.passport}`;
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading Admin Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-bold overflow-hidden border-2 border-orange-200">
              {getAdminPhoto() ? (
                <img src={getAdminPhoto()!} alt={admin?.name || "Admin"} className="w-full h-full object-cover" />
              ) : (
                admin?.name?.charAt(0)?.toUpperCase() || "A"
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {admin?.name || "Admin"}
              </h1>
              <p className="text-gray-500 mt-1">ArmorCovers Admin Dashboard</p>
            </div>
          </div>

          <button
            onClick={downloadSystemReport}
            className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            <Download size={18} />
            Download Report
          </button>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Revenue" value={stats.revenue.value} trend={stats.revenue.trend} trendUp={stats.revenue.trendUp} icon={DollarSign} />
          <StatCard title="Total Orders" value={stats.orders.value} trend={stats.orders.trend} trendUp={stats.orders.trendUp} icon={ShoppingCart} />
          <StatCard title="Active Users" value={stats.users.value} trend={stats.users.trend} trendUp={stats.users.trendUp} icon={Users} />
          <StatCard title="Products Listed" value={stats.products.value} trend={stats.products.trend} trendUp={stats.products.trendUp} icon={Package} />
        </div>

        {/* ==================== SYSTEM REPORT SECTION ==================== */}
        <div id="system-report" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FileText className="text-orange-500" size={24} />
              <h2 className="text-xl font-bold text-gray-900">System Report</h2>
            </div>
            <button
              onClick={downloadSystemReport}
              className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-xl text-sm font-medium hover:bg-orange-100 transition"
            >
              <Download size={16} />
              Download System Report
            </button>
          </div>

          {/* Original Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-orange-50 rounded-2xl p-5 text-center">
              <p className="text-sm text-gray-500">Active Sellers</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">{systemReport.activeSellers}</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-5 text-center">
              <p className="text-sm text-gray-500">Active Buyers</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{systemReport.activeBuyers}</p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-5 text-center">
              <p className="text-sm text-gray-500">Goods In Stock</p>
              <p className="text-3xl font-bold text-emerald-600 mt-1">{systemReport.inStock}</p>
            </div>
            <div className="bg-rose-50 rounded-2xl p-5 text-center">
              <p className="text-sm text-gray-500">Goods Out of Stock</p>
              <p className="text-3xl font-bold text-rose-600 mt-1">{systemReport.outOfStock}</p>
            </div>
          </div>

          {/* Riders / Deliveries / Returns - Clickable Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Riders */}
            <Link to="/admin/riders" className="bg-indigo-50 rounded-2xl p-5 hover:shadow-md transition block">
              <div className="flex items-center gap-2 mb-3">
                <Bike className="text-indigo-600" size={20} />
                <p className="font-semibold text-indigo-900">Riders</p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-2xl font-bold text-indigo-700">{systemReport.totalRiders}</p>
                  <p className="text-xs text-indigo-500">Total</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600">{systemReport.approvedRiders}</p>
                  <p className="text-xs text-indigo-500">Approved</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-600">{systemReport.pendingRiders}</p>
                  <p className="text-xs text-indigo-500">Pending</p>
                </div>
              </div>
            </Link>

            {/* Deliveries */}
            <Link to="/admin/deliveries" className="bg-cyan-50 rounded-2xl p-5 hover:shadow-md transition block">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="text-cyan-600" size={20} />
                <p className="font-semibold text-cyan-900">Deliveries</p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-2xl font-bold text-cyan-700">{systemReport.totalDeliveries}</p>
                  <p className="text-xs text-cyan-500">Total</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600">{systemReport.deliveredCount}</p>
                  <p className="text-xs text-cyan-500">Delivered</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-600">{systemReport.inTransitCount}</p>
                  <p className="text-xs text-cyan-500">In Transit</p>
                </div>
              </div>
            </Link>

            {/* Returns */}
            <Link to="/admin/returns" className="bg-rose-50 rounded-2xl p-5 hover:shadow-md transition block">
              <div className="flex items-center gap-2 mb-3">
                <RotateCcw className="text-rose-600" size={20} />
                <p className="font-semibold text-rose-900">Returns</p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-2xl font-bold text-rose-700">{systemReport.totalReturns}</p>
                  <p className="text-xs text-rose-500">Total</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-600">{systemReport.pendingReturns}</p>
                  <p className="text-xs text-rose-500">Pending</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600">{systemReport.refundedReturns}</p>
                  <p className="text-xs text-rose-500">Refunded</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Goods per Category */}
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Number of Goods per Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {systemReport.categoryStats.map((cat, idx) => (
              <div key={cat.name} className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{cat.name}</p>
                  <p className="text-lg font-bold text-orange-600">{cat.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-gray-50">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>
            <div className="flex items-end gap-3 h-64">
              {[4000, 3000, 5000, 2780, 1890, 2390, 3490].map((sales, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-orange-500 rounded-t-lg transition-all"
                    style={{ height: `${(sales / 5000) * 100}%` }}
                  />
                  <span className="text-xs text-gray-500">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales by Category</h3>
            <div className="space-y-4">
              {systemReport.categoryStats.slice(0, 5).map((cat, idx) => (
                <div key={cat.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                      <span className="text-gray-600">{cat.name}</span>
                    </div>
                    <span className="font-medium text-gray-900">{cat.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${Math.min(100, (cat.count / Math.max(...systemReport.categoryStats.map(c => c.count), 1)) * 100)}%`, 
                        backgroundColor: COLORS[idx] 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row – Recent Orders + Low Stock + Top Sellers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              <Link to="/admin/orders" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Order ID</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Customer</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Amount</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order._id || order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-orange-600">
                          {order._id?.slice(-6) || order.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {order.customer?.name || order.user?.name || order.customer || 'Customer'}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          KSh {(order.total || order.amount || 0).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status || 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                        No recent orders yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="text-amber-500" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">Low Stock Alert</h3>
              </div>
              <div className="space-y-3">
                {lowStockProducts.length > 0 ? (
                  lowStockProducts.map((product) => (
                    <div key={product._id || product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.seller?.name || product.seller || 'Seller'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-rose-600">{product.stock} left</p>
                        <p className="text-xs text-gray-400">units</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm text-center py-4">No low stock products</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Sellers</h3>
              <div className="space-y-4">
                {topSellers.length > 0 ? (
                  topSellers.map((seller, idx) => (
                    <div key={seller.name} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{seller.name}</p>
                        <p className="text-xs text-gray-500">{seller.sales} products</p>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{seller.revenue}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm text-center py-4">No sellers data yet</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ==================== Recent Deliveries & Returns ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Deliveries */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="text-cyan-600" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">Recent Deliveries</h3>
              </div>
              <Link to="/admin/deliveries" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">ID</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Customer</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentDeliveries.length > 0 ? (
                    recentDeliveries.map((d) => (
                      <tr key={d._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-cyan-600">
                          {d._id?.slice(-6)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {d.customer?.name || 'Customer'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(d.status)}`}>
                            {d.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-10 text-center text-gray-500">
                        No deliveries yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Returns */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RotateCcw className="text-rose-600" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">Recent Returns</h3>
              </div>
              <Link to="/admin/returns" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">ID</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Customer</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentReturns.length > 0 ? (
                    recentReturns.map((r) => (
                      <tr key={r._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-rose-600">
                          {r._id?.slice(-6)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {r.customer?.name || 'Customer'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(r.status)}`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-10 text-center text-gray-500">
                        No returns yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

=======
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, CheckCircle } from 'lucide-react';
import axios from 'axios';

const AdminVerification = () => {
  const [passportFront, setPassportFront] = useState<File | null>(null);
  const [passportBack, setPassportBack] = useState<File | null>(null);
  const [idFront, setIdFront] = useState<File | null>(null);
  const [idBack, setIdBack] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (file: File | null) => void) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleVerify = async () => {
    if (!passportFront || !passportBack || !idFront || !idBack) {
      setError("Please upload all four documents (both sides of Passport and ID)");
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('passportFront', passportFront);
    formData.append('passportBack', passportBack);
    formData.append('idFront', idFront);
    formData.append('idBack', idBack);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/admin/verify',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        
        // Save the verification token from backend
        localStorage.setItem(`admin_verification_token_${user.id}`, response.data.token);

        setSuccess(true);

        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1500);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Verification failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 text-center">
          <Shield className="mx-auto mb-4" size={56} />
          <h1 className="text-3xl font-bold">Admin Verification</h1>
          <p className="mt-2 opacity-90">Secure access for Administrator</p>
        </div>

        <div className="p-8">
          {!success ? (
            <>
              <p className="text-gray-600 mb-8 text-center">
                Upload both sides of your Passport and National ID to continue
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Passport (Front)</label>
                  <input 
                    type="file" 
                    accept="image/*,.pdf" 
                    onChange={(e) => handleFileChange(e, setPassportFront)} 
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3" 
                  />
                  {passportFront && <p className="text-green-600 text-xs mt-1">✓ {passportFront.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Passport (Back)</label>
                  <input 
                    type="file" 
                    accept="image/*,.pdf" 
                    onChange={(e) => handleFileChange(e, setPassportBack)} 
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3" 
                  />
                  {passportBack && <p className="text-green-600 text-xs mt-1">✓ {passportBack.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">National ID (Front)</label>
                  <input 
                    type="file" 
                    accept="image/*,.pdf" 
                    onChange={(e) => handleFileChange(e, setIdFront)} 
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3" 
                  />
                  {idFront && <p className="text-green-600 text-xs mt-1">✓ {idFront.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">National ID (Back)</label>
                  <input 
                    type="file" 
                    accept="image/*,.pdf" 
                    onChange={(e) => handleFileChange(e, setIdBack)} 
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3" 
                  />
                  {idBack && <p className="text-green-600 text-xs mt-1">✓ {idBack.name}</p>}
                </div>
              </div>

              {error && <p className="text-red-600 text-center mt-4">{error}</p>}

              <button
                onClick={handleVerify}
                disabled={uploading}
                className="w-full mt-10 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3"
              >
                {uploading ? "Verifying..." : "Verify & Generate Token"}
              </button>
            </>
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="mx-auto text-green-500 mb-6" size={80} />
              <h3 className="text-2xl font-semibold text-green-600">Verification Successful</h3>
              <p className="text-gray-600 mt-3">Redirecting to Admin Dashboard...</p>
            </div>
          )}
        </div>

        <div className="border-t p-4 text-center">
          <button 
            onClick={() => navigate('/admin/dashboard')} 
            className="text-gray-500 hover:text-gray-700 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={18} /> Back
          </button>
        </div>
>>>>>>> cbfa4a1c5f0c8a894f3e86903e97080616510176
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default AdminDashboard;
=======
export default AdminVerification;
>>>>>>> cbfa4a1c5f0c8a894f3e86903e97080616510176
