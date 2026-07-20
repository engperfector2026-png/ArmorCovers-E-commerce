import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, Plus, Minus, Truck, ShieldCheck, ArrowLeft } from "lucide-react";

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
  subcategory?: string;
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
  const [error, setError] = useState<string>("");
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
    const fetchWarehouseProducts = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("🔄 Fetching warehouse products...");

        const response = await axios.get("http://localhost:5000/api/products/warehouse", {
          timeout: 10000,
        });

        console.log("✅ Warehouse products loaded:", response.data?.length || 0);
        setProducts(Array.isArray(response.data) ? response.data : []);
      } catch (error: any) {
        console.error("❌ Error fetching warehouse products:", error);
        setError("No warehouse products available yet. Please add some from Seller Dashboard.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouseProducts();
  }, []);

  const updateQuantity = (productId: string, newQty: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, newQty)
    }));
  };

  const addToCart = (product: WarehouseProduct) => {
    const qty = quantities[product._id] || product.minimumOrder || 1;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
   
    for (let i = 0; i < qty; i++) {
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`✅ ${qty} x ${product.name} added to cart!`);
  };

  const filteredProducts = products.filter(product => {
    if (!selectedMainCategory) return true;
    if (product.category !== selectedMainCategory) return false;
    if (selectedSubCategory === "All") return true;
    return product.subcategory === selectedSubCategory;
  });

  const currentMain = mainCategories.find(cat => cat.name === selectedMainCategory);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Loading Warehouse...</div>;

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 tracking-tight bg-gradient-to-r from-slate-900 via-orange-600 to-slate-900 bg-clip-text text-transparent">
            ArmorCovers Warehouse
          </h1>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
            Premium Quality Products • Direct from Warehouse • Trusted Protection
          </p>
          <div className="flex justify-center gap-10 mt-8 text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <Truck className="text-orange-500" size={24} /> Fast & Reliable Delivery
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-orange-500" size={24} /> Verified Premium Stock
            </div>
          </div>
        </div>

        {/* Main Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Shop by Category</h2>
          <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
            {mainCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setSelectedMainCategory(category.name);
                  setSelectedSubCategory("All");
                }}
                className={`group px-8 py-6 rounded-3xl font-medium whitespace-nowrap transition-all duration-300 flex items-center gap-4 text-lg min-w-fit snap-start border ${
                  selectedMainCategory === category.name
                    ? "bg-orange-500 text-white shadow-xl scale-105 border-orange-500"
                    : "bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
              >
                <span className="text-4xl transition-transform group-hover:scale-110">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Subcategories */}
        {selectedMainCategory && currentMain && (
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => {
                  setSelectedMainCategory(null);
                  setSelectedSubCategory("All");
                }}
                className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
              >
                <ArrowLeft size={22} /> Back to All Categories
              </button>
              <h3 className="text-3xl font-bold text-gray-800">{selectedMainCategory}</h3>
            </div>

            <div className="flex gap-3 flex-wrap">
              {currentMain.subcategories.map((sub) => (
                <button
                  key={sub.value}
                  onClick={() => setSelectedSubCategory(sub.value)}
                  className={`px-7 py-3.5 rounded-2xl font-medium transition-all duration-200 ${
                    selectedSubCategory === sub.value
                      ? "bg-orange-500 text-white shadow-md"
                      : "bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const qty = quantities[product._id] || product.minimumOrder || 1;
              return (
                <div 
                  key={product._id} 
                  className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col h-full"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={product.image ? `http://localhost:5000${product.image}` : "https://via.placeholder.com/600x400"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-5 right-5 bg-green-500 text-white text-xs px-4 py-1.5 rounded-full font-medium shadow">
                      In Stock
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="font-bold text-2xl mb-3 line-clamp-2 leading-tight">{product.name}</h3>
                    <p className="text-gray-600 mb-7 line-clamp-3 text-[15px] flex-1">{product.description}</p>

                    <div className="flex justify-between items-end mb-7 mt-auto">
                      <div>
                        <p className="text-xs text-gray-500">Retail Price</p>
                        <p className="text-3xl font-bold text-orange-600">KSh {product.price.toLocaleString()}</p>
                      </div>
                      {product.wholesalePrice && (
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Wholesale</p>
                          <p className="font-bold text-lg">KSh {product.wholesalePrice.toLocaleString()}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mb-7">
                      <button 
                        onClick={() => updateQuantity(product._id, qty - 1)} 
                        className="p-3 border rounded-2xl hover:bg-gray-100 active:bg-gray-200 transition"
                      >
                        <Minus size={20} />
                      </button>
                      <span className="text-2xl font-semibold w-12 text-center">{qty}</span>
                      <button 
                        onClick={() => updateQuantity(product._id, qty + 1)} 
                        className="p-3 border rounded-2xl hover:bg-gray-100 active:bg-gray-200 transition"
                      >
                        <Plus size={20} />
                      </button>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all active:scale-95 text-lg shadow-lg"
                    >
                      <ShoppingCart size={22} /> Add {qty} to Cart
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-24">
              <p className="text-2xl text-gray-400">No warehouse products found</p>
              <p className="text-gray-500 mt-3">Try selecting a different category or add products in Seller Dashboard</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Warehouse;