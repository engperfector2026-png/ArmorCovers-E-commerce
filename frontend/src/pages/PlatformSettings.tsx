import { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, Shield, Globe, Settings } from 'lucide-react';

const PlatformSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "ArmorCovers",
    contactEmail: "support@armorcovers.co.ke",
    phoneNumber: "+254 708 540 862",
    maintenanceMode: false,
    allowNewRegistrations: true,
    maxProductsPerSeller: 50,
    commissionRate: 8,
  });

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/admin/settings");
      console.log("✅ Settings loaded from MongoDB:", response.data);
      setSettings(response.data);
    } catch (error) {
      console.error("Failed to load settings from DB:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setSettings(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      await axios.put("http://localhost:5000/api/admin/settings", settings);
      alert("✅ Platform settings saved successfully to MongoDB!");
    } catch (error) {
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading settings from database...</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Platform Settings</h1>
            <p className="text-gray-600 mt-2">Configure global platform settings</p>
          </div>
          <button
            onClick={saveSettings}
            disabled={saving}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-2xl flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={20} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow p-10 space-y-12">
          {/* General Settings */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Globe size={28} className="text-orange-500" /> General Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium mb-2">Site Name</label>
                <input
                  type="text"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={settings.contactEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Security & Maintenance */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Shield size={28} className="text-orange-500" /> Security & Maintenance
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-gray-500">Temporarily disable the marketplace</p>
                </div>
                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={handleChange}
                  className="w-6 h-6 accent-orange-500"
                />
              </div>

              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                <div>
                  <p className="font-medium">Allow New Registrations</p>
                  <p className="text-sm text-gray-500">Enable/disable user signups</p>
                </div>
                <input
                  type="checkbox"
                  name="allowNewRegistrations"
                  checked={settings.allowNewRegistrations}
                  onChange={handleChange}
                  className="w-6 h-6 accent-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Business Rules */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Settings size={28} className="text-orange-500" /> Business Rules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium mb-2">Max Products Per Seller</label>
                <input
                  type="number"
                  name="maxProductsPerSeller"
                  value={settings.maxProductsPerSeller}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Platform Commission (%)</label>
                <input
                  type="number"
                  name="commissionRate"
                  value={settings.commissionRate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformSettings;