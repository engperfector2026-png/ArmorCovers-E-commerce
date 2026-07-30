import { useEffect, useState } from "react";
import axios from "axios";
import {
  ShoppingCart,
  Search,
  ArrowLeft,
  Zap,
  Shield,
  Home,
  Phone,
  Heart,
  MessageCircle,
  Gift,
} from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

interface SellerInfo {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
}

interface FreeGift {
  name: string;
  description?: string;
  image?: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  wholesalePrice?: number;
  stock: number;
  image?: string;
  minimumOrder: number;
  category: string;
  subcategory?: string;
  seller?: string | SellerInfo;
  isFlashSale?: boolean;
  flashSalePrice?: number;
  flashSaleStart?: string;
  flashSaleEnd?: string;
  flashSaleStock?: number;
  warranty?: boolean | number | string;
  warrantyMonths?: number;
  hasFreeGift?: boolean;
  gifts?: FreeGift[];
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

function Shop() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [contactMenuId, setContactMenuId] = useState<string | null>(null);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const urlSearch = searchParams.get("search");
    if (urlSearch) {
      setSearchTerm(urlSearch);
    }
  }, [searchParams]);

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        const data = Array.isArray(response.data) ? response.data : [];
        setProducts(data);
        console.log(
          "📦 Products with categories:",
          data.map((p: Product) => ({
            name: p.name,
            category: p.category,
            subcategory: p.subcategory,
          }))
        );
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const close = () => setContactMenuId(null);
    if (contactMenuId) {
      window.addEventListener("click", close);
      return () => window.removeEventListener("click", close);
    }
  }, [contactMenuId]);

  const norm = (s?: string) => String(s || "").trim().toLowerCase();

  const isOnFlashSale = (product: Product) => {
    if (!product.isFlashSale || !product.flashSalePrice) return false;
    const now = new Date();
    const start = product.flashSaleStart ? new Date(product.flashSaleStart) : null;
    const end = product.flashSaleEnd ? new Date(product.flashSaleEnd) : null;
    if (start && now < start) return false;
    if (end && now > end) return false;
    return true;
  };

  const hasWarranty = (product: Product) => {
    if (product.warranty === true) return true;
    if (typeof product.warranty === "number" && product.warranty > 0) return true;
    if (typeof product.warranty === "string" && product.warranty.trim() !== "") return true;
    if (product.warrantyMonths && product.warrantyMonths > 0) return true;
    return false;
  };

  const getWarrantyLabel = (product: Product) => {
    if (typeof product.warranty === "number") return `${product.warranty} Months`;
    if (product.warrantyMonths) return `${product.warrantyMonths} Months`;
    if (typeof product.warranty === "string") return product.warranty;
    return "12 Months";
  };

  const getFreeGifts = (product: Product): FreeGift[] => {
    if (product.hasFreeGift === false) return [];

    if (Array.isArray(product.gifts) && product.gifts.length > 0) {
      return product.gifts
        .filter((g) => g && g.name && String(g.name).trim())
        .map((g) => ({
          name: String(g.name).trim(),
          description: g.description ? String(g.description).trim() : "",
          image: g.image || "",
        }));
    }

    if (product.gift?.name) {
      return [
        {
          name: product.gift.name,
          description: product.gift.description || "",
          image: product.gift.image || "",
        },
      ];
    }

    if (product.giftName) {
      return [
        {
          name: product.giftName,
          description: product.giftDescription || "",
          image: product.giftImage || "",
        },
      ];
    }

    return [];
  };

  const hasFreeGift = (product: Product) => getFreeGifts(product).length > 0;

  const getGiftLabel = (product: Product) => {
    const gifts = getFreeGifts(product);
    if (gifts.length === 0) return "";
    if (gifts.length === 1) return gifts[0].name;
    return `${gifts.length} Free Gifts`;
  };

  const getDisplayPrice = (product: Product) => {
    if (isOnFlashSale(product)) return product.flashSalePrice!;
    return product.price;
  };

  const getSellerId = (product: Product): string | null => {
    if (!product.seller) return null;
    if (typeof product.seller === "string") return product.seller;
    return product.seller._id || product.seller.id || null;
  };

  const getSellerPhone = (product: Product): string | null => {
    if (!product.seller || typeof product.seller !== "object") return null;
    const phone = product.seller.phone;
    if (!phone) return null;
    let clean = String(phone).replace(/\D/g, "");
    if (clean.startsWith("0")) clean = "254" + clean.slice(1);
    if (clean.length === 9) clean = "254" + clean;
    return clean;
  };

  const contactSellerChat = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContactMenuId(null);

    const sellerId = getSellerId(product);
    if (!sellerId) {
      navigate("/contact");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const buyerId = user._id || user.id || "guest";
    const roomId = `${sellerId}_${buyerId}`;

    navigate(`/chat/${roomId}`, {
      state: {
        sellerId,
        productId: product._id,
        productName: product.name,
        sellerName:
          typeof product.seller === "object" ? product.seller?.name : undefined,
      },
    });
  };

  const contactSellerWhatsApp = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContactMenuId(null);

    const phone = getSellerPhone(product);
    const price = getDisplayPrice(product);
    const message = encodeURIComponent(
      `Hi, I'm interested in "${product.name}" on ArmorCovers.\nPrice: KSh ${Number(price).toLocaleString()}`
    );

    if (phone) {
      window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    } else {
      const openAnyway = window.confirm(
        "This seller has not added a WhatsApp number yet.\n\nOpen WhatsApp anyway with a pre-filled message?"
      );
      if (openAnyway) {
        window.open(`https://wa.me/?text=${message}`, "_blank");
      }
    }
  };

  const addToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartItem = {
      ...product,
      price: getDisplayPrice(product),
      isFlashSale: isOnFlashSale(product),
    };
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    const giftText = hasFreeGift(product) ? ` + ${getGiftLabel(product)}` : "";
    alert(`✅ ${product.name}${giftText} added to cart!`);
  };

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // ===== FILTER: main category + subcategory =====
  const filteredProducts = products.filter((product) => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      product.name.toLowerCase().includes(q) ||
      (product.description && product.description.toLowerCase().includes(q)) ||
      (product.category && product.category.toLowerCase().includes(q)) ||
      (product.subcategory && product.subcategory.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    if (!selectedMainCategory) return true;

    // Match main category (tolerant)
    if (norm(product.category) !== norm(selectedMainCategory)) return false;

    // "All" under this main category
    if (selectedSubCategory === "All") return true;

    // Match subcategory (tolerant)
    return norm(product.subcategory) === norm(selectedSubCategory);
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aFlash = isOnFlashSale(a) ? 2 : 0;
    const bFlash = isOnFlashSale(b) ? 2 : 0;
    const aGift = hasFreeGift(a) ? 1 : 0;
    const bGift = hasFreeGift(b) ? 1 : 0;
    return bFlash + bGift - (aFlash + aGift);
  });

  const currentMain = mainCategories.find((cat) => cat.name === selectedMainCategory);

  // Count products per subcategory for the selected main category
  const subCategoryCounts = (subValue: string) => {
    if (!selectedMainCategory) return 0;
    return products.filter((p) => {
      if (norm(p.category) !== norm(selectedMainCategory)) return false;
      if (subValue === "All") return true;
      return norm(p.subcategory) === norm(subValue);
    }).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl md:text-2xl">
        Loading Shop...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-3 tracking-tight bg-gradient-to-r from-slate-900 via-orange-600 to-slate-900 bg-clip-text text-transparent">
            ArmorCovers Shop
          </h1>
          <p className="text-lg md:text-2xl text-gray-600">
            Premium Retail Products • Fast Delivery
          </p>
        </div>

        {/* ===================== MOBILE CATEGORIES ===================== */}
        <div className="lg:hidden mb-8">
          <div className="relative mb-5">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pl-12 pr-5 focus:outline-none focus:border-orange-500 shadow-sm"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
            <button
              onClick={() => {
                setSelectedMainCategory(null);
                setSelectedSubCategory("All");
              }}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition ${
                !selectedMainCategory
                  ? "bg-orange-500 text-white"
                  : "bg-white border border-gray-200 text-gray-700"
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
                className={`flex-shrink-0 px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap flex items-center gap-2 transition ${
                  selectedMainCategory === category.name
                    ? "bg-orange-500 text-white"
                    : "bg-white border border-gray-200 text-gray-700"
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {selectedMainCategory && currentMain && (
            <div className="flex gap-2 overflow-x-auto pt-3 pb-1 scrollbar-hide">
              {currentMain.subcategories.map((sub) => (
                <button
                  key={sub.value}
                  onClick={() => setSelectedSubCategory(sub.value)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                    selectedSubCategory === sub.value
                      ? "bg-orange-100 text-orange-700 border border-orange-300"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {sub.name}
                  <span className="ml-1 opacity-70">({subCategoryCounts(sub.value)})</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-10">
          {/* ===================== DESKTOP SIDEBAR ===================== */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-3xl p-7 shadow-sm sticky top-24">
              <h3 className="font-bold text-xl mb-6">Categories</h3>

              <div className="relative mb-7">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-gray-100 border border-gray-200 rounded-2xl py-3.5 pl-11 pr-5 focus:outline-none focus:border-orange-500 text-sm"
                />
                <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
              </div>

              <div className="space-y-1.5">
                <button
                  onClick={() => {
                    setSelectedMainCategory(null);
                    setSelectedSubCategory("All");
                  }}
                  className={`w-full text-left px-5 py-3.5 rounded-2xl font-medium transition-all text-sm ${
                    !selectedMainCategory
                      ? "bg-orange-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  All Products
                </button>
                {mainCategories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => {
                      setSelectedMainCategory(category.name);
                      setSelectedSubCategory("All");
                    }}
                    className={`w-full text-left px-5 py-3.5 rounded-2xl font-medium flex items-center gap-3 transition-all text-sm ${
                      selectedMainCategory === category.name
                        ? "bg-orange-500 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ===================== PRODUCTS AREA ===================== */}
          <div className="lg:col-span-9">
            {selectedMainCategory && currentMain && (
              <div className="hidden lg:block mb-8">
                <div className="flex items-center gap-4 mb-5">
                  <button
                    onClick={() => {
                      setSelectedMainCategory(null);
                      setSelectedSubCategory("All");
                    }}
                    className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium text-sm"
                  >
                    <ArrowLeft size={18} /> All Categories
                  </button>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {selectedMainCategory}
                  </h3>
                  <span className="text-sm text-gray-400">
                    {filteredProducts.length} product
                    {filteredProducts.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex gap-2.5 flex-wrap">
                  {currentMain.subcategories.map((sub) => (
                    <button
                      key={sub.value}
                      onClick={() => setSelectedSubCategory(sub.value)}
                      className={`px-5 py-2.5 rounded-2xl font-medium text-sm transition-all ${
                        selectedSubCategory === sub.value
                          ? "bg-orange-500 text-white shadow-md"
                          : "bg-white border hover:bg-gray-50 border-gray-200"
                      }`}
                    >
                      {sub.name}
                      <span className="ml-1.5 opacity-80">
                        ({subCategoryCounts(sub.value)})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {sortedProducts.length > 0 ? (
                sortedProducts.map((product) => {
                  const onFlash = isOnFlashSale(product);
                  const onWarranty = hasWarranty(product);
                  const gifts = getFreeGifts(product);
                  const onGift = gifts.length > 0;
                  const liked = wishlist.includes(product._id);
                  const hasSeller = !!getSellerId(product);

                  return (
                    <div
                      key={product._id}
                      className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border flex flex-col ${
                        onFlash
                          ? "border-orange-300 ring-1 ring-orange-100"
                          : onGift
                          ? "border-purple-200 ring-1 ring-purple-50"
                          : "border-gray-100"
                      }`}
                    >
                      <Link to={`/products/${product._id}`} className="flex-1 flex flex-col">
                        <div className="relative h-28 sm:h-32 md:h-36 overflow-hidden bg-gray-50">
                          <img
                            src={
                              product.image
                                ? `http://localhost:5000${product.image}`
                                : "https://via.placeholder.com/400x300"
                            }
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />

                          <div className="absolute top-2 left-2 flex flex-col gap-1">
                            {onFlash && (
                              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow">
                                <Zap size={10} fill="white" />
                                SALE
                              </div>
                            )}
                            {onWarranty && (
                              <div className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow">
                                <Shield size={10} />
                                {getWarrantyLabel(product)}
                              </div>
                            )}
                            {onGift && (
                              <div className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow">
                                <Gift size={10} />
                                {gifts.length > 1 ? `${gifts.length} GIFTS` : "FREE GIFT"}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="p-3 flex-1 flex flex-col">
                          <h3 className="font-semibold text-[13px] sm:text-sm mb-1 line-clamp-2 leading-snug text-slate-800 group-hover:text-orange-600 transition-colors">
                            {product.name}
                          </h3>

                          {/* Subcategory badge */}
                          {product.subcategory && (
                            <span className="inline-block self-start text-[10px] font-medium text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full mb-1 max-w-full truncate">
                              {product.subcategory}
                            </span>
                          )}

                          {typeof product.seller === "object" && product.seller?.name && (
                            <p className="text-[10px] text-slate-400 mb-1">
                              by {product.seller.name}
                            </p>
                          )}

                          {onGift && (
                            <p className="text-[10px] text-purple-600 font-medium mb-1 flex items-center gap-1">
                              <Gift size={10} />
                              + {getGiftLabel(product)}
                            </p>
                          )}

                          <div className="mt-auto">
                            {onFlash ? (
                              <>
                                <p className="text-[10px] text-gray-400 line-through">
                                  KSh {product.price.toLocaleString()}
                                </p>
                                <p className="text-base sm:text-lg font-bold text-orange-600">
                                  KSh {product.flashSalePrice!.toLocaleString()}
                                </p>
                              </>
                            ) : (
                              <p className="text-base sm:text-lg font-bold text-orange-600">
                                KSh {product.price.toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>

                      <div className="px-3 pb-3 pt-0 flex items-center justify-between gap-1.5 border-t border-gray-50 mt-1">
                        <Link
                          to="/"
                          onClick={(e) => e.stopPropagation()}
                          className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-orange-600 transition"
                          title="Home"
                        >
                          <Home size={16} />
                        </Link>

                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setContactMenuId(
                                contactMenuId === product._id ? null : product._id
                              );
                            }}
                            className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${
                              hasSeller
                                ? "bg-blue-50 hover:bg-blue-100 text-blue-600"
                                : "bg-slate-50 hover:bg-slate-100 text-slate-500"
                            }`}
                            title="Contact Seller"
                          >
                            <Phone size={16} />
                          </button>

                          {contactMenuId === product._id && (
                            <div
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white shadow-xl border border-gray-100 rounded-xl p-1.5 z-30 w-40"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={(e) => contactSellerChat(product, e)}
                                className="w-full flex items-center gap-2 text-left px-3 py-2.5 text-sm hover:bg-blue-50 rounded-lg text-blue-600 font-medium"
                              >
                                <MessageCircle size={15} />
                                In-app Chat
                              </button>
                              <button
                                onClick={(e) => contactSellerWhatsApp(product, e)}
                                className="w-full flex items-center gap-2 text-left px-3 py-2.5 text-sm hover:bg-green-50 rounded-lg text-green-600 font-medium"
                              >
                                <span className="text-base">💬</span>
                                WhatsApp
                              </button>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={(e) => toggleWishlist(product._id, e)}
                          className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition"
                          title="Wishlist"
                        >
                          <Heart
                            size={16}
                            className={
                              liked
                                ? "fill-red-500 text-red-500"
                                : "text-slate-500 hover:text-red-400"
                            }
                          />
                        </button>

                        <button
                          onClick={(e) => addToCart(product, e)}
                          className="w-9 h-9 rounded-xl bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition"
                          title="Add to Cart"
                        >
                          <ShoppingCart size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-16 sm:py-20">
                  <p className="text-gray-500 text-lg sm:text-xl">No products found</p>
                  {(searchTerm || selectedMainCategory) && (
                    <p className="text-gray-400 mt-2 text-sm">
                      Try another category, subcategory, or search term
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;