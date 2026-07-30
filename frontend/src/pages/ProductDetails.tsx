import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ShoppingCart,
  Minus,
  Plus,
  MessageCircle,
  Zap,
  Clock,
  Shield,
  User,
  Gift,
} from "lucide-react";

interface SellerInfo {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
}

interface FreeGift {
  name: string;
  description?: string;
  image?: string;
}

interface Product {
  _id: string;
  id?: string | number;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  subCategory?: string;
  price: number;
  stock: number;
  image?: string;
  reviews: any[];
  colors?: string[];
  seller?: string | SellerInfo;
  isFlashSale?: boolean;
  flashSalePrice?: number;
  flashSaleStart?: string;
  flashSaleEnd?: string;
  flashSaleStock?: number;
  warranty?: boolean | number | string;
  warrantyMonths?: number;
  hasFreeGift?: boolean;
  gifts?: FreeGift[];
  giftName?: string;
  giftDescription?: string;
  giftImage?: string;
  gift?: {
    name?: string;
    description?: string;
    image?: string;
  };
}

const categories = [
  { name: "Electronics", icon: "🔌" },
  { name: "Vehicles", icon: "🚗" },
  { name: "Fashion", icon: "👕" },
  { name: "Home", icon: "🏠" },
  { name: "Agriculture", icon: "🌾" },
  { name: "Beauty", icon: "💄" },
  { name: "Sports", icon: "⚽" },
  { name: "Health", icon: "🩺" },
  { name: "Stationary", icon: "📝" },
  { name: "Education", icon: "📚" },
];

const API_BASE = "http://localhost:5000";

