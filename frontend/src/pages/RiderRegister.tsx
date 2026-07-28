import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Bike, Upload, CheckCircle, ArrowLeft } from "lucide-react";

const nairobiSubCounties = [
  "Westlands", "Kasarani", "Embakasi", "Dagoretti South", "Langata",
  "Roysambu", "Ruaraka", "Starehe", "Makadara", "Kamukunji", "Mathare",
  "Dagoretti North", "Kibra", "Embakasi East", "Embakasi West", "Embakasi Central"
];

function RiderRegister() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    bikePlate: "",
    subCounty: "",
  });

  const [files, setFiles] = useState({
    idCopy: null as File | null,
    license: null as File | null,
    passportPhoto: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [e.target.name]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("fullName", formData.fullName);
      form.append("phone", formData.phone);
      form.append("bikePlate", formData.bikePlate);
      form.append("subCounty", formData.subCounty);

      if (files.idCopy) form.append("idCopy", files.idCopy);
      if (files.license) form.append("license", files.license);
      if (files.passportPhoto) form.append("passportPhoto", files.passportPhoto);

      const response = await axios.post("http://localhost:5000/api/delivery/register", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => navigate("/rider-dashboard"), 2500);
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={56} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Registration Successful!</h1>
          <p className="text-gray-600 text-lg mb-2">
            Welcome to the ArmorCovers Boda Rider network.
          </p>
          <p className="text-sm text-gray-500">Redirecting you to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link
          to="/boda-express"
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium mb-6"
        >
          <ArrowLeft size={20} /> Back to Boda Express
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-600 px-8 py-10 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Bike size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Become a Boda Rider</h1>
            <p className="text-orange-100">Fill the form below to join ArmorCovers Delivery Network</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Personal Information
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="2547XXXXXXXX"
                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bike Plate Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="bikePlate"
                    value={formData.bikePlate}
                    onChange={handleChange}
                    placeholder="e.g. KAA 123B"
                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sub-County (Nairobi) <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subCounty"
                    value={formData.subCounty}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition bg-white"
                    required
                  >
                    <option value="">Select your sub-county</option>
                    {nairobiSubCounties.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Required Documents
              </h3>

              <div className="space-y-6">
                {/* ID Copy */}
                <div className="border border-dashed border-gray-300 rounded-2xl p-5 hover:border-orange-400 transition">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    National ID Copy <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <Upload className="text-orange-500" size={22} />
                    <input
                      type="file"
                      name="idCopy"
                      onChange={handleFileChange}
                      accept="image/*,application/pdf"
                      className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                      required
                    />
                  </div>
                  {files.idCopy && (
                    <p className="text-xs text-green-600 mt-2">✓ {files.idCopy.name}</p>
                  )}
                </div>

                {/* License */}
                <div className="border border-dashed border-gray-300 rounded-2xl p-5 hover:border-orange-400 transition">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Rider License / NTSA Certificate <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <Upload className="text-orange-500" size={22} />
                    <input
                      type="file"
                      name="license"
                      onChange={handleFileChange}
                      accept="image/*,application/pdf"
                      className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                      required
                    />
                  </div>
                  {files.license && (
                    <p className="text-xs text-green-600 mt-2">✓ {files.license.name}</p>
                  )}
                </div>

                {/* Passport Photo */}
                <div className="border border-dashed border-gray-300 rounded-2xl p-5 hover:border-orange-400 transition">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Passport Size Photo <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <Upload className="text-orange-500" size={22} />
                    <input
                      type="file"
                      name="passportPhoto"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                      required
                    />
                  </div>
                  {files.passportPhoto && (
                    <p className="text-xs text-green-600 mt-2">✓ {files.passportPhoto.name}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white py-4 rounded-2xl font-semibold text-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting Application..." : "Submit Rider Application"}
            </button>

            <p className="text-center text-sm text-gray-500">
              By submitting, you agree to ArmorCovers Rider Terms & Conditions
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RiderRegister;