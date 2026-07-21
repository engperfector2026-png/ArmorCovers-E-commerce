import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShoppingCart, Heart, ArrowLeft, Star, Plus, Minus, MessageCircle } from "lucide-react";

interface Product {
  _id: string;
  id?: string | number;
  name: string;
  description: string;
  category: string;
  subCategory?: string;
  price: number;
  stock: number;
  image?: string;
  reviews: any[];
  colors?: string[];
  seller?: string; // Seller ID
}

const categories = [
  { name: "Electronics", icon: "🔌" },
  { name: "Vehicles", icon: "🚗" },
  { name: "Fashion", icon: "👕" },
  { name: "Home", icon: "🏠" },
  { name: "Agriculture", icon: "🌾" },
  { name: "Beauty", icon: "💄" },
  { name: "Sports", icon: "⚽" },
  { name: "Health", icon: "🩺" },
  { name: "Stationary", icon: "📝" },
  { name: "Education", icon: "📚" },
];

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [filteredRelated, setFilteredRelated] = useState<Product[]>([]);
  const [review, setReview] = useState({ rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setQuantity(1);
        setSelectedColor(response.data.colors?.[0] || "Default");

        const relatedRes = await axios.get("http://localhost:5000/api/products");
        const filtered = relatedRes.data
          .filter((p: any) => p.category === response.data.category && p._id !== id)
          .slice(0, 12);
        setRelatedProducts(filtered);
        setFilteredRelated(filtered);
      } catch (error: any) {
        console.error("Product fetch error:", error.response?.data || error);
        setError("Could not load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (selectedColor) {
      const filtered = relatedProducts.filter((p) => 
        p.colors && p.colors.includes(selectedColor)
      );
      setFilteredRelated(filtered.length > 0 ? filtered : relatedProducts);
    }
  }, [selectedColor, relatedProducts]);

  const handleAddReview = async () => {
    try {
      setSubmitting(true);
      await axios.post(`http://localhost:5000/api/products/${id}/reviews`, review);
      alert("✅ Review Submitted Successfully");
      const response = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(response.data);
      setReview({ rating: 5, comment: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  const addToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.findIndex((item: any) => item._id === product._id);

    if (existing !== -1) {
      cart[existing].quantity = (cart[existing].quantity || 1) + quantity;
    } else {
      cart.push({ ...product, quantity, selectedColor });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`✅ Added ${quantity} × ${selectedColor} of ${product.name} to cart!`);
  };

  // Chat with Seller
  const chatWithSeller = () => {
    if (!product?.seller) {
      alert("Seller information not available.");
      return;
    }
    navigate(`/chat/${product.seller}`);
  };

  if (loading) {
    return <div className="bg-slate-50 min-h-screen flex justify-center items-center text-xl font-semibold text-slate-700">Loading Product...</div>;
  }

  if (error || !product) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col justify-center items-center text-center px-6 py-20">
        <div className="text-6xl mb-6">😕</div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Product Not Found</h2>
        <p className="text-slate-600 mb-8 max-w-md">{error}</p>
        <Link to="/products" className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-orange-600 transition">
          ← Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <Link to="/products" className="inline-flex items-center gap-2 text-orange-500 mb-8 hover:underline">← Back to Shop</Link>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Main Image */}
              <div className="relative group">
                <div className="bg-white rounded-3xl shadow p-4 overflow-hidden">
                  {product.image ? (
                    <img 
                      src={`http://localhost:5000${product.image}`} 
                      alt={product.name} 
                      className="w-full h-[520px] object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="h-[520px] bg-gray-100 rounded-2xl flex items-center justify-center text-8xl">📦</div>
                  )}
                </div>
              </div>

              {/* Info Block */}
              <div className="space-y-8">
                <div>
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-4 py-1.5 rounded-full">
                    {product.category} • {product.subCategory}
                  </span>
                  <h1 className="text-5xl font-bold text-slate-900 mt-4">{product.name}</h1>
                </div>

                <div className="text-5xl font-bold text-orange-600">KSh {product.price.toLocaleString()}</div>

                <div className="prose text-slate-600 leading-relaxed">{product.description}</div>

                {/* Quantity Block */}
                <div className="border rounded-3xl p-6">
                  <p className="font-medium mb-3">Quantity</p>
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleQuantityChange(quantity - 1)} className="w-12 h-12 border rounded-xl flex items-center justify-center hover:bg-gray-100"><Minus size={20} /></button>
                    <span className="text-2xl font-semibold w-12 text-center">{quantity}</span>
                    <button onClick={() => handleQuantityChange(quantity + 1)} className="w-12 h-12 border rounded-xl flex items-center justify-center hover:bg-gray-100"><Plus size={20} /></button>
                  </div>
                </div>

                {/* Color Links Block */}
                <div className="border rounded-3xl p-6">
                  <p className="font-medium mb-4">Available Colors</p>
                  <div className="flex flex-wrap gap-3">
                    {(product.colors || ["Black", "Blue", "Silver", "Red"]).map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`px-6 py-3 rounded-2xl border transition-all hover:shadow-md ${selectedColor === color ? 'border-blue-500 bg-blue-50 font-medium' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-6">
                  <button onClick={addToCart} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-semibold flex items-center justify-center gap-3 transition">
                    <ShoppingCart size={24} /> Add to Cart
                  </button>
                  <button 
                    onClick={chatWithSeller}
                    className="flex-1 border border-blue-500 text-blue-600 hover:bg-blue-50 py-5 rounded-2xl font-semibold flex items-center justify-center gap-3 transition"
                  >
                    <MessageCircle size={24} /> Ask Seller
                  </button>
                </div>
              </div>
            </div>

            {/* Product Features */}
            <div className="mt-16 border rounded-3xl p-10">
              <h2 className="text-3xl font-bold mb-6">Built to Withstand the Test of Time</h2>
              <ul className="grid md:grid-cols-2 gap-6 text-lg">
                <li className="flex gap-4"><span className="text-green-500">✓</span> Premium Weather-Resistant Materials</li>
                <li className="flex gap-4"><span className="text-green-500">✓</span> Reinforced Stitching & Durable Seams</li>
                <li className="flex gap-4"><span className="text-green-500">✓</span> UV Protection & Fade Resistance</li>
                <li className="flex gap-4"><span className="text-green-500">✓</span> Easy to Clean & Maintain</li>
                <li className="flex gap-4"><span className="text-green-500">✓</span> 2-Year Warranty Included</li>
                <li className="flex gap-4"><span className="text-green-500">✓</span> Eco-Friendly & Sustainable Production</li>
              </ul>
            </div>

            {/* Customer Reviews */}
            <div className="mt-20">
              <h2 className="text-4xl font-bold mb-8">Customer Reviews ({product.reviews ? product.reviews.length : 0})</h2>

              <div className="bg-white rounded-3xl p-10 shadow mb-12">
                <h3 className="font-semibold text-xl mb-6">Write a Review</h3>

                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setReview({ ...review, rating: star })}
                      className="text-4xl text-orange-400 hover:scale-110 transition"
                    >
                      ★
                    </button>
                  ))}
                </div>

                <textarea
                  value={review.comment}
                  onChange={(e) => setReview({ ...review, comment: e.target.value })}
                  className="w-full px-6 py-5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 h-40"
                  placeholder="Share your experience with this product..."
                />

                <button
                  onClick={handleAddReview}
                  disabled={submitting}
                  className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-semibold transition"
                >
                  {submitting ? "Submitting Review..." : "Submit Review"}
                </button>
              </div>

              {product.reviews && product.reviews.length > 0 && product.reviews.map((r, index) => (
                <div key={index} className="bg-white rounded-3xl p-8 mb-8 shadow-sm">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-lg">{r.name}</p>
                    <p className="text-orange-500 text-2xl">{"★".repeat(r.rating)}</p>
                  </div>
                  <p className="text-gray-600 mt-4 leading-relaxed">{r.comment}</p>
                  <p className="text-xs text-gray-400 mt-6">{new Date(r.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Category Block */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl shadow-sm p-8 sticky top-8">
              <h3 className="font-bold text-2xl mb-6 text-gray-900">Shop by Category</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {categories.map((cat, index) => (
                  <Link 
                    key={index} 
                    to={`/category/${cat.name}`}
                    className="bg-slate-50 hover:bg-orange-50 p-6 rounded-2xl text-center transition flex flex-col items-center"
                  >
                    <span className="text-4xl mb-3">{cat.icon}</span>
                    <p className="font-medium">{cat.name}</p>
                  </Link>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t">
                <h4 className="font-semibold text-lg mb-4">Why Choose Us?</h4>
                <ul className="space-y-4 text-sm text-gray-600">
                  <li>✅ Premium Quality Guaranteed</li>
                  <li>✅ Fast Delivery Across Kenya</li>
                  <li>✅ Secure M-Pesa Payments</li>
                  <li>✅ 30-Day Money Back Guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Commodities */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold mb-10">
            Related Commodities {selectedColor && `(${selectedColor})`}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filteredRelated.map((p) => (
              <Link key={p._id || p.id} to={`/products/${p._id || p.id}`} className="bg-white rounded-3xl shadow hover:shadow-xl transition overflow-hidden block group">
                <div className="h-40 bg-gray-100 overflow-hidden">
                  {p.image ? <img src={`http://localhost:5000${p.image}`} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" /> : <div className="h-full flex items-center justify-center text-6xl">📦</div>}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-sm line-clamp-2">{p.name}</h3>
                  <p className="text-orange-600 font-bold mt-2">KSh {p.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;