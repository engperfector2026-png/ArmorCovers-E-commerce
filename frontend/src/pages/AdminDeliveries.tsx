import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Truck,
  ArrowLeft,
  Search,
  RefreshCw,
  MapPin,
  User,
  Clock,
} from "lucide-react";

const AdminDeliveries = () => {
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/delivery", { headers });
      const data = res.data?.data || res.data || [];
      setDeliveries(data);
      setFiltered(data);
    } catch (err) {
      console.error("Failed to load deliveries", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  useEffect(() => {
    let result = [...deliveries];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d._id?.toLowerCase().includes(q) ||
          d.customer?.name?.toLowerCase().includes(q) ||
          d.rider?.name?.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") {
      result = result.filter((d) => d.status === statusFilter);
    }
    setFiltered(result);
  }, [search, statusFilter, deliveries]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(
        `http://localhost:5000/api/delivery/status/${id}`,
        { status },
        { headers }
      );
      fetchDeliveries();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: any = {
      pending: "bg-gray-100 text-gray-700",
      assigned: "bg-blue-100 text-blue-700",
      picked_up: "bg-amber-100 text-amber-700",
      in_transit: "bg-amber-100 text-amber-700",
      delivered: "bg-emerald-100 text-emerald-700",
      failed: "bg-rose-100 text-rose-700",
      cancelled: "bg-rose-100 text-rose-700",
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
                <Truck className="text-cyan-600" /> Manage Deliveries
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {filtered.length} delivery{filtered.length !== 1 ? "ies" : ""} found
              </p>
            </div>
          </div>

          <button
            onClick={fetchDeliveries}
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
              placeholder="Search by ID, customer or rider..."
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
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="picked_up">Picked Up</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-gray-500">Loading deliveries...</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-gray-500">No deliveries found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Delivery</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Customer</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Rider</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Status</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((d) => (
                    <tr key={d._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <p className="font-medium text-cyan-600">#{d._id?.slice(-6)}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <Clock size={12} /> {new Date(d.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{d.customer?.name || "—"}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <MapPin size={12} /> {d.deliveryAddress?.city || d.deliveryAddress?.street || "—"}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {d.rider ? (
                          <div>
                            <p className="font-medium text-gray-900">{d.rider.name}</p>
                            <p className="text-gray-500">{d.rider.phone}</p>
                          </div>
                        ) : (
                          <span className="text-amber-600 text-sm">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(d.status)}`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={d.status}
                          onChange={(e) => updateStatus(d._id, e.target.value)}
                          className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="assigned">Assigned</option>
                          <option value="picked_up">Picked Up</option>
                          <option value="in_transit">In Transit</option>
                          <option value="delivered">Delivered</option>
                          <option value="failed">Failed</option>
                          <option value="cancelled">Cancelled</option>
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

export default AdminDeliveries;