/** Handles all common image path formats from the backend */
const getImageUrl = (image?: string | null): string => {
  if (!image || !String(image).trim()) {
    return "https://via.placeholder.com/400x300?text=No+Image";
  }
  const img = String(image).trim();

  // Already a full URL
  if (img.startsWith("http://") || img.startsWith("https://")) {
    return img;
  }

  // Absolute path from server root
  if (img.startsWith("/")) {
    return `${API_BASE}${img}`;
  }

  // Relative path (e.g. uploads/xxx.jpg)
  return `${API_BASE}/${img}`;
};

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [filteredRelated, setFilteredRelated] = useState<Product[]>([]);
  const [review, setReview] = useState({ rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const getSubcategory = (p: Product | null): string => {
    if (!p) return "";
    const sub = p.subcategory || p.subCategory || "";
    return sub && sub !== "All" ? sub : "";
  };

  const isOnFlashSale = (p: Product | null) => {
    if (!p?.isFlashSale || !p.flashSalePrice) return false;
    const now = new Date();
    const start = p.flashSaleStart ? new Date(p.flashSaleStart) : null;
    const end = p.flashSaleEnd ? new Date(p.flashSaleEnd) : null;
    if (start && now < start) return false;
    if (end && now > end) return false;
    return true;
  };

  const hasWarranty = (p: Product | null) => {
    if (!p) return false;
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

  const getFreeGifts = (p: Product | null): FreeGift[] => {
    if (!p || p.hasFreeGift === false) return [];

    if (Array.isArray(p.gifts) && p.gifts.length > 0) {
      return p.gifts
        .filter((g) => g && g.name && String(g.name).trim())
        .map((g) => ({
          name: String(g.name).trim(),
          description: g.description ? String(g.description).trim() : "",
          image: g.image || "",
        }));
    }

    if (p.gift?.name) {
      return [
        {
          name: p.gift.name,
          description: p.gift.description || "",
          image: p.gift.image || "",
        },
      ];
    }

    if (p.giftName) {
      return [
        {
          name: p.giftName,
          description: p.giftDescription || "",
          image: p.giftImage || "",
        },
      ];
    }

    return [];
  };

  const getSellerId = (p: Product | null): string | null => {
    if (!p?.seller) return null;
    if (typeof p.seller === "string") return p.seller;
    return p.seller._id || p.seller.id || null;
  };

  const getSellerName = (p: Product | null): string => {
    if (!p?.seller) return "Seller";
    if (typeof p.seller === "object" && p.seller.name) return p.seller.name;
    return "Seller";
  };

  const getSellerPhone = (p: Product | null): string | null => {
    if (!p?.seller || typeof p.seller !== "object") return null;
    const phone = p.seller.phone;
    if (!phone) return null;
    let clean = String(phone).replace(/\D/g, "");
    if (clean.startsWith("0")) clean = "254" + clean.slice(1);
    if (clean.length === 9) clean = "254" + clean;
    return clean;
  };

  useEffect(() => {
    if (!product?.flashSaleEnd || !isOnFlashSale(product)) return;

    const calculateTimeLeft = () => {
      const end = new Date(product.flashSaleEnd!).getTime();
      const now = new Date().getTime();
      const difference = end - now;
      if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(`${API_BASE}/api/products/${id}`);
        setProduct(response.data);
        setQuantity(1);
        setSelectedColor(response.data.colors?.[0] || "Default");

        const relatedRes = await axios.get(`${API_BASE}/api/products`);
        const filtered = (Array.isArray(relatedRes.data) ? relatedRes.data : [])
          .filter((p: any) => p.category === response.data.category && p._id !== id)
          .slice(0, 12);
        setRelatedProducts(filtered);
        setFilteredRelated(filtered);
      } catch (error: any) {
        console.error("Product fetch error:", error.response?.data || error);
        setError("Could not load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (selectedColor) {
      const filtered = relatedProducts.filter(
        (p) => p.colors && p.colors.includes(selectedColor)
      );
      setFilteredRelated(filtered.length > 0 ? filtered : relatedProducts);
    }
  }, [selectedColor, relatedProducts]);

  const handleAddReview = async () => {
    try {
      setSubmitting(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      await axios.post(`${API_BASE}/api/products/${id}/reviews`, {
        ...review,
        name: user.name || "Customer",
      });
      alert("✅ Review Submitted Successfully");
      const response = await axios.get(`${API_BASE}/api/products/${id}`);
      setProduct(response.data);
      setReview({ rating: 5, comment: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  const addToCart = () => {
    if (!product) return;
    const onFlash = isOnFlashSale(product);
    const finalPrice = onFlash ? product.flashSalePrice! : product.price;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.findIndex((item: any) => item._id === product._id);

    if (existing !== -1) {
      cart[existing].quantity = (cart[existing].quantity || 1) + quantity;
    } else {
      cart.push({
        ...product,
        price: finalPrice,
        quantity,
        selectedColor,
        isFlashSale: onFlash,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`✅ Added ${quantity} × ${selectedColor} of ${product.name} to cart!`);
  };

  const chatWithSeller = () => {
    if (!product) return;

    const sellerId = getSellerId(product);
    if (!sellerId) {
      alert("Seller information not available for this product.");
      navigate("/contact");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const buyerId = user._id || user.id || "guest";
    const roomId = `${sellerId}_${buyerId}`;

    navigate(`/chat/${roomId}`, {
      state: {
        sellerId,
        productId: product._id,
        productName: product.name,
        sellerName: getSellerName(product),
      },
    });
  };

  const whatsappSeller = () => {
    if (!product) return;

    const phone = getSellerPhone(product);
    const onFlash = isOnFlashSale(product);
    const price = onFlash ? product.flashSalePrice! : product.price;
    const message = encodeURIComponent(
      `Hi, I'm interested in "${product.name}" on ArmorCovers.\nPrice: KSh ${Number(price).toLocaleString()}`
    );

    if (phone) {
      window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    } else {
      const openAnyway = window.confirm(
        "This seller has not added a WhatsApp number yet.\n\nOpen WhatsApp with a pre-filled message anyway?"
      );
      if (openAnyway) {
        window.open(`https://wa.me/?text=${message}`, "_blank");
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen flex justify-center items-center text-lg font-medium text-slate-600">
        Loading Product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col justify-center items-center text-center px-6 py-16">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-3">Product Not Found</h2>
        <p className="text-slate-500 mb-6 max-w-sm text-sm">{error}</p>
        <Link
          to="/products"
          className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition text-sm"
        >
          ← Back to Shop
        </Link>
      </div>
    );
  }

  const onFlash = isOnFlashSale(product);
  const onWarranty = hasWarranty(product);
  const displayPrice = onFlash ? product.flashSalePrice! : product.price;
  const sellerId = getSellerId(product);
  const sellerName = getSellerName(product);
  const freeGifts = getFreeGifts(product);
  const hasGifts = freeGifts.length > 0;
  const subcategory = getSubcategory(product);

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-orange-500 mb-6 hover:underline text-sm font-medium"
        >
          ← Back to Shop
        </Link>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Image + Free Gifts */}
              <div className="space-y-4">
                <div className="relative group">
                  <div className="bg-white rounded-2xl shadow-sm p-3 overflow-hidden border border-slate-100">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/400x300?text=No+Image";
                      }}
                    />

                    <div className="absolute top-5 left-5 flex flex-col gap-1.5">
                      {onFlash && (
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                          <Zap size={12} fill="white" />
                          FLASH SALE
                        </div>
                      )}
                      {onWarranty && (
                        <div className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                          <Shield size={12} />
                          {getWarrantyLabel(product)}
                        </div>
                      )}
                      {hasGifts && (
                        <div className="bg-purple-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                          <Gift size={12} />
                          {freeGifts.length > 1
                            ? `${freeGifts.length} FREE GIFTS`
                            : "FREE GIFT"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {hasGifts && (
                  <div className="space-y-3">
                    {freeGifts.map((gift, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-purple-50 to-orange-50 border-2 border-dashed border-purple-300 rounded-2xl p-4 shadow-sm"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Gift size={16} className="text-purple-600" />
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-purple-600 uppercase tracking-wide">
                              {freeGifts.length > 1
                                ? `Free Gift ${index + 1}`
                                : "Free Gift Included"}
                            </p>
                            <p className="text-xs text-slate-500">With this purchase</p>
                          </div>
                        </div>

                        <div className="flex gap-3 items-start">
                          <img
                            src={getImageUrl(gift.image)}
                            alt={gift.name}
                            className="w-20 h-20 object-cover rounded-xl border border-purple-200 flex-shrink-0"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/80?text=🎁";
                            }}
                          />
                          <div className="min-w-0">
                            <h4 className="font-semibold text-slate-900 text-sm leading-snug">
                              {gift.name}
                            </h4>
                            {gift.description && (
                              <p className="text-xs text-slate-600 mt-1 line-clamp-3 leading-relaxed">
                                {gift.description}
                              </p>
                            )}
                            <p className="text-[11px] font-medium text-purple-600 mt-2">
                              Worth free with your order
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="space-y-5">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block bg-orange-100 text-orange-600 text-[11px] font-semibold px-3 py-1 rounded-full">
                      {product.category || "Uncategorized"}
                    </span>
                    {subcategory && (
                      <span className="inline-block bg-slate-100 text-slate-600 text-[11px] font-semibold px-3 py-1 rounded-full">
                        {subcategory}
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2.5 leading-tight">
                    {product.name}
                  </h1>

                  {sellerId && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                      <User size={14} className="text-orange-500" />
                      <span>
                        Sold by{" "}
                        <span className="font-medium text-slate-800">{sellerName}</span>
                      </span>
                    </div>
                  )}
                </div>

                {onFlash ? (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-400 line-through">
                        KSh {product.price.toLocaleString()}
                      </p>
                      <div className="text-3xl font-bold text-orange-600">
                        KSh {displayPrice.toLocaleString()}
                      </div>
                      <p className="text-xs text-emerald-600 font-medium mt-0.5">
                        You save KSh {(product.price - displayPrice).toLocaleString()}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-3.5">
                      <div className="flex items-center gap-1.5 mb-2 text-orange-700 font-semibold text-sm">
                        <Clock size={14} />
                        <span>Sale ends in:</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-center">
                        {[
                          { v: timeLeft.days, l: "Days" },
                          { v: timeLeft.hours, l: "Hours" },
                          { v: timeLeft.minutes, l: "Mins" },
                          { v: timeLeft.seconds, l: "Secs" },
                        ].map((item) => (
                          <div key={item.l} className="bg-white rounded-lg py-2 shadow-sm">
                            <p className="text-lg font-bold text-orange-600">{item.v}</p>
                            <p className="text-[10px] text-gray-500">{item.l}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-orange-600">
                    KSh {product.price.toLocaleString()}
                  </div>
                )}

                {hasGifts && (
                  <div className="md:hidden space-y-2">
                    {freeGifts.map((gift, index) => (
                      <div
                        key={index}
                        className="bg-purple-50 border border-purple-200 rounded-xl p-3.5 flex items-start gap-3"
                      >
                        <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Gift size={18} className="text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-purple-800 text-sm">
                            Free: {gift.name}
                          </h3>
                          {gift.description && (
                            <p className="text-xs text-purple-700 mt-0.5 leading-relaxed line-clamp-2">
                              {gift.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {onWarranty && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-3">
                    <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield size={18} className="text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-emerald-800 text-sm">
                        {getWarrantyLabel(product)} Official Warranty
                      </h3>
                      <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">
                        Covered against manufacturing defects.{" "}
                        <Link to="/warranty" className="underline font-medium hover:text-emerald-900">
                          View policy
                        </Link>
                      </p>
                    </div>
                  </div>
                )}

                <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
                  {product.description}
                </p>

                <div className="border border-slate-200 rounded-xl p-4">
                  <p className="font-medium text-sm mb-2.5">Quantity</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="w-9 h-9 border border-slate-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="w-9 h-9 border border-slate-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition"
                    >
                      <Plus size={16} />
                    </button>
                    <span className="text-xs text-slate-400 ml-2">
                      {product.stock} in stock
                    </span>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-4">
                  <p className="font-medium text-sm mb-2.5">Available Colors</p>
                  <div className="flex flex-wrap gap-2">
                    {(product.colors || ["Black", "Blue", "Silver", "Red"]).map(
                      (color, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3.5 py-1.5 rounded-lg border text-sm transition-all ${
                            selectedColor === color
                              ? "border-orange-500 bg-orange-50 font-medium text-orange-700"
                              : "border-gray-200 hover:border-gray-300 text-slate-600"
                          }`}
                        >
                          {color}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={addToCart}
                    className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition text-sm ${
                      onFlash
                        ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                        : "bg-orange-500 hover:bg-orange-600 text-white"
                    }`}
                  >
                    <ShoppingCart size={18} />
                    {onFlash ? "Grab Deal" : "Add to Cart"}
                    {hasGifts && (
                      <span className="ml-1 text-xs opacity-90">
                        + {freeGifts.length > 1 ? `${freeGifts.length} Free Gifts` : "Free Gift"}
                      </span>
                    )}
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={chatWithSeller}
                      className={`py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition text-sm ${
                        sellerId
                          ? "border border-blue-500 text-blue-600 hover:bg-blue-50"
                          : "border border-slate-300 text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      <MessageCircle size={18} />
                      Chat
                    </button>
                    <button
                      onClick={whatsappSeller}
                      className="py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition text-sm border border-green-500 text-green-600 hover:bg-green-50"
                    >
                      <span className="text-base">💬</span>
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mt-10 border border-slate-200 rounded-2xl p-6 bg-white">
              <h2 className="text-xl font-bold mb-4">Product Highlights</h2>
              <ul className="grid sm:grid-cols-2 gap-3 text-sm text-slate-600">
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span> Premium Weather-Resistant Materials
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span> Reinforced Stitching & Durable Seams
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span> UV Protection & Fade Resistance
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span> Easy to Clean & Maintain
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>{" "}
                  {onWarranty
                    ? `${getWarrantyLabel(product)} Warranty Included`
                    : "Quality Guaranteed"}
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span> Eco-Friendly Production
                </li>
                {hasGifts &&
                  freeGifts.map((gift, index) => (
                    <li key={index} className="flex gap-2 sm:col-span-2">
                      <span className="text-purple-500">🎁</span>
                      <span className="text-purple-700 font-medium">
                        Free Gift{freeGifts.length > 1 ? ` ${index + 1}` : ""}: {gift.name}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Reviews */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-5">
                Customer Reviews ({product.reviews ? product.reviews.length : 0})
              </h2>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
                <h3 className="font-semibold text-base mb-4">Write a Review</h3>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setReview({ ...review, rating: star })}
                      className="text-2xl text-orange-400 hover:scale-110 transition"
                    >
                      ★
                    </button>
                  ))}
                </div>
                <textarea
                  value={review.comment}
                  onChange={(e) => setReview({ ...review, comment: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 h-28 text-sm"
                  placeholder="Share your experience..."
                />
                <button
                  onClick={handleAddReview}
                  disabled={submitting}
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-semibold transition text-sm"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>

              {product.reviews &&
                product.reviews.length > 0 &&
                product.reviews.map((r, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-slate-100"
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm">{r.name}</p>
                      <p className="text-orange-500 text-base">
                        {"★".repeat(r.rating)}
                      </p>
                    </div>
                    <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                      {r.comment}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-3">
                      {new Date(r.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-6 border border-slate-100">
              {sellerId && (
                <div className="mb-5 p-4 bg-orange-50 border border-orange-100 rounded-xl">
                  <p className="text-xs text-orange-600 font-medium mb-1">Seller</p>
                  <p className="font-semibold text-slate-900">{sellerName}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      onClick={chatWithSeller}
                      className="flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-xs font-medium transition"
                    >
                      <MessageCircle size={14} />
                      Chat
                    </button>
                    <button
                      onClick={whatsappSeller}
                      className="flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-xs font-medium transition"
                    >
                      WhatsApp
                    </button>
                  </div>
                </div>
              )}

              {hasGifts && (
                <div className="mb-5 space-y-3">
                  {freeGifts.map((gift, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-br from-purple-50 to-orange-50 border border-purple-200 rounded-xl"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Gift size={16} className="text-purple-600" />
                        <p className="text-xs font-bold text-purple-600 uppercase">
                          {freeGifts.length > 1 ? `Free Gift ${index + 1}` : "Free Gift"}
                        </p>
                      </div>
                      <p className="font-semibold text-slate-900 text-sm">{gift.name}</p>
                      {gift.description && (
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                          {gift.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <h3 className="font-bold text-lg mb-4 text-gray-900">Shop by Category</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {categories.map((cat, index) => (
                  <Link
                    key={index}
                    to={`/category/${encodeURIComponent(cat.name)}`}
                    className="bg-slate-50 hover:bg-orange-50 p-3.5 rounded-xl text-center transition flex flex-col items-center"
                  >
                    <span className="text-2xl mb-1.5">{cat.icon}</span>
                    <p className="font-medium text-xs">{cat.name}</p>
                  </Link>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <h4 className="font-semibold text-sm mb-3">Why Choose Us?</h4>
                <ul className="space-y-2.5 text-xs text-gray-600">
                  <li>✅ Premium Quality Guaranteed</li>
                  <li>✅ Fast Delivery Across Kenya</li>
                  <li>✅ Secure M-Pesa Payments</li>
                  <li>✅ 30-Day Money Back Guarantee</li>
                  {onWarranty && (
                    <li className="text-emerald-600 font-medium">
                      ✅ {getWarrantyLabel(product)} Warranty Included
                    </li>
                  )}
                  {hasGifts &&
                    freeGifts.map((gift, index) => (
                      <li key={index} className="text-purple-600 font-medium">
                        🎁 Free Gift{freeGifts.length > 1 ? ` ${index + 1}` : ""}: {gift.name}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Related Products {selectedColor && `(${selectedColor})`}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredRelated.map((p) => {
              const relatedGifts = getFreeGifts(p);
              return (
                <Link
                  key={p._id || p.id}
                  to={`/products/${p._id || p.id}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden block group border border-slate-100"
                >
                  <div className="h-28 sm:h-32 bg-gray-50 overflow-hidden relative">
                    <img
                      src={getImageUrl(p.image)}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/200x150?text=No+Image";
                      }}
                    />
                    {relatedGifts.length > 0 && (
                      <div className="absolute top-1.5 left-1.5 bg-purple-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        🎁 {relatedGifts.length > 1 ? `${relatedGifts.length} GIFTS` : "GIFT"}
                      </div>
                    )}
                  </div>
                  <div className="p-2.5">
                    <h3 className="font-medium text-xs line-clamp-2 leading-snug">
                      {p.name}
                    </h3>
                    <p className="text-orange-600 font-bold mt-1 text-sm">
                      KSh {Number(p.price).toLocaleString()}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;