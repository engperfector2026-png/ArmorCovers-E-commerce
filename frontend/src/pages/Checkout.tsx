import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Zap,
  Shield,
  Gift,
  MapPin,
  Phone,
  User,
  Truck,
  CreditCard,
  Lock,
  CheckCircle2,
  Package,
} from "lucide-react";

const kenyaCounties: { [key: string]: string[] } = {
  Nairobi: ["Westlands", "Kasarani", "Embakasi", "Dagoretti South", "Langata", "Roysambu", "Ruaraka"],
  Mombasa: ["Mvita", "Changamwe", "Jomvu", "Nyali", "Likoni", "Kisauni"],
  Kisumu: ["Kisumu Central", "Kisumu East", "Kisumu West", "Seme", "Nyando"],
  Eldoret: ["Soy", "Turbo", "Moiben", "Kesses"],
  Nakuru: ["Nakuru Town", "Gilgil", "Molo", "Njoro", "Subukia"],
  Kiambu: ["Thika", "Ruiru", "Juja", "Kiambu Town", "Githunguri"],
  Kakamega: ["Lurambi", "Shinyalu", "Ikolomani", "Mumias"],
  Bungoma: ["Bungoma Central", "Bungoma East", "Bungoma West", "Kimilili"],
  Machakos: ["Machakos Town", "Masinga", "Kangundo", "Matungulu"],
  Meru: ["Meru Central", "Imenti North", "Imenti South"],
  Nyeri: ["Nyeri Central", "Mathira", "Mukurweini"],
  Kilifi: ["Kilifi North", "Kilifi South", "Malindi"],
  "Uasin Gishu": ["Turbo", "Soy", "Ainabkoi"],
  "Trans Nzoia": ["Endebess", "Kiminini", "Saboti"],
  Garissa: ["Garissa Township", "Dadaab"],
  Wajir: ["Wajir East", "Wajir West"],
  Mandera: ["Mandera East", "Mandera West"],
  Marsabit: ["Marsabit Central", "Moyale"],
  Isiolo: ["Isiolo", "Garbatulla"],
  Kitui: ["Kitui Central", "Mwingi"],
  Embu: ["Embu", "Mbeere"],
  "Tharaka Nithi": ["Tharaka", "Maara"],
  Bomet: ["Bomet Central", "Konoin"],
  Kericho: ["Kericho", "Bureti"],
  Nandi: ["Nandi Hills", "Emgwen"],
  Laikipia: ["Laikipia East", "Laikipia West"],
  Narok: ["Narok North", "Narok South"],
  Kajiado: ["Kajiado North", "Kajiado Central", "Kajiado East"],
  "Homa Bay": ["Homa Bay Town", "Ndhiwa"],
  Migori: ["Migori", "Rongo"],
  Siaya: ["Siaya", "Gem"],
  Vihiga: ["Vihiga", "Sabatia"],
  Busia: ["Busia", "Butula"],
  "Taita Taveta": ["Voi", "Taveta"],
  Lamu: ["Lamu West", "Lamu East"],
  Turkana: ["Turkana Central", "Turkana South"],
  "West Pokot": ["Kapenguria", "Pokot South"],
  Samburu: ["Samburu Central", "Samburu East"],
  Baringo: ["Baringo Central", "Baringo North"],
  "Elgeyo Marakwet": ["Marakwet East", "Marakwet West"],
  Kirinyaga: ["Kirinyaga Central", "Mwea"],
  "Murang'a": ["Murang'a South", "Murang'a North"],
  Nyandarua: ["Nyandarua Central", "Kinangop"],
  "Tana River": ["Garsen", "Hola"],
  Kwale: ["Matuga", "Kinango"],
};

