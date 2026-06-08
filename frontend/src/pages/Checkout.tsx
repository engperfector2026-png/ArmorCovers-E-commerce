import { useEffect, useState } from "react";
import axios from "axios";

interface CartItem {
  _id: string;
  quantity: number;
  product: {
    _id: string;
    name: string;
    price: number;
  } | null;
}

function Checkout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  useEffect(() => {
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

    fetchCart();
  }, []);

  const validItems = cartItems.filter(
    (item) => item.product !== null
  );

  const totalAmount = validItems.reduce(
    (sum, item) =>
      sum + item.product!.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      const products = validItems.map((item) => ({
        product: item.product!._id,
        quantity: item.quantity,
      }));

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          user: "guest",
          products,
          totalAmount,
          phoneNumber,
          deliveryAddress,
        }
      );

      alert("Order Created Successfully!");
    } catch (error) {
      console.error(error);
      alert("Checkout Failed");
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen py-10 px-6">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Checkout
        </h1>

        <div className="space-y-3">

          {validItems.map((item) => (
            <div
              key={item._id}
              className="bg-slate-50 rounded-xl p-4"
            >
              <h3 className="font-semibold text-gray-900">
                {item.product!.name}
              </h3>

              <p className="text-gray-500">
                Quantity: {item.quantity}
              </p>

              <p className="text-orange-500 font-bold">
                KES{" "}
                {(
                  item.product!.price *
                  item.quantity
                ).toLocaleString()}
              </p>
            </div>
          ))}

        </div>

        <div className="mt-6 border-t pt-6">
          <h2 className="text-3xl font-bold text-orange-500">
            Total: KES {totalAmount.toLocaleString()}
          </h2>
        </div>

        <div className="mt-8 space-y-4">

          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) =>
              setPhoneNumber(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <textarea
            placeholder="Delivery Address"
            value={deliveryAddress}
            onChange={(e) =>
              setDeliveryAddress(e.target.value)
            }
            rows={4}
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <button
            onClick={handleCheckout}
            className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition"
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;