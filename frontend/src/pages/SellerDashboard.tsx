import { useEffect, useState, useCallback } from "react";
import {
  DollarSign,
  ShoppingBag,
  Package,
  Star,
  TrendingUp,
  MessageSquare,
  Plus,
  Truck,
  Edit,
  Zap,
  X,
  Clock,
  Shield,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

const salesChartData = [
  { name: "Mon", sales: 4000, orders: 24 },
  { name: "Tue", sales: 3000, orders: 18 },
  { name: "Wed", sales: 5000, orders: 32 },
  { name: "Thu", sales: 2780, orders: 15 },
  { name: "Fri", sales: 1890, orders: 12 },
  { name: "Sat", sales: 2390, orders: 20 },
  { name: "Sun", sales: 3490, orders: 28 },
];

const StatCard = ({ title, value, trend, trendUp, icon: Icon }: any) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-1 text-gray-900">{value}</p>
        <p className={`text-sm mt-2 ${trendUp ? "text-emerald-600" : "text-gray-500"}`}>
          {trend}
        </p>
      </div>
      <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
        <Icon size={22} />
      </div>
    </div>
  </div>
);

const QuickActions = ({
  onOpenFlashSale,
  onOpenWarranty,
}: {
  onOpenFlashSale: () => void;
  onOpenWarranty: () => void;
}) => {
  const actions = [
    { title: "Add Product", icon: <Plus size={20} />, path: "/add-product" },
    { title: "Edit Product", icon: <Edit size={20} />, path: "/my-products" },
    { title: "Mark as Shipped", icon: <Truck size={20} />, path: "/my-orders" },
    { title: "Create Flash Sale", icon: <Zap size={20} />, action: onOpenFlashSale },
    { title: "Add Warranty", icon: <Shield size={20} />, action: onOpenWarranty },
    { title: "Warranty Products", icon: <Shield size={20} />, path: "/warranty-products" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {actions.map((action) =>
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
      )}
    </div>
  );
};

const getSellerId = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const id = user._id || user.id || user.userId || "";
  console.log("🔑 Seller ID from localStorage:", id, user);
  return String(id);
};

const matchesSeller = (product: any, sellerId: string) => {
  if (!sellerId) return false;
  const sid =
    product.seller?._id ||
    product.seller?.id ||
    product.seller ||
    null;
  if (!sid) return false;
  return String(sid) === String(sellerId);
};

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    todayEarnings: { value: "KSh 0", trend: "Loading...", trendUp: true },
    pendingOrders: { value: 0, trend: "Need attention", trendUp: false },
    activeProducts: { value: 0, trend: "Loading...", trendUp: true },
    storeRating: { value: "0.0", trend: "0 reviews", trendUp: true },
  });

  const [orders, setOrders] = useState<any[]>([]);
  const [seller, setSeller] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [flashSales, setFlashSales] = useState<any[]>([]);
  const [warrantyProducts, setWarrantyProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showFlashModal, setShowFlashModal] = useState(false);
  const [flashForm, setFlashForm] = useState({
    productId: "",
    flashSalePrice: "",
    flashSaleStart: "",
    flashSaleEnd: "",
    flashSaleStock: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const [showWarrantyModal, setShowWarrantyModal] = useState(false);
  const [warrantyForm, setWarrantyForm] = useState({
    productId: "",
    warrantyMonths: "12",
  });
  const [submittingWarranty, setSubmittingWarranty] = useState(false);

  const loadSellerProducts = useCallback(async () => {
    const sellerId = getSellerId();
    if (!sellerId) {
      console.warn("⚠️ No seller ID found in localStorage");
      return [];
    }

    // 1) Seller-specific endpoint
    try {
      const res = await API.get(`/products/seller/${sellerId}`);
      if (Array.isArray(res.data) && res.data.length > 0) {
        console.log(`✅ Seller endpoint returned ${res.data.length} products`);
        return res.data;
      }
    } catch (err) {
      console.log("Seller endpoint failed, trying filter fallback...");
    }

    // 2) Fetch all + filter by seller
    try {
      const res = await API.get("/products");
      const all = Array.isArray(res.data) ? res.data : [];
      console.log(`📦 Total products in DB: ${all.length}`);
      console.log(
        "Sample seller fields:",
        all.slice(0, 3).map((p: any) => ({ name: p.name, seller: p.seller }))
      );

      const matched = all.filter((p: any) => matchesSeller(p, sellerId));
      console.log(`✅ Matched ${matched.length} products for seller ${sellerId}`);
      return matched;
    } catch (err) {
      console.error("Failed to load products:", err);
      return [];
    }
  }, []);

  const refreshProducts = useCallback(async () => {
    const sellerProducts = await loadSellerProducts();
    setProducts(sellerProducts);
    setFlashSales(
      sellerProducts.filter((p: any) => p.isFlashSale && p.flashSalePrice)
    );
    setWarrantyProducts(
      sellerProducts.filter(
        (p: any) =>
          p.warranty === true ||
          (typeof p.warranty === "number" && p.warranty > 0) ||
          (p.warrantyMonths && p.warrantyMonths > 0)
      )
    );

    setStats((prev) => ({
      ...prev,
      activeProducts: {
        value: sellerProducts.length,
        trend: `${sellerProducts.filter((p: any) => (p.stock || 0) < 5).length} low stock`,
        trendUp: true,
      },
    }));

    return sellerProducts;
  }, [loadSellerProducts]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const sellerId = getSellerId();

        if (!sellerId) {
          navigate("/login");
          return;
        }

        setSeller(user);

        const sellerProducts = await refreshProducts();

        let sellerOrders: any[] = [];
        try {
          const ordersRes = await API.get(`/orders/seller/${sellerId}`);
          sellerOrders = Array.isArray(ordersRes.data) ? ordersRes.data : [];
        } catch {
          try {
            const ordersRes = await API.get("/orders/seller");
            sellerOrders = Array.isArray(ordersRes.data) ? ordersRes.data : [];
          } catch {
            console.log("Orders endpoint not ready yet");
          }
        }

        setOrders(sellerOrders.slice(0, 4));

        const totalEarnings = sellerOrders.reduce(
          (sum: number, o: any) =>
            sum + (o.totalAmount || o.total || o.amount || 0),
          0
        );

        setStats({
          todayEarnings: {
            value: `KSh ${totalEarnings.toLocaleString()}`,
            trend: `${sellerOrders.length} total orders`,
            trendUp: true,
          },
          pendingOrders: {
            value: sellerOrders.filter((o: any) =>
              ["Pending", "Processing"].includes(o.status)
            ).length,
            trend: "Need attention",
            trendUp: false,
          },
          activeProducts: {
            value: sellerProducts.length,
            trend: `${
              sellerProducts.filter((p: any) => (p.stock || 0) < 5).length
            } low stock`,
            trendUp: true,
          },
          storeRating: {
            value: "4.8",
            trend: "Based on reviews",
            trendUp: true,
          },
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Reload when user comes back from Add Product page
    const onFocus = () => {
      refreshProducts();
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [navigate, refreshProducts]);

  const handleCreateFlashSale = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !flashForm.productId ||
      !flashForm.flashSalePrice ||
      !flashForm.flashSaleStart ||
      !flashForm.flashSaleEnd
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setSubmitting(true);
      try {
        await API.put(`/products/${flashForm.productId}/flash-sale`, {
          isFlashSale: true,
          flashSalePrice: Number(flashForm.flashSalePrice),
          flashSaleStart: flashForm.flashSaleStart,
          flashSaleEnd: flashForm.flashSaleEnd,
          flashSaleStock: flashForm.flashSaleStock
            ? Number(flashForm.flashSaleStock)
            : undefined,
        });
      } catch {
        await API.put(`/products/${flashForm.productId}`, {
          isFlashSale: true,
          flashSalePrice: Number(flashForm.flashSalePrice),
          flashSaleStart: flashForm.flashSaleStart,
          flashSaleEnd: flashForm.flashSaleEnd,
          flashSaleStock: flashForm.flashSaleStock
            ? Number(flashForm.flashSaleStock)
            : undefined,
        });
      }

      alert("✅ Flash Sale created successfully!");
      setShowFlashModal(false);
      setFlashForm({
        productId: "",
        flashSalePrice: "",
        flashSaleStart: "",
        flashSaleEnd: "",
        flashSaleStock: "",
      });
      await refreshProducts();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create flash sale.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddWarranty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!warrantyForm.productId || !warrantyForm.warrantyMonths) {
      alert("Please select a product and warranty period");
      return;
    }

    try {
      setSubmittingWarranty(true);
      try {
        await API.put(`/products/${warrantyForm.productId}/warranty`, {
          warranty: true,
          warrantyMonths: Number(warrantyForm.warrantyMonths),
        });
      } catch {
        await API.put(`/products/${warrantyForm.productId}`, {
          warranty: true,
          warrantyMonths: Number(warrantyForm.warrantyMonths),
        });
      }

      alert("✅ Warranty added successfully!");
      setShowWarrantyModal(false);
      setWarrantyForm({ productId: "", warrantyMonths: "12" });
      await refreshProducts();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add warranty.");
    } finally {
      setSubmittingWarranty(false);
    }
  };

  const endFlashSale = async (productId: string) => {
    if (!window.confirm("End this flash sale?")) return;
    try {
      try {
        await API.put(`/products/${productId}/flash-sale`, { isFlashSale: false });
      } catch {
        await API.put(`/products/${productId}`, {
          isFlashSale: false,
          flashSalePrice: null,
        });
      }
      await refreshProducts();
    } catch {
      alert("Failed to end flash sale");
    }
  };

  const removeWarranty = async (productId: string) => {
    if (!window.confirm("Remove warranty from this product?")) return;
    try {
      try {
        await API.put(`/products/${productId}/warranty`, {
          warranty: false,
          warrantyMonths: 0,
        });
      } catch {
        await API.put(`/products/${productId}`, {
          warranty: false,
          warrantyMonths: 0,
        });
      }
      await refreshProducts();
    } catch {
      alert("Failed to remove warranty");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getStatusColor = (status: string): string => {
    const colors: any = {
      Delivered: "bg-emerald-100 text-emerald-700",
      Processing: "bg-blue-100 text-blue-700",
      Shipped: "bg-amber-100 text-amber-700",
      Pending: "bg-gray-100 text-gray-700",
      Cancelled: "bg-rose-100 text-rose-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
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
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
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
                  You have {stats.pendingOrders.value} orders waiting •{" "}
                  {products.length} products
                </p>
                <div className="flex gap-3 mt-4">
                  <Link
                    to="/my-orders"
                    className="inline-block bg-white text-orange-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-orange-50 transition-colors"
                  >
                    View Orders
                  </Link>
                  <button
                    onClick={() => refreshProducts()}
                    className="inline-block bg-white/20 hover:bg-white/30 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                  >
                    Refresh Products
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2.5 rounded-xl text-sm font-medium transition self-start"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
          <div className="absolute right-0 top-0 w-64 h-full opacity-10">
            <ShoppingBag size={256} />
          </div>
        </div>

        <QuickActions
          onOpenFlashSale={() => setShowFlashModal(true)}
          onOpenWarranty={() => setShowWarrantyModal(true)}
        />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Earnings"
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
            title="My Products"
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

        {/* MY PRODUCTS */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Package className="text-orange-500" size={22} />
              <h3 className="text-lg font-semibold text-gray-900">My Products</h3>
            </div>
            <Link
              to="/add-product"
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition"
            >
              <Plus size={16} /> Add Product
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <Package size={40} className="mx-auto mb-3 text-gray-300" />
              <p>No products yet</p>
              <p className="text-sm mt-1">
                Add a product while logged in as seller — it must save your seller ID.
              </p>
              <p className="text-xs mt-2 text-orange-600">
                Tip: Open browser console (F12) and check the seller ID logs.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.slice(0, 8).map((product) => (
                <div
                  key={product._id}
                  className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition"
                >
                  <div className="h-28 bg-gray-50">
                    <img
                      src={
                        product.image
                          ? `http://localhost:5000${product.image}`
                          : "https://via.placeholder.com/300"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                    <p className="text-orange-600 font-bold text-sm mt-1">
                      KSh {product.price?.toLocaleString()}
                    </p>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {product.isFlashSale && (
                        <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-medium">
                          Flash
                        </span>
                      )}
                      {(product.warranty || product.warrantyMonths) && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium">
                          Warranty
                        </span>
                      )}
                      <span className="text-[10px] text-gray-400">
                        Stock: {product.stock ?? 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {products.length > 8 && (
            <div className="mt-4 text-center">
              <Link
                to="/my-products"
                className="text-sm text-orange-600 hover:underline font-medium"
              >
                View all {products.length} products →
              </Link>
            </div>
          )}
        </div>

        {/* ================= FLASH SALES ================= */}
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
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {flashSales.map((product) => (
                <div
                  key={product._id}
                  className="border border-orange-100 bg-orange-50 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-lg font-bold text-orange-600 mt-1">
                        Flash: KSh {product.flashSalePrice?.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <Clock size={12} />
                        Ends:{" "}
                        {product.flashSaleEnd
                          ? new Date(product.flashSaleEnd).toLocaleString()
                          : "—"}
                      </p>
                    </div>
                    <button
                      onClick={() => endFlashSale(product._id)}
                      className="text-xs px-2.5 py-1 bg-rose-100 text-rose-700 rounded-lg"
                    >
                      End
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* WARRANTY */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Shield className="text-orange-500" size={22} />
              <h3 className="text-lg font-semibold text-gray-900">Warranty Products</h3>
            </div>
            <button
              onClick={() => setShowWarrantyModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition"
            >
              <Plus size={16} /> Add Warranty
            </button>
          </div>
          {warrantyProducts.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <Shield size={40} className="mx-auto mb-3 text-gray-300" />
              <p>No products with warranty yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {warrantyProducts.map((product) => (
                <div
                  key={product._id}
                  className="border border-orange-100 bg-orange-50 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-lg font-bold text-orange-600 mt-1 flex items-center gap-1">
                        <Shield size={16} />
                        {product.warrantyMonths || 12} Months
                      </p>
                    </div>
                    <button
                      onClick={() => removeWarranty(product._id)}
                      className="text-xs px-2.5 py-1 bg-rose-100 text-rose-700 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Charts + Orders + Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Sales Performance</h3>
            <div className="flex items-end gap-3 h-48">
              {salesChartData.map((item) => (
                <div key={item.name} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-orange-500 rounded-t-lg"
                    style={{ height: `${(item.sales / 5000) * 100}%` }}
                  />
                  <span className="text-xs text-gray-500">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Order Trends</h3>
            <div className="flex items-end gap-3 h-48">
              {salesChartData.map((item) => (
                <div key={item.name} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-emerald-500 rounded-t-lg"
                    style={{ height: `${(item.orders / 35) * 100}%` }}
                  />
                  <span className="text-xs text-gray-500">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b flex justify-between">
              <h3 className="text-lg font-semibold">Recent Orders</h3>
              <Link to="/my-orders" className="text-sm text-orange-600 font-medium">
                Manage All
              </Link>
            </div>
            <div className="p-6 text-center text-gray-500">
              {orders.length === 0 ? "No recent orders yet" : `${orders.length} orders`}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Latest Reviews</h3>
            <p className="text-sm text-gray-500">Reviews will appear here</p>
          </div>
        </div>
      </div>

      {/* Flash Sale Modal */}
      {showFlashModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setShowFlashModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Zap className="text-orange-500" /> Create Flash Sale
            </h2>
            <form onSubmit={handleCreateFlashSale} className="space-y-4">
              <select
                value={flashForm.productId}
                onChange={(e) =>
                  setFlashForm({ ...flashForm, productId: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-2.5"
                required
              >
                <option value="">Choose a product</option>
                {products.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Flash price"
                value={flashForm.flashSalePrice}
                onChange={(e) =>
                  setFlashForm({ ...flashForm, flashSalePrice: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-2.5"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="datetime-local"
                  value={flashForm.flashSaleStart}
                  onChange={(e) =>
                    setFlashForm({ ...flashForm, flashSaleStart: e.target.value })
                  }
                  className="w-full border rounded-xl px-4 py-2.5"
                  required
                />
                <input
                  type="datetime-local"
                  value={flashForm.flashSaleEnd}
                  onChange={(e) =>
                    setFlashForm({ ...flashForm, flashSaleEnd: e.target.value })
                  }
                  className="w-full border rounded-xl px-4 py-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold"
              >
                {submitting ? "Creating..." : "Create Flash Sale"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Warranty Modal */}
      {showWarrantyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setShowWarrantyModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Shield className="text-orange-500" /> Add Warranty
            </h2>
            <form onSubmit={handleAddWarranty} className="space-y-4">
              <select
                value={warrantyForm.productId}
                onChange={(e) =>
                  setWarrantyForm({ ...warrantyForm, productId: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-2.5"
                required
              >
                <option value="">Choose a product</option>
                {products.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <select
                value={warrantyForm.warrantyMonths}
                onChange={(e) =>
                  setWarrantyForm({
                    ...warrantyForm,
                    warrantyMonths: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-2.5"
              >
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
                <option value="24">24 Months</option>
              </select>
              <button
                type="submit"
                disabled={submittingWarranty}
                className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold"
              >
                {submittingWarranty ? "Saving..." : "Add Warranty"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;