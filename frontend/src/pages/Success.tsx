import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ShoppingBag, Home, ArrowRight } from "lucide-react";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect to home after 8 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full text-center">
        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
          <CheckCircle size={80} className="text-green-600" />
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
        
        <p className="text-xl text-gray-600 mb-10">
          Thank you for shopping with us. Your order has been received and is being processed.
        </p>

        <div className="bg-white rounded-3xl shadow-sm p-8 mb-10 text-left">
          <h3 className="font-semibold text-lg mb-6 text-center">Order Details</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number</span>
              <span className="font-medium">#ORD-{Date.now().toString().slice(-6)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">{new Date().toLocaleDateString('en-GB')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium">M-Pesa / Cash on Delivery</span>
            </div>
            <div className="flex justify-between border-t pt-4">
              <span className="font-semibold">Total Amount</span>
              <span className="font-bold text-xl text-green-600">KSh [Amount]</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition"
          >
            <Home size={22} />
            Return to Home
          </button>

          <button
            onClick={() => navigate("/products")}
            className="w-full border border-gray-300 hover:bg-gray-50 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition"
          >
            Continue Shopping <ArrowRight size={22} />
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-10">
          You will receive an SMS confirmation shortly.<br />
          For any inquiries, contact us at support@armorcovers.co.ke
        </p>
      </div>
    </div>
  );
};

export default Success;