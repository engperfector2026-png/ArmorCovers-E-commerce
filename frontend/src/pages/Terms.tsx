import { Link } from "react-router-dom";
import { FileText, Mail, Phone, ArrowRight } from "lucide-react";

function Terms() {
  const sections = [
    {
      id: "1",
      title: "Acceptance of Terms",
      content: (
        <p>
          By accessing or using ArmorCovers Marketplace, you agree to be bound by
          these Terms and Conditions. If you do not agree with any part of these
          terms, you may not use our services.
        </p>
      ),
    },
    {
      id: "2",
      title: "User Accounts",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>You must provide accurate and complete registration information.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>You agree to notify us immediately of any unauthorized use of your account.</li>
        </ul>
      ),
    },
    {
      id: "3",
      title: "Seller Responsibilities",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>List only genuine and legal products with accurate descriptions and images.</li>
          <li>Honour all sales and deliver items as promised within agreed timelines.</li>
          <li>Maintain professional communication with buyers.</li>
          <li>Comply with all applicable laws and regulations of Kenya.</li>
        </ul>
      ),
    },
    {
      id: "4",
      title: "Buyer Responsibilities",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Provide accurate payment and delivery information.</li>
          <li>Respect sellers and marketplace policies.</li>
          <li>Complete payments only through approved methods (e.g. M-Pesa).</li>
        </ul>
      ),
    },
    {
      id: "5",
      title: "Payments & Orders",
      content: (
        <p>
          Transactions are processed through approved channels such as M-Pesa.
          Once payment is confirmed, the seller is responsible for fulfilling and
          delivering the order. Flash sale prices, warranties and free gifts
          apply only as stated on the product listing at the time of purchase.
        </p>
      ),
    },
    {
      id: "6",
      title: "Prohibited Activities",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Fraud, scams or deliberately misleading listings</li>
          <li>Sale of counterfeit, stolen or illegal products</li>
          <li>Harassment or abuse of other users</li>
          <li>Unauthorized access, interference or abuse of the platform</li>
        </ul>
      ),
    },
    {
      id: "7",
      title: "Limitation of Liability",
      content: (
        <p>
          ArmorCovers operates as a marketplace platform. We are not a party to
          the contract between buyer and seller and are not responsible for
          product quality, delivery performance or disputes between users, except
          where required by applicable law or our published policies.
        </p>
      ),
    },
    {
      id: "8",
      title: "Governing Law",
      content: (
        <p>
          These Terms are governed by the laws of the Republic of Kenya. Any
          dispute arising from these Terms or use of the platform shall be
          subject to the exclusive jurisdiction of the Kenyan courts.
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <section className="border-b border-slate-100 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <FileText size={24} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Terms & Conditions
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Last updated: 22 June 2026 · ArmorCovers Marketplace
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <p className="text-slate-600 text-sm leading-relaxed mb-10 pb-8 border-b border-slate-100">
          Please read these terms carefully before using ArmorCovers. They
          govern your access to and use of the platform as a buyer, seller or
          visitor.
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.id} id={`section-${section.id}`}>
              <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-baseline gap-2">
                <span className="text-orange-500 font-semibold tabular-nums">
                  {section.id}.
                </span>
                {section.title}
              </h2>
              <div className="text-slate-600 text-sm leading-relaxed pl-0 sm:pl-6">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-14 rounded-2xl border border-slate-100 bg-white shadow-sm p-6 sm:p-8">
          <h3 className="font-semibold text-slate-900 mb-2">
            Questions about these terms?
          </h3>
          <p className="text-sm text-slate-500 mb-5 leading-relaxed">
            Contact us and we’ll help clarify anything that isn’t clear.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm mb-6">
            <a
              href="mailto:elijahwagah990@gmail.com"
              className="inline-flex items-center gap-2 text-slate-700 hover:text-orange-600"
            >
              <Mail size={16} className="text-orange-500" />
              elijahwagah990@gmail.com
            </a>
            <a
              href="tel:+254708540862"
              className="inline-flex items-center gap-2 text-slate-700 hover:text-orange-600"
            >
              <Phone size={16} className="text-orange-500" />
              +254 708 540 862
            </a>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
          >
            Contact support
            <ArrowRight size={16} />
          </Link>
        </div>

        <p className="text-center text-xs text-slate-400 mt-10">
          © {new Date().getFullYear()} ArmorCovers Marketplace. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Terms;