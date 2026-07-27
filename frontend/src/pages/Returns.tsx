import { useState, useEffect } from 'react';
import { RotateCcw, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface ReturnRequest {
  id: string;
  orderId: string;
  productName: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected" | "Processing";
  date: string;
}

function Returns() {
  const [returns, setReturns] = useState<ReturnRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    try {
      setLoading(true);
      // Replace with real API when ready
      const response = await axios.get("http://localhost:5000/api/returns");
      setReturns(response.data);
    } catch (error) {
      console.error("Error fetching returns:", error);
      // Mock data for now
      const mockReturns: ReturnRequest[] = [
        {
          id: "RET-001",
          orderId: "ORD-7842",
          productName: "Leather Seat Cover - Prado",
          reason: "Item arrived damaged",
          status: "Processing",
          date: "2026-06-22"
        },
        {
          id: "RET-002",
          orderId: "ORD-7839",
          productName: "Custom Steering Wheel Cover",
          reason: "Wrong size delivered",
          status: "Approved",
          date: "2026-06-20"
        }
      ];
      setReturns(mockReturns);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Approved": return "bg-green-100 text-green-700";
      case "Rejected": return "bg-red-100 text-red-700";
      case "Processing": return "bg-blue-100 text-blue-700";
      default: return "bg-amber-100 text-amber-700";
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Returns & Refunds</h1>
            <p className="text-gray-600 mt-1">Track your return requests</p>
          </div>
          <div className="text-sm text-gray-500">
            Need help? <span className="text-orange-500 cursor-pointer hover:underline">Contact Support</span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">Loading returns...</div>
        ) : returns.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center">
            <RotateCcw size={80} className="mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-semibold mb-3">No Return Requests</h2>
            <p className="text-gray-500">You haven't made any return requests yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {returns.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex gap-6">
                    <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
                      📦
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Order #{item.orderId}</p>
                      <h3 className="font-semibold text-lg mt-1">{item.productName}</h3>
                      <p className="text-gray-600 mt-2">Reason: {item.reason}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`inline-block px-5 py-2 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                    <p className="text-sm text-gray-500 mt-3">{item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-white rounded-3xl p-8">
          <h3 className="font-semibold text-xl mb-4">Return Policy</h3>
          <ul className="space-y-3 text-gray-600">
            <li>• Returns accepted within 7 days of delivery</li>
            <li>• Item must be unused and in original packaging</li>
            <li>• Refund processed within 5-7 business days</li>
            <li>• Contact seller first for faster resolution</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Returns;