interface FreeGift {
  name: string;
  description?: string;
  image?: string;
}

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
  const [paymentMethod, setPaymentMethod] = useState<"checkout" | "delivery">("checkout");
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<"normal" | "boda">("normal");
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
    const calculatedTotal = savedCart.reduce((sum: number, item: any) => {
      return sum + item.price * (item.quantity || 1);
    }, 0);
    setTotal(calculatedTotal);
  }, []);

  const isOnFlashSale = (item: any) => {
    if (!item.isFlashSale || !item.flashSalePrice) return false;
    const now = new Date();
    const start = item.flashSaleStart ? new Date(item.flashSaleStart) : null;
    const end = item.flashSaleEnd ? new Date(item.flashSaleEnd) : null;
    if (start && now < start) return false;
    if (end && now > end) return false;
    return true;
  };

  const hasWarranty = (item: any) => {
    if (item.warranty === true) return true;
    if (typeof item.warranty === "number" && item.warranty > 0) return true;
    if (typeof item.warranty === "string" && item.warranty.trim() !== "") return true;
    if (item.warrantyMonths && item.warrantyMonths > 0) return true;
    return false;
  };

  const getWarrantyLabel = (item: any) => {
    if (typeof item.warranty === "number") return `${item.warranty} Months`;
    if (item.warrantyMonths) return `${item.warrantyMonths} Months`;
    if (typeof item.warranty === "string") return item.warranty;
    return "12 Months";
  };

  const getFreeGifts = (item: any): FreeGift[] => {
    if (item.hasFreeGift === false) return [];
    if (Array.isArray(item.gifts) && item.gifts.length > 0) {
      return item.gifts
        .filter((g: any) => g && g.name && String(g.name).trim())
        .map((g: any) => ({
          name: String(g.name).trim(),
          description: g.description ? String(g.description).trim() : "",
          image: g.image || "",
        }));
    }
    if (item.gift?.name) {
      return [
        {
          name: item.gift.name,
          description: item.gift.description || "",
          image: item.gift.image || "",
        },
      ];
    }
    if (item.giftName) {
      return [
        {
          name: item.giftName,
          description: item.giftDescription || "",
          image: item.giftImage || "",
        },
      ];
    }
    return [];
  };

  const buildOrderItems = () => {
    return cart.map((item) => {
      const gifts = getFreeGifts(item);
      return {
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image || "",
        selectedColor: item.selectedColor || "",
        isFlashSale: isOnFlashSale(item),
        flashSalePrice: item.flashSalePrice || null,
        hasWarranty: hasWarranty(item),
        warrantyMonths: hasWarranty(item)
          ? item.warrantyMonths ||
            (typeof item.warranty === "number" ? item.warranty : 12)
          : 0,
        hasFreeGift: gifts.length > 0,
        gifts: gifts,
      };
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "county" && { subCounty: "" }),
    }));
  };

  const handleMpesaPayment = async () => {
    if (!mpesaPhone) {
      alert("Please enter your M-Pesa phone number");
      return;
    }
    setLoading(true);
    try {
      const orderId = "ORD-" + Date.now();
      const orderItems = buildOrderItems();
      try {
        await axios.post("http://localhost:5000/api/orders", {
          orderId,
          items: orderItems,
          total,
          customer: formData,
          paymentMethod: "mpesa_checkout",
          deliveryMethod,
          mpesaPhone,
        });
      } catch {
        console.log("Order API not available, continuing with payment only");
      }
      const response = await axios.post("http://localhost:5000/api/mpesa/stkpush", {
        phone: mpesaPhone,
        amount: total,
        orderId,
      });
      if (response.data.success) {
        localStorage.setItem(
          "lastOrder",
          JSON.stringify({
            orderId,
            items: orderItems,
            total,
            customer: formData,
            paymentMethod: "mpesa_checkout",
            deliveryMethod,
          })
        );
        localStorage.setItem("lastOrderTotal", total.toString());
        localStorage.removeItem("cart");
        alert("✅ M-Pesa request sent! Check your phone for STK Push.");
        navigate("/success");
      } else {
        alert("Payment request failed. Try again.");
      }
    } catch (error) {
      alert("M-Pesa payment failed. Check console.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("Please agree to the Terms & Conditions");
      return;
    }
    if (!formData.fullName || !formData.phone || !formData.county) {
      alert("Please fill in all required fields");
      return;
    }
    if (paymentMethod === "checkout") {
      await handleMpesaPayment();
    } else {
      const orderId = "ORD-" + Date.now();
      const orderItems = buildOrderItems();
      try {
        await axios.post("http://localhost:5000/api/orders", {
          orderId,
          items: orderItems,
          total,
          customer: formData,
          paymentMethod: "mpesa_on_delivery",
          deliveryMethod,
          mpesaPhone,
        });
      } catch {
        console.log("Order API not available");
      }
      localStorage.setItem(
        "lastOrder",
        JSON.stringify({
          orderId,
          items: orderItems,
          total,
          customer: formData,
          paymentMethod: "mpesa_on_delivery",
          deliveryMethod,
        })
      );
      localStorage.setItem("lastOrderTotal", total.toString());
      localStorage.removeItem("cart");
      alert(
        `🎉 Order placed successfully! ${
          deliveryMethod === "boda" ? "Boda Boda" : "M-Pesa"
        } payment on delivery.`
      );
      navigate("/success");
    }
  };

  const hasAnyFlash = cart.some(isOnFlashSale);
  const hasAnyWarranty = cart.some(hasWarranty);
  const hasAnyGifts = cart.some((item) => getFreeGifts(item).length > 0);
  const itemCount = cart.reduce((n, i) => n + (i.quantity || 1), 0);

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:bg-white transition";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Top bar */}
      <div className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
              ArmorCovers
            </p>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Secure Checkout
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <Lock size={14} className="text-emerald-600" />
            <span>Encrypted · M-Pesa secure</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Steps */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-orange-600 font-semibold">
            <span className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs">
              1
            </span>
            Cart
          </div>
          <div className="w-8 sm:w-12 h-px bg-orange-300" />
          <div className="flex items-center gap-2 text-orange-600 font-semibold">
            <span className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs">
              2
            </span>
            Checkout
          </div>
          <div className="w-8 sm:w-12 h-px bg-slate-200" />
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs">
              3
            </span>
            Confirmation
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left: Form */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery */}
              <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-900">Delivery details</h2>
                    <p className="text-xs text-slate-500">Where should we send your order?</p>
                  </div>
                </div>
                <div className="p-6 space-y-5">
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5">
                      <User size={14} className="text-slate-400" />
                      Full name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={inputClass}
                      placeholder="As on your ID or preferred name"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5">
                      <Phone size={14} className="text-slate-400" />
                      Phone number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={inputClass}
                      placeholder="2547XXXXXXXX"
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        County *
                      </label>
                      <select
                        name="county"
                        value={formData.county}
                        onChange={handleInputChange}
                        className={inputClass}
                        required
                      >
                        <option value="">Select county</option>
                        {Object.keys(kenyaCounties).map((county) => (
                          <option key={county} value={county}>
                            {county}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Sub-county
                      </label>
                      <select
                        name="subCounty"
                        value={formData.subCounty}
                        onChange={handleInputChange}
                        className={inputClass}
                      >
                        <option value="">Select sub-county</option>
                        {formData.county &&
                          kenyaCounties[formData.county]?.map((sub) => (
                            <option key={sub} value={sub}>
                              {sub}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Delivery address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`${inputClass} h-24 resize-none`}
                      placeholder="House / plot, street, estate, landmark…"
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Delivery method */}
              <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Truck size={18} />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-900">Delivery method</h2>
                    <p className="text-xs text-slate-500">Choose how you want it delivered</p>
                  </div>
                </div>
                <div className="p-6 grid sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("normal")}
                    className={`text-left p-4 rounded-xl border-2 transition ${
                      deliveryMethod === "normal"
                        ? "border-orange-500 bg-orange-50/80 ring-1 ring-orange-200"
                        : "border-slate-150 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <p className="font-semibold text-slate-900">Standard delivery</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Reliable doorstep delivery across Kenya
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("boda")}
                    className={`text-left p-4 rounded-xl border-2 transition ${
                      deliveryMethod === "boda"
                        ? "border-orange-500 bg-orange-50/80 ring-1 ring-orange-200"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                      Boda express <span className="text-base">🚀</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Faster same-day / next-day where available
                    </p>
                  </button>
                </div>
              </section>

              {/* Payment */}
              <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-900">Payment</h2>
                    <p className="text-xs text-slate-500">Pay with M-Pesa securely</p>
                  </div>
                </div>
                <div className="p-6 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("checkout")}
                      className={`text-left p-4 rounded-xl border-2 transition ${
                        paymentMethod === "checkout"
                          ? "border-orange-500 bg-orange-50/80 ring-1 ring-orange-200"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <p className="font-semibold text-slate-900">Pay now</p>
                      <p className="text-xs text-slate-500 mt-1">
                        STK push on your phone during checkout
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("delivery")}
                      className={`text-left p-4 rounded-xl border-2 transition ${
                        paymentMethod === "delivery"
                          ? "border-orange-500 bg-orange-50/80 ring-1 ring-orange-200"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <p className="font-semibold text-slate-900">Pay on delivery</p>
                      <p className="text-xs text-slate-500 mt-1">
                        M-Pesa when your order arrives
                      </p>
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      M-Pesa phone number *
                    </label>
                    <input
                      type="tel"
                      value={mpesaPhone}
                      onChange={(e) => setMpesaPhone(e.target.value)}
                      className={inputClass}
                      placeholder="2547XXXXXXXX"
                      required
                    />
                    <p className="text-xs text-slate-400 mt-1.5">
                      Use the number registered for M-Pesa
                    </p>
                  </div>
                </div>
              </section>

              {/* Terms + submit */}
              <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded accent-orange-500"
                  />
                  <span className="text-sm text-slate-600 leading-relaxed">
                    I agree to the{" "}
                    <Link to="/terms" className="text-orange-600 font-medium underline underline-offset-2">
                      Terms & Conditions
                    </Link>{" "}
                    and understand the delivery and return policy.
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={loading || cart.length === 0}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-xl font-semibold text-base shadow-lg shadow-orange-500/25 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {loading ? (
                    "Processing…"
                  ) : paymentMethod === "checkout" ? (
                    <>
                      <Lock size={18} />
                      Pay KSh {total.toLocaleString()} with M-Pesa
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={18} />
                      Place order ·{" "}
                      {deliveryMethod === "boda" ? "Boda express" : "Pay on delivery"}
                    </>
                  )}
                </button>
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Lock size={12} /> Secure checkout
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield size={12} /> Buyer protection
                  </span>
                  <span className="flex items-center gap-1">
                    <Package size={12} /> Tracked delivery
                  </span>
                </div>
              </section>
            </form>
          </div>

          {/* Right: Order summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm sticky top-24 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h2 className="font-semibold text-slate-900">Order summary</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              </div>

              <div className="p-6 max-h-[50vh] overflow-y-auto space-y-4">
                {cart.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-8">Your cart is empty</p>
                ) : (
                  cart.map((item: any, index: number) => {
                    const onFlash = isOnFlashSale(item);
                    const onWarranty = hasWarranty(item);
                    const gifts = getFreeGifts(item);
                    const hasGifts = gifts.length > 0;

                    return (
                      <div
                        key={index}
                        className="flex gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0"
                      >
                        <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-100">
                          {item.image ? (
                            <img
                              src={`http://localhost:5000${item.image}`}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">
                              📦
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-slate-900 line-clamp-2">
                            {item.name}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Qty {item.quantity || 1}
                            {item.selectedColor ? ` · ${item.selectedColor}` : ""}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {onFlash && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold bg-orange-50 text-orange-700 px-1.5 py-0.5 rounded-md">
                                <Zap size={9} /> Flash
                              </span>
                            )}
                            {onWarranty && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md">
                                <Shield size={9} /> {getWarrantyLabel(item)}
                              </span>
                            )}
                            {hasGifts && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded-md">
                                <Gift size={9} />
                                {gifts.length > 1 ? `${gifts.length} gifts` : "Gift"}
                              </span>
                            )}
                          </div>
                          {hasGifts && (
                            <div className="mt-1 space-y-0.5">
                              {gifts.map((g, gi) => (
                                <p key={gi} className="text-[11px] text-purple-600">
                                  + {g.name}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-slate-900 whitespace-nowrap">
                          KSh {(item.price * (item.quantity || 1)).toLocaleString()}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>

              {(hasAnyFlash || hasAnyWarranty || hasAnyGifts) && (
                <div className="px-6 pb-3 flex flex-wrap gap-2">
                  {hasAnyFlash && (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full border border-orange-100">
                      <Zap size={11} /> Flash sale
                    </span>
                  )}
                  {hasAnyWarranty && (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-100">
                      <Shield size={11} /> Warranty
                    </span>
                  )}
                  {hasAnyGifts && (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full border border-purple-100">
                      <Gift size={11} /> Free gift(s)
                    </span>
                  )}
                </div>
              )}

              <div className="px-6 py-5 border-t border-slate-100 bg-slate-50/80">
                <div className="flex justify-between items-baseline">
                  <span className="text-slate-600 font-medium">Total</span>
                  <span className="text-2xl font-bold text-orange-600 tracking-tight">
                    KSh {total.toLocaleString()}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 text-right">
                  Inclusive of selected options · M-Pesa ready
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;