import { Link } from "react-router-dom";
import {
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  CreditCard,
  Truck,
  MessageCircle,
  Shield,
  Gift,
  Search,
  Package,
  HelpCircle,
} from "lucide-react";

function BuyerGuide() {
  const steps = [
    {
      icon: Search,
      title: "Browse & search",
      text: "Explore categories or search for products. Look out for flash sales, warranties and free gifts on listings.",
    },
    {
      icon: ShoppingBag,
      title: "Add to cart",
      text: "Choose quantity and any options, then add items. Review everything in your cart before you checkout.",
    },
    {
      icon: CreditCard,
      title: "Checkout & pay",
      text: "Enter your delivery details, pick Standard or Boda Express, and pay with M-Pesa now or on delivery.",
    },
    {
      icon: Truck,
      title: "Receive your order",
      text: "Stay in touch with the seller, track progress, and confirm delivery. Report any issues quickly.",
    },
  ];

  const responsibilities = [
    "Provide accurate name, phone number and delivery address",
    "Pay only through approved methods (e.g. M-Pesa)",
    "Treat sellers respectfully in chat and WhatsApp",
    "Inspect items on delivery where practical and raise issues promptly",
    "Follow ArmorCovers Terms and community standards",
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/15 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/15 border border-orange-400/20 text-orange-300 text-xs font-medium mb-6">
            <ShoppingBag size={14} />
            ArmorCovers Buyers
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Your guide to{" "}
            <span className="text-orange-400">shopping</span> with confidence
          </h1>

          <p className="mt-5 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know — from browsing products to receiving
            your order — so every purchase feels simple and secure.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-8 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-orange-500/30 transition-all hover:shadow-orange-500/40 hover:-translate-y-0.5"
          >
            Start shopping
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20 space-y-16">
        {/* How buying works */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              How buying works
            </h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-lg mx-auto">
              Four clear steps from discovery to delivery.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="group bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-orange-100 transition">
                    <s.icon size={20} />
                  </div>
                  <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 text-base">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Warranties & free gifts */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Shield size={18} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Warranties & free gifts
            </h2>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed mb-5 max-w-2xl">
            When a seller offers a warranty or free gift, it appears clearly on
            the product page, in your cart, and at checkout. Those benefits are
            part of your order whenever they are shown at the time of purchase.
          </p>

          <div className="flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 px-3.5 py-1.5 rounded-full">
              <Shield size={13} /> Warranty included
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-violet-50 text-violet-700 border border-violet-100 px-3.5 py-1.5 rounded-full">
              <Gift size={13} /> Free gift available
            </span>
          </div>
        </section>

        {/* Buyer responsibilities */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Buyer responsibilities
            </h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-lg mx-auto">
              A fair marketplace works best when every shopper plays their part.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <ul className="space-y-3.5">
              {responsibilities.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-3 text-sm text-slate-700"
                >
                  <CheckCircle2
                    size={17}
                    className="text-emerald-500 mt-0.5 flex-shrink-0"
                  />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contact seller tip */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex gap-4">
              <div className="w-11 h-11 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center flex-shrink-0">
                <MessageCircle size={22} />
              </div>
              <div>
                <p className="font-semibold text-base">Need to talk to a seller?</p>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed max-w-md">
                  Use in-app chat or WhatsApp on the product page for questions
                  about stock, delivery or product details.
                </p>
              </div>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-orange-500/25 transition-all hover:-translate-y-0.5 flex-shrink-0"
            >
              Browse products
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 shadow-sm">
          <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <Package size={26} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Ready to find something great?
          </h2>
          <p className="mt-3 text-slate-500 text-sm sm:text-base max-w-md mx-auto">
            Explore products, deals and trusted sellers — all in one place.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:-translate-y-0.5"
            >
              Start shopping
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-orange-600 px-5 py-3 rounded-xl text-sm font-medium transition"
            >
              <HelpCircle size={16} />
              View FAQ
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BuyerGuide;