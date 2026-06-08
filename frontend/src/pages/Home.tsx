import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-slate-100 min-h-screen">

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-lg p-12 md:p-16 text-center">

          <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
            Home of everything at your comfort
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-extrabold text-gray-900 transition duration-300 hover:text-orange-500 cursor-pointer">
            ARMOR<span className="text-orange-500">COVERS</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Buy, sell and discover quality products and services from trusted
            vendors across Kenya.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">

            <button className="bg-orange-500 hover:bg-orange-600 hover:scale-105 transition text-white px-8 py-3 rounded-xl font-semibold">
              Start Shopping
            </button>

            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-100 transition">
              Become a Vendor
            </button>

          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid md:grid-cols-3 gap-6">
          
    
     <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-lg transition">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-bold text-gray-900">
              Fast Delivery
            </h3>
            <p className="text-gray-600 mt-3">
              Receive products quickly from trusted sellers.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-lg transition">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-gray-900">
              Secure Payments
            </h3>
            <p className="text-gray-600 mt-3">
              Safe and secure checkout experience.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-lg transition">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-bold text-gray-900">
              Trusted Vendors
            </h3>
            <p className="text-gray-600 mt-3">
              Shop from verified sellers and businesses.
            </p>
          </div>

        </div>
      </section>

      {/* CATEGORIES */}
<section className="max-w-7xl mx-auto px-6 py-12">
  <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
    Shop by Category
  </h2>

  <div className="grid md:grid-cols-4 gap-6">

    {/* Electronics */}
    <Link
      to="/category/Electronics"
      className="bg-white rounded-2xl shadow-sm p-8 text-center hover:shadow-lg hover:-translate-y-1 transition block"
    >
      <div className="text-5xl mb-4">📱</div>
      <h3 className="text-xl font-bold text-gray-900">Electronics</h3>
      <p className="text-gray-500 mt-2">
        Phones, laptops & gadgets
      </p>
    </Link>

    {/* Fashion */}
    <Link
      to="/category/Fashion"
      className="bg-white rounded-2xl shadow-sm p-8 text-center hover:shadow-lg hover:-translate-y-1 transition block"
    >
      <div className="text-5xl mb-4">👕</div>
      <h3 className="text-xl font-bold text-gray-900">Fashion</h3>
      <p className="text-gray-500 mt-2">
        Clothing & accessories
      </p>
    </Link>

    {/* Vehicles */}
    <Link
      to="/category/Vehicles"
      className="bg-white rounded-2xl shadow-sm p-8 text-center hover:shadow-lg hover:-translate-y-1 transition block"
    >
      <div className="text-5xl mb-4">🚗</div>
      <h3 className="text-xl font-bold text-gray-900">Vehicles</h3>
      <p className="text-gray-500 mt-2">
        Cars, bikes & spare parts
      </p>
    </Link>

    {/* Home */}
    <Link
      to="/category/Home"
      className="bg-white rounded-2xl shadow-sm p-8 text-center hover:shadow-lg hover:-translate-y-1 transition block"
    >
      <div className="text-5xl mb-4">🏠</div>
      <h3 className="text-xl font-bold text-gray-900">Home & Living</h3>
      <p className="text-gray-500 mt-2">
        Furniture & household items
      </p>
    </Link>

    {/* Stationery */}
    <Link
      to="/category/Stationery"
      className="bg-white rounded-2xl shadow-sm p-8 text-center hover:shadow-lg hover:-translate-y-1 transition block"
    >
      <div className="text-5xl mb-4">📚</div>
      <h3 className="text-xl font-bold text-gray-900">Stationery</h3>
      <p className="text-gray-500 mt-2">
        Books & office supplies
      </p>
    </Link>

    {/* Agriculture */}
    <Link
      to="/category/Agriculture"
      className="bg-white rounded-2xl shadow-sm p-8 text-center hover:shadow-lg hover:-translate-y-1 transition block"
    >
      <div className="text-5xl mb-4">🌾</div>
      <h3 className="text-xl font-bold text-gray-900">Agriculture</h3>
      <p className="text-gray-500 mt-2">
        Farm products & equipment
      </p>
    </Link>

    {/* Services */}
    <Link
      to="/category/Services"
      className="bg-white rounded-2xl shadow-sm p-8 text-center hover:shadow-lg hover:-translate-y-1 transition block"
    >
      <div className="text-5xl mb-4">🛠️</div>
      <h3 className="text-xl font-bold text-gray-900">Services</h3>
      <p className="text-gray-500 mt-2">
        Professional services
      </p>
    </Link>

    {/* Beauty */}
    <Link
      to="/category/Beauty"
      className="bg-white rounded-2xl shadow-sm p-8 text-center hover:shadow-lg hover:-translate-y-1 transition block"
    >
      <div className="text-5xl mb-4">💄</div>
      <h3 className="text-xl font-bold text-gray-900">Beauty</h3>
      <p className="text-gray-500 mt-2">
        Cosmetics & skincare
      </p>
    </Link>

    {/* Health */}
    <Link
      to="/category/Health"
      className="bg-white rounded-2xl shadow-sm p-8 text-center hover:shadow-lg hover:-translate-y-1 transition block"
    >
      <div className="text-5xl mb-4">🏥</div>
      <h3 className="text-xl font-bold text-gray-900">Health</h3>
      <p className="text-gray-500 mt-2">
        Medical & wellness products
      </p>
    </Link>

    {/* Sports */}
    <Link
      to="/category/Sports"
      className="bg-white rounded-2xl shadow-sm p-8 text-center hover:shadow-lg hover:-translate-y-1 transition block"
    >
      <div className="text-5xl mb-4">⚽</div>
      <h3 className="text-xl font-bold text-gray-900">Sports</h3>
      <p className="text-gray-500 mt-2">
        Fitness & sporting goods
      </p>
    </Link>

    {/* Real Estate */}
    <Link
      to="/category/RealEstate"
      className="bg-white rounded-2xl shadow-sm p-8 text-center hover:shadow-lg hover:-translate-y-1 transition block"
    >
      <div className="text-5xl mb-4">🏢</div>
      <h3 className="text-xl font-bold text-gray-900">Real Estate</h3>
      <p className="text-gray-500 mt-2">
        Land, houses & rentals
      </p>
    </Link>

    {/* Jobs */}
    <Link
      to="/category/Jobs"
      className="bg-white rounded-2xl shadow-sm p-8 text-center hover:shadow-lg hover:-translate-y-1 transition block"
    >
      <div className="text-5xl mb-4">💼</div>
      <h3 className="text-xl font-bold text-gray-900">Jobs</h3>
      <p className="text-gray-500 mt-2">
        Employment opportunities
      </p>
    </Link>

  </div>
</section>
      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 py-12">

        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Featured Products
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-2 transition">
            <div className="h-52 bg-gray-100 flex items-center justify-center text-6xl">
              📦
            </div>

            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-900">
                Sample Product
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Product description appears here.
              </p>

              <p className="text-orange-500 font-bold text-xl mt-4">
                KES 5,000
              </p>

              <Link
                to="/products"
                className="block mt-5 text-center bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition"
              >
                View Product
              </Link>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;