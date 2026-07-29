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

          {/* Legal + Contact — wider so email fits fully */}
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
                  <Mail
                    size={15}
                    className="text-orange-500 flex-shrink-0"
                  />
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

            <div className="flex flex-wrap gap-1.5 mt-4">
              {[
                { label: "Facebook", href: "#" },
                { label: "Instagram", href: "#" },
                { label: "X", href: "#" },
                { label: "TikTok", href: "#" },
                { label: "WhatsApp", href: "https://wa.me/254708540862" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-medium px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-orange-400 hover:border-slate-700 transition"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

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