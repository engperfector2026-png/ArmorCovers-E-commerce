import { useEffect, useState } from "react";
import { Package, Edit2, Trash2 } from 'lucide-react';
import API from '../api/axios';

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
}

function MyProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch all products for now (you can filter by seller later)
      const res = await API.get("/products");

      setProducts(res.data);
    } catch (err: any) {
      console.error("Failed to load products:", err);
      setError("Failed to load products. Please make sure your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await API.delete(`/products/${id}`);
      alert("✅ Product deleted successfully");
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error(error);
      alert("❌ Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package size={60} className="mx-auto text-orange-500 mb-4 animate-pulse" />
          <p className="text-xl text-gray-600">Loading your products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My Products</h1>
            <p className="text-gray-600 mt-1">Manage all your listed products</p>
          </div>

          <button
            onClick={() => window.location.href = '/add-product'}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3 font-semibold transition"
          >
            <Package size={24} />
            Add New Product
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl mb-8">
            {error}
          </div>
        )}

        {products.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-16 text-center">
            <div className="text-7xl mb-6">📦</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">No Products Yet</h2>
            <p className="text-gray-600 mb-8">Start selling by adding your first product</p>
            <button
              onClick={() => window.location.href = '/add-product'}
              className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg"
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-md transition"
              >
                <div className="h-56 bg-slate-100 relative">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-6xl text-gray-300">
                      📦
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <span className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-medium mb-3">
                    {product.category}
                  </span>

                  <h3 className="font-bold text-xl text-gray-900 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-orange-600 font-semibold mt-2 text-2xl">
                    KSh {product.price.toLocaleString()}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">Stock: {product.stock}</p>

                  <p className="text-gray-600 text-sm mt-4 line-clamp-3">
                    {product.description}
                  </p>

                  <div className="flex gap-3 mt-6">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 rounded-2xl font-medium transition">
                      <Edit2 size={18} />
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 py-3 rounded-2xl font-medium transition"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProducts;