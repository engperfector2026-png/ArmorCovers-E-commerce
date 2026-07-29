import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ShoppingCart,
  ArrowRight,
  Star,
  Truck,
  Users,
  Shield,
  Award,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Zap,
  Home as HomeIcon,
  Heart,
} from "lucide-react";

interface SellerInfo {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock?: number;
  image?: string;
  category?: string;
  seller?: string | SellerInfo;
  isFlashSale?: boolean;
  flashSalePrice?: number;
  flashSaleStart?: string;
  flashSaleEnd?: string;
  flashSaleStock?: number;
  warranty?: boolean | number | string;
  warrantyMonths?: number;
}

const heroImage = "https://picsum.photos/id/1060/1920/1080";

const storeHighlights = [
  { image: "https://picsum.photos/id/1077/1200/800", title: "Vehicle ArmorCovers", desc: "Heavy-duty protection for modern cars & SUVs" },
  { image: "https://picsum.photos/id/201/1200/800", title: "Premium Seat Covers", desc: "Luxury & durability for your interior" },
  { image: "https://picsum.photos/id/367/1200/800", title: "Electronics & Gadgets", desc: "Latest smartphones, laptops & accessories" },
  { image: "https://picsum.photos/id/1060/1200/800", title: "Home & Living", desc: "Modern furniture & lifestyle products" },
  { image: "https://picsum.photos/id/133/1200/800", title: "Motorcycle & Outdoor", desc: "All-weather protection built tough" },
];

const testimonials = [
  { name: "Elijah Rakoro", location: "Homa Bay ", text: "The quality of products here is unmatched. Fast delivery and excellent service!", rating: 5 },
  { name: "Hedricks Nagweya", location: "Kakamega", text: "I found everything I needed in one place. Highly recommended marketplace.", rating: 5 },
  { name: "Elline", location: "Nairobi", text: "Beautiful products and very reliable. My go-to platform now.", rating: 4 },
  { name: "Mary Kyalo", location: "Nairobi", text: "Great variety from electronics to home items. Very satisfied customer.", rating: 5 },
];

const isOnFlashSale = (p: Product) => {
  if (!p?.isFlashSale || !p.flashSalePrice) return false;
  const now = new Date();
  const start = p.flashSaleStart ? new Date(p.flashSaleStart) : null;
  const end = p.flashSaleEnd ? new Date(p.flashSaleEnd) : null;
  if (start && now < start) return false;
  if (end && now > end) return false;
  return true;
};

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

