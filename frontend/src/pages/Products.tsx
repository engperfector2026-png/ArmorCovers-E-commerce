import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Heart, RefreshCw } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [wishlist, setWishlist] = useState<string[]>([]);

  const categories = [
    { name: "All", icon: "🌐" },
    { name: "Vehicles", icon: "🚗" },
    { name: "Fashion", icon: "👕" },
    { name: "Electronics", icon: "📱" },
    { name: "Home & Living", icon: "🏠" },
    { name: "Agriculture", icon: "🌾" },
    { name: "Beauty & Health", icon: "💄" },
    { name: "Sports & Outdoors", icon: "⚽" },
    { name: "Stationery", icon: "✏️" },
    { name: "Education", icon: "📚" },
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/products");
      console.log("✅ Loaded products:", response.data.length);
      setProducts(response.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(savedWishlist);
  }, []);

  const toggleWishlist = (product: Product) => {
    const isInWishlist = wishlist.includes(product._id);
    let updatedWishlist = isInWishlist 
      ? wishlist.filter(id => id !== product._id)
      : [...wishlist, product._id];

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-black text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Marketplace</h1>
          <p className="text-xl text-gray-300">Total Products: {products.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 bg-white border-b z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-6 top-4 text-gray-400" size={24} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-4 bg-gray-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button 
              onClick={fetchProducts}
              className="bg-white border px-6 py-4 rounded-3xl hover:bg-gray-50 flex items-center gap-2"
            >
              <RefreshCw size={20} /> Refresh
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-6 py-3 rounded-2xl font-medium transition-all ${
                  selectedCategory === cat.name 
                    ? "bg-orange-500 text-white shadow-md" 
                    : "bg-white border border-gray-200 hover:border-orange-300"
                }`}
              >
                <span className="mr-2">{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        {loading ? (
          <div className="text-center py-20 text-xl">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl p-16">
            <p className="text-3xl text-gray-500">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const isInWishlist = wishlist.includes(product._id);
              return (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="group bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition-all hover:-translate-y-1"
                >
                  <div className="h-72 relative overflow-hidden bg-gray-100">
                    {product.image ? (
                      <img
                        src={`http://localhost:5000${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        onError={(e) => e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image"}
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-7xl">📦</div>
                    )}

                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow z-20"
                    >
                      <Heart size={24} className={isInWishlist ? "fill-red-500 text-red-500" : "text-gray-400"} />
                    </button>
                  </div>

                  <div className="p-6">
                    <p className="text-xs text-orange-500 mb-1">{product.category}</p>
                    <h3 className="font-semibold text-lg line-clamp-2 mb-3">{product.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-3xl font-bold text-orange-600">KSh {product.price.toLocaleString()}</p>
                      <button
                        onClick={(e) => { e.preventDefault(); alert(`✅ ${product.name} added to cart!`); }}
                        className="bg-orange-500 text-white p-3 rounded-2xl"
                      >
                        <ShoppingCart size={22} />
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default Products;