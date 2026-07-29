import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  Zap,
  Shield,
  Gift,
  ShoppingBag,
  ArrowRight,
  Lock,
  Package,
  Sparkles,
} from "lucide-react";

interface FreeGift {
  name: string;
  description?: string;
  image?: string;
}

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image?: string;
  quantity?: number;
  isFlashSale?: boolean;
  flashSalePrice?: number;
  flashSaleStart?: string;
  flashSaleEnd?: string;
  originalPrice?: number;
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
  selectedColor?: string;
}

function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const isOnFlashSale = (item: CartItem) => {
    if (!item.isFlashSale || !item.flashSalePrice) return false;
    const now = new Date();
    const start = item.flashSaleStart ? new Date(item.flashSaleStart) : null;
    const end = item.flashSaleEnd ? new Date(item.flashSaleEnd) : null;
    if (start && now < start) return false;
    if (end && now > end) return false;
    return true;
  };

  const hasWarranty = (item: CartItem) => {
    if (item.warranty === true) return true;
    if (typeof item.warranty === "number" && item.warranty > 0) return true;
    if (typeof item.warranty === "string" && item.warranty.trim() !== "") return true;
    if (item.warrantyMonths && item.warrantyMonths > 0) return true;
    return false;
  };

  const getWarrantyLabel = (item: CartItem) => {
    if (typeof item.warranty === "number") return `${item.warranty} Months`;
    if (item.warrantyMonths) return `${item.warrantyMonths} Months`;
    if (typeof item.warranty === "string") return item.warranty;
    return "12 Months";
  };

  const getFreeGifts = (item: CartItem): FreeGift[] => {
    if (item.hasFreeGift === false) return [];

    if (Array.isArray(item.gifts) && item.gifts.length > 0) {
      return item.gifts
        .filter((g) => g && g.name && String(g.name).trim())
        .map((g) => ({
          name: String(g.name).trim(),
          description: g.description ? String(g.description).trim() : "",
          image: g.image || "",
        }));
    }

    if (item.gift?.name) {
      return [
        {
          name: item.gift.name,
          description: item.gift.description || "",
          image: item.gift.image || "",
        },
      ];
    }

    if (item.giftName) {
      return [
        {
          name: item.giftName,
          description: item.giftDescription || "",
          image: item.giftImage || "",
        },
      ];
    }

    return [];
  };

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const itemCount = cart.reduce((n, i) => n + (i.quantity || 1), 0);
  const hasAnyFlash = cart.some(isOnFlashSale);
  const hasAnyWarranty = cart.some(hasWarranty);
  const hasAnyGifts = cart.some((i) => getFreeGifts(i).length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
              ArmorCovers
            </p>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <ShoppingBag size={22} className="text-orange-500" />
              Your cart
            </h1>
          </div>
          {cart.length > 0 && (
            <p className="text-sm text-slate-500">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {cart.length === 0 ? (
          /* Empty state */
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 sm:p-16 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-orange-50 flex items-center justify-center">
              <ShoppingBag size={36} className="text-orange-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              Discover premium products, flash deals, warranties and free gifts on ArmorCovers.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-orange-500/20 transition"
            >
              Browse products
              <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Items */}
            <div className="lg:col-span-7 space-y-4">
              {cart.map((item, index) => {
                const onFlash = isOnFlashSale(item);
                const onWarranty = hasWarranty(item);
                const freeGifts = getFreeGifts(item);
                const hasGifts = freeGifts.length > 0;

                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5 flex gap-4 sm:gap-5 hover:border-slate-200 transition"
                  >
                    {/* Image */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 relative border border-slate-100">
                      {item.image ? (
                        <img
                          src={`http://localhost:5000${item.image}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/300?text=No+Image";
                          }}
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center text-3xl">📦</div>
                      )}
                      <div className="absolute top-1.5 left-1.5 flex flex-col gap-0.5">
                        {onFlash && (
                          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                            <Zap size={9} fill="white" /> SALE
                          </span>
                        )}
                        {onWarranty && (
                          <span className="bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                            <Shield size={9} />
                          </span>
                        )}
                        {hasGifts && (
                          <span className="bg-purple-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                            <Gift size={9} />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-slate-900 text-sm sm:text-base line-clamp-2 leading-snug">
                            {item.name}
                          </h3>
                          {item.selectedColor && (
                            <p className="text-xs text-slate-500 mt-0.5">
                              Color: {item.selectedColor}
                            </p>
                          )}
                        </div>
                        <p className="font-bold text-orange-600 text-sm sm:text-base whitespace-nowrap">
                          KSh {(item.price * (item.quantity || 1)).toLocaleString()}
                        </p>
                      </div>

                      <p className="text-sm text-slate-600 mt-1">
                        KSh {item.price.toLocaleString()}
                        {onFlash && item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-xs text-slate-400 line-through ml-1.5">
                            KSh {item.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-slate-400"> each</span>
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {onFlash && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-orange-50 text-orange-700 px-2 py-0.5 rounded-md border border-orange-100">
                            <Zap size={10} /> Flash sale
                          </span>
                        )}
                        {onWarranty && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-100">
                            <Shield size={10} /> {getWarrantyLabel(item)} warranty
                          </span>
                        )}
                      </div>

                      {hasGifts && (
                        <div className="mt-2 space-y-1">
                          {freeGifts.map((gift, gIndex) => (
                            <div
                              key={gIndex}
                              className="flex items-start gap-2 text-xs bg-purple-50/80 border border-purple-100 rounded-lg px-2.5 py-1.5"
                            >
                              <Gift size={12} className="text-purple-600 mt-0.5 flex-shrink-0" />
                              <div className="min-w-0">
                                <span className="font-medium text-purple-800">
                                  Free: {gift.name}
                                </span>
                                {gift.description && (
                                  <p className="text-purple-600/80 line-clamp-1 mt-0.5">
                                    {gift.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Qty + remove */}
                      <div className="mt-auto pt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                          <button
                            onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}
                            className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 text-slate-600 transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-10 text-center text-sm font-semibold text-slate-900">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}
                            className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 text-slate-600 transition"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-red-600 transition px-2 py-1.5 rounded-lg hover:bg-red-50"
                        >
                          <Trash2 size={15} />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <button
                onClick={() => navigate("/products")}
                className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1.5 py-2"
              >
                ← Continue shopping
              </button>
            </div>

            {/* Summary sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm sticky top-24 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                  <h2 className="font-semibold text-slate-900">Order summary</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {itemCount} {itemCount === 1 ? "item" : "items"} in cart
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-medium text-slate-900">
                      KSh {total.toLocaleString()}
                    </span>
                  </div>

                  {(hasAnyFlash || hasAnyWarranty || hasAnyGifts) && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {hasAnyFlash && (
                        <span className="inline-flex items-center gap-1 text-[11px] bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full border border-orange-100">
                          <Zap size={11} /> Flash deal
                        </span>
                      )}
                      {hasAnyWarranty && (
                        <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-100">
                          <Shield size={11} /> Warranty
                        </span>
                      )}
                      {hasAnyGifts && (
                        <span className="inline-flex items-center gap-1 text-[11px] bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full border border-purple-100">
                          <Gift size={11} /> Free gift(s)
                        </span>
                      )}
                    </div>
                  )}

                  {hasAnyGifts && (
                    <div className="rounded-xl bg-gradient-to-br from-purple-50 to-orange-50 border border-purple-100 px-3.5 py-3 flex gap-2">
                      <Sparkles size={16} className="text-purple-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-purple-800 leading-relaxed">
                        Free gift(s) will be included with your order at no extra cost.
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100 flex justify-between items-baseline">
                    <span className="font-semibold text-slate-900">Total</span>
                    <span className="text-2xl font-bold text-orange-600 tracking-tight">
                      KSh {total.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-orange-500/25 transition"
                  >
                    Proceed to checkout
                    <ArrowRight size={18} />
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Lock size={11} /> Secure checkout
                    </span>
                    <span className="flex items-center gap-1">
                      <Shield size={11} /> Buyer protection
                    </span>
                    <span className="flex items-center gap-1">
                      <Package size={11} /> Tracked delivery
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;