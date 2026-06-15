import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const kenyaCounties: { [key: string]: string[] } = {
  "Nairobi": ["Westlands", "Dagoretti South", "Langata", "Starehe", "Kasarani", "Embakasi Central", "Embakasi East", "Embakasi North", "Embakasi South", "Embakasi West", "Ruaraka", "Roysambu"],
  "Mombasa": ["Mvita", "Likoni", "Changamwe", "Jomvu", "Nyali", "Kisauni"],
  "Kiambu": ["Thika", "Ruiru", "Kikuyu", "Limuru", "Gatundu South", "Gatundu North", "Lari", "Kabete", "Kiambu", "Githunguri"],
  "Nakuru": ["Nakuru Town East", "Nakuru Town West", "Naivasha", "Gilgil", "Molo", "Njoro", "Subukia", "Rongai", "Bahati"],
  "Kisumu": ["Kisumu Central", "Kisumu West", "Kisumu East", "Seme", "Nyando", "Muhoroni", "Nyakach"],
  "Uasin Gishu": ["Soy", "Turbo", "Ainabkoi", "Moiben", "Kesses", "Kapseret"],
  "Meru": ["Central Imenti", "North Imenti", "South Imenti", "Buuri", "Tigania East", "Tigania West", "Igembe North", "Igembe South"],
  "Nyeri": ["Nyeri Central", "Nyeri South", "Mathira East", "Mathira West", "Mukurweini", "Kieni", "Tetu"],
  "Kakamega": ["Lugari", "Likuyani", "Malava", "Lurambi", "Shinyalu", "Ikolomani", "Khwisero"],
  "Kilifi": ["Kilifi North", "Kilifi South", "Malindi", "Magarini", "Ganze", "Rabai"],
  "Machakos": ["Machakos Town", "Masinga", "Yatta", "Kangundo", "Matungulu", "Kathiani", "Mwala"],
  "Kitui": ["Kitui Central", "Kitui West", "Kitui East", "Mwingi Central", "Mwingi North", "Mwingi West"],
  "Isiolo": ["Isiolo", "Garbatulla", "Merti"],
  "Garissa": ["Garissa Township", "Lagdera", "Dadaab", "Fafi", "Hulugho"],
  "Wajir": ["Wajir East", "Wajir West", "Wajir North", "Wajir South", "Eldas", "Tarbaj"],
  "Mandera": ["Mandera East", "Mandera West", "Mandera North", "Banissa", "Lafey"],
  "Marsabit": ["Marsabit Central", "Laisamis", "Moyale", "North Horr", "Chalbi"],
  "Turkana": ["Turkana Central", "Turkana North", "Turkana South", "Turkana West", "Loima"],
  "West Pokot": ["West Pokot", "Pokot South", "Pokot Central", "Kacheliba"],
  "Samburu": ["Samburu Central", "Samburu North", "Samburu East"],
  "Trans Nzoia": ["Trans Nzoia East", "Trans Nzoia West", "Endebess", "Kiminini"],
  "Elgeyo Marakwet": ["Marakwet East", "Marakwet West", "Keiyo North", "Keiyo South"],
  "Nandi": ["Nandi Hills", "Aldai", "Emgwen", "Mosop", "Tinderet"],
  "Baringo": ["Baringo Central", "Baringo North", "Baringo South", "Mogotio", "Tiaty"],
  "Laikipia": ["Laikipia East", "Laikipia West", "Laikipia North"],
  "Narok": ["Narok North", "Narok South", "Narok East", "Narok West", "Kilgoris"],
  "Kajiado": ["Kajiado North", "Kajiado Central", "Kajiado East", "Kajiado West", "Kajiado South"],
  "Kericho": ["Kericho", "Bureti", "Belgut", "Sigowet-Soin"],
  "Bomet": ["Bomet Central", "Bomet East", "Konoin", "Sotik"],
  "Homa Bay": ["Homa Bay Town", "Ndhiwa", "Mbita", "Suba", "Karachuonyo"],
  "Migori": ["Migori", "Rongo", "Awendo", "Suna East", "Suna West"],
  "Siaya": ["Siaya", "Gem", "Bondo", "Rarieda", "Ugenya", "Ugunja"],
  "Busia": ["Busia", "Samia", "Nambale", "Butula", "Matayos"],
  "Vihiga": ["Vihiga", "Sabatia", "Luanda", "Emuhaya", "Hamisi"],
  "Taita Taveta": ["Mwatate", "Voi", "Wundanyi", "Taveta"],
  "Kwale": ["Matuga", "Kinango", "Msambweni", "Lunga Lunga"],
  "Lamu": ["Lamu East", "Lamu West"],
  "Tana River": ["Garsen", "Galole", "Bura"],
  "Embu": ["Manyatta", "Runyenjes", "Mbeere North", "Mbeere South"],
  "Tharaka Nithi": ["Tharaka", "Maara", "Chuka/Igambang'ombe"],
  "Murang'a": ["Murang'a South", "Murang'a North", "Kandara", "Kangema", "Kigumo", "Gatanga"],
  "Kirinyaga": ["Mwea", "Gichugu", "Ndia", "Kirinyaga Central"],
};

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    county: "",
    subCounty: "",
    town: "",
    address: "",
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const grandTotal = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ 
      ...formData, 
      county: e.target.value,
      subCounty: "" 
    });
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.county || !formData.subCounty || !formData.address) {
      alert("Please fill in all required fields");
      return;
    }

    if (!agreedToTerms) {
      alert("You must agree to the Terms and Conditions to proceed with your order.");
      return;
    }

    alert(`🎉 Order placed successfully!\n\nTotal Amount: KSh ${grandTotal.toLocaleString()}\nDelivery Location: ${formData.subCounty}, ${formData.county}`);

    localStorage.removeItem("cart");
    navigate("/success");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Your cart is empty</h2>
          <button onClick={() => navigate("/products")} className="mt-6 bg-orange-500 text-white px-8 py-4 rounded-2xl">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Delivery Form */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-3xl p-8 shadow">
              <h2 className="text-2xl font-semibold mb-6">Delivery Information</h2>

              <form onSubmit={handleCheckout} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name *</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full p-4 border rounded-2xl" required />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-4 border rounded-2xl" placeholder="+254 7XX XXX XXX" required />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">County *</label>
                  <select name="county" value={formData.county} onChange={handleCountyChange} className="w-full p-4 border rounded-2xl" required>
                    <option value="">Select County</option>
                    {Object.keys(kenyaCounties).map(county => (
                      <option key={county} value={county}>{county}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Sub-County *</label>
                  <select name="subCounty" value={formData.subCounty} onChange={handleInputChange} className="w-full p-4 border rounded-2xl" required disabled={!formData.county}>
                    <option value="">Select Sub-County</option>
                    {formData.county && kenyaCounties[formData.county].map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Town / City</label>
                  <input type="text" name="town" value={formData.town} onChange={handleInputChange} className="w-full p-4 border rounded-2xl" />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Delivery Address *</label>
                  <textarea name="address" value={formData.address} onChange={handleInputChange} rows={4} className="w-full p-4 border rounded-2xl" placeholder="House number, street name, estate..." required />
                </div>

                {/* Terms & Conditions Checkbox with Links */}
                <div className="flex items-start gap-3 pt-4">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-5 h-5 accent-orange-500 cursor-pointer"
                    required
                  />
                  <label className="text-sm text-gray-600 leading-relaxed">
                    I have read and agree to the{" "}
                    <Link to="/terms" className="text-orange-500 underline hover:text-orange-600">Terms and Conditions</Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-orange-500 underline hover:text-orange-600">Privacy Policy</Link>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-semibold text-lg mt-6"
                >
                  Place Order - KSh {grandTotal.toLocaleString()}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow sticky top-8">
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between py-4 border-b last:border-none">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                  </div>
                  <p className="font-semibold">KSh {(item.price * (item.quantity || 1)).toLocaleString()}</p>
                </div>
              ))}

              <div className="pt-6 flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span className="text-orange-600">KSh {grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;