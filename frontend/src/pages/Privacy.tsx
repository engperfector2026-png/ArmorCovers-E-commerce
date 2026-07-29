import { Link } from "react-router-dom";
import { Shield, Mail, ArrowRight } from "lucide-react";

function Privacy() {
  const sections = [
    {
      id: "1",
      title: "Introduction",
      content: (
        <p>
          ArmorCovers is committed to protecting your privacy. This Privacy
          Policy explains how we collect, use, disclose and safeguard your
          information when you use our marketplace platform.
        </p>
      ),
    },
    {
      id: "2",
      title: "Information We Collect",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-slate-800">Personal information:</strong>{" "}
            Name, email address, phone number, delivery address
          </li>
          <li>
            <strong className="text-slate-800">Account information:</strong>{" "}
            Username, password, profile details
          </li>
          <li>
            <strong className="text-slate-800">Transaction data:</strong> Order
            history and payment-related information needed to process orders
          </li>
          <li>
            <strong className="text-slate-800">Usage data:</strong> IP address,
            browser type, pages visited and device information
          </li>
        </ul>
      ),
    },
    {
      id: "3",
      title: "How We Use Your Information",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>To process transactions and manage orders</li>
          <li>To provide customer support and respond to inquiries</li>
          <li>To improve our platform and user experience</li>
          <li>
            To send important service updates and, with your consent, relevant
            promotional content
          </li>
          <li>To prevent fraud and help keep the platform secure</li>
        </ul>
      ),
    },
    {
      id: "4",
      title: "Information Sharing",
      content: (
        <>
          <p className="mb-3">
            We do <strong className="text-slate-800">not sell</strong> your
            personal data. We may share information with:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Sellers, as needed to fulfil your orders</li>
            <li>Payment processors (e.g. M-Pesa and other approved providers)</li>
            <li>Legal authorities when required by applicable law</li>
          </ul>
        </>
      ),
    },
    {
      id: "5",
      title: "Data Security",
      content: (
        <p>
          We use industry-standard measures to help protect your information.
          No method of transmission or storage over the internet is completely
          secure; we continuously work to reduce risk and respond to issues
          promptly.
        </p>
      ),
    },
    {
      id: "6",
      title: "Your Rights",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Access, correct or request deletion of your personal information</li>
          <li>Object to or request restriction of certain processing</li>
          <li>Withdraw consent where processing is based on consent</li>
          <li>Request a copy of data you have provided, where applicable</li>
        </ul>
      ),
    },
    {
      id: "7",
      title: "Cookies",
      content: (
        <p>
          We use cookies and similar technologies to support site functionality,
          understand usage and improve the experience. You can manage cookie
          preferences through your browser settings.
        </p>
      ),
    },
    {
      id: "8",
      title: "Changes to This Policy",
      content: (
        <p>
          We may update this Privacy Policy from time to time. Material changes
          will be reflected on this page with an updated “Last updated” date.
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
            <Shield size={24} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Last updated: 22 June 2026 · ArmorCovers Marketplace
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <p className="text-slate-600 text-sm leading-relaxed mb-10 pb-8 border-b border-slate-100">
          This policy describes how ArmorCovers collects and uses information
          when you browse, buy or sell on our marketplace.
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.id} id={`privacy-${section.id}`}>
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
            Questions about your privacy?
          </h3>
          <p className="text-sm text-slate-500 mb-5 leading-relaxed">
            Contact us if you have questions about this policy or how we handle
            your data.
          </p>
          <a
            href="mailto:elijahwagah990@gmail.com"
            className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-orange-600 mb-6"
          >
            <Mail size={16} className="text-orange-500" />
            elijahwagah990@gmail.com
          </a>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
            >
              Contact support
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-10">
          © {new Date().getFullYear()} ArmorCovers Marketplace. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Privacy;