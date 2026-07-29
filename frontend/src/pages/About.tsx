import { Link } from "react-router-dom";
import {
  Shield,
  Lock,
  ShoppingBag,
  TrendingUp,
  Users,
  Package,
  Truck,
  Store,
  Heart,
  Lightbulb,
  Star,
  Target,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

function About() {
  const stats = [
    { icon: Package, value: "10,000+", label: "Products listed" },
    { icon: Store, value: "1,500+", label: "Active vendors" },
    { icon: Users, value: "25,000+", label: "Happy customers" },
    { icon: Truck, value: "Nationwide", label: "Kenya coverage" },
  ];

  const whyUs = [
    {
      icon: Shield,
      title: "Trusted marketplace",
      text: "Transparency and accountability at every step of the transaction.",
    },
    {
      icon: Lock,
      title: "Secure payments",
      text: "M-Pesa-ready checkout and protected buying with confidence.",
    },
    {
      icon: ShoppingBag,
      title: "Simple shopping",
      text: "Clear categories, flash deals, warranties and free gifts in one place.",
    },
    {
      icon: TrendingUp,
      title: "Built for growth",
      text: "Tools that help sellers reach more buyers and scale their business.",
    },
  ];

  const values = [
    { icon: Heart, title: "Trust", text: "Honest, transparent relationships with buyers and sellers." },
    { icon: Lightbulb, title: "Innovation", text: "We keep improving the platform and the experience." },
    { icon: Star, title: "Quality", text: "We promote reliable products and strong customer care." },
    { icon: Target, title: "Customer focus", text: "Smooth journeys from browse to delivery." },
    { icon: Store, title: "Opportunity", text: "Real chances for entrepreneurs and local businesses." },
    { icon: TrendingUp, title: "Growth", text: "Sustainable success for everyone on the platform." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950" />
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/40" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-orange-300 mb-4">
            <Sparkles size={14} />
            Kenya’s modern marketplace
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              ArmorCovers
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A secure, practical marketplace connecting buyers, sellers and
            businesses — built for trust, clarity and everyday commerce in Kenya.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-orange-500/25 transition"
            >
              Explore the shop
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-6 py-3 rounded-xl font-semibold text-sm backdrop-blur-sm transition"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 relative z-10">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-16">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6 text-center"
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <s.icon size={20} />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {s.value}
              </p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24 space-y-16">
        {/* Who we are */}
        <section className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-600 mb-2">
              Who we are
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-5">
              Commerce that feels clear and trustworthy
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
              <p>
                ArmorCovers is a digital marketplace designed so buyers and
                sellers can trade with less friction and more confidence —
                whether you’re shopping for electronics, vehicles, fashion,
                home goods, agriculture or everyday essentials.
              </p>
              <p>
                We focus on practical tools: secure checkout, flash sales,
                product warranties, free gifts, and seller dashboards that
                make listing and fulfilling orders straightforward.
              </p>
              <p>
                Our aim is simple: support local entrepreneurs, give customers
                a reliable place to buy, and grow a marketplace that lasts.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80"
                alt="Shopping experience"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Mission + Vision */}
        <section className="grid md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 sm:p-8">
            <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
              <Target size={22} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our mission</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To run a marketplace where trust, convenience and useful
              technology work together — so buyers shop with confidence and
              sellers grow with clarity.
            </p>
          </div>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-7 sm:p-8 text-white">
            <div className="w-11 h-11 rounded-xl bg-white/10 text-orange-300 flex items-center justify-center mb-4">
              <Sparkles size={22} />
            </div>
            <h3 className="text-xl font-bold mb-3">Our vision</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              To be among Africa’s most trusted digital marketplaces —
              empowering businesses, connecting communities, and making
              everyday commerce simpler through technology.
            </p>
          </div>
        </section>

        {/* Why choose us */}
        <section>
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-600 mb-2">
              Why ArmorCovers
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Built for how people actually buy and sell
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:border-orange-200 hover:shadow-md transition"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                  <item.icon size={20} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Buyers & Sellers */}
        <section className="grid md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
              <ShoppingBag size={20} className="text-orange-500" />
              For buyers
            </h3>
            <p className="text-sm text-slate-500 mb-5">
              Shop with clarity and extras that matter.
            </p>
            <ul className="space-y-3">
              {[
                "Wide range of quality products",
                "Flash sales and competitive prices",
                "Warranties and free gifts on many items",
                "Secure M-Pesa checkout",
                "Sellers you can message directly",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Store size={20} className="text-orange-500" />
              For sellers
            </h3>
            <p className="text-sm text-slate-500 mb-5">
              Tools to list, promote and fulfil with less hassle.
            </p>
            <ul className="space-y-3">
              {[
                "Reach more customers nationwide",
                "Simple product and order management",
                "Flash sales, warranties and free gifts",
                "Higher visibility for your store",
                "Modern seller dashboard",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Core values */}
        <section>
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-600 mb-2">
              Core values
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
              What guides us every day
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              These principles shape how we build the platform and how we treat
              every buyer, seller and partner.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="flex gap-4 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                  <v.icon size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">{v.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-12 sm:px-12 text-center text-white shadow-lg shadow-orange-500/20">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Ready to explore ArmorCovers?
          </h2>
          <p className="text-orange-100 text-sm sm:text-base max-w-lg mx-auto mb-8">
            Browse products, grab flash deals, or open a seller account and
            start listing today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-xl font-semibold text-sm transition"
            >
              Shop now
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-orange-600/30 hover:bg-orange-600/40 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold text-sm transition"
            >
              Become a seller
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;