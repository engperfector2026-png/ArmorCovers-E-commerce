import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Upload, Shield } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "buyer",
  });

  const [docs, setDocs] = useState({
    passport: null as File | null,
    kraCertificate: null as File | null,
    nationalIdFront: null as File | null,
    nationalIdBack: null as File | null,
    sellingLicence: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const isSeller = formData.role === "seller" || formData.role === "vendor";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setDocs((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      // Basic Kenya phone check (optional but helpful)
      const phoneDigits = formData.phone.replace(/\D/g, "");
      if (formData.phone && phoneDigits.length < 9) {
        setError("Please enter a valid phone number (e.g. 0712345678)");
        setLoading(false);
        return;
      }

      if (isSeller) {
        if (
          !docs.passport ||
          !docs.kraCertificate ||
          !docs.nationalIdFront ||
          !docs.nationalIdBack ||
          !docs.sellingLicence
        ) {
          setError("Please upload all required seller documents.");
          setLoading(false);
          return;
        }

        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("password", formData.password);
        data.append("role", formData.role);
        data.append("passport", docs.passport);
        data.append("kraCertificate", docs.kraCertificate);
        data.append("nationalIdFront", docs.nationalIdFront);
        data.append("nationalIdBack", docs.nationalIdBack);
        data.append("sellingLicence", docs.sellingLicence);

        await axios.post("http://localhost:5000/api/auth/register", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("http://localhost:5000/api/auth/register", {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
        });
      }

      alert("✅ Registration successful! You can now login.");
      navigate("/login");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const FileInput = ({
    name,
    label,
    file,
  }: {
    name: keyof typeof docs;
    label: string;
    file: File | null;
  }) => (
    <div>
      <label className="block mb-2 text-slate-700 font-medium text-sm">
        {label} <span className="text-red-500">*</span>
      </label>
      <label className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl border border-dashed border-slate-300 hover:border-orange-400 bg-slate-50 cursor-pointer transition">
        <Upload size={18} className="text-orange-500 flex-shrink-0" />
        <span className="text-sm text-slate-600 truncate">
          {file ? file.name : "Click to upload"}
        </span>
        <input
          type="file"
          name={name}
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div
        className={`w-full transition-all duration-300 ${
          isSeller ? "max-w-2xl" : "max-w-md"
        }`}
      >
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
          <p className="text-gray-600 text-center mb-8">
            Join ArmorCovers Marketplace
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-center text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-slate-700 font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-700 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Phone — used for WhatsApp contact */}
            <div>
              <label className="block mb-2 text-slate-700 font-medium">
                Phone Number{" "}
                {isSeller && <span className="text-red-500">*</span>}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g. 0712345678"
                required={isSeller}
              />
              {isSeller && (
                <p className="text-xs text-slate-500 mt-1.5">
                  This number will be used for WhatsApp contact from buyers
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-slate-700 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Create password"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-700 font-medium">
                Register As
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller / Vendor</option>
              </select>
            </div>

            {/* ===== SELLER DOCUMENTS ===== */}
            {isSeller && (
              <div className="border border-orange-100 bg-orange-50/50 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <Shield size={20} className="text-orange-600" />
                  <h3 className="font-semibold text-slate-800">
                    Seller Verification Documents
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mb-3">
                  Upload clear images or PDFs. National ID requires both front
                  and back.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FileInput
                    name="passport"
                    label="Passport Photo"
                    file={docs.passport}
                  />
                  <FileInput
                    name="kraCertificate"
                    label="KRA Certificate"
                    file={docs.kraCertificate}
                  />
                  <FileInput
                    name="nationalIdFront"
                    label="National ID (Front)"
                    file={docs.nationalIdFront}
                  />
                  <FileInput
                    name="nationalIdBack"
                    label="National ID (Back)"
                    file={docs.nationalIdBack}
                  />
                  <div className="sm:col-span-2">
                    <FileInput
                      name="sellingLicence"
                      label="Selling Licence"
                      file={docs.sellingLicence}
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-semibold transition disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-500 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;