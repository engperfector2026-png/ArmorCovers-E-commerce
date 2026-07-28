import { Link } from "react-router-dom";
import {
  Shield,
  CheckCircle,
  Clock,
  Package,
  FileText,
  Phone,
  Mail,
  ArrowRight,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const Warranty = () => {
  const coverageItems = [
    {
      title: "Manufacturing Defects",
      description:
        "Full coverage against defects in materials and workmanship under normal use.",
    },
    {
      title: "Zipper & Stitching Failure",
      description:
        "Free repair or replacement if zippers, seams, or stitching fail within the warranty period.",
    },
    {
      title: "Fabric Tears (Normal Use)",
      description:
        "Coverage for unexpected fabric failure not caused by misuse, sharp objects, or accidents.",
    },
    {
      title: "UV & Weather Protection",
      description:
        "Covers premature fading or degradation of UV-resistant and waterproof coatings.",
    },
  ];

  const notCovered = [
    "Damage from accidents, misuse, or improper storage",
    "Normal wear and tear over time",
    "Modifications or alterations by the customer",
    "Damage caused by extreme weather beyond product rating",
    "Lost or stolen items",
    "Products purchased from unauthorized sellers",
  ];

  const steps = [
    {
      step: "01",
      title: "Contact Support",
      description:
        "Reach out via WhatsApp, email, or phone with your order number and photos of the issue.",
    },
    {
      step: "02",
      title: "Submit Claim",
      description:
        "Our team will review your claim within 24–48 hours and guide you on the next steps.",
    },
    {
      step: "03",
      title: "Resolution",
      description:
        "Approved claims receive free repair, replacement, or store credit — depending on the case.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-b from-orange-50 via-white to-slate-50 border-b border-orange-100">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-6">
            <Shield size={32} className="text-orange-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            ArmorCovers Warranty
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We stand behind the quality of every product we sell. Your protection
            covers are built to last — and so is our commitment to you.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14 space-y-16">
        {/* Warranty Period */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Clock size={28} className="text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                12-Month Limited Warranty
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Every ArmorCovers product comes with a{" "}
                <span className="font-semibold text-orange-600">
                  12-month limited warranty
                </span>{" "}
                from the date of delivery. This covers manufacturing defects and
                material failures under normal use conditions.
              </p>
            </div>
          </div>
        </section>

        {/* What's Covered */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <CheckCircle className="text-orange-600" size={26} />
            What’s Covered
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {coverageItems.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
              >
                <h3 className="font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* What's Not Covered */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <AlertCircle className="text-slate-500" size={26} />
            What’s Not Covered
          </h2>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
            <ul className="space-y-3">
              {notCovered.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How to Claim */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <RefreshCw className="text-orange-600" size={26} />
            How to Make a Warranty Claim
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative"
              >
                <span className="text-4xl font-bold text-orange-100 absolute top-4 right-5">
                  {item.step}
                </span>
                <h3 className="font-semibold text-slate-900 mb-2 relative z-10">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed relative z-10">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* What You’ll Need */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText size={22} className="text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                Documents Required
              </h2>
              <p className="text-slate-600 text-sm">
                To process your claim faster, please prepare the following:
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              "Order number / Invoice",
              "Clear photos of the defect",
              "Proof of purchase date",
            ].map((doc, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3"
              >
                <Package size={18} className="text-orange-500 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-700">{doc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 md:p-10 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Need Help with a Claim?</h2>
              <p className="text-orange-100 leading-relaxed max-w-md">
                Our support team is ready to assist you. Reach out and we’ll
                guide you through the process.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/254796985894"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-6 py-3.5 rounded-xl font-semibold hover:bg-orange-50 transition"
              >
                <Phone size={18} />
                WhatsApp Support
              </a>
              <a
                href="mailto:support@armorcovers.co.ke"
                className="inline-flex items-center justify-center gap-2 bg-white/15 text-white border border-white/30 px-6 py-3.5 rounded-xl font-semibold hover:bg-white/25 transition"
              >
                <Mail size={18} />
                Email Us
              </a>
            </div>
          </div>
        </section>

        {/* Back Link */}
        <div className="text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700 transition"
          >
            Continue Shopping
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Warranty;