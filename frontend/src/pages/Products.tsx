import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ShoppingCart, Search } from "lucide-react";

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

  const categories = [
    "All", "Vehicles", "Fashion", "Electronics", "Home", 
    "Agriculture", "Beauty", "Sports", "Health", "Stationary", "Education"
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Search & Category Filter */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border rounded-2xl focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-2xl text-sm font-medium whitespace-nowrap transition ${
                  selectedCategory === category 
                    ? "bg-orange-500 text-white" 
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <div className="text-center py-20">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link 
                key={product._id} 
                to={`/products/${product._id}`}
                className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition group overflow-hidden"
              >
                <div className="h-56 bg-gray-100 relative">
                  <img
                    src={product.image ? `http://localhost:5000${product.image}` : "https://via.placeholder.com/400"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {product.stock > 0 && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">In Stock</div>
                  )}
                </div>

                <div className="p-6">
                  <p className="uppercase text-xs tracking-widest text-orange-500 mb-2">{product.category}</p>
                  <h3 className="font-semibold text-lg line-clamp-2 mb-3 group-hover:text-orange-600">{product.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{product.description}</p>

                  <div className="flex justify-between items-center">
                    <p className="text-3xl font-bold text-orange-600">KSh {product.price.toLocaleString()}</p>
                    <button
                      onClick={(e) => { e.preventDefault(); alert(`✅ ${product.name} added to cart!`); }}
                      className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-2xl transition"
                    >
                      <ShoppingCart size={22} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;