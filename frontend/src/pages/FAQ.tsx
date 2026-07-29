import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  ArrowRight,
  ShoppingBag,
  Store,
} from "lucide-react";

const faqs = [
  {
    category: "Orders & payment",
    items: [
      {
        q: "How do I pay on ArmorCovers?",
        a: "You can pay with M-Pesa during checkout (STK push) or choose M-Pesa on delivery. Enter a valid M-Pesa number at checkout.",
      },
      {
        q: "Can I cancel or change an order?",
        a: "Contact the seller via chat or WhatsApp as soon as possible, and reach support if needed. Cancellation depends on whether the order has already been processed or shipped.",
      },
      {
        q: "What are flash sales?",
        a: "Flash sales are time-limited discounts set by sellers. The sale price applies only while the flash sale is active.",
      },
    ],
  },
  {
    category: "Delivery",
    items: [
      {
        q: "What delivery options are available?",
        a: "Standard delivery (nationwide doorstep) and Boda Express (faster local delivery where available). You choose at checkout.",
      },
      {
        q: "How long does delivery take?",
        a: "Timing depends on location, seller and method. Boda Express is typically faster for local routes; standard delivery covers wider areas.",
      },
    ],
  },
  {
    category: "Buyers",
    items: [
      {
        q: "What if my product has a warranty or free gift?",
        a: "Warranties and free gifts are shown on the product page, cart and checkout. They form part of your order when listed by the seller.",
      },
      {
        q: "How do I contact a seller?",
        a: "Use in-app chat or WhatsApp from the product page or cart where available.",
      },
    ],
  },
  {
    category: "Sellers & partners",
    items: [
      {
        q: "How do I start selling?",
        a: "Register an account, complete your seller profile, then list products from your dashboard. See Become a seller for full details.",
      },
      {
        q: "How do I join as a Boda Express rider?",
        a: "See Become a boda partner for requirements and how to apply.",
      },
    ],
  },
];

function FAQ() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/15 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/15 border border-orange-400/20 text-orange-300 text-xs font-medium mb-6">
            <HelpCircle size={14} />
            Support Center
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            How can we{" "}
            <span className="text-orange-400">help</span> you?
          </h1>

          <p className="mt-5 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Quick answers about orders, payments, delivery, buying and selling
            on ArmorCovers.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16 space-y-12">
        {faqs.map((group) => (
          <div key={group.category}>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-orange-600 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              {group.category}
            </h2>

            <div className="space-y-2.5">
              {group.items.map((item) => {
                const id = `${group.category}-${item.q}`;
                const isOpen = open === id;

                return (
                  <div
                    key={id}
                    className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all duration-200 ${
                      isOpen
                        ? "border-orange-200 shadow-md"
                        : "border-slate-200/80 hover:border-slate-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : id)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="font-medium text-sm sm:text-base text-slate-900">
                        {item.q}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                          isOpen
                            ? "bg-orange-50 text-orange-600"
                            : "bg-slate-50 text-slate-400"
                        }`}
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>

                    <div
                      className={`grid transition-all duration-200 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {item.a}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Still need help */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex gap-4">
              <div className="w-11 h-11 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center flex-shrink-0">
                <MessageCircle size={22} />
              </div>
              <div>
                <p className="font-semibold text-base">Still need help?</p>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed max-w-sm">
                  Reach our support team or explore the buyer and seller guides.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-orange-500/25 transition-all hover:-translate-y-0.5"
              >
                Contact us
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/buyer-guide"
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 text-white px-4 py-2.5 rounded-xl text-sm font-medium border border-white/10 transition"
              >
                <ShoppingBag size={14} />
                Buyer guide
              </Link>
              <Link
                to="/sell"
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 text-white px-4 py-2.5 rounded-xl text-sm font-medium border border-white/10 transition"
              >
                <Store size={14} />
                Seller guide
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default FAQ;