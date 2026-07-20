import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ShoppingCart, Trash2, Heart } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
}

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      const savedIds = JSON.parse(localStorage.getItem("wishlist") || "[]");

      if (savedIds.length === 0) {
        setWishlist([]);
        setLoading(false);
        return;
      }

      // Fetch full product details
      const response = await axios.get("http://localhost:5000/api/products");
      const allProducts = response.data;

      const fullWishlist = savedIds
        .map((id: string) => allProducts.find((p: Product) => p._id === id))
        .filter(Boolean); // Remove nulls

      setWishlist(fullWishlist);
    } catch (error) {
      console.error("Error loading wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = (id: string) => {
    const updatedIds = wishlist.filter(item => item._id !== id).map(item => item._id);
    localStorage.setItem("wishlist", JSON.stringify(updatedIds));
    setWishlist(prev => prev.filter(item => item._id !== id));
  };

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    alert(`✅ ${product.name} added to cart!`);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading wishlist...</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">My Wishlist</h1>
            <p className="text-gray-600 mt-2">{wishlist.length} saved products</p>
          </div>
          <Heart size={48} className="text-red-500" />
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center shadow">
            <div className="text-7xl mb-6">♡</div>
            <h3 className="text-3xl font-semibold mb-3">Wishlist is empty</h3>
            <p className="text-gray-600 mb-8">Save your favorite products to see them here</p>
            <Link 
              to="/products"
              className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl inline-block"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((product) => (
              <div key={product._id} className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition">
                <div className="h-72 relative bg-gray-100">
                  {product.image ? (
                    <img
                      src={`http://localhost:5000${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image"}
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-7xl">📦</div>
                  )}
                </div>

                <div className="p-6">
                  <p className="text-xs text-orange-500 mb-2">{product.category}</p>
                  <h3 className="font-semibold text-xl mb-3 line-clamp-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6">{product.description}</p>

                  <div className="flex justify-between items-center">
                    <p className="text-3xl font-bold text-orange-600">
                      KSh {product.price?.toLocaleString() || "0"}
                    </p>

                    <div className="flex gap-3">
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-orange-500 text-white p-3 rounded-2xl hover:bg-orange-600"
                      >
                        <ShoppingCart size={22} />
                      </button>
                      <button
                        onClick={() => removeFromWishlist(product._id)}
                        className="bg-red-50 text-red-500 p-3 rounded-2xl hover:bg-red-100"
                      >
                        <Trash2 size={22} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;