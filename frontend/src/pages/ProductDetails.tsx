import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShoppingCart, ArrowLeft, MessageCircle, Star } from "lucide-react";

interface Review {
  _id?: string;
  name: string;
  rating: number;
  comment: string;
  date?: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
  reviews?: Review[];
  seller?: string;
}

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [submittingReview, setSubmittingReview] = useState(false);

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
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    alert(`✅ ${product.name} added to cart!`);
  };

  const handleContactSeller = () => {
    if (!product) return;
    
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const sellerId = product.seller || "seller123"; // Fallback for now
    const roomId = `${sellerId}-${user.id || 'buyer'}`;
    
    navigate(`/chat/${roomId}`);
  };

  const submitReview = async () => {
    if (!reviewText.trim() || !product) return;

    setSubmittingReview(true);
    try {
      await axios.post(`http://localhost:5000/api/products/${product._id}/reviews`, {
        rating,
        comment: reviewText,
        name: "You"
      });

      const refreshed = await axios.get(`http://localhost:5000/api/products/${product._id}`);
      setProduct(refreshed.data);

      setReviewText("");
      setRating(5);
      alert("✅ Thank you for your review!");
    } catch (error) {
      console.error(error);
      alert("Failed to submit review.");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Loading product...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center text-xl">Product not found</div>;

  const averageRating = product.reviews && product.reviews.length > 0 
    ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length).toFixed(1) 
    : "0.0";

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <Link to="/products" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 mb-8">
          <ArrowLeft size={20} /> Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">
          
          {/* Image Section */}
          <div className="h-[500px] bg-gray-100 relative">
            {product.image ? (
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => e.currentTarget.src = "https://via.placeholder.com/600x600?text=No+Image"}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-8xl">📦</div>
            )}
          </div>

          {/* Details Section */}
          <div className="p-10">
            <span className="inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-medium">
              {product.category}
            </span>

            <h1 className="text-4xl font-bold mt-4 mb-3">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex">
                {[1,2,3,4,5].map((_, i) => (
                  <Star key={i} size={22} className={i < Math.floor(Number(averageRating)) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                ))}
              </div>
              <span className="text-gray-600">({product.reviews?.length || 0} reviews)</span>
            </div>

            <p className="text-3xl font-bold text-orange-600 mb-6">
              KSh {product.price.toLocaleString()}
            </p>

            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-8">
              <p className="text-green-700 font-medium">
                Stock Available: <span className="font-bold">{product.stock} units</span>
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed text-lg mb-10">
              {product.description}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-10">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3"
              >
                <ShoppingCart size={24} /> Add to Cart
              </button>

              <button
                onClick={handleContactSeller}
                className="flex-1 border border-orange-500 text-orange-600 hover:bg-orange-50 py-5 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3"
              >
                <MessageCircle size={24} /> Message Seller
              </button>
            </div>

            {/* Reviews Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-6">Customer Reviews</h3>

              {product.reviews && product.reviews.length > 0 ? (
                <div className="space-y-6 mb-10">
                  {product.reviews.map((review, index) => (
                    <div key={index} className="border-b pb-6 last:border-none">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex">
                          {[1,2,3,4,5].map((_, i) => (
                            <Star key={i} size={18} className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                          ))}
                        </div>
                        <span className="font-medium">{review.name}</span>
                        <span className="text-gray-500 text-sm">• {review.date || "Just now"}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mb-8">No reviews yet. Be the first to review!</p>
              )}

              {/* Add Review Form */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h4 className="font-semibold mb-4">Write a Review</h4>
                
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <button key={star} onClick={() => setRating(star)} className="text-3xl transition">
                      <Star className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                    </button>
                  ))}
                </div>

                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience with this product..."
                  className="w-full p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 h-28"
                />

                <button
                  onClick={submitReview}
                  disabled={!reviewText.trim() || submittingReview}
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-2xl font-medium disabled:opacity-50"
                >
                  {submittingReview ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;