const getSellerName = (p: Product) => {
  if (!p.seller) return null;
  if (typeof p.seller === "object" && p.seller.name) return p.seller.name;
  return null;
};

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [currentStoreSlide, setCurrentStoreSlide] = useState(0);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentStoreSlide((prev) => (prev + 1) % storeHighlights.length),
      4000
    );
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Backend populates seller: name email phone
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const flashProducts = products.filter(isOnFlashSale);
    const endTimes = flashProducts
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
  }, [products]);

  const flashSaleProducts = products.filter(isOnFlashSale);
  const warrantyProducts = products.filter(hasWarranty);

  const addToCart = (product: Product, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    const onFlash = isOnFlashSale(product);
    const finalPrice = onFlash ? product.flashSalePrice! : product.price;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem(
      "cart",
      JSON.stringify([
        ...cart,
        { ...product, price: finalPrice, isFlashSale: onFlash },
      ])
    );
    alert(`✅ ${product.name} added to cart!`);
  };

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const nextProduct = () =>
    setCurrentProductSlide(
      (prev) => (prev + 1) % Math.max(1, Math.ceil(products.length / 2))
    );
  const prevProduct = () =>
    setCurrentProductSlide(
      (prev) =>
        (prev - 1 + Math.max(1, Math.ceil(products.length / 2))) %
        Math.max(1, Math.ceil(products.length / 2))
    );

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Trust Banner */}
      <div className="bg-orange-600 text-white py-3 text-center text-sm font-medium px-4">
        We deal with Three A's Accuracy . Accountability . Accessibility
      </div>

      {/* Static Hero */}
      <section className="relative h-[75vh] md:h-screen overflow-hidden">
        <img
          src={heroImage}
          alt="ArmorCovers Store"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6 tracking-tight leading-tight">
              HOME OF PLEASURE
            </h1>
            <p className="text-lg md:text-2xl mb-8 md:mb-10 max-w-xl mx-auto">
              Discover premium ArmorCovers, electronics, home &amp; living, vehicles and more
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-white text-orange-600 px-8 md:px-12 py-4 rounded-2xl font-semibold text-lg md:text-xl hover:bg-gray-100 transition"
            >
              Shop Now <ArrowRight size={26} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== FLASH SALES ===================== */}
      {flashSaleProducts.length > 0 && (
        <section className="bg-white py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="bg-[#e31837] text-white rounded-t-2xl px-4 md:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-bold text-lg">
                <span className="bg-yellow-400 text-black rounded-md p-1">
                  <Zap size={18} fill="currentColor" />
                </span>
                Flash Sales | Live Now
              </div>

              <div className="text-sm md:text-base font-semibold tracking-wide">
                Time Left:{" "}
                <span className="font-mono">
                  {pad(timeLeft.hours)}h : {pad(timeLeft.minutes)}m :{" "}
                  {pad(timeLeft.seconds)}s
                </span>
              </div>

              <Link
                to="/flash-sales"
                className="text-sm font-medium hover:underline flex items-center gap-1"
              >
                See All <ArrowRight size={16} />
              </Link>
            </div>

            <div className="border border-t-0 border-gray-200 rounded-b-2xl bg-white overflow-x-auto">
              <div className="flex gap-0 min-w-max md:min-w-0 md:grid md:grid-cols-3 lg:grid-cols-6">
                {flashSaleProducts.slice(0, 6).map((product) => {
                  const discount = Math.round(
                    ((product.price - (product.flashSalePrice || product.price)) /
                      product.price) *
                      100
                  );
                  const itemsLeft =
                    product.flashSaleStock ?? product.stock ?? 100;
                  const stockPercent = Math.min(100, Math.max(5, itemsLeft));
                  const sellerName = getSellerName(product);

                  return (
                    <Link
                      key={product._id}
                      to={`/products/${product._id}`}
                      className="flex-shrink-0 w-44 md:w-auto border-r border-gray-100 last:border-r-0 p-3 hover:shadow-md transition bg-white"
                    >
                      <div className="relative mb-3">
                        <img
                          src={
                            product.image
                              ? `http://localhost:5000${product.image}`
                              : "https://picsum.photos/id/1060/400/400"
                          }
                          alt={product.name}
                          className="w-full h-36 object-contain"
                        />
                        <span className="absolute top-1 right-1 bg-orange-100 text-orange-600 text-xs font-bold px-1.5 py-0.5 rounded">
                          -{discount}%
                        </span>
                      </div>

                      <p className="text-sm text-gray-800 line-clamp-2 min-h-[2.5rem] mb-0.5">
                        {product.name}
                      </p>

                      {sellerName && (
                        <p className="text-[10px] text-slate-400 mb-1 truncate">
                          by <span className="text-slate-600 font-medium">{sellerName}</span>
                        </p>
                      )}

                      <p className="text-base font-bold text-gray-900">
                        KSh {(product.flashSalePrice || product.price).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400 line-through mb-2">
                        KSh {product.price.toLocaleString()}
                      </p>

                      <p className="text-xs text-gray-500 mb-1">
                        {itemsLeft} items left
                      </p>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-500 rounded-full transition-all"
                          style={{ width: `${stockPercent}%` }}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===================== WARRANTY PRODUCTS ===================== */}
      {warrantyProducts.length > 0 && (
        <section className="bg-white py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="bg-emerald-600 text-white rounded-t-2xl px-4 md:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-bold text-lg">
                <span className="bg-white text-emerald-600 rounded-md p-1">
                  <Shield size={18} />
                </span>
                Warranty Products | Protected
              </div>

              <div className="text-sm md:text-base font-semibold tracking-wide">
                Official ArmorCovers Coverage
              </div>

              <Link
                to="/warranty-products"
                className="text-sm font-medium hover:underline flex items-center gap-1"
              >
                See All <ArrowRight size={16} />
              </Link>
            </div>

            <div className="border border-t-0 border-gray-200 rounded-b-2xl bg-white overflow-x-auto">
              <div className="flex gap-0 min-w-max md:min-w-0 md:grid md:grid-cols-3 lg:grid-cols-6">
                {warrantyProducts.slice(0, 6).map((product) => {
                  const itemsLeft = product.stock ?? 100;
                  const stockPercent = Math.min(100, Math.max(5, itemsLeft));
                  const sellerName = getSellerName(product);

                  return (
                    <Link
                      key={product._id}
                      to={`/products/${product._id}`}
                      className="flex-shrink-0 w-44 md:w-auto border-r border-gray-100 last:border-r-0 p-3 hover:shadow-md transition bg-white"
                    >
                      <div className="relative mb-3">
                        <img
                          src={
                            product.image
                              ? `http://localhost:5000${product.image}`
                              : "https://picsum.photos/id/1060/400/400"
                          }
                          alt={product.name}
                          className="w-full h-36 object-contain"
                        />
                        <span className="absolute top-1 right-1 bg-emerald-100 text-emerald-700 text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <Shield size={10} />
                          {getWarrantyLabel(product)}
                        </span>
                      </div>

                      <p className="text-sm text-gray-800 line-clamp-2 min-h-[2.5rem] mb-0.5">
                        {product.name}
                      </p>

                      {sellerName && (
                        <p className="text-[10px] text-slate-400 mb-1 truncate">
                          by <span className="text-slate-600 font-medium">{sellerName}</span>
                        </p>
                      )}

                      <p className="text-base font-bold text-gray-900">
                        KSh {product.price.toLocaleString()}
                      </p>

                      <p className="text-xs text-emerald-600 font-medium mb-2 flex items-center gap-1">
                        <Shield size={11} />
                        Warranty included
                      </p>

                      <p className="text-xs text-gray-500 mb-1">
                        {itemsLeft} items left
                      </p>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all"
                          style={{ width: `${stockPercent}%` }}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CONTACT BLOCK */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 py-8 md:py-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-white/20">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Get In Touch</h3>
              <p className="text-orange-100">We're here to help you</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              <a
                href="tel:0796985894"
                className="flex items-center gap-4 group hover:scale-105 transition"
              >
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/30">
                  <Phone size={26} className="text-white" />
                </div>
                <div>
                  <p className="text-xs opacity-75">Call Us</p>
                  <p className="font-semibold text-xl">0796 985 894</p>
                </div>
              </a>
              <a
                href="mailto:engperfector2026@gmail.com"
                className="flex items-center gap-4 group hover:scale-105 transition"
              >
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/30">
                  <Mail size={26} className="text-white" />
                </div>
                <div>
                  <p className="text-xs opacity-75">Email Us</p>
                  <p className="font-semibold text-lg break-all">
                    engperfector2026@gmail.com
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white py-6 md:py-8 border-b">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-orange-500">25K+</div>
            <p className="text-sm">Happy Customers</p>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-orange-500">1.5K+</div>
            <p className="text-sm">Active Sellers</p>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-orange-500">47</div>
            <p className="text-sm">Counties</p>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-orange-500">4.9★</div>
            <p className="text-sm">Rating</p>
          </div>
        </div>
      </div>

      {/* MAIN 3-COLUMN LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="font-bold text-xl md:text-2xl mb-6 flex items-center gap-3">
                <Shield className="text-orange-500" size={28} /> Why ArmorCovers?
              </h3>
              <ul className="space-y-6 text-gray-700 text-sm md:text-base">
                <li className="flex gap-4">
                  <Truck size={26} className="text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Fast Delivery</strong>
                    <p>Same day in Roysambu</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Award size={26} className="text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Premium Quality</strong>
                    <p>All categories</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Users size={26} className="text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Local Support</strong>
                    <p>Real Kenyans helping Kenyans</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="font-bold text-lg md:text-xl mb-4">Our Location - Roysambu</h3>
              <div className="h-64 md:h-72 rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.817!2d36.821!3d-1.210!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10a5b5c5b5b5%3A0x5b5b5b5b5b5b5b5b!2sRoysambu%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1721123456789"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* ========== FEATURED PRODUCTS ========== */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
              <Link
                to="/products"
                className="text-orange-500 hover:underline flex items-center gap-2 text-sm md:text-base"
              >
                View All <ArrowRight />
              </Link>
            </div>

            {loading ? (
              <p className="text-center py-12">Loading products...</p>
            ) : (
              <div className="relative">
                <div className="overflow-hidden">
                  <div
                    className="flex gap-3 md:gap-4 transition-transform duration-500"
                    style={{ transform: `translateX(-${currentProductSlide * 100}%)` }}
                  >
                    {products.map((product) => {
                      const onFlash = isOnFlashSale(product);
                      const onWarranty = hasWarranty(product);
                      const displayPrice = onFlash
                        ? product.flashSalePrice!
                        : product.price;
                      const liked = wishlist.includes(product._id);
                      const sellerName = getSellerName(product);

                      return (
                        <div
                          key={product._id}
                          className={`min-w-[46%] sm:min-w-[46%] lg:min-w-[46%] bg-white rounded-2xl shadow-sm overflow-hidden relative border ${
                            onFlash
                              ? "border-orange-300 ring-1 ring-orange-100"
                              : "border-gray-100"
                          }`}
                        >
                          <Link to={`/products/${product._id}`}>
                            <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                              {onFlash && (
                                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow">
                                  <Zap size={10} fill="white" />
                                  SALE
                                </div>
                              )}
                              {onWarranty && (
                                <div className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow">
                                  <Shield size={10} />
                                  {getWarrantyLabel(product)}
                                </div>
                              )}
                            </div>

                            <div className="h-28 sm:h-32 md:h-36 bg-gray-50 overflow-hidden">
                              <img
                                src={
                                  product.image
                                    ? `http://localhost:5000${product.image}`
                                    : "https://picsum.photos/id/1060/600/400"
                                }
                                alt={product.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                              />
                            </div>

                            <div className="p-3">
                              <p className="uppercase text-[10px] text-orange-500 font-medium">
                                {product.category}
                              </p>
                              <h3 className="font-semibold text-sm my-1 line-clamp-2 leading-snug text-slate-800">
                                {product.name}
                              </h3>
                              {sellerName && (
                                <p className="text-[10px] text-slate-400 mb-1 truncate">
                                  by{" "}
                                  <span className="text-slate-600 font-medium">
                                    {sellerName}
                                  </span>
                                </p>
                              )}
                              <div>
                                {onFlash && (
                                  <p className="text-[10px] text-gray-400 line-through">
                                    KSh {product.price.toLocaleString()}
                                  </p>
                                )}
                                <p className="text-base sm:text-lg font-bold text-orange-600">
                                  KSh {displayPrice.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </Link>

                          {/* Icon Actions */}
                          <div className="px-3 pb-3 flex items-center justify-between gap-1.5 border-t border-gray-50">
                            <Link
                              to="/"
                              onClick={(e) => e.stopPropagation()}
                              className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-orange-600 transition"
                              title="Home"
                            >
                              <HomeIcon size={15} />
                            </Link>

                            <Link
                              to="/contact"
                              onClick={(e) => e.stopPropagation()}
                              className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-orange-600 transition"
                              title="Contact"
                            >
                              <Phone size={15} />
                            </Link>

                            <button
                              onClick={(e) => toggleWishlist(product._id, e)}
                              className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition"
                              title="Wishlist"
                            >
                              <Heart
                                size={15}
                                className={
                                  liked
                                    ? "fill-red-500 text-red-500"
                                    : "text-slate-500 hover:text-red-400"
                                }
                              />
                            </button>

                            <button
                              onClick={(e) => addToCart(product, e)}
                              className="w-8 h-8 rounded-xl bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition"
                              title="Add to Cart"
                            >
                              <ShoppingCart size={15} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <button
                  onClick={prevProduct}
                  className="absolute -left-3 md:-left-5 top-1/2 bg-white shadow-xl p-3 rounded-full z-10"
                >
                  <ChevronLeft size={26} />
                </button>
                <button
                  onClick={nextProduct}
                  className="absolute -right-3 md:-right-5 top-1/2 bg-white shadow-xl p-3 rounded-full z-10"
                >
                  <ChevronRight size={26} />
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 order-3 lg:order-3">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-3xl p-6 md:p-9 shadow-xl sticky top-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Home of Pleasure</h3>
              <p className="mb-8 text-sm md:text-base">
                Discover premium products across Electronics, Vehicles, Home &amp; Living and more.
              </p>
              <Link
                to="/products"
                className="block bg-white text-orange-600 py-4 rounded-2xl text-center font-semibold"
              >
                Shop All Categories →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Store Carousel */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">ArmorCovers Store</h2>
            <p className="text-gray-600">Premium modern commodities for every lifestyle</p>
          </div>
          <div className="relative h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl">
            {storeHighlights.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === currentStoreSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                  <h3 className="text-3xl md:text-5xl font-bold mb-3">{item.title}</h3>
                  <p className="text-lg md:text-2xl mb-6 md:mb-8">{item.desc}</p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-3 bg-white text-orange-600 px-8 md:px-10 py-4 rounded-2xl font-semibold hover:bg-gray-100"
                  >
                    Shop Now <ArrowRight size={26} />
                  </Link>
                </div>
              </div>
            ))}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {storeHighlights.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStoreSlide(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentStoreSlide ? "bg-white scale-125" : "bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-6 md:p-8 rounded-3xl shadow">
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, k) => (
                    <Star key={k} className="text-orange-500" size={18} />
                  ))}
                </div>
                <p className="italic text-gray-700 mb-6 text-sm md:text-base">"{t.text}"</p>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-gray-500">{t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;