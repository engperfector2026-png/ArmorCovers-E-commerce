import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ShoppingCart } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
}

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    // Get current cart from localStorage
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Add product to cart
    const updatedCart = [...currentCart, product];
    
    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert(`✅ ${product.name} has been added to your cart!`);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading product...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Product not found</div>;
  }

  return (
    <div className="bg-orange-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <Link to="/products" className="text-orange-500 hover:text-orange-600 font-semibold mb-8 inline-block">
          ← Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden h-[500px]">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-8xl bg-slate-100">📦</div>
            )}
          </div>

          {/* Details */}
          <div>
            <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-semibold mb-4">
              {product.category}
            </span>

            <h1 className="text-5xl font-extrabold text-slate-900 mb-6">{product.name}</h1>

            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <h2 className="text-4xl font-bold text-orange-500 mb-8">
              KES {product.price.toLocaleString()}
            </h2>

            <div className="space-y-4 mb-10">
              <div className="bg-white p-4 rounded-2xl">
                <strong>Stock Available:</strong> {product.stock} units
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition"
              >
                <ShoppingCart size={24} />
                Add to Cart
              </button>

              <button className="flex-1 border-2 border-orange-500 text-orange-500 py-4 rounded-2xl font-semibold hover:bg-orange-50 transition">
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;