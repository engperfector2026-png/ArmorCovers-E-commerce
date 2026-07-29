import { Link } from "react-router-dom";
import {
  Zap,
  DollarSign,
  Clock,
  MapPin,
  Shield,
  ArrowRight,
  Bike,
  CheckCircle2,
  Star,
  Users,
  FileText,
  Camera,
} from "lucide-react";

function BodaExpress() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Earn daily",
      text: "Get paid for every successful delivery. Withdraw your earnings anytime through M-Pesa.",
    },
    {
      icon: Clock,
      title: "Flexible hours",
      text: "Go online whenever you want. Work mornings, evenings or weekends — no fixed shifts.",
    },
    {
      icon: MapPin,
      title: "Nairobi coverage",
      text: "Deliver within your preferred sub-counties. Choose areas that work best for you.",
    },
  ];

  const requirements = [
    {
      icon: Shield,
      title: "Valid documents",
      text: "National ID, Rider License / NTSA Certificate and a clear passport photo.",
    },
    {
      icon: Bike,
      title: "Roadworthy motorcycle",
      text: "A working bike with a clear number plate and good overall condition.",
    },
  ];

  const checklist = [
    "National ID",
    "Rider License / NTSA",
    "Passport size photo",
    "Working motorcycle",
  ];

  const steps = [
    {
      num: 1,
      title: "Register",
      text: "Fill the simple form and upload your documents.",
    },
    {
      num: 2,
      title: "Get approved",
      text: "We review your application and activate your account.",
    },
    {
      num: 3,
      title: "Start earning",
      text: "Go online, accept deliveries and get paid.",
    },
  ];

  const stats = [
    { value: "500+", label: "Active riders" },
    { value: "12K+", label: "Deliveries done" },
    { value: "Same day", label: "Delivery speed" },
    { value: "Daily", label: "Payments" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/15 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/15 border border-orange-400/20 text-orange-300 text-xs font-medium mb-6">
            <Zap size={14} />
            ArmorCovers Delivery Network
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Become a{" "}
            <span className="text-orange-400">Boda Rider</span>
          </h1>

          <p className="mt-5 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Earn money delivering packages across Nairobi. Flexible hours.
            Fast payments. Join hundreds of riders already earning with us.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/rider-register"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-orange-500/30 transition-all hover:shadow-orange-500/40 hover:-translate-y-0.5"
            >
              Register now
              <ArrowRight size={17} />
            </Link>
            <div className="inline-flex items-center gap-2 text-slate-400 text-sm px-4 py-2">
              <Users size={16} />
              500+ active riders
            </div>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-orange-400 font-bold text-lg sm:text-xl">
                  {s.value}
                </p>
                <p className="text-slate-400 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 space-y-20">
        {/* Why join */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Why join ArmorCovers Boda Express?
            </h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
              Tools, support and flexibility so you can earn on your own terms.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
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

        {/* Requirements */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              What you need to join
            </h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base">
              Simple requirements to get started quickly.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            {requirements.map((r) => (
              <div
                key={r.title}
                className="flex items-start gap-4 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                  <r.icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-base">
                    {r.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                    {r.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                <CheckCircle2 size={18} />
              </div>
              <h3 className="font-bold text-slate-900">Quick checklist</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {checklist.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 text-sm text-slate-700"
                >
                  <span className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              How it works
            </h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base">
              Get started in three simple steps.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {steps.map((s) => (
              <div
                key={s.num}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm text-center hover:border-orange-200 transition"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white text-lg font-bold flex items-center justify-center shadow-sm shadow-orange-500/25">
                  {s.num}
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

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-12 text-center text-white shadow-lg">
          <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-orange-400 text-orange-400"
                />
              ))}
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to start earning?
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Join the growing network of ArmorCovers riders delivering across
              Nairobi every day.
            </p>

            <Link
              to="/rider-register"
              className="inline-flex items-center gap-2 mt-7 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:-translate-y-0.5"
            >
              Register as rider
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BodaExpress;