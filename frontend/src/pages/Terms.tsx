import { Link } from "react-router-dom";

function Terms() {
  return (
    <div className="bg-slate-100 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-10 py-16 text-center">
          <h1 className="text-5xl font-bold mb-3">Terms &amp; Conditions</h1>
          <p className="text-orange-100 text-lg">Last Updated: June 22, 2026</p>
        </div>

        <div className="p-10 md:p-16 space-y-12 text-gray-700 leading-relaxed">

          <section className="transition-all duration-300 hover:bg-slate-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using ArmorCovers Marketplace, you agree to be bound by these Terms and Conditions. 
              If you do not agree with any part of these terms, you may not use our services.
            </p>
          </section>

          <section className="transition-all duration-300 hover:bg-slate-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">2. User Accounts</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must provide accurate and complete registration information.</li>
              <li>You are responsible for maintaining the confidentiality of your account.</li>
              <li>You agree to notify us immediately of any unauthorized use of your account.</li>
            </ul>
          </section>

          <section className="transition-all duration-300 hover:bg-slate-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">3. Seller Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>List only genuine and legal products with accurate descriptions.</li>
              <li>Honor all sales and deliver items as promised.</li>
              <li>Maintain professional communication with buyers.</li>
              <li>Comply with all applicable Kenyan laws and regulations.</li>
            </ul>
          </section>

          <section className="transition-all duration-300 hover:bg-slate-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">4. Buyer Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate payment and delivery information.</li>
              <li>Respect sellers and marketplace policies.</li>
              <li>Make payments through approved methods only.</li>
            </ul>
          </section>

          <section className="transition-all duration-300 hover:bg-slate-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">5. Payments &amp; Orders</h2>
            <p>
              All transactions are processed securely. ArmorCovers supports M-Pesa, card payments, and other approved methods. 
              Once payment is confirmed, the seller is responsible for timely delivery.
            </p>
          </section>

          <section className="transition-all duration-300 hover:bg-slate-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">6. Prohibited Activities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fraud, scams, or misleading listings</li>
              <li>Sale of counterfeit or illegal products</li>
              <li>Harassment or abuse of other users</li>
              <li>Unauthorized access or hacking attempts</li>
            </ul>
          </section>

          <section className="transition-all duration-300 hover:bg-slate-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">7. Limitation of Liability</h2>
            <p>
              ArmorCovers acts as a marketplace platform only. We are not responsible for disputes between buyers and sellers, 
              product quality, or delivery issues. All transactions occur directly between users.
            </p>
          </section>

          <section className="transition-all duration-300 hover:bg-slate-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">8. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the Republic of Kenya. Any disputes shall be resolved in the Kenyan courts.
            </p>
          </section>

        </div>

        {/* Contact Box */}
        <div className="bg-orange-50 border-t border-orange-100 p-10 text-center">
          <h3 className="text-xl font-semibold text-orange-700 mb-3">Questions or Concerns?</h3>
          <p className="text-gray-600 mb-6">
            Contact us at <span className="font-medium">elijahwagah990@gmail.com</span> or call <span className="font-medium">+254 708 540 862</span>
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

export default Terms;