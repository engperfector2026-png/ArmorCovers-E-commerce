import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const nairobiSubCounties = [
  "Westlands", "Kasarani", "Embakasi", "Dagoretti South", "Langata",
  "Roysambu", "Ruaraka", "Starehe", "Makadara", "Kamukunji", "Mathare"
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
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => navigate("/rider-dashboard"), 2000);
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold text-green-600">Registration Successful!</h1>
          <p className="mt-4 text-gray-600">You are now a verified ArmorCovers Boda Rider</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-12 px-6">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-4xl font-bold text-center mb-2">Join as Boda Rider</h1>
        <p className="text-center text-gray-600 mb-10">Nairobi County Only</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Full Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                placeholder="Enter your full name" 
                className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:border-orange-500 outline-none" 
                required 
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Phone Number <span className="text-red-500">*</span></label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="2547XXXXXXXX" 
                className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:border-orange-500 outline-none" 
                required 
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Bike Plate Number <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="bikePlate" 
                value={formData.bikePlate} 
                onChange={handleChange} 
                placeholder="KAA 123B" 
                className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:border-orange-500 outline-none" 
                required 
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Sub-County (Nairobi) <span className="text-red-500">*</span></label>
              <select 
                name="subCounty" 
                value={formData.subCounty} 
                onChange={handleChange} 
                className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:border-orange-500 outline-none" 
                required
              >
                <option value="">Select Sub-County</option>
                {nairobiSubCounties.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Documents Section */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-lg text-gray-800 mb-6">Required Documents</h3>

            <div className="space-y-8">
              <div>
                <label className="block text-gray-700 mb-3 font-medium">National ID Copy <span className="text-red-500">*</span></label>
                <input 
                  type="file" 
                  name="idCopy" 
                  onChange={handleFileChange} 
                  className="w-full file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" 
                  accept="image/*,application/pdf" 
                  required 
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-3 font-medium">Rider License / NTSA <span className="text-red-500">*</span></label>
                <input 
                  type="file" 
                  name="license" 
                  onChange={handleFileChange} 
                  className="w-full file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" 
                  accept="image/*,application/pdf" 
                  required 
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-3 font-medium">Passport Size Photo <span className="text-red-500">*</span></label>
                <input 
                  type="file" 
                  name="passportPhoto" 
                  onChange={handleFileChange} 
                  className="w-full file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" 
                  accept="image/*" 
                  required 
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-semibold text-xl transition disabled:opacity-70 mt-4"
          >
            {loading ? "Submitting Application..." : "Submit Rider Application"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RiderRegister;