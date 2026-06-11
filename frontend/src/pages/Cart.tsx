import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItem {
  _id: string;
  quantity: number;
  product: {
    _id: string;
    name: string;
    price: number;
    description: string;
  } | null;
}

function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/cart"
      );

      setCartItems(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (id: string) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/cart/${id}`
      );

      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const updateQuantity = async (
    id: string,
    quantity: number
  ) => {
    if (quantity < 1) return;

    try {
      await axios.put(
        `http://localhost:5000/api/cart/${id}`,
        { quantity }
      );

      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const validItems = cartItems.filter(
    (item) => item.product !== null
  );

  const total = validItems.reduce(
    (sum, item) =>
      sum + item.product!.price * item.quantity,
    0
  );

  const totalItems = validItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading cart...
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen py-10 px-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Shopping Cart
        </h1>

        <p className="text-gray-600 mb-8">
          {totalItems} item(s) in your cart
        </p>

        {validItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Your cart is empty
            </h2>

            <Link
              to="/"
              className="inline-block mt-4 bg-orange-500 text-white px-6 py-3 rounded-xl"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-4">

              {validItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex justify-between items-start">

                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {item.product!.name}
                      </h2>

                      <p className="text-gray-500 mt-2">
                        {item.product!.description}
                      </p>

                      <p className="mt-3 text-orange-500 font-bold">
                        KES {item.product!.price.toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>

                  <div className="mt-6 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.quantity - 1
                          )
                        }
                        className="bg-gray-200 p-2 rounded-lg"
                      >
                        <Minus size={18} />
                      </button>

                      <span className="font-semibold text-lg">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.quantity + 1
                          )
                        }
                        className="bg-orange-500 text-white p-2 rounded-lg"
                      >
                        <Plus size={18} />
                      </button>

                    </div>

                    <p className="font-bold text-xl text-gray-900">
                      KES{" "}
                      {(
                        item.product!.price *
                        item.quantity
                      ).toLocaleString()}
                    </p>

                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div>

              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">

                <h2 className="text-2xl font-bold text-gray-900">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-3">

                  <div className="flex justify-between">
                    <span>Items</span>
                    <span>{totalItems}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>KES {total.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>Calculated at checkout</span>
                  </div>

                </div>

                <hr className="my-6" />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>KES {total.toLocaleString()}</span>
                </div>

                <Link
                  to="/checkout"
                  className="block text-center mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
                >
                  Proceed To Checkout
                </Link>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Cart;