import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Clock, MapPin, Truck, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import API from '../api/axios';

const OrderTracking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState(searchParams.get('trackingNumber') || '');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const statusSteps = ["Pending", "Processing", "Shipped", "Delivered"];

  const handleTrack = async () => {
    if (!trackingNumber) return;

    setLoading(true);
    setError('');

    try {
      const res = await API.get(`/orders/track/${trackingNumber}`);
      setOrder(res.data);
    } catch (err: any) {
      setError("Order not found. Please check your tracking number.");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIndex = (status: string) => {
    return statusSteps.indexOf(status);
  };

  return (
    <div className="bg-slate-100 min-h-screen pb-12">
      <div className="max-w-3xl mx-auto px-6 py-10">
        
        <button 
          onClick={() => navigate('/buyer-dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl shadow-sm p-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900">Track Your Order</h1>
            <p className="text-gray-600 mt-3">Enter your tracking number to see real-time updates</p>
          </div>

          {/* Tracking Input */}
          <div className="max-w-md mx-auto mb-12">
            <div className="flex gap-3">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="TRK-123456"
                className="flex-1 px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 text-lg"
              />
              <button
                onClick={handleTrack}
                disabled={loading || !trackingNumber}
                className="bg-orange-500 hover:bg-orange-600 text-white px-10 rounded-2xl font-semibold disabled:opacity-70 transition"
              >
                {loading ? "Tracking..." : "Track"}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-2xl text-center mb-8">
              {error}
            </div>
          )}

          {order && (
            <div className="space-y-10">
              {/* Order Info */}
              <div className="bg-slate-50 rounded-3xl p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Order Number</p>
                    <p className="font-mono font-bold text-xl text-gray-900">{order.orderNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Tracking Number</p>
                    <p className="font-mono font-bold text-xl text-orange-600">{order.trackingNumber}</p>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div>
                <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                  <Clock size={24} className="text-orange-500" /> Delivery Status
                </h3>
                
                <div className="relative pl-8 border-l-2 border-orange-200 space-y-10">
                  {statusSteps.map((step, index) => {
                    const isCompleted = getStatusIndex(order.status) >= index;
                    const isCurrent = order.status === step;

                    return (
                      <div key={index} className="relative">
                        <div className={`absolute -left-2.5 w-5 h-5 rounded-full flex items-center justify-center border-4 border-white ${isCompleted ? 'bg-orange-500' : 'bg-gray-200'}`}>
                          {isCompleted && <CheckCircle className="text-white" size={14} />}
                        </div>
                        <div className={`${isCurrent ? 'font-semibold' : ''}`}>
                          <p className={`text-lg ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>{step}</p>
                          {isCurrent && <p className="text-sm text-orange-600">Current Status</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-white border border-gray-200 hover:border-orange-300 p-6 rounded-3xl text-left transition">
                  <MapPin className="text-orange-500 mb-3" size={32} />
                  <p className="font-medium">Track on Map</p>
                  <p className="text-sm text-gray-500">Live location coming soon</p>
                </button>

                <button className="bg-white border border-gray-200 hover:border-orange-300 p-6 rounded-3xl text-left transition">
                  <Truck className="text-orange-500 mb-3" size={32} />
                  <p className="font-medium">Contact Courier</p>
                  <p className="text-sm text-gray-500">Call support</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;