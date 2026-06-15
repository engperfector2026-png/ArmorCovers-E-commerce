import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

const Cart = () => {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity || 1;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate Subtotals and Grand Total
  const cartWithSubtotals = cart.map(item => ({
    ...item,
    quantity: item.quantity || 1,
    subtotal: (item.price || 0) * (item.quantity || 1)
  }));

  const grandTotal = cartWithSubtotals.reduce((sum, item) => sum + item.subtotal, 0);

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <ShoppingBag className="text-orange-500" /> Your Cart
          </h1>
          <p className="text-gray-600">{cart.length} items</p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center">
            <ShoppingBag size={80} className="mx-auto text-gray-300 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-600">Your cart is empty</h3>
            <Link 
              to="/products"
              className="mt-8 inline-block bg-orange-500 text-white px-10 py-4 rounded-2xl font-semibold hover:bg-orange-600"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cartWithSubtotals.map((item, index) => (
                <div key={index} className="bg-white rounded-3xl p-6 flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-32 h-32 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl">📦</div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-xl">{item.name}</h3>
                    <p className="text-orange-600 font-bold text-2xl mt-1">
                      KSh {item.price?.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}
                      className="w-10 h-10 border rounded-xl flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-12 text-center font-semibold text-lg">{item.quantity || 1}</span>
                    <button 
                      onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}
                      className="w-10 h-10 border rounded-xl flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-[120px]">
                    <p className="text-sm text-gray-500">Subtotal</p>
                    <p className="font-bold text-xl text-orange-600">
                      KSh {item.subtotal.toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-500 hover:text-red-700 p-3"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-10 bg-white rounded-3xl p-8">
              <div className="flex justify-between text-3xl font-bold border-t pt-8">
                <span>Total:</span>
                <span className="text-orange-600">KSh {grandTotal.toLocaleString()}</span>
              </div>

              <div className="flex gap-4 mt-10">
                <Link
                  to="/products"
                  className="flex-1 text-center py-4 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50"
                >
                  Continue Shopping
                </Link>
                <Link
                  to="/checkout"
                  className="flex-1 text-center py-4 bg-orange-500 text-white rounded-2xl font-semibold hover:bg-orange-600"
                >
                  Proceed to Checkout
                </Link>
              </div>

              <button
                onClick={clearCart}
                className="mt-6 text-red-500 hover:underline text-sm"
              >
                Clear All Items
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;