import { Link } from "react-router-dom";
import {
  Zap,
  DollarSign,
  Clock,
  MapPin,
  Shield,
  ArrowRight,
  Bike,
  CheckCircle,
  Star,
  Users,
} from "lucide-react";

function BodaExpress() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ================= HERO SECTION ================= */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-5 py-2.5 rounded-full mb-8 text-sm font-medium border border-orange-100">
            <Zap size={18} />
            ArmorCovers Delivery Network
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-gray-900">
            Become a <span className="text-orange-500">Boda Rider</span>
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-500 leading-relaxed">
            Earn money delivering packages across Nairobi. Flexible hours.
            Fast payments. Join hundreds of riders already earning with us.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/rider-register"
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-md"
            >
              Register Now <ArrowRight size={22} />
            </Link>

            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Users size={18} />
              <span>500+ Active Riders</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS BAR ================= */}
      <section className="bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-orange-500">500+</p>
            <p className="text-sm text-gray-500 mt-1">Active Riders</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-500">12K+</p>
            <p className="text-sm text-gray-500 mt-1">Deliveries Done</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-500">Same Day</p>
            <p className="text-sm text-gray-500 mt-1">Delivery Speed</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-500">Daily</p>
            <p className="text-sm text-gray-500 mt-1">Payments</p>
          </div>
        </div>
      </section>

      {/* ================= WHY JOIN ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Why Join ArmorCovers Boda Express?
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            We give you the tools, support and flexibility to earn on your own terms.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
              <DollarSign className="text-orange-500" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Earn Daily</h3>
            <p className="text-gray-600 leading-relaxed">
              Get paid for every successful delivery. Withdraw your earnings anytime through M-Pesa.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
              <Clock className="text-orange-500" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Hours</h3>
            <p className="text-gray-600 leading-relaxed">
              Go online whenever you want. Work mornings, evenings or weekends — no fixed shifts.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
              <MapPin className="text-orange-500" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Nairobi Coverage</h3>
            <p className="text-gray-600 leading-relaxed">
              Deliver within your preferred sub-counties. Choose areas that work best for you.
            </p>
          </div>
        </div>
      </section>

      {/* ================= REQUIREMENTS ================= */}
      <section className="bg-white py-16 md:py-20 border-y">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              What You Need to Join
            </h2>
            <p className="text-gray-500">Simple requirements to get started quickly</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-5 p-6 bg-slate-50 rounded-3xl border border-gray-100">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Shield className="text-orange-500" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-900 mb-1">Valid Documents</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  National ID, Rider License / NTSA Certificate and a clear Passport Photo
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 p-6 bg-slate-50 rounded-3xl border border-gray-100">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Bike className="text-orange-500" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-900 mb-1">Roadworthy Motorcycle</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A working bike with a clear number plate and good overall condition
                </p>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="mt-10 bg-orange-50 border border-orange-100 rounded-3xl p-8">
            <h4 className="font-bold text-lg text-gray-900 mb-5 flex items-center gap-2">
              <CheckCircle className="text-orange-500" size={22} />
              Quick Checklist
            </h4>
            <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs">✓</span>
                National ID
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs">✓</span>
                Rider License / NTSA
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs">✓</span>
                Passport Size Photo
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs">✓</span>
                Working Motorcycle
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            How It Works
          </h2>
          <p className="text-gray-500">Get started in 3 simple steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-md">
              1
            </div>
            <h3 className="text-xl font-bold mb-2">Register</h3>
            <p className="text-gray-600 text-sm">
              Fill the simple form and upload your documents
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-md">
              2
            </div>
            <h3 className="text-xl font-bold mb-2">Get Approved</h3>
            <p className="text-gray-600 text-sm">
              We review your application and activate your account
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-md">
              3
            </div>
            <h3 className="text-xl font-bold mb-2">Start Earning</h3>
            <p className="text-gray-600 text-sm">
              Go online, accept deliveries and get paid
            </p>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-slate-900 py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={18} className="fill-orange-400 text-orange-400" />
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
            Join the growing network of ArmorCovers riders delivering across Nairobi every day.
          </p>

          <Link
            to="/rider-register"
            className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-lg"
          >
            Register as Rider Now <ArrowRight size={22} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default BodaExpress;