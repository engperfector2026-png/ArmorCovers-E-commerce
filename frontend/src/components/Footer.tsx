import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  ArrowRight,
  Shield,
  FileText,
  Truck,
  Zap,
  UserPlus,
  Bike,
  HelpCircle,
  Store,
} from "lucide-react";

function Footer() {
  const socialLinks = [
    {
      label: "Facebook",
      href: "https://facebook.com",
      color: "hover:bg-[#1877F2] hover:border-[#1877F2]",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://instagram.com",
      color: "hover:bg-gradient-to-br hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af] hover:border-transparent",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      label: "X",
      href: "https://x.com",
      color: "hover:bg-black hover:border-black",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "TikTok",
      href: "https://tiktok.com",
      color: "hover:bg-black hover:border-black",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden>
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003 15.28a6.34 6.34 0 0010.86 4.49V13.1a8.26 8.26 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.13z" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/254708540862",
      color: "hover:bg-[#25D366] hover:border-[#25D366]",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-3">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center">
                <ShoppingBag size={18} />
              </span>
              <span className="text-lg font-bold text-white tracking-tight">
                ArmorCovers
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Kenya’s marketplace for buyers and sellers — secure M-Pesa
              checkout, flash sales, warranties, free gifts and flexible
              delivery.
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-400 hover:text-orange-300 transition"
              >
                Browse shop
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/sell"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-orange-400 transition"
              >
                <UserPlus size={14} />
                Sell with us
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-orange-400 transition">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-400 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-orange-400 transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-orange-400 transition">
                  Help & FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Partners */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
              Partners
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/sell"
                  className="inline-flex items-center gap-2 hover:text-orange-400 transition"
                >
                  <Store size={14} className="text-orange-500 flex-shrink-0" />
                  Become a seller
                </Link>
              </li>
              <li>
                <Link
                  to="/boda-express"
                  className="inline-flex items-center gap-2 hover:text-orange-400 transition"
                >
                  <Bike size={14} className="text-orange-500 flex-shrink-0" />
                  Become a boda partner
                </Link>
              </li>
              <li>
                <Link
                  to="/buyer-guide"
                  className="inline-flex items-center gap-2 hover:text-orange-400 transition"
                >
                  <HelpCircle
                    size={14}
                    className="text-orange-500 flex-shrink-0"
                  />
                  Buyer guide
                </Link>
              </li>
            </ul>
            <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
              Seller, buyer and rider roles and requirements.
            </p>
          </div>

          {/* Delivery */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
              Delivery
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0">
                  <Truck size={15} className="text-orange-500" />
                </span>
                <div>
                  <p className="font-medium text-slate-200">Standard</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Nationwide doorstep delivery
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0">
                  <Zap size={15} className="text-orange-500" />
                </span>
                <div>
                  <p className="font-medium text-slate-200">Boda Express</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Faster local delivery
                  </p>
                </div>
              </li>
            </ul>
            <Link
              to="/boda-express"
              className="inline-flex items-center gap-1 text-[11px] text-orange-400 hover:text-orange-300 mt-3 transition"
            >
              Rider requirements
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* Legal + Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
              Legal & contact
            </h3>
            <ul className="space-y-2.5 text-sm mb-5">
              <li>
                <Link
                  to="/terms"
                  className="inline-flex items-center gap-2 hover:text-orange-400 transition"
                >
                  <FileText size={14} className="text-slate-500" />
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="inline-flex items-center gap-2 hover:text-orange-400 transition"
                >
                  <Shield size={14} className="text-slate-500" />
                  Privacy
                </Link>
              </li>
            </ul>

            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:elijahwagah990@gmail.com"
                  className="flex items-center gap-2 hover:text-orange-400 transition"
                >
                  <Mail size={15} className="text-orange-500 flex-shrink-0" />
                  <span className="text-sm whitespace-nowrap">
                    elijahwagah990@gmail.com
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+254708540862"
                  className="inline-flex items-center gap-2 hover:text-orange-400 transition"
                >
                  <Phone size={15} className="text-orange-500 flex-shrink-0" />
                  +254 708 540 862
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-slate-400">
                <MapPin size={15} className="text-orange-500 flex-shrink-0" />
                Nairobi, Kenya
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ====================== SOCIAL ICONS BAR ====================== */}
      <div className="border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500 mb-6">
            Follow ArmorCovers
          </p>
          <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center transition-all duration-300 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-orange-500/10 ${s.color}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} ArmorCovers Marketplace. All rights
            reserved.
          </p>
          <p className="text-slate-600 text-center sm:text-right">
            Standard &amp; Boda Express · Sellers · Riders · Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;