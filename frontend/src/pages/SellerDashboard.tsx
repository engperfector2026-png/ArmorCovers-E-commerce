import { useEffect, useState } from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  Star, 
  TrendingUp,
  MessageSquare,
  Plus,
  Truck,
  Eye,
  Edit,
  Zap,          // Flash Sale icon
  X,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const salesChartData = [
  { name: 'Mon', sales: 4000, orders: 24 },
  { name: 'Tue', sales: 3000, orders: 18 },
  { name: 'Wed', sales: 5000, orders: 32 },
  { name: 'Thu', sales: 2780, orders: 15 },
  { name: 'Fri', sales: 1890, orders: 12 },
  { name: 'Sat', sales: 2390, orders: 20 },
  { name: 'Sun', sales: 3490, orders: 28 },
];

const StatCard = ({ title, value, trend, trendUp, icon: Icon }: any) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1 text-gray-900">{value}</p>
          <p className={`text-sm mt-2 ${trendUp ? 'text-emerald-600' : 'text-gray-500'}`}>
            {trend}
          </p>
        </div>
        <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
};

const QuickActions = ({ onOpenFlashSale }: { onOpenFlashSale: () => void }) => {
  const actions = [
    { title: 'Add Product', icon: <Plus size={20} />, path: '/add-product' },
    { title: 'Edit Product', icon: <Edit size={20} />, path: '/my-products' },
    { title: 'Mark as Shipped', icon: <Truck size={20} />, path: '/my-orders' },
    { title: 'Create Flash Sale', icon: <Zap size={20} />, action: onOpenFlashSale },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action) => (
        action.path ? (
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
        ) : (
          <button
            key={action.title}
            onClick={action.action}
            className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition flex flex-col items-center gap-3 text-center"
          >
            <div className="w-11 h-11 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
              {action.icon}
            </div>
            <span className="text-sm font-medium text-gray-800">{action.title}</span>
          </button>
        )
      ))}
    </div>
  );
};

