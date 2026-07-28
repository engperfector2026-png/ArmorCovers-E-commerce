import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, Search, ArrowLeft, Zap, Shield } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

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
  // Flash Sale fields
  isFlashSale?: boolean;
  flashSalePrice?: number;
  flashSaleStart?: string;
  flashSaleEnd?: string;
  flashSaleStock?: number;
  // Warranty fields
  warranty?: boolean | number | string;
  warrantyMonths?: number;
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Check if a product is currently on a valid flash sale
  const isOnFlashSale = (product: Product) => {
    if (!product.isFlashSale || !product.flashSalePrice) return false;

    const now = new Date();
    const start = product.flashSaleStart ? new Date(product.flashSaleStart) : null;
    const end = product.flashSaleEnd ? new Date(product.flashSaleEnd) : null;

    if (start && now < start) return false;
    if (end && now > end) return false;

    return true;
  };

  // Check if product has warranty (only when seller added it)
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

  const getDisplayPrice = (product: Product) => {
    if (isOnFlashSale(product)) {
      return product.flashSalePrice!;
    }
    return product.price;
  };

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartItem = {
      ...product,
      price: getDisplayPrice(product),
      isFlashSale: isOnFlashSale(product),
    };
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`✅ ${product.name} added to cart!`);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === "" ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;
    if (!selectedMainCategory) return true;
    if (product.category !== selectedMainCategory) return false;
    if (selectedSubCategory === "All") return true;
    return product.subcategory === selectedSubCategory;
  });

  // Sort: Flash sales first
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aFlash = isOnFlashSale(a) ? 1 : 0;
    const bFlash = isOnFlashSale(b) ? 1 : 0;
    return bFlash - aFlash;
  });

  const currentMain = mainCategories.find(cat => cat.name === selectedMainCategory);

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
        {/* Hero */}
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
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {sortedProducts.length > 0 ? (
                sortedProducts.map((product) => {
                  const onFlash = isOnFlashSale(product);
                  const onWarranty = hasWarranty(product);

                  return (
                    <div
                      key={product._id}
                      className={`bg-white rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border flex flex-col h-full ${
                        onFlash ? "border-orange-300 ring-2 ring-orange-100" : "border-gray-100"
                      }`}
                    >
                      <Link to={`/products/${product._id}`} className="flex-1 flex flex-col">
                        <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden bg-gray-50">
                          <img
                            src={
                              product.image
                                ? `http://localhost:5000${product.image}`
                                : "https://via.placeholder.com/600x400"
                            }
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />

                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                            {onFlash && (
                              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                                <Zap size={12} fill="white" />
                                FLASH SALE
                              </div>
                            )}
                            {onWarranty && (
                              <div className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                                <Shield size={12} />
                                {getWarrantyLabel(product)}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="p-4 sm:p-5 flex-1 flex flex-col">
                          <h3 className="font-bold text-[15px] sm:text-base md:text-lg mb-1.5 line-clamp-2 leading-snug">
                            {product.name}
                          </h3>

                          <p className="text-gray-500 mb-3 line-clamp-2 text-xs sm:text-sm flex-1">
                            {product.description}
                          </p>

                          {onWarranty && (
                            <p className="text-[11px] text-emerald-600 font-medium mb-2 flex items-center gap-1">
                              <Shield size={12} />
                              Warranty included
                            </p>
                          )}

                          <div className="mt-auto">
                            {onFlash ? (
                              <>
                                <p className="text-[11px] sm:text-xs text-gray-400 mb-0.5 line-through">
                                  KSh {product.price.toLocaleString()}
                                </p>
                                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600">
                                  KSh {product.flashSalePrice!.toLocaleString()}
                                </p>
                                {product.flashSaleEnd && (
                                  <p className="text-[10px] text-rose-500 mt-1 font-medium">
                                    Ends {new Date(product.flashSaleEnd).toLocaleDateString()}
                                  </p>
                                )}
                              </>
                            ) : (
                              <>
                                <p className="text-[11px] sm:text-xs text-gray-400 mb-0.5">
                                  Retail Price
                                </p>
                                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600">
                                  KSh {product.price.toLocaleString()}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </Link>

                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                          }}
                          className={`w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all text-sm ${
                            onFlash
                              ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                              : "bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white"
                          }`}
                        >
                          <ShoppingCart size={16} />
                          {onFlash ? "Grab Deal" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-16 sm:py-20">
                  <p className="text-gray-500 text-lg sm:text-xl">
                    No products found
                  </p>
                  {searchTerm && (
                    <p className="text-gray-400 mt-2 text-sm">
                      Try a different search term
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