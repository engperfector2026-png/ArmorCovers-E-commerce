import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    // Load wishlist from localStorage (for demo)
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (id: string) => {
    const updated = wishlist.filter(item => item._id !== id);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Heart className="text-red-500" /> My Wishlist
          </h1>
          <p className="text-gray-600">{wishlist.length} items</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center">
            <Heart size={80} className="mx-auto text-gray-300 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-600">Your wishlist is empty</h3>
            <p className="text-gray-500 mt-3">Start adding products you love!</p>
            <Link 
              to="/products"
              className="mt-8 inline-block bg-orange-500 text-white px-8 py-4 rounded-2xl font-semibold"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {wishlist.map((product) => (
              <div key={product._id} className="bg-white rounded-3xl overflow-hidden shadow-sm">
                <img 
                  src={product.image || "/placeholder.jpg"} 
                  alt={product.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-orange-600 font-bold mt-2">KSh {product.price?.toLocaleString()}</p>
                  
                  <div className="flex gap-3 mt-6">
                    <button 
                      onClick={() => removeFromWishlist(product._id)}
                      className="flex-1 border border-red-300 text-red-600 py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-50"
                    >
                      <Trash2 size={18} /> Remove
                    </button>
                    <button className="flex-1 bg-orange-500 text-white py-3 rounded-2xl flex items-center justify-center gap-2">
                      <ShoppingCart size={18} /> Add to Cart
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
};

export default Wishlist;