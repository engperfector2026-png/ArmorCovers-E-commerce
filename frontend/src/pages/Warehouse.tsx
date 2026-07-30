import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  ArrowLeft,
  Package,
  Zap,
  BadgePercent,
  Gift,
} from "lucide-react";

interface SellerInfo {
  _id?: string;
  id?: string;
  name?: string;
  phone?: string;
}

interface WarehouseProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  wholesalePrice?: number;
  stock: number;
  image?: string;
  minimumOrder: number;
  category: string;
  subcategory?: string;   // preferred (matches EditProduct / MyProducts / ProductDetails)
  subCategory?: string;    // legacy support
  seller?: string | SellerInfo;
  // Free Gift
  hasFreeGift?: boolean;
  giftName?: string;
  giftDescription?: string;
  giftImage?: string;
  gift?: {
    name?: string;
    description?: string;
    image?: string;
  };
}

interface SubCategory {
  name: string;
  value: string;
}

interface MainCategory {
  name: string;
  icon: string;
  subcategories: SubCategory[];
}

function Warehouse() {
  const [products, setProducts] = useState<WarehouseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("All");
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const mainCategories: MainCategory[] = [
    {
      name: "Electronics",
      icon: "🔌",
      subcategories: [
        { name: "All Electronics", value: "All" },
        { name: "Consumer Electronics", value: "Consumer Electronics" },
        { name: "Computing & Office Electronics", value: "Computing & Office Electronics" },
        { name: "Gaming & Entertainment", value: "Gaming & Entertainment" },
        { name: "Home & Kitchen Electronics", value: "Home & Kitchen Electronics" },
        { name: "Electrical & Power", value: "Electrical & Power" },
        { name: "Tools & Industrial Electronics", value: "Tools & Industrial Electronics" },
        { name: "Automotive Electronics", value: "Automotive Electronics" },
      ],
    },
    {
      name: "Vehicles",
      icon: "🚗",
      subcategories: [
        { name: "All Vehicles", value: "All" },
        { name: "Car Covers & Protection", value: "Car Covers & Protection" },
        { name: "Motorcycle & Bike Covers", value: "Motorcycle & Bike Covers" },
        { name: "Vehicle Accessories", value: "Vehicle Accessories" },
        { name: "Truck & Heavy Vehicle Covers", value: "Truck & Heavy Vehicle Covers" },
        { name: "Interior Protection", value: "Interior Protection" },
        { name: "Car Electronics", value: "Car Electronics" },
      ],
    },
    {
      name: "Fashion",
      icon: "👕",
      subcategories: [
        { name: "All Fashion", value: "All" },
        { name: "Men's Clothing", value: "Men's Clothing" },
        { name: "Women's Clothing", value: "Women's Clothing" },
        { name: "Kids & Baby Fashion", value: "Kids & Baby Fashion" },
        { name: "Footwear", value: "Footwear" },
        { name: "Bags & Accessories", value: "Bags & Accessories" },
        { name: "Traditional & Cultural Wear", value: "Traditional & Cultural Wear" },
      ],
    },
    {
      name: "Home",
      icon: "🏠",
      subcategories: [
        { name: "All Home", value: "All" },
        { name: "Furniture & Decor", value: "Furniture & Decor" },
        { name: "Home Textiles & Bedding", value: "Home Textiles & Bedding" },
        { name: "Kitchen & Dining", value: "Kitchen & Dining" },
        { name: "Home Improvement", value: "Home Improvement" },
        { name: "Lighting & Electricals", value: "Lighting & Electricals" },
        { name: "Garden & Outdoor", value: "Garden & Outdoor" },
      ],
    },
    {
      name: "Agriculture",
      icon: "🌾",
      subcategories: [
        { name: "All Agriculture", value: "All" },
        { name: "Farming Tools & Equipment", value: "Farming Tools & Equipment" },
        { name: "Seeds & Fertilizers", value: "Seeds & Fertilizers" },
        { name: "Irrigation Systems", value: "Irrigation Systems" },
        { name: "Protective Covers & Nets", value: "Protective Covers & Nets" },
        { name: "Animal Husbandry", value: "Animal Husbandry" },
        { name: "Harvesting & Storage", value: "Harvesting & Storage" },
      ],
    },
    {
      name: "Beauty",
      icon: "💄",
      subcategories: [
        { name: "All Beauty", value: "All" },
        { name: "Skincare", value: "Skincare" },
        { name: "Hair Care", value: "Hair Care" },
        { name: "Makeup & Cosmetics", value: "Makeup & Cosmetics" },
        { name: "Fragrances", value: "Fragrances" },
        { name: "Personal Care", value: "Personal Care" },
        { name: "Beauty Tools & Devices", value: "Beauty Tools & Devices" },
      ],
    },
    {
      name: "Sports",
      icon: "⚽",
      subcategories: [
        { name: "All Sports", value: "All" },
        { name: "Fitness Equipment", value: "Fitness Equipment" },
        { name: "Outdoor Sports", value: "Outdoor Sports" },
        { name: "Team Sports", value: "Team Sports" },
        { name: "Sports Apparel & Gear", value: "Sports Apparel & Gear" },
        { name: "Camping & Hiking", value: "Camping & Hiking" },
        { name: "Sports Protection", value: "Sports Protection" },
      ],
    },
    {
      name: "Health",
      icon: "🩺",
      subcategories: [
        { name: "All Health", value: "All" },
        { name: "Medical Supplies", value: "Medical Supplies" },
        { name: "Supplements & Nutrition", value: "Supplements & Nutrition" },
        { name: "Personal Hygiene", value: "Personal Hygiene" },
        { name: "Fitness & Wellness", value: "Fitness & Wellness" },
        { name: "First Aid & Safety", value: "First Aid & Safety" },
      ],
    },
    {
      name: "Stationary",
      icon: "📝",
      subcategories: [
        { name: "All Stationary", value: "All" },
        { name: "Writing Instruments", value: "Writing Instruments" },
        { name: "Notebooks & Paper", value: "Notebooks & Paper" },
        { name: "Office Supplies", value: "Office Supplies" },
        { name: "Art & Craft Supplies", value: "Art & Craft Supplies" },
        { name: "School Supplies", value: "School Supplies" },
      ],
    },
    {
      name: "Education",
      icon: "📚",
      subcategories: [
        { name: "All Education", value: "All" },
        { name: "Books & Textbooks", value: "Books & Textbooks" },
        { name: "Learning Materials", value: "Learning Materials" },
        { name: "Educational Toys", value: "Educational Toys" },
        { name: "School Furniture", value: "School Furniture" },
        { name: "E-Learning Devices", value: "E-Learning Devices" },
      ],
    },
  ];

  // Normalize subcategory (supports both field names)
  const getSubcategory = (p: WarehouseProduct): string => {
    const sub = p.subcategory || p.subCategory || "";
    return sub && sub !== "All" ? sub : "";
  };

  useEffect(() => {
    const fetchWarehouseProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/products/warehouse"
        );
        setProducts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("❌ Error fetching warehouse products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouseProducts();
  }, []);

  const getMinOrder = (product: WarehouseProduct) =>
    Math.max(1, product.minimumOrder || 1);

  const getQty = (product: WarehouseProduct) =>
    quantities[product._id] ?? getMinOrder(product);

  const updateQuantity = (product: WarehouseProduct, newQty: number) => {
    const min = getMinOrder(product);
    const max = product.stock > 0 ? product.stock : 9999;
    const clamped = Math.min(max, Math.max(min, newQty));
    setQuantities((prev) => ({
      ...prev,
      [product._id]: clamped,
    }));
  };

  const getSellerName = (product: WarehouseProduct) => {
    if (!product.seller) return "ArmorCovers";
    if (typeof product.seller === "object" && product.seller.name) {
      return product.seller.name;
    }
    return "Verified Seller";
  };

  const getUnitPrice = (product: WarehouseProduct) => {
    if (product.wholesalePrice && product.wholesalePrice > 0) {
      return product.wholesalePrice;
    }
    return product.price;
  };

  const getSavingsPercent = (product: WarehouseProduct) => {
    if (!product.wholesalePrice || product.wholesalePrice >= product.price) {
      return 0;
    }
    return Math.round(
      ((product.price - product.wholesalePrice) / product.price) * 100
    );
  };

  // Free gift helpers
  const hasFreeGift = (product: WarehouseProduct) => {
    if (product.hasFreeGift === false) return false;
    return !!(product.giftName || product.gift?.name);
  };

  const getGiftName = (product: WarehouseProduct) => {
    return product.giftName || product.gift?.name || "Free Gift";
  };

  const addToCart = (product: WarehouseProduct) => {
    const min = getMinOrder(product);
    const qty = getQty(product);

    if (qty < min) {
      alert(`Minimum order for this product is ${min} units.`);
      return;
    }

    const unitPrice = getUnitPrice(product);
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.findIndex(
      (item: any) => item._id === product._id && item.isWarehouse
    );

    if (existing !== -1) {
      cart[existing].quantity = (cart[existing].quantity || min) + qty;
    } else {
      cart.push({
        ...product,
        price: unitPrice,
        quantity: qty,
        isWarehouse: true,
        minimumOrder: min,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    const giftText = hasFreeGift(product)
      ? `\n🎁 Free gift: ${getGiftName(product)}`
      : "";

    alert(
      `✅ ${qty} × ${product.name} added to cart!\nTotal: KSh ${(unitPrice * qty).toLocaleString()}${giftText}`
    );
  };

  const filteredProducts = products.filter((product) => {
    if (!selectedMainCategory) return true;
    if (product.category !== selectedMainCategory) return false;
    if (selectedSubCategory === "All") return true;
    const sub = product.subcategory || product.subCategory || "";
    return sub === selectedSubCategory;
  });

  const currentMain = mainCategories.find(
    (cat) => cat.name === selectedMainCategory
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-slate-600">
        Loading Warehouse...
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Compact Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                <Package size={12} />
                BULK · WHOLESALE · WAREHOUSE
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                ArmorCovers{" "}
                <span className="text-orange-400">Warehouse</span>
              </h1>
              <p className="text-slate-300 mt-2 max-w-xl text-sm md:text-base">
                Stock up at wholesale prices. Minimum orders apply. Fast dispatch
                across Kenya.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-xs md:text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-2 rounded-xl">
                <BadgePercent size={16} className="text-orange-400" />
                Wholesale rates
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-2 rounded-xl">
                <Truck size={16} className="text-orange-400" />
                Bulk delivery
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-2 rounded-xl">
                <ShieldCheck size={16} className="text-orange-400" />
                Verified stock
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              <Zap size={12} fill="white" />
              Buy more · Save more
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-orange-200 text-xs px-3 py-1.5 rounded-full">
              Limited warehouse stock
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-orange-200 text-xs px-3 py-1.5 rounded-full">
              Same-day processing
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
        {/* Categories */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => {
                setSelectedMainCategory(null);
                setSelectedSubCategory("All");
              }}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
                !selectedMainCategory
                  ? "bg-orange-500 text-white shadow"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-orange-300"
              }`}
            >
              All
            </button>
            {mainCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setSelectedMainCategory(category.name);
                  setSelectedSubCategory("All");
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1.5 transition ${
                  selectedMainCategory === category.name
                    ? "bg-orange-500 text-white shadow"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-orange-300"
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {selectedMainCategory && currentMain && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  setSelectedMainCategory(null);
                  setSelectedSubCategory("All");
                }}
                className="flex items-center gap-1 text-orange-600 text-xs font-medium hover:underline"
              >
                <ArrowLeft size={14} /> All
              </button>
              {currentMain.subcategories.map((sub) => (
                <button
                  key={sub.value}
                  onClick={() => setSelectedSubCategory(sub.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                    selectedSubCategory === sub.value
                      ? "bg-orange-100 text-orange-700 border border-orange-200"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="text-sm text-slate-500 mb-4">
          {filteredProducts.length} warehouse{" "}
          {filteredProducts.length === 1 ? "item" : "items"}
          {selectedMainCategory ? ` in ${selectedMainCategory}` : ""}
          {selectedSubCategory && selectedSubCategory !== "All"
            ? ` › ${selectedSubCategory}`
            : ""}
        </p>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const min = getMinOrder(product);
              const qty = getQty(product);
              const unitPrice = getUnitPrice(product);
              const savings = getSavingsPercent(product);
              const sellerName = getSellerName(product);
              const lineTotal = unitPrice * qty;
              const onGift = hasFreeGift(product);
              const subcategory = getSubcategory(product);

              return (
                <div
                  key={product._id}
                  className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group ${
                    onGift
                      ? "border-purple-200 ring-1 ring-purple-50"
                      : "border-slate-100"
                  }`}
                >
                  {/* Image */}
                  <Link
                    to={`/products/${product._id}`}
                    className="relative block h-28 sm:h-32 bg-slate-50 overflow-hidden"
                  >
                    <img
                      src={
                        product.image
                          ? `http://localhost:5000${product.image}`
                          : "https://via.placeholder.com/400x300?text=Warehouse"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {savings > 0 && (
                        <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                          -{savings}%
                        </div>
                      )}
                      {onGift && (
                        <div className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow">
                          <Gift size={10} />
                          FREE GIFT
                        </div>
                      )}
                    </div>

                    <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                      Bulk
                    </div>
                  </Link>

                  {/* Body */}
                  <div className="p-3 flex-1 flex flex-col">
                    {/* Category + Subcategory badges */}
                    <div className="flex flex-wrap gap-1 mb-1.5">
                      <span className="inline-block bg-orange-100 text-orange-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
                        {product.category || "Uncategorized"}
                      </span>
                      {subcategory && (
                        <span className="inline-block bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
                          {subcategory}
                        </span>
                      )}
                    </div>

                    <Link to={`/products/${product._id}`}>
                      <h3 className="font-semibold text-[13px] sm:text-sm line-clamp-2 leading-snug text-slate-800 group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                      by{" "}
                      <span className="text-slate-600 font-medium">
                        {sellerName}
                      </span>
                    </p>

                    {onGift && (
                      <p className="text-[10px] text-purple-600 font-medium mt-1 flex items-center gap-1">
                        <Gift size={10} />
                        + {getGiftName(product)}
                      </p>
                    )}

                    {/* Prices */}
                    <div className="mt-2">
                      {product.wholesalePrice &&
                      product.wholesalePrice < product.price ? (
                        <>
                          <p className="text-[10px] text-slate-400 line-through">
                            Retail KSh {product.price.toLocaleString()}
                          </p>
                          <p className="text-base font-bold text-orange-600">
                            KSh {unitPrice.toLocaleString()}
                            <span className="text-[10px] font-normal text-slate-400 ml-1">
                              / unit
                            </span>
                          </p>
                        </>
                      ) : (
                        <p className="text-base font-bold text-orange-600">
                          KSh {unitPrice.toLocaleString()}
                          <span className="text-[10px] font-normal text-slate-400 ml-1">
                            / unit
                          </span>
                        </p>
                      )}
                    </div>

                    <p className="text-[10px] text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-2 py-1 mt-2 inline-block w-fit">
                      Min. order: {min} units
                    </p>

                    {/* Qty controls */}
                    <div className="flex items-center justify-between mt-3 gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(product, qty - 1)}
                          disabled={qty <= min}
                          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                          title={
                            qty <= min
                              ? `Minimum order is ${min}`
                              : "Decrease"
                          }
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-semibold w-8 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(product, qty + 1)}
                          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="text-[11px] font-semibold text-slate-700">
                        KSh {lineTotal.toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition active:scale-[0.98] shadow-sm"
                    >
                      <ShoppingCart size={15} />
                      Add {qty} to Cart
                      {onGift && <span className="opacity-90">+ Gift</span>}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-16">
              <Package size={40} className="mx-auto text-slate-300 mb-3" />
              <p className="text-lg text-slate-500">No warehouse products found</p>
              <p className="text-sm text-slate-400 mt-1">
                Try another category or add products with type Warehouse / Both
              </p>
            </div>
          )}
        </div>

        {/* Trust footer */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <BadgePercent size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Wholesale pricing</p>
              <p className="text-xs text-slate-500">Lower unit cost on bulk</p>
            </div>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Truck size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Bulk delivery</p>
              <p className="text-xs text-slate-500">Kenya-wide logistics</p>
            </div>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Verified sellers</p>
              <p className="text-xs text-slate-500">Trusted warehouse stock</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Warehouse;