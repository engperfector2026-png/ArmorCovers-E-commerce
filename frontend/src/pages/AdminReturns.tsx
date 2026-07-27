import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  RotateCcw,
  ArrowLeft,
  Search,
  RefreshCw,
  Package,
  User,
  Clock,
} from "lucide-react";

const AdminReturns = () => {
  const [returns, setReturns] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchReturns = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/returns", { headers });
      const data = res.data?.data || res.data || [];
      setReturns(data);
      setFiltered(data);
    } catch (err) {
      console.error("Failed to load returns", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  useEffect(() => {
    let result = [...returns];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r._id?.toLowerCase().includes(q) ||
          r.customer?.name?.toLowerCase().includes(q) ||
          r.order?.orderNumber?.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") {
      result = result.filter((r) => r.status === statusFilter);
    }
    setFiltered(result);
  }, [search, statusFilter, returns]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(
        `http://localhost:5000/api/returns/${id}/status`,
        { status },
        { headers }
      );
      fetchReturns();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: any = {
      requested: "bg-gray-100 text-gray-700",
      approved: "bg-blue-100 text-blue-700",
      rejected: "bg-rose-100 text-rose-700",
      pickup_scheduled: "bg-amber-100 text-amber-700",
      picked_up: "bg-amber-100 text-amber-700",
      in_transit: "bg-amber-100 text-amber-700",
      received: "bg-indigo-100 text-indigo-700",
      refunded: "bg-emerald-100 text-emerald-700",
      replaced: "bg-emerald-100 text-emerald-700",
      closed: "bg-gray-100 text-gray-600",
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/admin-dashboard"
              className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <RotateCcw className="text-rose-600" /> Manage Returns
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {filtered.length} return{filtered.length !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>

          <button
            onClick={fetchReturns}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by ID, customer or order..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">All Status</option>
            <option value="requested">Requested</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="pickup_scheduled">Pickup Scheduled</option>
            <option value="picked_up">Picked Up</option>
            <option value="received">Received</option>
            <option value="refunded">Refunded</option>
            <option value="replaced">Replaced</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-gray-500">Loading returns...</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-gray-500">No returns found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Return</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Customer</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Items</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Status</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((r) => (
                    <tr key={r._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <p className="font-medium text-rose-600">#{r._id?.slice(-6)}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <Clock size={12} /> {new Date(r.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{r.customer?.name || "—"}</p>
                        <p className="text-xs text-gray-500">{r.customer?.phone || "—"}</p>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <p className="font-medium text-gray-900">
                          {r.items?.length || 0} item{(r.items?.length || 0) !== 1 ? "s" : ""}
                        </p>
                        <p className="text-gray-500 truncate max-w-[180px]">
                          {r.items?.[0]?.reason || "—"}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(r.status)}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={r.status}
                          onChange={(e) => updateStatus(r._id, e.target.value)}
                          className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="requested">Requested</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                          <option value="pickup_scheduled">Pickup Scheduled</option>
                          <option value="picked_up">Picked Up</option>
                          <option value="in_transit">In Transit</option>
                          <option value="received">Received</option>
                          <option value="refunded">Refunded</option>
                          <option value="replaced">Replaced</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReturns;