import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Zap,
  Heart,
  ChevronRight,
  Filter,
  TrendingUp,
  Clock,
  ShoppingCart,
  ArrowUpDown,
  X,
  SlidersHorizontal,
  Flame,
  Tag,
  Check,
} from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  image?: string;
  category?: string;
  isFlashSale?: boolean;
  flashSalePrice?: number;
  flashSaleStart?: string;
  flashSaleEnd?: string;
  flashSaleStock?: number;
  ratings?: number;
  reviews?: number;
}

const isProductOnDate = (p: Product, dateKey: string) => {
  if (!p?.isFlashSale || !p.flashSalePrice) return false;
  const start = p.flashSaleStart ? new Date(p.flashSaleStart) : null;
  const end = p.flashSaleEnd ? new Date(p.flashSaleEnd) : null;
  if (!start && !end) return false;

  const target = new Date(dateKey);
  target.setHours(0, 0, 0, 0);
  const nextDay = new Date(target);
  nextDay.setDate(nextDay.getDate() + 1);

  const saleStart = start || new Date(0);
  const saleEnd = end || new Date(8640000000000000);

  return saleStart < nextDay && saleEnd >= target;
};

const formatDateKey = (d: Date) => d.toISOString().slice(0, 10);

const formatSlotLabel = (dateKey: string) => {
  const d = new Date(dateKey);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const target = new Date(d);
  target.setHours(0, 0, 0, 0);

  if (target.getTime() === today.getTime())
    return { label: "Today", sub: "Live" };
  if (target.getTime() === tomorrow.getTime())
    return {
      label: "Tomorrow",
      sub: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
    };

  return {
    label: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
    sub: d.toLocaleDateString("en-GB", { weekday: "short" }),
  };
};

