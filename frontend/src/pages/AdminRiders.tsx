import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Bike,
  ArrowLeft,
  Search,
  CheckCircle,
  Phone,
  Mail,
  RefreshCw,
  Trash2,
  Ban,
  UserCheck,
} from "lucide-react";

const AdminRiders = () => {
  const [riders, setRiders] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  // Helper to get rider name from any possible field
  const getRiderName = (rider: any) => {
    return (
      rider.name ||
      rider.fullName ||
      rider.riderName ||
      rider.driverName ||
      "Unknown Rider"
    );
  };

  const fetchRiders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/delivery/riders", {
        headers,
      });
      const data = res.data?.data || res.data || [];
      setRiders(data);
      setFiltered(data);
    } catch (err) {
      console.error("Failed to load riders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiders();
  }, []);

  useEffect(() => {
    let result = [...riders];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((r) => {
        const riderName = getRiderName(r).toLowerCase();
        return (
          riderName.includes(q) ||
          r.phone?.includes(q) ||
          r.email?.toLowerCase().includes(q) ||
          r.bikePlate?.toLowerCase().includes(q) ||
          r.vehicleNumber?.toLowerCase().includes(q)
        );
      });
    }

    if (statusFilter !== "all") {
      result = result.filter((r) => r.status === statusFilter);
    }

    setFiltered(result);
  }, [search, statusFilter, riders]);

  // Approve (first time)
  const approveRider = async (id: string) => {
    try {
      await axios.put(
        `http://localhost:5000/api/delivery/riders/${id}/approve`,
        {},
        { headers }
      );
      fetchRiders();
    } catch (err) {
      alert("Failed to approve rider");
    }
  };

  // Toggle Activate / Suspend
  const toggleRiderStatus = async (id: string, currentStatus: string) => {
    const newStatus =
      currentStatus === "approved" || currentStatus === "active"
        ? "suspended"
        : "approved";

    try {
      await axios.put(
        `http://localhost:5000/api/delivery/riders/${id}/status`,
        { status: newStatus },
        { headers }
      );
      fetchRiders();
    } catch (err) {
      try {
        await axios.put(
          `http://localhost:5000/api/delivery/riders/${id}/approve`,
          { status: newStatus },
          { headers }
        );
        fetchRiders();
      } catch (error) {
        alert("Failed to update rider status");
      }
    }
  };

  // Delete rider
  const deleteRider = async (id: string, name: string) => {
    if (
      !window.confirm(
        `Are you sure you want to delete rider "${name}"? This cannot be undone.`
      )
    ) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/delivery/riders/${id}`, {
        headers,
      });
      fetchRiders();
    } catch (err) {
      alert("Failed to delete rider");
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: any = {
      approved: "bg-emerald-100 text-emerald-700",
      active: "bg-emerald-100 text-emerald-700",
      pending: "bg-amber-100 text-amber-700",
      suspended: "bg-rose-100 text-rose-700",
      rejected: "bg-rose-100 text-rose-700",
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
                <Bike className="text-orange-500" /> Manage Riders
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {filtered.length} rider{filtered.length !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>

          <button
            onClick={fetchRiders}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name, phone, email or bike plate..."
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
            <option value="approved">Approved / Active</option>
            <option value="suspended">Suspended</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-gray-500">Loading riders...</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-gray-500">No riders found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                      Rider Name
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                      Contact
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                      Bike Plate
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                      Status
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((rider) => {
                    const riderName = getRiderName(rider);

                    return (
                      <tr key={rider._id} className="hover:bg-gray-50 transition">
                        {/* Rider Name */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                              {riderName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {riderName}
                              </p>
                              <p className="text-xs text-gray-500">
                                ID: {rider._id?.slice(-6)}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-6 py-4">
                          <div className="space-y-1 text-sm">
                            <p className="flex items-center gap-1.5 text-gray-700">
                              <Phone size={14} /> {rider.phone || "—"}
                            </p>
                            <p className="flex items-center gap-1.5 text-gray-500">
                              <Mail size={14} /> {rider.email || "—"}
                            </p>
                          </div>
                        </td>

                        {/* Bike Plate */}
                        <td className="px-6 py-4 text-sm">
                          <p className="font-medium text-gray-900">
                            {rider.bikePlate || rider.vehicleNumber || "—"}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                              rider.status
                            )}`}
                          >
                            {rider.status || "pending"}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {/* Pending → Approve */}
                            {rider.status === "pending" && (
                              <button
                                onClick={() => approveRider(rider._id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-100 transition"
                              >
                                <CheckCircle size={16} /> Approve
                              </button>
                            )}

                            {/* Approved / Active → Suspend */}
                            {(rider.status === "approved" ||
                              rider.status === "active") && (
                              <button
                                onClick={() =>
                                  toggleRiderStatus(rider._id, rider.status)
                                }
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-100 transition"
                              >
                                <Ban size={16} /> Suspend
                              </button>
                            )}

                            {/* Suspended → Activate */}
                            {rider.status === "suspended" && (
                              <button
                                onClick={() =>
                                  toggleRiderStatus(rider._id, rider.status)
                                }
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-100 transition"
                              >
                                <UserCheck size={16} /> Activate
                              </button>
                            )}

                            {/* Delete */}
                            <button
                              onClick={() => deleteRider(rider._id, riderName)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 rounded-lg text-sm font-medium hover:bg-rose-100 transition"
                            >
                              <Trash2 size={16} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRiders;