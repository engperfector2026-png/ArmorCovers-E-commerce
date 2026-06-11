import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (!customerName.trim()) {
      alert("Enter customer name");
      return;
    }

    if (!phoneNumber.trim()) {
      alert("Enter phone number");
      return;
    }

    if (!deliveryAddress.trim()) {
      alert("Enter delivery address");
      return;
    }

    if (validItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      const products = validItems.map((item) => ({
        product: item.product!._id,
        quantity: item.quantity,
      }));

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          customerName,
          user: "guest",
          products,
          totalAmount,
          phoneNumber,
          deliveryAddress,
        }
      );

      // Clear cart after successful order
      await axios.delete(
        "http://localhost:5000/api/cart/clear"
      );

      alert("Order placed successfully!");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen py-10 px-6">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Checkout
          </h1>

          {/* ORDER ITEMS */}
          <div className="space-y-3">

            {validItems.map((item) => (
              <div
                key={item._id}
                className="bg-slate-50 rounded-xl p-4"
              >
                <div className="flex justify-between items-center">

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {item.product!.name}
                    </h3>

                    <p className="text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-bold text-orange-500">
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

          {/* TOTAL */}
          <div className="mt-8 border-t pt-6">

            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-gray-700">
                Total Amount
              </span>

              <span className="text-3xl font-bold text-orange-500">
                KES {totalAmount.toLocaleString()}
              </span>
            </div>

          </div>

          {/* CUSTOMER DETAILS */}
          <div className="mt-8 space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              value={customerName}
              onChange={(e) =>
                setCustomerName(e.target.value)
              }
              className="w-full border border-gray-300 rounded-xl p-3 text-gray-900"
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value)
              }
              className="w-full border border-gray-300 rounded-xl p-3 text-gray-900"
            />

            <textarea
              placeholder="Delivery Address"
              value={deliveryAddress}
              onChange={(e) =>
                setDeliveryAddress(e.target.value)
              }
              rows={4}
              className="w-full border border-gray-300 rounded-xl p-3 text-gray-900"
            />

            <button
              onClick={handleCheckout}
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;