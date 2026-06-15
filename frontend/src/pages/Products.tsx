import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";

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

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-orange-50 min-h-screen">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-md border border-orange-100 p-10 text-center">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4">
            Our Marketplace
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Discover quality products from trusted local sellers
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-orange-500 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-md p-16 text-center">
            <p className="text-2xl text-gray-500">No products found</p>
            <p className="text-gray-400 mt-2">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="group"
              >
                <div className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  {/* Image */}
                  <div className="h-64 overflow-hidden bg-slate-100 relative">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-6xl bg-gradient-to-br from-orange-100 to-slate-100">
                        📦
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {product.category}
                    </span>

                    <h2 className="text-xl font-bold text-slate-900 line-clamp-2 mb-2">
                      {product.name}
                    </h2>

                    <p className="text-slate-500 text-sm line-clamp-3 mb-4">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-orange-600">
                          KSh {product.price.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-400">Stock: {product.stock}</p>
                      </div>

                      <button className="bg-orange-500 text-white p-3 rounded-2xl hover:bg-orange-600 transition">
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Products;