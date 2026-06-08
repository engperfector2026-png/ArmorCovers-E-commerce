import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

  const fetchCart = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/cart"
      );

      setCartItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    fetchCart();
  }, []);

  const validItems = cartItems.filter(
    (item) => item.product !== null
  );

  const total = validItems.reduce(
    (sum, item) =>
      sum + item.product!.price * item.quantity,
    0
  );

  return (
    <div className="bg-slate-100 min-h-screen py-10 px-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Shopping Cart
        </h1>

        {validItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <p className="text-gray-500">
              Your cart is empty.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">

              {validItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-sm p-6"
                >
                  <h2 className="text-xl font-bold text-gray-900">
                    {item.product!.name}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {item.product!.description}
                  </p>

                  <p className="text-orange-500 font-bold mt-3">
                    KES {item.product!.price.toLocaleString()}
                  </p>

                  <p className="mt-2 text-gray-700">
                    Quantity: {item.quantity}
                  </p>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}

            </div>

            <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Order Summary
              </h2>

              <p className="text-3xl text-orange-500 font-bold mt-4">
                KES {total.toLocaleString()}
              </p>

              <Link
                to="/checkout"
                className="inline-block mt-6 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition"
              >
                Proceed To Checkout
              </Link>
            </div>
          </>
        )}

      </div>

    </div>
  );
}

export default Cart;