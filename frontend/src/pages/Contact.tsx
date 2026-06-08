function Contact() {
  return (
    <div className="bg-slate-100 min-h-screen py-10 px-6">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>

          <p className="text-gray-600 mb-8">
            We're here to help. If you have questions, feedback,
            partnership inquiries, or need support, feel free to
            reach out to the ArmorCovers team.
          </p>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">

              <div className="text-4xl mb-4">📧</div>

              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Email Support
              </h2>

              <p className="text-gray-600">
                elijahwagah990@gmail.com
              </p>

            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">

              <div className="text-4xl mb-4">📞</div>

              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Phone
              </h2>

              <p className="text-gray-600">
                +254 796 985 894/ +254708540862
              </p>

            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">

              <div className="text-4xl mb-4">📍</div>

              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Location
              </h2>

              <p className="text-gray-600">
                Nairobi, Kenya
              </p>

            </div>

          </div>

          <div className="mt-10 border-t border-slate-200 pt-6">

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Business Hours
            </h2>

            <div className="space-y-2 text-gray-600">
              <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 4:00 PM</p>
              <p>Sunday & Public Holidays: Closed</p>
            </div>

          </div>

          <div className="mt-8 bg-orange-50 border border-orange-200 rounded-2xl p-6">

            <h3 className="text-lg font-bold text-orange-600 mb-2">
              Need Immediate Assistance?
            </h3>

            <p className="text-gray-700">
              Our support team is committed to responding to all
              inquiries as quickly as possible to ensure a smooth
              marketplace experience for buyers and sellers.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Contact;