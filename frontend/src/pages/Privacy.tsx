import { Link } from "react-router-dom";

function Privacy() {
  return (
    <div className="bg-slate-100 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-10 py-16 text-center">
          <h1 className="text-5xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-orange-100 text-lg">Last Updated: June 22, 2026</p>
        </div>

        <div className="p-10 md:p-16 space-y-12 text-gray-700 leading-relaxed">

          <section className="transition-all duration-300 hover:bg-slate-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">1. Introduction</h2>
            <p>
              ArmorCovers is committed to protecting your privacy. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our marketplace platform.
            </p>
          </section>

          <section className="transition-all duration-300 hover:bg-slate-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">2. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number, delivery address</li>
              <li><strong>Account Information:</strong> Username, password, profile details</li>
              <li><strong>Transaction Data:</strong> Order history, payment information</li>
              <li><strong>Usage Data:</strong> IP address, browser type, pages visited, device information</li>
            </ul>
          </section>

          <section className="transition-all duration-300 hover:bg-slate-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process transactions and manage orders</li>
              <li>To provide customer support and respond to inquiries</li>
              <li>To improve our platform and user experience</li>
              <li>To send important updates and promotional content (with your consent)</li>
              <li>To prevent fraud and ensure platform security</li>
            </ul>
          </section>

          <section className="transition-all duration-300 hover:bg-slate-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">4. Information Sharing</h2>
            <p className="mb-4">
              We do <strong>not sell</strong> your personal data. We may share information with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Sellers (to fulfill your orders)</li>
              <li>Payment processors (M-Pesa, etc.)</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section className="transition-all duration-300 hover:bg-slate-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">5. Data Security</h2>
            <p>
              We use industry-standard security measures to protect your information. However, no method of transmission 
              over the internet is 100% secure.
            </p>
          </section>

          <section className="transition-all duration-300 hover:bg-slate-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">6. Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, correct, or delete your personal information</li>
              <li>Object to or restrict processing of your data</li>
              <li>Withdraw consent at any time</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section className="transition-all duration-300 hover:bg-slate-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">7. Cookies</h2>
            <p>
              We use cookies to enhance your browsing experience, analyze site traffic, and deliver personalized content. 
              You can manage your cookie preferences through your browser settings.
            </p>
          </section>

          <section className="transition-all duration-300 hover:bg-slate-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting 
              the updated policy on this page.
            </p>
          </section>

        </div>

        {/* Contact Box */}
        <div className="bg-orange-50 border-t border-orange-100 p-10 text-center">
          <h3 className="text-xl font-semibold text-orange-700 mb-3">Questions About Your Privacy?</h3>
          <p className="text-gray-600 mb-6">
            Feel free to contact us at <span className="font-medium">elijahwagah990@gmail.com</span>
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-2xl hover:bg-orange-600 transition"
          >
            Contact Support
          </Link>
        </div>

        <div className="text-center py-8 text-sm text-gray-500 border-t">
          © {new Date().getFullYear()} ArmorCovers Marketplace. All Rights Reserved.
        </div>

      </div>
    </div>
  );
}

export default Privacy;