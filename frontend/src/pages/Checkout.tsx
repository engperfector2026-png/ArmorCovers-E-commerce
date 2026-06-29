import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const kenyaCounties: { [key: string]: string[] } = {
  "Nairobi": ["Westlands", "Kasarani", "Embakasi", "Dagoretti South", "Langata", "Roysambu", "Ruaraka"],
  "Mombasa": ["Mvita", "Changamwe", "Jomvu", "Nyali", "Likoni", "Kisauni"],
  "Kisumu": ["Kisumu Central", "Kisumu East", "Kisumu West", "Seme", "Nyando"],
  "Eldoret": ["Soy", "Turbo", "Moiben", "Kesses"],
  "Nakuru": ["Nakuru Town", "Gilgil", "Molo", "Njoro", "Subukia"],
  "Kiambu": ["Thika", "Ruiru", "Juja", "Kiambu Town", "Githunguri"],
  "Kakamega": ["Lurambi", "Shinyalu", "Ikolomani", "Mumias"],
  "Bungoma": ["Bungoma Central", "Bungoma East", "Bungoma West", "Kimilili"],
  "Machakos": ["Machakos Town", "Masinga", "Kangundo", "Matungulu"],
  "Meru": ["Meru Central", "Imenti North", "Imenti South"],
  "Nyeri": ["Nyeri Central", "Mathira", "Mukurweini"],
  "Kilifi": ["Kilifi North", "Kilifi South", "Malindi"],
  "Uasin Gishu": ["Turbo", "Soy", "Ainabkoi"],
  "Trans Nzoia": ["Endebess", "Kiminini", "Saboti"],
  "Garissa": ["Garissa Township", "Dadaab"],
  "Wajir": ["Wajir East", "Wajir West"],
  "Mandera": ["Mandera East", "Mandera West"],
  "Marsabit": ["Marsabit Central", "Moyale"],
  "Isiolo": ["Isiolo", "Garbatulla"],
  "Kitui": ["Kitui Central", "Mwingi"],
  "Embu": ["Embu", "Mbeere"],
  "Tharaka Nithi": ["Tharaka", "Maara"],
  "Bomet": ["Bomet Central", "Konoin"],
  "Kericho": ["Kericho", "Bureti"],
  "Nandi": ["Nandi Hills", "Emgwen"],
  "Laikipia": ["Laikipia East", "Laikipia West"],
  "Narok": ["Narok North", "Narok South"],
  "Kajiado": ["Kajiado North", "Kajiado Central", "Kajiado East"],
  "Homa Bay": ["Homa Bay Town", "Ndhiwa"],
  "Migori": ["Migori", "Rongo"],
  "Siaya": ["Siaya", "Gem"],
  "Vihiga": ["Vihiga", "Sabatia"],
  "Busia": ["Busia", "Butula"],
  "Taita Taveta": ["Voi", "Taveta"],
  "Lamu": ["Lamu West", "Lamu East"],
  "Turkana": ["Turkana Central", "Turkana South"],
  "West Pokot": ["Kapenguria", "Pokot South"],
  "Samburu": ["Samburu Central", "Samburu East"],
  "Baringo": ["Baringo Central", "Baringo North"],
  "Elgeyo Marakwet": ["Marakwet East", "Marakwet West"],
  "Kirinyaga": ["Kirinyaga Central", "Mwea"],
  "Murang'a": ["Murang'a South", "Murang'a North"],
  "Nyandarua": ["Nyandarua Central", "Kinangop"],
  "Tana River": ["Garsen", "Hola"],
  "Kwale": ["Matuga", "Kinango"],
};

function Checkout() {
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    county: "",
    subCounty: "",
    address: "",
  });
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
    
    const calculatedTotal = savedCart.reduce((sum: number, item: any) => {
      return sum + (item.price * (item.quantity || 1));
    }, 0);
    
    setTotal(calculatedTotal);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset sub-county when county changes
      ...(name === "county" && { subCounty: "" })
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      alert("Please agree to the Terms & Conditions");
      return;
    }

    if (!formData.fullName || !formData.phone || !formData.county) {
      alert("Please fill in all required fields");
      return;
    }

    localStorage.setItem("lastOrderTotal", total.toString());
    localStorage.removeItem("cart");

    alert("🎉 Order placed successfully!");
    navigate("/success");
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <div className="bg-white rounded-3xl shadow p-8">
              <h2 className="text-2xl font-semibold mb-6">Delivery Information</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name *</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full px-5 py-4 rounded-2xl border" required />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-5 py-4 rounded-2xl border" placeholder="2547XXXXXXXX" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">County *</label>
                    <select name="county" value={formData.county} onChange={handleInputChange} className="w-full px-5 py-4 rounded-2xl border" required>
                      <option value="">Select County</option>
                      {Object.keys(kenyaCounties).map(county => (
                        <option key={county} value={county}>{county}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Sub-County</label>
                    <select name="subCounty" value={formData.subCounty} onChange={handleInputChange} className="w-full px-5 py-4 rounded-2xl border">
                      <option value="">Select Sub-County</option>
                      {formData.county && kenyaCounties[formData.county]?.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Delivery Address *</label>
                  <textarea name="address" value={formData.address} onChange={handleInputChange} className="w-full px-5 py-4 rounded-2xl border h-24" placeholder="House number, street, landmark..." required />
                </div>

                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-5 h-5 accent-orange-500" />
                  <span className="text-sm text-gray-600">
                    I agree to the <Link to="/terms" className="text-orange-500 underline">Terms & Conditions</Link>
                  </span>
                </div>

                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-semibold text-xl transition">
                  Place Order - KSh {total.toLocaleString()}
                </button>
              </form>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl shadow p-8 sticky top-6">
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
              {cart.map((item: any, index: number) => (
                <div key={index} className="flex justify-between py-3 border-b last:border-none">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                  </div>
                  <p className="font-semibold">KSh {(item.price * (item.quantity || 1)).toLocaleString()}</p>
                </div>
              ))}
              <div className="mt-8 pt-6 border-t flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span className="text-orange-600">KSh {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;