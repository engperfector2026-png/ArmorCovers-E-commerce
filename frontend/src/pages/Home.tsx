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
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
            Kenya's Most Trusted<br />Marketplace
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
            Buy and sell quality products from trusted vendors across Kenya
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="bg-white text-orange-600 px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition flex items-center justify-center gap-3"
            >
              Start Shopping <ArrowRight size={24} />
            </Link>
            <Link 
              to="/seller-dashboard" 
              className="border-2 border-white text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 transition"
            >
              Become a Seller
            </Link>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="bg-white py-8 border-b">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-orange-500">25K+</div>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-500">1.5K+</div>
            <p className="text-gray-600">Active Sellers</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-500">47</div>
            <p className="text-gray-600">Counties</p>
          </div>
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-4xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-orange-500 hover:underline flex items-center gap-2">
              View All <ArrowRight size={20} />
            </Link>
          </div>

          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product._id} className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">
                  <div className="h-56 bg-gray-100 relative">
                    <img
                      src={product.image ? `http://localhost:5000${product.image}` : "https://via.placeholder.com/400"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="uppercase text-xs tracking-widest text-orange-500 mb-1">{product.category}</p>
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
        </div>
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