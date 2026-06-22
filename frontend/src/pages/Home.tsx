import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, ArrowRight, Star, Truck, Users } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
}

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data.slice(0, 8)); // Show 8 featured products
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    alert(`✅ ${product.name} added to cart!`);
  };

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-orange-600 via-red-500 to-amber-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
            Shop with <span className="text-yellow-300">Confidence</span>
          </h1>
          <p className="text-2xl md:text-3xl mb-10 text-orange-100 max-w-2xl mx-auto">
            Kenya's Most Trusted Marketplace for Quality Products
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              to="/products"
              className="bg-white text-orange-600 px-12 py-5 rounded-2xl font-semibold text-xl hover:bg-gray-100 transition flex items-center justify-center gap-3"
            >
              Start Shopping
              <ArrowRight />
            </Link>
            <Link
              to="/seller-dashboard"
              className="border-2 border-white text-white px-12 py-5 rounded-2xl font-semibold text-xl hover:bg-white/10 transition"
            >
              Become a Seller
            </Link>
          </div>
        </div>

        {/* Trust Stats */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-12 text-center text-sm">
          <div>
            <div className="text-4xl font-bold">25K+</div>
            <div className="text-orange-100">Happy Customers</div>
          </div>
          <div>
            <div className="text-4xl font-bold">1.5K+</div>
            <div className="text-orange-100">Active Sellers</div>
          </div>
          <div>
            <div className="text-4xl font-bold">47</div>
            <div className="text-orange-100">Counties</div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="bg-white py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm text-gray-600">
          <div className="flex items-center gap-3">
            <Truck className="text-orange-500" size={28} /> 
            <span className="font-medium">Fast Nationwide Delivery</span>
          </div>
          <div className="flex items-center gap-3">
            <Star className="text-orange-500" size={28} /> 
            <span className="font-medium">Verified Sellers</span>
          </div>
          <div className="flex items-center gap-3">
            <Users className="text-orange-500" size={28} /> 
            <span className="font-medium">Secure Payments</span>
          </div>
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-4xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-2">
            See All Products <ArrowRight />
          </Link>
        </div>

        {loading ? (
          <p className="text-center py-12 text-lg">Loading amazing products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product._id} className="group bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition-all duration-300">
                <div className="relative h-72 overflow-hidden bg-gray-100">
                  <img
                    src={product.image ? `http://localhost:5000${product.image}` : "https://via.placeholder.com/400x300?text=No+Image"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                </div>

                <div className="p-6">
                  <p className="uppercase text-xs tracking-widest text-orange-500 mb-1">{product.category || "General"}</p>
                  <h3 className="font-semibold text-lg line-clamp-2 mb-3">{product.name}</h3>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-orange-600">KSh {product.price.toLocaleString()}</p>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-orange-500 text-white p-3 rounded-2xl hover:bg-orange-600 transition"
                    >
                      <ShoppingCart size={22} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SELLER CALL TO ACTION */}
      <section className="bg-black text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold mb-6">Ready to Grow Your Business?</h2>
          <p className="text-2xl text-gray-400 mb-10">Join thousands of successful Kenyan entrepreneurs on ArmorCovers</p>
          <Link 
            to="/seller-dashboard" 
            className="inline-block bg-orange-500 hover:bg-orange-600 px-16 py-6 rounded-3xl text-2xl font-semibold transition"
          >
            Start Selling Today →
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Home;