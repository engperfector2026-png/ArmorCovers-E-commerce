import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Search, Trash2 } from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  status?: string;
}

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserStatus = async (id: string) => {
    if (!window.confirm("Change this user's status?")) return;

    // Optimistic update (immediate UI change)
    setUsers(prev => prev.map(user => 
      user._id === id 
        ? { ...user, status: (user.status || "active") === "active" ? "suspended" : "active" } 
        : user
    ));

    try {
      await axios.put(`http://localhost:5000/api/admin/users/${id}/status`);
    } catch (error) {
      // Revert on error
      fetchUsers();
      alert("Failed to update user status");
    }
  };

  const deleteUser = async (id: string) => {
    if (!window.confirm("Delete this user permanently?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
      setUsers(prev => prev.filter(user => user._id !== id));
      alert("User deleted successfully");
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading users...</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Manage Users</h1>
            <p className="text-gray-600 mt-2">Total Users: {users.length}</p>
          </div>
          <div className="relative w-80">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-white border rounded-2xl focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-8 py-5 text-left font-medium">User</th>
                <th className="px-8 py-5 text-left font-medium">Email</th>
                <th className="px-8 py-5 text-left font-medium">Role</th>
                <th className="px-8 py-5 text-left font-medium">Joined</th>
                <th className="px-8 py-5 text-left font-medium">Status</th>
                <th className="px-8 py-5 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-8 py-6 font-medium">{user.name}</td>
                  <td className="px-8 py-6 text-gray-600">{user.email}</td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                      user.role === "admin" ? "bg-purple-100 text-purple-700" :
                      user.role === "seller" ? "bg-orange-100 text-orange-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                      (user.status || "active") === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {user.status || "active"}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center flex gap-3 justify-center">
                    <button
                      onClick={() => toggleUserStatus(user._id)}
                      className="px-6 py-2 text-sm border rounded-xl hover:bg-gray-100 transition font-medium"
                    >
                      {(user.status || "active") === "active" ? "Suspend" : "Activate"}
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="px-5 py-2 text-sm border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition"
                    >
                      <Trash2 size={18} />
                    </button>
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

export default ManageUsers;