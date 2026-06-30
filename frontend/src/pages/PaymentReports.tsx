import { useState, useEffect } from 'react';
import axios from 'axios';
import { DollarSign, Download } from 'lucide-react';

interface Payment {
  id: string;
  date: string;
  buyer: string;
  amount: number;
  method: string;
  status: string;
  orderId?: string;
}

const PaymentReports = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/admin/payments");
      setPayments(response.data);
      setTotalRevenue(response.data.reduce((sum: number, p: Payment) => sum + p.amount, 0));
    } catch (error) {
      console.error("Error fetching payments:", error);
      alert("Failed to load payments. Make sure you're logged in as admin.");
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    const csv = payments.map(p => `${p.id},${p.date},${p.buyer},${p.amount},${p.method},${p.status}`).join("\n");
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payment-report.csv';
    a.click();
    alert("Report exported successfully!");
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Payment Reports</h1>
            <p className="text-gray-600 mt-2">Total Revenue: KSh {totalRevenue.toLocaleString()}</p>
          </div>
          <button 
            onClick={exportReport}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2"
          >
            <Download size={20} /> Export CSV
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-8 py-5 text-left font-medium">Payment ID</th>
                <th className="px-8 py-5 text-left font-medium">Date</th>
                <th className="px-8 py-5 text-left font-medium">Buyer</th>
                <th className="px-8 py-5 text-left font-medium">Amount</th>
                <th className="px-8 py-5 text-left font-medium">Method</th>
                <th className="px-8 py-5 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-8 py-6 font-medium">{payment.id}</td>
                  <td className="px-8 py-6 text-gray-600">{payment.date}</td>
                  <td className="px-8 py-6">{payment.buyer}</td>
                  <td className="px-8 py-6 font-bold">KSh {payment.amount.toLocaleString()}</td>
                  <td className="px-8 py-6">{payment.method}</td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                      payment.status === "Completed" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentReports;