import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.message) {
      alert("Please fill in your name, email and message.");
      return;
    }
    setSubmitting(true);
    // Simulate send — wire to your API later
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 800);
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:bg-white transition";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero */}
      <section className="border-b border-slate-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-3">
            Support
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Get in touch
          </h1>
          <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Questions about an order, selling on ArmorCovers, or partnerships?
            We’re here to help.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 sm:px-8 py-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">Send a message</h2>
                  <p className="text-xs text-slate-500">
                    We typically reply within a few hours on business days
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                {sent ? (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Message sent
                    </h3>
                    <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
                      Thanks for reaching out. We’ll get back to you as soon as
                      we can.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="text-sm font-medium text-orange-600 hover:text-orange-700"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          First name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Last name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="you@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Order, seller account, partnership…"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        className={`${inputClass} resize-none`}
                        placeholder="How can we help?"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-orange-500/20 transition disabled:opacity-60"
                    >
                      {submitting ? (
                        "Sending…"
                      ) : (
                        <>
                          <Send size={18} />
                          Send message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">Location</h3>
                  <p className="text-sm text-slate-500 mt-1">Nairobi, Kenya</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">Email</h3>
                  <a
                    href="mailto:elijahwagah990@gmail.com"
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium mt-1 block break-all"
                  >
                    elijahwagah990@gmail.com
                  </a>
                  <p className="text-xs text-slate-400 mt-1">Usually within 1–2 hours</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">Phone</h3>
                  <a
                    href="tel:+254796985894"
                    className="text-sm text-slate-700 hover:text-orange-600 block mt-1"
                  >
                    +254 796 985 894
                  </a>
                  <a
                    href="tel:+254708540862"
                    className="text-sm text-slate-700 hover:text-orange-600 block"
                  >
                    +254 708 540 862
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">Business hours</h3>
                  <ul className="mt-2 space-y-1 text-sm text-slate-500">
                    <li className="flex justify-between gap-4">
                      <span>Mon – Fri</span>
                      <span className="text-slate-700 font-medium">8:00 AM – 6:00 PM</span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span>Saturday</span>
                      <span className="text-slate-700 font-medium">9:00 AM – 4:00 PM</span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span>Sun & holidays</span>
                      <span className="text-slate-400">Closed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
              <h3 className="font-semibold text-sm mb-2">Prefer to chat with a seller?</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                For product questions, use in-app chat or WhatsApp from the product page — you’ll reach the seller directly.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-300 hover:text-orange-200"
              >
                Browse products
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-12">
          © {new Date().getFullYear()} ArmorCovers Marketplace. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Contact;