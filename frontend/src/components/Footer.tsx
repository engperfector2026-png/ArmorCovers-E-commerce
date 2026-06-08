function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-lg font-bold mb-4 text-orange-500">
            About Us
          </h2>

          <p className="text-sm text-gray-300 leading-relaxed">
            ArmorCovers is a trusted Kenyan marketplace connecting buyers,
            sellers and vendors in one powerful platform. Shop quality
            products, discover services and grow your business with ease.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4 text-orange-500">
            Quick Links
          </h2>

          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="/about" className="hover:text-orange-400">
                About Us
              </a>
            </li>

            <li>
              <a href="/contact" className="hover:text-orange-400">
                Contact Us
              </a>
            </li>

            <li>
              <a href="/terms" className="hover:text-orange-400">
                Terms & Conditions
              </a>
            </li>

            <li>
              <a href="/privacy" className="hover:text-orange-400">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4 text-orange-500">
            Contact
          </h2>

          <div className="text-sm text-gray-300 space-y-3">
            <p>📧 elijahwagah990@gmail.com</p>
            <p>📞 +254 708 540 862</p>
            <p>📍 Nairobi, Kenya</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4 text-orange-500">
            Follow Us
          </h2>

          <div className="flex flex-col gap-2 text-sm text-gray-300">
            <a href="#" className="hover:text-orange-400">
              Facebook
            </a>

            <a href="#" className="hover:text-orange-400">
              Instagram
            </a>

            <a href="#" className="hover:text-orange-400">
              Twitter
            </a>

            <a href="#" className="hover:text-orange-400">
              TikTok
            </a>

            <a href="#" className="hover:text-orange-400">
              WhatsApp
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-5 text-sm text-gray-400">
        © {new Date().getFullYear()} ArmorCovers. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;