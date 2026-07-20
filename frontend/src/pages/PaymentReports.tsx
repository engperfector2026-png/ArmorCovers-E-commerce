import { useState, useEffect } from "react";
import axios from "axios";

interface Payment {
  _id: string;
  orderNumber: string;
  buyer?: {
    name: string;
  };
  amount: number;
  status: string;
  createdAt: string;
}

const PaymentReports = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/orders");
        setPayments(response.data);
      } catch (error) {
        console.error("Failed to load payments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const exportToExcel = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Order ID,Buyer,Amount,Status,Date\n" +
      payments
        .map((p) =>
          `${p.orderNumber},${p.buyer?.name || ""},${p.amount},${p.status},${new Date(p.createdAt).toLocaleDateString()}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "payment_reports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading payments...</div>;

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Payment Reports</h1>
          <button
            onClick={exportToExcel}
            className="bg-green-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-green-700"
          >
            Export to Excel
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow p-8">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-6">Order ID</th>
                <th className="text-left p-6">Buyer</th>
                <th className="text-left p-6">Amount</th>
                <th className="text-left p-6">Status</th>
                <th className="text-left p-6">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id} className="border-b last:border-none">
                  <td className="p-6">{payment.orderNumber}</td>
                  <td className="p-6">{payment.buyer?.name}</td>
                  <td className="p-6 font-medium">KSh {payment.amount.toLocaleString()}</td>
                  <td className="p-6">
                    <span
                      className={`px-4 py-1 rounded-full text-sm ${
                        payment.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-6 text-gray-600">{new Date(payment.createdAt).toLocaleDateString()}</td>
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