function FlashSales() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("popularity");
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [addedToCart, setAddedToCart] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const filterOptions = [
    { id: "express", label: "Express Delivery", icon: Zap },
    { id: "brand", label: "Official Store", icon: Check },
    { id: "under5k", label: "Under KSh 5,000", icon: Tag },
    { id: "under10k", label: "Under KSh 10,000", icon: Tag },
    { id: "toprated", label: "Top Rated", icon: TrendingUp },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        const flashProducts = (res.data || []).filter(
          (p: Product) => p.isFlashSale && p.flashSalePrice
        );
        setProducts(flashProducts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const availableDates = useMemo(() => {
    const dateSet = new Set<string>();
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    products.forEach((p) => {
      const start = p.flashSaleStart ? new Date(p.flashSaleStart) : null;
      const end = p.flashSaleEnd ? new Date(p.flashSaleEnd) : null;
      if (!start && !end) return;

      let current = start ? new Date(start) : new Date(now);
      current.setHours(0, 0, 0, 0);

      const last = end ? new Date(end) : new Date(current);
      last.setDate(last.getDate() + 7);

      let safety = 0;
      while (current <= last && safety < 30) {
        if (current >= now) {
          dateSet.add(formatDateKey(current));
        }
        current.setDate(current.getDate() + 1);
        safety++;
      }
    });

    return Array.from(dateSet).sort();
  }, [products]);

  useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
      const todayKey = formatDateKey(new Date());
      if (availableDates.includes(todayKey)) {
        setSelectedDate(todayKey);
      } else {
        setSelectedDate(availableDates[0]);
      }
    }
  }, [availableDates, selectedDate]);

  const dateProducts = useMemo(() => {
    if (!selectedDate) return [];
    return products.filter((p) => isProductOnDate(p, selectedDate));
  }, [products, selectedDate]);

  useEffect(() => {
    const endTimes = dateProducts
      .map((p) => (p.flashSaleEnd ? new Date(p.flashSaleEnd).getTime() : 0))
      .filter((t) => t > Date.now());

    const end =
      endTimes.length > 0
        ? Math.min(...endTimes)
        : Date.now() + 60 * 60 * 1000;

    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [dateProducts]);

  const pad = (n: number) => String(n).padStart(2, "0");

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const addToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem(
      "cart",
      JSON.stringify([
        ...cart,
        {
          ...product,
          price: product.flashSalePrice || product.price,
          isFlashSale: true,
        },
      ])
    );
    setAddedToCart((prev) => [...prev, product._id]);
    setTimeout(() => {
      setAddedToCart((prev) => prev.filter((id) => id !== product._id));
    }, 2000);
  };

  const toggleFilter = (id: string) => {
    setSelectedFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const sorted = [...dateProducts].sort((a, b) => {
    if (sortBy === "price-low")
      return (a.flashSalePrice || a.price) - (b.flashSalePrice || b.price);
    if (sortBy === "price-high")
      return (b.flashSalePrice || b.price) - (a.flashSalePrice || a.price);
    if (sortBy === "discount") {
      const da = ((a.price - (a.flashSalePrice || a.price)) / a.price) * 100;
      const db = ((b.price - (b.flashSalePrice || b.price)) / b.price) * 100;
      return db - da;
    }
    if (sortBy === "ending") {
      const ta = a.flashSaleEnd ? new Date(a.flashSaleEnd).getTime() : Infinity;
      const tb = b.flashSaleEnd ? new Date(b.flashSaleEnd).getTime() : Infinity;
      return ta - tb;
    }
    return 0;
  });

  const totalSaved = dateProducts.reduce(
    (acc, p) => acc + (p.price - (p.flashSalePrice || p.price)),
    0
  );

  const todayKey = formatDateKey(new Date());
  const isLive = selectedDate === todayKey;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ========== HERO ========== */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-red-500">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5 border border-white/30">
                <Flame size={14} className="text-yellow-300" />
                <span className="text-white text-xs font-semibold tracking-wide uppercase">
                  {dateProducts.length} Deals on this day
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                Flash Sales
              </h1>

              <p className="text-orange-100 text-base md:text-lg leading-relaxed">
                Limited-time offers with savings up to{" "}
                <span className="font-bold text-yellow-300">70% off</span>.
                Act fast before stock runs out.
              </p>
            </div>

            <div className="flex flex-col items-center lg:items-end">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={15} className="text-orange-100" />
                <span className="text-orange-100 text-sm font-medium tracking-wide">
                  {isLive ? "Ends in" : "Sale period"}
                </span>
              </div>
              <div className="flex gap-2.5 md:gap-3">
                {[
                  { value: timeLeft.hours, label: "HRS" },
                  { value: timeLeft.minutes, label: "MIN" },
                  { value: timeLeft.seconds, label: "SEC" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="bg-white/15 backdrop-blur-md rounded-2xl w-[72px] h-[72px] md:w-[80px] md:h-[80px] flex items-center justify-center border border-white/25 shadow-lg">
                      <span className="text-2xl md:text-3xl font-bold text-white font-mono tabular-nums">
                        {pad(item.value)}
                      </span>
                    </div>
                    <span className="text-orange-100 text-[10px] md:text-xs mt-2 font-semibold tracking-widest uppercase">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                label: "Total Savings",
                value: `KSh ${totalSaved.toLocaleString()}`,
                icon: Tag,
              },
              { label: "Active Deals", value: dateProducts.length, icon: Zap },
              {
                label: "Categories",
                value: new Set(dateProducts.map((p) => p.category)).size,
                icon: SlidersHorizontal,
              },
              {
                label: "Ending Soon",
                value: Math.min(5, dateProducts.length),
                icon: Clock,
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/15 backdrop-blur-md rounded-2xl px-4 py-3.5 flex items-center gap-3 border border-white/20"
              >
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <stat.icon size={18} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-bold text-base truncate">
                    {stat.value}
                  </p>
                  <p className="text-orange-100 text-xs">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== DATE SLOTS ========== */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-3.5 scrollbar-hide">
            {availableDates.length === 0 ? (
              <p className="text-sm text-slate-500 py-2">
                No upcoming flash sale dates
              </p>
            ) : (
              availableDates.map((dateKey) => {
                const { label, sub } = formatSlotLabel(dateKey);
                const isActive = selectedDate === dateKey;
                const isToday = dateKey === todayKey;
                const count = products.filter((p) =>
                  isProductOnDate(p, dateKey)
                ).length;

                return (
                  <button
                    key={dateKey}
                    onClick={() => setSelectedDate(dateKey)}
                    className={`flex-shrink-0 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all rounded-xl ${
                      isActive
                        ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                        : "text-slate-500 hover:text-orange-600 hover:bg-orange-50 border border-transparent"
                    }`}
                  >
                    <span className="flex flex-col items-center leading-tight gap-0.5">
                      {isToday && isActive ? (
                        <span className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                          </span>
                          <span className="font-semibold">{label}</span>
                        </span>
                      ) : (
                        <>
                          <span
                            className={`text-[11px] font-normal ${
                              isActive ? "text-orange-100" : "text-slate-400"
                            }`}
                          >
                            {sub}
                          </span>
                          <span className={isActive ? "font-semibold" : ""}>
                            {label}
                          </span>
                        </>
                      )}
                      <span
                        className={`text-[10px] ${
                          isActive ? "text-orange-100" : "opacity-70"
                        }`}
                      >
                        {count} deals
                      </span>
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ========== TOOLBAR ========== */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
              showFilters || selectedFilters.length > 0
                ? "bg-orange-50 border-orange-300 text-orange-700"
                : "bg-white border-slate-200 text-slate-600 hover:border-orange-200 hover:bg-orange-50/50"
            }`}
          >
            <SlidersHorizontal size={15} />
            Filters
            {selectedFilters.length > 0 && (
              <span className="bg-orange-500 text-white text-[11px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {selectedFilters.length}
              </span>
            )}
          </button>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Sort by</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-slate-700 cursor-pointer hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
                <option value="ending">Ending Soon</option>
              </select>
              <ArrowUpDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2 text-sm">
                <Filter size={16} className="text-orange-500" />
                Quick Filters
              </h3>
              {selectedFilters.length > 0 && (
                <button
                  onClick={() => setSelectedFilters([])}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((filter) => {
                const isActive = selectedFilters.includes(filter.id);
                return (
                  <button
                    key={filter.id}
                    onClick={() => toggleFilter(filter.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all border ${
                      isActive
                        ? "bg-orange-500 border-orange-500 text-white shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:border-orange-300 hover:bg-orange-50"
                    }`}
                  >
                    <filter.icon size={14} />
                    {filter.label}
                    {isActive && <X size={13} />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ========== PRODUCT GRID ========== */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse"
              >
                <div className="h-48 md:h-52 bg-slate-100" />
                <div className="p-4 space-y-3">
                  <div className="h-3 bg-slate-100 rounded w-1/3" />
                  <div className="h-4 bg-slate-100 rounded w-full" />
                  <div className="h-4 bg-slate-100 rounded w-2/3" />
                  <div className="h-6 bg-slate-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap size={32} className="text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              No Flash Sales on this date
            </h3>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto text-sm leading-relaxed">
              There are no flash sale products for the selected date. Try
              another day.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors text-sm shadow-md shadow-orange-200"
            >
              Browse All Products
              <ChevronRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {sorted.map((product) => {
                const salePrice = product.flashSalePrice || product.price;
                const discount = Math.round(
                  ((product.price - salePrice) / product.price) * 100
                );
                const liked = wishlist.includes(product._id);
                const isAdded = addedToCart.includes(product._id);
                const itemsLeft =
                  product.flashSaleStock ?? product.stock ?? 100;
                const stockPercent = Math.min(100, Math.max(5, itemsLeft));
                const isLowStock = itemsLeft < 20;

                return (
                  <Link
                    key={product._id}
                    to={`/products/${product._id}`}
                    className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/50 hover:-translate-y-1 transition-all duration-300 relative"
                  >
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-orange-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                        −{discount}%
                      </span>
                    </div>

                    <button
                      onClick={(e) => toggleWishlist(product._id, e)}
                      className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm hover:scale-110 transition-all border border-slate-100"
                    >
                      <Heart
                        size={15}
                        className={`transition-colors ${
                          liked
                            ? "fill-red-500 text-red-500"
                            : "text-slate-400 group-hover:text-red-400"
                        }`}
                      />
                    </button>

                    <div className="relative h-44 md:h-52 flex items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
                      <img
                        src={
                          product.image
                            ? `http://localhost:5000${product.image}`
                            : "https://picsum.photos/id/1060/400/400"
                        }
                        alt={product.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-3.5 md:p-4">
                      <span className="inline-flex items-center gap-1 bg-slate-900 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md mb-2">
                        <Check size={9} />
                        Official Store
                      </span>

                      <h3 className="text-sm text-slate-800 line-clamp-2 min-h-[2.5rem] mb-2.5 leading-snug group-hover:text-orange-600 transition-colors font-medium">
                        {product.name}
                      </h3>

                      <div className="mb-3">
                        <p className="text-lg font-bold text-orange-600 tabular-nums">
                          KSh {salePrice.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-slate-400 line-through tabular-nums">
                            KSh {product.price.toLocaleString()}
                          </span>
                          <span className="text-[11px] font-semibold text-orange-700 bg-orange-50 px-1.5 py-0.5 rounded-md">
                            Save KSh{" "}
                            {(product.price - salePrice).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-[11px] font-medium ${
                              isLowStock ? "text-amber-600" : "text-slate-500"
                            }`}
                          >
                            {isLowStock && (
                              <Flame size={10} className="inline mr-0.5" />
                            )}
                            {itemsLeft} left
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {stockPercent}% sold
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isLowStock
                                ? "bg-gradient-to-r from-amber-400 to-orange-500"
                                : "bg-gradient-to-r from-orange-400 to-orange-600"
                            }`}
                            style={{ width: `${stockPercent}%` }}
                          />
                        </div>
                      </div>

                      <button
                        onClick={(e) => addToCart(product, e)}
                        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          isAdded
                            ? "bg-orange-50 text-orange-700 border border-orange-200"
                            : "bg-orange-500 text-white hover:bg-orange-600 shadow-sm shadow-orange-200"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check size={15} />
                            Added
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={15} />
                            Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <div className="inline-flex flex-col items-center gap-2 bg-white rounded-2xl border border-slate-200 px-8 py-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Zap size={15} className="text-orange-500" />
                  Showing {sorted.length} of {dateProducts.length} deals
                </div>
                <p className="text-xs text-slate-400">
                  Select another date above to see more deals
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ========== BOTTOM BANNER ========== */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-14">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 border border-orange-500/30">
            <Flame size={14} />
            Limited Time Only
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
            Don’t Miss These Deals
          </h3>
          <p className="text-slate-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Flash sales are time-limited and stock is limited. Secure your items
            before they’re gone.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/products"
              className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 text-sm shadow-lg shadow-orange-500/25"
            >
              Browse All Products
              <ChevronRight size={16} />
            </Link>
            <a
              href="tel:0796985894"
              className="text-slate-400 hover:text-orange-400 transition-colors text-sm"
            >
              Need help? Call 0796 985 894
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlashSales;