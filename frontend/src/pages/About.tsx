function About() {
  return (
    <div className="min-h-screen bg-orange-50 py-12 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl mb-12">

          <img
            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4"
            alt="ArmorCovers Marketplace"
            className="w-full h-[500px] object-cover"
          />

          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">

            <div className="text-center px-6">

              <h1 className="text-5xl md:text-7xl font-extrabold text-white">
                About <span className="text-orange-400">ArmorCovers</span>
              </h1>

              <p className="mt-6 text-xl text-gray-200 max-w-3xl mx-auto">
                Connecting buyers, sellers and businesses through a secure,
                innovative and trusted digital marketplace.
              </p>

            </div>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-6 mb-12">

          <div className="bg-white rounded-3xl p-8 shadow-md text-center">
            <div className="text-5xl mb-3">🛒</div>
            <h2 className="text-3xl font-bold text-orange-500">
              10,000+
            </h2>
            <p className="text-gray-600 mt-2">
              Products Listed
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-md text-center">
            <div className="text-5xl mb-3">🏪</div>
            <h2 className="text-3xl font-bold text-orange-500">
              1,500+
            </h2>
            <p className="text-gray-600 mt-2">
              Active Vendors
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-md text-center">
            <div className="text-5xl mb-3">👥</div>
            <h2 className="text-3xl font-bold text-orange-500">
              25,000+
            </h2>
            <p className="text-gray-600 mt-2">
              Happy Customers
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-md text-center">
            <div className="text-5xl mb-3">🚚</div>
            <h2 className="text-3xl font-bold text-orange-500">
              Nationwide
            </h2>
            <p className="text-gray-600 mt-2">
              Marketplace Access
            </p>
          </div>

        </div>

        {/* Who We Are */}

        <div className="bg-white rounded-3xl shadow-lg p-10 mb-12">

          <h2 className="text-4xl font-bold text-orange-500 mb-6">
            Who We Are
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-5">
            ArmorCovers is a modern digital marketplace built to connect
            buyers and sellers through a safe, transparent and efficient
            online platform.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-5">
            We believe that commerce should be simple, secure and accessible
            to everyone. Whether you are looking for electronics, vehicles,
            fashion, home products, agricultural supplies or professional
            services, ArmorCovers provides a trusted environment where
            transactions can happen with confidence.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed">
            Our goal is to empower entrepreneurs, support businesses and
            create value for customers by making online trading easier
            and more rewarding.
          </p>

        </div>

        {/* Marketplace Gallery */}

        <div className="grid md:grid-cols-3 gap-6 mb-12">

          <img
            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4"
            alt="Shopping"
            className="w-full h-72 object-cover rounded-3xl shadow-lg"
          />

          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
            alt="Shopping Cart"
            className="w-full h-72 object-cover rounded-3xl shadow-lg"
          />

          <img
            src="https://images.unsplash.com/photo-1472851294608-062f824d29cc"
            alt="Marketplace"
            className="w-full h-72 object-cover rounded-3xl shadow-lg"
          />

        </div>

        {/* Mission */}

        <div className="bg-white rounded-3xl shadow-lg p-10 mb-12">

          <h2 className="text-4xl font-bold text-orange-500 mb-6">
            Our Mission
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed">
            Our mission is to create a marketplace where trust,
            convenience and innovation come together to support
            buyers, sellers and businesses. We strive to provide
            a secure platform that promotes growth, opportunity
            and customer satisfaction through technology-driven commerce.
          </p>

        </div>

        {/* Why Choose Us */}

        <h2 className="text-4xl font-bold text-center text-orange-500 mb-8">
          Why Choose ArmorCovers?
        </h2>

        <div className="grid md:grid-cols-4 gap-6 mb-12">

          <div className="bg-white rounded-3xl p-8 shadow-md text-center">
            <div className="text-5xl mb-4">🛡️</div>

            <h3 className="font-bold text-xl text-gray-900 mb-3">
              Trusted Marketplace
            </h3>

            <p className="text-gray-600">
              Transparency, accountability and integrity are at
              the heart of every transaction.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-md text-center">
            <div className="text-5xl mb-4">🔒</div>

            <h3 className="font-bold text-xl text-gray-900 mb-3">
              Secure Transactions
            </h3>

            <p className="text-gray-600">
              Designed to provide confidence and safety
              throughout the buying and selling process.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-md text-center">
            <div className="text-5xl mb-4">🛒</div>

            <h3 className="font-bold text-xl text-gray-900 mb-3">
              Easy Shopping
            </h3>

            <p className="text-gray-600">
              Browse products easily and enjoy a smooth
              marketplace experience.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-md text-center">
            <div className="text-5xl mb-4">📈</div>

            <h3 className="font-bold text-xl text-gray-900 mb-3">
              Business Growth
            </h3>

            <p className="text-gray-600">
              Helping businesses and entrepreneurs reach
              more customers and expand their markets.
            </p>
          </div>

        </div>

        {/* Buyers & Sellers */}

        <div className="grid md:grid-cols-2 gap-8 mb-12">

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-orange-500 mb-6">
              For Buyers
            </h2>

            <ul className="space-y-3 text-gray-700">
              <li>✓ Wide range of quality products</li>
              <li>✓ Competitive pricing</li>
              <li>✓ Secure shopping experience</li>
              <li>✓ Trusted sellers</li>
              <li>✓ Convenient browsing and purchasing</li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-orange-500 mb-6">
              For Sellers
            </h2>

            <ul className="space-y-3 text-gray-700">
              <li>✓ Reach more customers</li>
              <li>✓ Easy product management</li>
              <li>✓ Increased visibility</li>
              <li>✓ Business growth opportunities</li>
              <li>✓ Modern marketplace tools</li>
            </ul>
          </div>

        </div>

        {/* Core Values */}

        <div className="bg-white rounded-3xl shadow-lg p-10 mb-12">

          <h2 className="text-4xl font-bold text-orange-500 text-center mb-4">
            Our Core Values
          </h2>

          <p className="text-center text-gray-600 mb-10">
            These values define who we are and guide how we serve
            our customers, sellers and partners.
          </p>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">

            <div className="bg-orange-50 p-6 rounded-2xl text-center">
              <div className="text-5xl mb-3">🤝</div>
              <h3 className="font-bold text-lg mb-2">Trust</h3>
              <p className="text-gray-600 text-sm">
                Building lasting relationships through honesty and transparency.
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-2xl text-center">
              <div className="text-5xl mb-3">💡</div>
              <h3 className="font-bold text-lg mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">
                Continuously improving our marketplace experience.
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-2xl text-center">
              <div className="text-5xl mb-3">⭐</div>
              <h3 className="font-bold text-lg mb-2">Quality</h3>
              <p className="text-gray-600 text-sm">
                Promoting quality products and customer satisfaction.
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-2xl text-center">
              <div className="text-5xl mb-3">🛒</div>
              <h3 className="font-bold text-lg mb-2">Customer Focus</h3>
              <p className="text-gray-600 text-sm">
                Delivering a smooth and enjoyable shopping experience.
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-2xl text-center">
              <div className="text-5xl mb-3">🏪</div>
              <h3 className="font-bold text-lg mb-2">Opportunity</h3>
              <p className="text-gray-600 text-sm">
                Creating opportunities for businesses and entrepreneurs.
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-2xl text-center">
              <div className="text-5xl mb-3">🚀</div>
              <h3 className="font-bold text-lg mb-2">Growth</h3>
              <p className="text-gray-600 text-sm">
                Supporting sustainable success for all users.
              </p>
            </div>

          </div>

        </div>

        {/* Vision */}

        <div className="bg-white rounded-3xl shadow-lg p-10 mb-12">

          <h2 className="text-4xl font-bold text-orange-500 mb-6">
            Our Vision
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed">
            To become one of Africa's most trusted and innovative
            digital marketplaces by empowering businesses,
            connecting communities and transforming commerce
            through technology.
          </p>

        </div>

      </div>

    </div>
  );
}

export default About;