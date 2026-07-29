import { Link } from "react-router-dom";
import {
  Store,
  CheckCircle2,
  ArrowRight,
  Package,
  Shield,
  Zap,
  Gift,
  LayoutDashboard,
  Users,
  TrendingUp,
  Clock,
  Star,
} from "lucide-react";

function Sell() {
  const steps = [
    {
      title: "Create your account",
      text: "Sign up and verify your details in minutes.",
    },
    {
      title: "Complete your seller profile",
      text: "Add your business name, contact and location.",
    },
    {
      title: "List your products",
      text: "Upload clear photos, set price, stock and description.",
    },
    {
      title: "Add promotions (optional)",
      text: "Run flash sales, offer warranties or free gifts.",
    },
    {
      title: "Fulfil orders & grow",
      text: "Ship on time and keep buyers happy.",
    },
  ];

  const responsibilities = [
    "Accurate product titles, prices, stock levels and images",
    "Honour confirmed orders and agreed delivery timelines",
    "Professional, timely communication with buyers",
    "Only legal and genuine products — no counterfeits",
    "Comply with Kenyan law and ArmorCovers Terms of Service",
  ];

  const benefits = [
    {
      icon: Users,
      title: "Reach buyers nationwide",
      text: "Get discovered by customers across Kenya on a growing marketplace.",
    },
    {
      icon: LayoutDashboard,
      title: "Powerful seller tools",
      text: "Manage products, orders, flash sales and inventory from one dashboard.",
    },
    {
      icon: Zap,
      title: "Boost sales with promotions",
      text: "Run time-limited flash sales and highlight your best deals.",
    },
    {
      icon: Shield,
      title: "Build trust fast",
      text: "Offer warranties and free gifts that increase buyer confidence.",
    },
  ];

  const stats = [
    { value: "Fast setup", label: "Go live in minutes" },
    { value: "0% listing fee", label: "List products free" },
    { value: "Nationwide", label: "Reach all of Kenya" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 text-white">
        {/* subtle decorative glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/15 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/15 border border-orange-400/20 text-orange-300 text-xs font-medium mb-6">
            <Store size={14} />
            ArmorCovers Sellers
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Turn your products into{" "}
            <span className="text-orange-400">sales</span>
          </h1>

          <p className="mt-5 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Join ArmorCovers and sell to buyers across Kenya. Simple tools,
            clear processes, and a marketplace built for growth.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-orange-500/30 transition-all hover:shadow-orange-500/40 hover:-translate-y-0.5"
            >
              Start selling free
              <ArrowRight size={17} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white px-7 py-3.5 rounded-xl font-medium text-sm border border-white/10 transition"
            >
              Already a seller? Log in
            </Link>
          </div>

          {/* Quick stats */}
          <div className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-orange-400 font-bold text-sm sm:text-base">
                  {s.value}
                </p>
                <p className="text-slate-400 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 space-y-20">
        {/* Benefits */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Why sell on ArmorCovers
            </h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
              Everything you need to list, sell and scale — without the complexity.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="group bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4 group-hover:bg-orange-100 transition">
                  <b.icon size={20} />
                </div>
                <h3 className="font-semibold text-slate-900 text-base">
                  {b.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              How to get started
            </h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base">
              Five simple steps from sign-up to your first sale.
            </p>
          </div>

          <div className="space-y-3">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex gap-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:border-orange-200 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0 shadow-sm shadow-orange-500/25">
                  {i + 1}
                </div>
                <div className="pt-1">
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Responsibilities */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={18} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Seller responsibilities
            </h2>
          </div>
          <p className="text-sm text-slate-500 mb-6 ml-11">
            Clear standards keep the marketplace trustworthy for everyone.
          </p>

          <ul className="space-y-3">
            {responsibilities.map((r) => (
              <li
                key={r}
                className="flex items-start gap-3 text-sm text-slate-700"
              >
                <CheckCircle2
                  size={16}
                  className="text-emerald-500 mt-0.5 flex-shrink-0"
                />
                {r}
              </li>
            ))}
          </ul>
        </section>

        {/* Product extras */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-2.5 mb-3">
              <Package size={20} className="text-orange-400" />
              <h2 className="text-xl font-bold">Stand out with product extras</h2>
            </div>
            <p className="text-slate-300 text-sm max-w-lg leading-relaxed mb-6">
              Use these tools from your seller dashboard to increase conversion
              and build buyer confidence.
            </p>

            <div className="flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 bg-orange-500/15 text-orange-300 border border-orange-400/20 px-3.5 py-1.5 rounded-full text-xs font-medium">
                <Zap size={13} /> Flash sales
              </span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/15 text-emerald-300 border border-emerald-400/20 px-3.5 py-1.5 rounded-full text-xs font-medium">
                <Shield size={13} /> Warranties
              </span>
              <span className="inline-flex items-center gap-1.5 bg-violet-500/15 text-violet-300 border border-violet-400/20 px-3.5 py-1.5 rounded-full text-xs font-medium">
                <Gift size={13} /> Free gifts
              </span>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 shadow-sm">
          <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <TrendingUp size={26} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Ready to start selling?
          </h2>
          <p className="mt-3 text-slate-500 text-sm sm:text-base max-w-md mx-auto">
            Create your free seller account today and list your first products
            in minutes.
          </p>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 mt-7 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:-translate-y-0.5"
          >
            Create seller account
            <ArrowRight size={18} />
          </Link>

          <p className="text-xs text-slate-400 mt-4">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
            >
              Log in
            </Link>{" "}
            and open your dashboard.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Sell;