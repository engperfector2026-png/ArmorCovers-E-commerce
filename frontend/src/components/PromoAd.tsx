import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, Zap, Shield, Gift, ArrowRight, ExternalLink } from "lucide-react";

interface PromoProduct {
  _id: string;
  name: string;
  price: number;
  image?: string;
  flashSalePrice?: number;
  isFlashSale?: boolean;
  warranty?: boolean | number | string;
  warrantyMonths?: number;
  hasFreeGift?: boolean;
  freeGiftLabel?: string;
  giftName?: string;
  gifts?: { name?: string }[];
}

interface PromoAdProps {
  products: PromoProduct[];
  // How often a new ad can show again after closing (ms)
  cooldown?: number;
  // Delay before first show (ms)
  initialDelay?: number;
}

type PromoType = "flash" | "warranty" | "gift";

function pickPromo(
  products: PromoProduct[]
): { type: PromoType; product: PromoProduct } | null {
  const flash = products.filter((p) => p.isFlashSale && p.flashSalePrice);
  const warranty = products.filter(
    (p) =>
      p.warranty === true ||
      (typeof p.warranty === "number" && p.warranty > 0) ||
      (p.warrantyMonths && p.warrantyMonths > 0)
  );
  const gifts = products.filter(
    (p) => p.hasFreeGift || (p.gifts && p.gifts.length > 0) || p.giftName
  );

  const pool: { type: PromoType; product: PromoProduct }[] = [
    ...flash.map((p) => ({ type: "flash" as const, product: p })),
    ...warranty.map((p) => ({ type: "warranty" as const, product: p })),
    ...gifts.map((p) => ({ type: "gift" as const, product: p })),
  ];

  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

function getGiftLabel(product: PromoProduct) {
  if (product.freeGiftLabel) return product.freeGiftLabel;
  if (product.giftName) return product.giftName;
  if (product.gifts?.[0]?.name) return product.gifts[0].name;
  return "Free Gift";
}

function getWarrantyLabel(product: PromoProduct) {
  if (typeof product.warranty === "number" && product.warranty > 0) {
    return `${product.warranty} Months Warranty`;
  }
  if (product.warrantyMonths && product.warrantyMonths > 0) {
    return `${product.warrantyMonths} Months Warranty`;
  }
  return "Official Warranty";
}

export default function PromoAd({
  products,
  cooldown = 60000, // next ad 60s after close
  initialDelay = 2500,
}: PromoAdProps) {
  const [open, setOpen] = useState(false);
  const [promo, setPromo] = useState<{
    type: PromoType;
    product: PromoProduct;
  } | null>(null);

  useEffect(() => {
    if (!products.length) return;

    let cooldownTimer: ReturnType<typeof setTimeout> | null = null;
    let firstTimer: ReturnType<typeof setTimeout> | null = null;

    const show = () => {
      const next = pickPromo(products);
      if (!next) return;
      setPromo(next);
      setOpen(true);
      // No auto-hide — user must close
    };

    const scheduleNext = () => {
      cooldownTimer = setTimeout(() => {
        show();
      }, cooldown);
    };

    firstTimer = setTimeout(() => {
      show();
    }, initialDelay);

    return () => {
      if (firstTimer) clearTimeout(firstTimer);
      if (cooldownTimer) clearTimeout(cooldownTimer);
    };
  }, [products, cooldown, initialDelay]);

  const handleClose = () => {
    setOpen(false);
    // Schedule next promo after cooldown
    setTimeout(() => {
      const next = pickPromo(products);
      if (next) {
        setPromo(next);
        setOpen(true);
      }
    }, cooldown);
  };

  if (!open || !promo) return null;

  const { type, product } = promo;

  const config = {
    flash: {
      gradient: "from-orange-500 via-red-500 to-rose-600",
      softBg: "from-orange-50 to-red-50",
      icon: <Zap size={28} fill="white" className="text-white" />,
      badge: "⚡ FLASH SALE",
      title: "Limited-Time Flash Deal!",
      subtitle: "Grab this offer before it ends",
      cta: "View Flash Deals",
      pageLink: "/flash-sales", // or "/promotions/flash" — match your route
      pageLabel: "Browse all Flash Sales",
      accent: "text-orange-600",
      btn: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600",
      price: product.flashSalePrice ?? product.price,
      extra: (
        <p className="text-sm text-red-600 font-medium mt-1">
          Was KSh {product.price.toLocaleString()} · Save now
        </p>
      ),
    },
    warranty: {
      gradient: "from-emerald-500 via-teal-500 to-cyan-600",
      softBg: "from-emerald-50 to-teal-50",
      icon: <Shield size={28} className="text-white" />,
      badge: "🛡️ WARRANTY",
      title: "Protected Purchase!",
      subtitle: getWarrantyLabel(product),
      cta: "View Product",
      pageLink: "/warranty",
      pageLabel: "Learn about our Warranty Policy",
      accent: "text-emerald-600",
      btn: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700",
      price: product.price,
      extra: (
        <p className="text-sm text-emerald-700 font-medium mt-1">
          Official warranty included with this item
        </p>
      ),
    },
    gift: {
      gradient: "from-violet-500 via-purple-500 to-fuchsia-600",
      softBg: "from-violet-50 to-purple-50",
      icon: <Gift size={28} className="text-white" />,
      badge: "🎁 FREE GIFT",
      title: "Free Gift With Purchase!",
      subtitle: `Get: ${getGiftLabel(product)}`,
      cta: "Claim This Deal",
      pageLink: `/products/${product._id}`,
      pageLabel: "See gift details on product page",
      accent: "text-violet-600",
      btn: "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700",
      price: product.price,
      extra: (
        <p className="text-sm text-violet-700 font-medium mt-1">
          Free gift included when you buy this product
        </p>
      ),
    },
  }[type];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-title"
    >
      {/* Backdrop — blocks interaction with page */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal card — larger */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        {/* Header bar */}
        <div
          className={`bg-gradient-to-r ${config.gradient} text-white px-5 py-4 flex items-center justify-between`}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              {config.icon}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider opacity-90">
                {config.badge}
              </p>
              <h2 id="promo-title" className="text-lg font-bold leading-tight">
                {config.title}
              </h2>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl hover:bg-white/20 transition"
            aria-label="Close promo"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className={`bg-gradient-to-br ${config.softBg} p-5 sm:p-6`}>
          <div className="flex gap-4 items-start">
            <img
              src={
                product.image
                  ? `http://localhost:5000${product.image}`
                  : "https://via.placeholder.com/120"
              }
              alt={product.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover bg-white shadow-md flex-shrink-0 border border-white"
            />
            <div className="min-w-0 flex-1">
              <p className="text-base sm:text-lg font-bold text-slate-900 line-clamp-2 leading-snug">
                {product.name}
              </p>
              <p className={`text-xl sm:text-2xl font-bold mt-1 ${config.accent}`}>
                KSh {Number(config.price).toLocaleString()}
              </p>
              {config.extra}
            </div>
          </div>

          {/* Primary CTA → product */}
          <Link
            to={`/products/${product._id}`}
            onClick={handleClose}
            className={`mt-5 w-full ${config.btn} text-white py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition shadow-lg text-sm sm:text-base`}
          >
            {config.cta}
            <ArrowRight size={18} />
          </Link>

          {/* Secondary link → Flash / Warranty / Product page */}
          <Link
            to={config.pageLink}
            onClick={handleClose}
            className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 font-medium text-sm transition"
          >
            <ExternalLink size={16} />
            {config.pageLabel}
          </Link>

          <p className="text-center text-xs text-slate-400 mt-4">
            Close this ad to continue browsing
          </p>
        </div>
      </div>
    </div>
  );
}