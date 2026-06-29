import { Link } from "react-router-dom";

function Contact() {
  return (
    <div className="bg-slate-100 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? Need support? We're here to help you have the best experience on ArmorCovers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-lg p-10">
            <h2 className="text-2xl font-semibold mb-8">Send Us a Message</h2>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">First Name</label>
                  <input type="text" className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-orange-500" placeholder="John" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Last Name</label>
                  <input type="text" className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-orange-500" placeholder="Doe" />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                <input type="email" className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-orange-500" placeholder="your@email.com" />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Subject</label>
                <input type="text" className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-orange-500" placeholder="How can we help you?" />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Message</label>
                <textarea rows={6} className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-orange-500" placeholder="Write your message here..."></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-semibold transition text-lg"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">

            <div className="bg-white rounded-3xl shadow p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                📍 Our Location
              </h3>
              <p className="text-gray-600">Nairobi, Kenya</p>
            </div>

            <div className="bg-white rounded-3xl shadow p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                📧 Email Us
              </h3>
              <p className="text-gray-600 text-lg">elijahwagah990@gmail.com</p>
              <p className="text-sm text-gray-500 mt-1">We reply within 1 hour</p>
            </div>

            <div className="bg-white rounded-3xl shadow p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                📞 Call Us
              </h3>
              <p className="text-gray-600 text-lg">+254 796 985 894</p>
              <p className="text-gray-600 text-lg">+254 708 540 862</p>
            </div>

            <div className="bg-white rounded-3xl shadow p-8">
              <h3 className="text-xl font-semibold mb-6">Business Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Monday - Friday:</strong> 8:00 AM - 6:00 PM</p>
                <p><strong>Saturday:</strong> 9:00 AM - 4:00 PM</p>
                <p><strong>Sunday & Holidays:</strong> Closed</p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-16 text-gray-500">
          <p>© {new Date().getFullYear()} ArmorCovers Marketplace. All Rights Reserved.</p>
        </div>

      </div>
    </div>
  );
}

export default Contact;