const SellerDashboard = () => {
  const [stats, setStats] = useState({
    todayEarnings: { value: 'KSh 0', trend: 'Loading...', trendUp: true },
    pendingOrders: { value: 0, trend: 'Need attention', trendUp: false },
    activeProducts: { value: 0, trend: 'Loading...', trendUp: true },
    storeRating: { value: '0.0', trend: '0 reviews', trendUp: true },
  });

  const [orders, setOrders] = useState<any[]>([]);
  const [seller, setSeller] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [flashSales, setFlashSales] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Flash Sale Modal
  const [showFlashModal, setShowFlashModal] = useState(false);
  const [flashForm, setFlashForm] = useState({
    productId: '',
    flashSalePrice: '',
    flashSaleStart: '',
    flashSaleEnd: '',
    flashSaleStock: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        setSeller(user);

        // Fetch seller products
        const productsRes = await axios.get("http://localhost:5000/api/products", { headers });
        const sellerProducts = (productsRes.data || []).filter(
          (p: any) => p.seller === user._id || p.seller?._id === user._id
        );
        setProducts(sellerProducts);

        // Flash sales = products that currently have isFlashSale = true
        const activeFlash = sellerProducts.filter((p: any) => p.isFlashSale);
        setFlashSales(activeFlash);

        // Fetch seller orders
        let sellerOrders: any[] = [];
        try {
          const ordersRes = await axios.get("http://localhost:5000/api/orders/seller", { headers });
          sellerOrders = ordersRes.data || [];
        } catch (err) {
          console.log("Orders endpoint not ready yet");
        }

        setOrders(sellerOrders.slice(0, 4));

        setStats({
          todayEarnings: { 
            value: `KSh ${(sellerOrders.reduce((sum: number, o: any) => sum + (o.total || 0), 0)).toLocaleString()}`, 
            trend: '+18% vs yesterday', 
            trendUp: true 
          },
          pendingOrders: { 
            value: sellerOrders.filter((o: any) => o.status === 'Pending').length || 0, 
            trend: 'Need attention', 
            trendUp: false 
          },
          activeProducts: { 
            value: sellerProducts.length, 
            trend: `${sellerProducts.filter((p: any) => p.stock < 5).length} low stock`, 
            trendUp: true 
          },
          storeRating: { 
            value: '4.8', 
            trend: '128 reviews', 
            trendUp: true 
          },
        });

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleCreateFlashSale = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flashForm.productId || !flashForm.flashSalePrice || !flashForm.flashSaleStart || !flashForm.flashSaleEnd) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setSubmitting(true);
      await axios.put(
        `http://localhost:5000/api/products/${flashForm.productId}/flash-sale`,
        {
          isFlashSale: true,
          flashSalePrice: Number(flashForm.flashSalePrice),
          flashSaleStart: flashForm.flashSaleStart,
          flashSaleEnd: flashForm.flashSaleEnd,
          flashSaleStock: flashForm.flashSaleStock ? Number(flashForm.flashSaleStock) : undefined,
        },
        { headers }
      );

      alert("Flash Sale created successfully!");
      setShowFlashModal(false);
      setFlashForm({
        productId: '',
        flashSalePrice: '',
        flashSaleStart: '',
        flashSaleEnd: '',
        flashSaleStock: '',
      });

      // Refresh products
      const productsRes = await axios.get("http://localhost:5000/api/products", { headers });
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const sellerProducts = (productsRes.data || []).filter(
        (p: any) => p.seller === user._id || p.seller?._id === user._id
      );
      setProducts(sellerProducts);
      setFlashSales(sellerProducts.filter((p: any) => p.isFlashSale));
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create flash sale. Make sure the backend endpoint exists.");
    } finally {
      setSubmitting(false);
    }
  };

  const endFlashSale = async (productId: string) => {
    if (!window.confirm("End this flash sale?")) return;
    try {
      await axios.put(
        `http://localhost:5000/api/products/${productId}/flash-sale`,
        { isFlashSale: false },
        { headers }
      );
      setFlashSales((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      alert("Failed to end flash sale");
    }
  };

  const getStatusColor = (status: string): string => {
    const colors: any = {
      Delivered: 'bg-emerald-100 text-emerald-700',
      Processing: 'bg-blue-100 text-blue-700',
      Shipped: 'bg-amber-100 text-amber-700',
      Pending: 'bg-gray-100 text-gray-700',
      Cancelled: 'bg-rose-100 text-rose-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading ArmorCovers Store...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/30 overflow-hidden flex-shrink-0">
              {seller?.photo || seller?.avatar ? (
                <img 
                  src={seller.photo || seller.avatar} 
                  alt={seller.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold">
                  {seller?.name?.charAt(0)?.toUpperCase() || "S"}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-2xl font-bold mb-1">
                Good Morning, {seller?.name || "Seller"}!
              </h1>
              <p className="text-orange-100 text-lg font-medium">ArmorCovers Store</p>
              <p className="text-orange-100 mt-1">
                You have {stats.pendingOrders.value} new orders waiting to be processed today.
              </p>
              <Link
                to="/my-orders"
                className="inline-block mt-4 bg-white text-orange-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-orange-50 transition-colors"
              >
                View Orders
              </Link>
            </div>
          </div>
          <div className="absolute right-0 top-0 w-64 h-full opacity-10">
            <ShoppingBag size={256} />
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions onOpenFlashSale={() => setShowFlashModal(true)} />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Today's Earnings"
            value={stats.todayEarnings.value}
            trend={stats.todayEarnings.trend}
            trendUp={stats.todayEarnings.trendUp}
            icon={DollarSign}
          />
          <StatCard
            title="Pending Orders"
            value={stats.pendingOrders.value}
            trend={stats.pendingOrders.trend}
            trendUp={false}
            icon={ShoppingBag}
          />
          <StatCard
            title="Active Products"
            value={stats.activeProducts.value}
            trend={stats.activeProducts.trend}
            trendUp={stats.activeProducts.trendUp}
            icon={Package}
          />
          <StatCard
            title="Store Rating"
            value={stats.storeRating.value}
            trend={stats.storeRating.trend}
            trendUp={stats.storeRating.trendUp}
            icon={Star}
          />
        </div>

        {/* ==================== FLASH SALES SECTION ==================== */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Zap className="text-orange-500" size={22} />
              <h3 className="text-lg font-semibold text-gray-900">Flash Sales</h3>
            </div>
            <button
              onClick={() => setShowFlashModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition"
            >
              <Plus size={16} /> Create Flash Sale
            </button>
          </div>

          {flashSales.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <Zap size={40} className="mx-auto mb-3 text-gray-300" />
              <p>No active flash sales</p>
              <p className="text-sm mt-1">Create one to boost your sales!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {flashSales.map((product) => (
                <div key={product._id} className="border border-orange-100 bg-orange-50 rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Original: <span className="line-through">KSh {product.price?.toLocaleString()}</span>
                      </p>
                      <p className="text-lg font-bold text-orange-600 mt-1">
                        Flash: KSh {product.flashSalePrice?.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <Clock size={12} />
                        Ends: {product.flashSaleEnd ? new Date(product.flashSaleEnd).toLocaleString() : "—"}
                      </p>
                    </div>
                    <button
                      onClick={() => endFlashSale(product._id)}
                      className="text-xs px-2.5 py-1 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 transition"
                    >
                      End
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Sales Performance</h3>
              <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                <TrendingUp size={16} />
                <span>On track (+15%)</span>
              </div>
            </div>
            <div className="flex items-end gap-3 h-48">
              {salesChartData.map((item) => (
                <div key={item.name} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-orange-500 rounded-t-lg transition-all"
                    style={{ height: `${(item.sales / 5000) * 100}%` }}
                  />
                  <span className="text-xs text-gray-500">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Order Trends</h3>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-gray-50">
                <option>This Week</option>
                <option>Last Week</option>
              </select>
            </div>
            <div className="flex items-end gap-3 h-48">
              {salesChartData.map((item) => (
                <div key={item.name} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-emerald-500 rounded-t-lg transition-all"
                    style={{ height: `${(item.orders / 35) * 100}%` }}
                  />
                  <span className="text-xs text-gray-500">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              <Link to="/my-orders" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                Manage All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Order ID</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Product</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Amount</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order._id || order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-orange-600">{order._id || order.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{order.product || order.items?.[0]?.name || 'Product'}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          KSh {(order.total || order.amount || 0).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-sm text-orange-600 hover:text-orange-800 font-medium">View</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                        No recent orders yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Latest Reviews</h3>
              <MessageSquare size={18} className="text-gray-400" />
            </div>
            <div className="space-y-4">
              {[
                { user: 'Alice J.', rating: 5, text: 'Amazing product quality!', product: 'Car Cover XL' },
                { user: 'Bob S.', rating: 4, text: 'Good value for money.', product: 'Bike Cover Pro' },
                { user: 'Carol W.', rating: 5, text: 'Fast shipping, loved it!', product: 'Truck Cover' },
              ].map((review, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{review.user}</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          size={12}
                          className={j < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{review.product}</p>
                  <p className="text-sm text-gray-700">"{review.text}"</p>
                  <button className="mt-2 text-xs text-orange-600 hover:text-orange-700 font-medium">Reply</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ==================== CREATE FLASH SALE MODAL ==================== */}
      {showFlashModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setShowFlashModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-6">
              <Zap className="text-orange-500" size={24} />
              <h2 className="text-xl font-bold text-gray-900">Create Flash Sale</h2>
            </div>

            <form onSubmit={handleCreateFlashSale} className="space-y-4">
              {/* Select Product */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Product *</label>
                <select
                  value={flashForm.productId}
                  onChange={(e) => setFlashForm({ ...flashForm, productId: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Choose a product</option>
                  {products.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name} — KSh {p.price?.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Flash Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Flash Sale Price (KSh) *</label>
                <input
                  type="number"
                  value={flashForm.flashSalePrice}
                  onChange={(e) => setFlashForm({ ...flashForm, flashSalePrice: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g. 2500"
                  required
                  min="1"
                />
              </div>

              {/* Start & End */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time *</label>
                  <input
                    type="datetime-local"
                    value={flashForm.flashSaleStart}
                    onChange={(e) => setFlashForm({ ...flashForm, flashSaleStart: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time *</label>
                  <input
                    type="datetime-local"
                    value={flashForm.flashSaleEnd}
                    onChange={(e) => setFlashForm({ ...flashForm, flashSaleEnd: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>

              {/* Optional limited stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Limited Stock (optional)
                </label>
                <input
                  type="number"
                  value={flashForm.flashSaleStock}
                  onChange={(e) => setFlashForm({ ...flashForm, flashSaleStock: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Leave empty for unlimited"
                  min="1"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-60"
              >
                {submitting ? "Creating..." : "Create Flash Sale"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;