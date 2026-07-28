import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Shield,
  Heart,
  ChevronRight,
  ShoppingCart,
  Check,
  Package,
  Clock,
  FileText,
} from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  image?: string;
  category?: string;
  warranty?: boolean | number | string;
  warrantyMonths?: number;
}

const hasWarranty = (p: Product) => {
  if (p.warranty === true) return true;
  if (typeof p.warranty === "number" && p.warranty > 0) return true;
  if (typeof p.warranty === "string" && p.warranty.trim() !== "") return true;
  if (p.warrantyMonths && p.warrantyMonths > 0) return true;
  return false;
};

const getWarrantyLabel = (p: Product) => {
  if (typeof p.warranty === "number") return `${p.warranty} Months`;
  if (p.warrantyMonths) return `${p.warrantyMonths} Months`;
  if (typeof p.warranty === "string") return p.warranty;
  return "12 Months";
};

function WarrantyProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addedToCart, setAddedToCart] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");

        // ONLY products where the seller has explicitly added warranty
        const withWarranty = (res.data || []).filter(hasWarranty);
        setProducts(withWarranty);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    setAddedToCart((prev) => [...prev, product._id]);
    setTimeout(() => {
      setAddedToCart((prev) => prev.filter((id) => id !== product._id));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ========== HERO ========== */}
      <div className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-white to-slate-50 border-b border-orange-100">
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 bg-orange-100 rounded-full px-3.5 py-1.5 mb-5">
                <Shield size={14} className="text-orange-600" />
                <span className="text-orange-700 text-xs font-semibold tracking-wide uppercase">
                  Protected Products
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 tracking-tight leading-tight">
                Warranty Products
              </h1>

              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                Shop with confidence. These products come with{" "}
                <span className="font-semibold text-orange-600">
                  official ArmorCovers warranty
                </span>{" "}
                coverage for your peace of mind.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/warranty"
                className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-orange-700 transition text-sm"
              >
                <FileText size={18} />
                View Warranty Policy
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              {
                label: "Products Covered",
                value: products.length,
                icon: Package,
              },
              {
                label: "Standard Coverage",
                value: "12 Months",
                icon: Clock,
              },
              {
                label: "Claim Support",
                value: "24–48 hrs",
                icon: Shield,
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-xl px-4 py-3.5 flex items-center gap-3 border border-slate-200 shadow-sm"
              >
                <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <stat.icon size={18} className="text-orange-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-slate-900 font-semibold text-base truncate">
                    {stat.value}
                  </p>
                  <p className="text-slate-500 text-xs">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== PRODUCT GRID ========== */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 pb-16">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-100 overflow-hidden animate-pulse"
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
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield size={32} className="text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              No Warranty Products Yet
            </h3>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto text-sm leading-relaxed">
              Products will appear here only after a seller adds warranty
              coverage from their dashboard.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm"
            >
              Browse All Products
              <ChevronRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-800">
                  {products.length}
                </span>{" "}
                products with warranty
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {products.map((product) => {
                const liked = wishlist.includes(product._id);
                const isAdded = addedToCart.includes(product._id);

                return (
                  <Link
                    key={product._id}
                    to={`/products/${product._id}`}
                    className="group bg-white rounded-xl border border-slate-100 overflow-hidden hover:border-slate-200 hover:shadow-lg hover:shadow-slate-200/60 hover:-translate-y-0.5 transition-all duration-300 relative"
                  >
                    {/* Warranty Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1 bg-orange-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
                        <Shield size={11} />
                        {getWarrantyLabel(product)}
                      </span>
                    </div>

                    {/* Wishlist */}
                    <button
                      onClick={(e) => toggleWishlist(product._id, e)}
                      className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm hover:scale-105 transition-all border border-slate-100"
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

                    {/* Image */}
                    <div className="relative h-44 md:h-52 flex items-center justify-center p-4 bg-slate-50/80 overflow-hidden">
                      <img
                        src={
                          product.image
                            ? `http://localhost:5000${product.image}`
                            : "https://picsum.photos/id/1060/400/400"
                        }
                        alt={product.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-3.5 md:p-4">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-1.5 py-0.5 rounded mb-2">
                        <Check size={9} />
                        Warranty Included
                      </span>

                      <h3 className="text-sm text-slate-800 line-clamp-2 min-h-[2.5rem] mb-2.5 leading-snug group-hover:text-orange-700 transition-colors">
                        {product.name}
                      </h3>

                      <div className="mb-3">
                        <p className="text-lg font-bold text-slate-900 tabular-nums">
                          KSh {product.price.toLocaleString()}
                        </p>
                        {product.category && (
                          <p className="text-xs text-slate-400 mt-0.5">
                            {product.category}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={(e) => addToCart(product, e)}
                        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                          isAdded
                            ? "bg-orange-50 text-orange-700 border border-orange-200"
                            : "bg-orange-600 text-white hover:bg-orange-700"
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
          </>
        )}
      </div>

      {/* ========== BOTTOM CTA ========== */}
      <div className="bg-slate-900 py-14">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3 tracking-tight">
            Shop with Confidence
          </h3>
          <p className="text-slate-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Every product on this page is backed by the official ArmorCovers
            warranty policy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/warranty"
              className="bg-white text-slate-900 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors flex items-center gap-2 text-sm"
            >
              <Shield size={16} />
              Read Full Warranty Policy
            </Link>
            <Link
              to="/products"
              className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1"
            >
              Browse All Products
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WarrantyProducts;