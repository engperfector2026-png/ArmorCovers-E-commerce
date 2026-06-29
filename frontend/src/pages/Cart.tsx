import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image?: string;
  quantity?: number;
}

function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => {
    return sum + (item.price * (item.quantity || 1));
  }, 0);

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
          🛒 Your Cart
          <span className="text-lg font-normal text-gray-500">({cart.length} items)</span>
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center">
            <div className="text-7xl mb-6">🛍️</div>
            <h2 className="text-3xl font-bold mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Start adding some amazing products!</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-orange-500 text-white px-10 py-4 rounded-2xl font-semibold"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div key={index} className="bg-white rounded-3xl p-6 flex gap-6 shadow-sm">
                  {/* Product Image */}
                  <div className="w-32 h-32 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <img
                        src={`http://localhost:5000${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/300?text=No+Image";
                        }}
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-5xl">📦</div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl">{item.name}</h3>
                    <p className="text-orange-600 font-bold text-2xl mt-1">
                      KSh {item.price.toLocaleString()}
                    </p>

                    <div className="flex items-center gap-4 mt-6">
                      <div className="flex items-center border rounded-2xl">
                        <button
                          onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}
                          className="px-4 py-2 hover:bg-gray-100 rounded-l-2xl"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="px-6 font-medium">{item.quantity || 1}</span>
                        <button
                          onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}
                          className="px-4 py-2 hover:bg-gray-100 rounded-r-2xl"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 size={22} />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      KSh {(item.price * (item.quantity || 1)).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-10 bg-white rounded-3xl p-8">
              <div className="flex justify-between items-center text-2xl font-bold">
                <span>Total</span>
                <span className="text-orange-600">KSh {total.toLocaleString()}</span>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => navigate("/products")}
                  className="flex-1 py-5 border border-gray-300 rounded-2xl font-semibold hover:bg-gray-50 transition"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => navigate("/checkout")}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-semibold transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;