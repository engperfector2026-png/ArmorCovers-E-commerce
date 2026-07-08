import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Check if already logged in (only once)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (token && user.role) {
      const redirectMap: { [key: string]: string } = {
        admin: "/admin-dashboard",
        seller: "/seller-dashboard",
        vendor: "/seller-dashboard",
      };
      const redirectPath = redirectMap[user.role] || "/buyer-dashboard";
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log("🔑 Logged in with role:", res.data.user.role);

      // Immediate Redirect
      const redirectMap: { [key: string]: string } = {
        admin: "/admin-dashboard",
        seller: "/seller-dashboard",
        vendor: "/seller-dashboard",
      };
      const redirectPath = redirectMap[res.data.user.role] || "/buyer-dashboard";
      navigate(redirectPath, { replace: true });
    } catch (error: any) {
      console.error("LOGIN ERROR:", error);
      setError(error?.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-orange-500">ARMORCOVERS</h1>
          <p className="text-gray-600 mt-2">Welcome back</p>
        </div>

        <div className="bg-white rounded-3xl shadow p-10">
          <h2 className="text-2xl font-semibold mb-8 text-center">Sign In</h2>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-slate-700 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-700 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-orange-500 font-semibold hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;