import { useEffect, useState } from "react";
<<<<<<< HEAD
import axios from "axios";
import { ShoppingCart, ArrowLeft, Heart, Search } from "lucide-react";
import { Link } from "react-router-dom";
=======
import { Link } from "react-router-dom";
import axios from "axios";
import { ShoppingCart, Search } from "lucide-react";
>>>>>>> 9fb3c69fabe9c74dd467f3d4032cdea50d79da3c

interface Product {
  _id: string;
  name: string;
  description: string;
<<<<<<< HEAD
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

function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("All");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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
=======
  category: string;
  price: number;
  stock: number;
  image?: string;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All", "Vehicles", "Fashion", "Electronics", "Home", 
    "Agriculture", "Beauty", "Sports", "Health", "Stationary", "Education"
>>>>>>> 9fb3c69fabe9c74dd467f3d4032cdea50d79da3c
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
<<<<<<< HEAD
        setLoading(true);
        setError("");

        console.log("🔄 Fetching products from backend...");

        const response = await axios.get("http://localhost:5000/api/products", {
          timeout: 15000,
        });

        console.log("✅ Products fetched successfully:", response.data?.length || 0, "items");

        setProducts(Array.isArray(response.data) ? response.data : []);
      } catch (error: any) {
        console.error("❌ Error fetching products:", error);
        setError(error.response?.data?.message || error.message || "Failed to load products from server. Check backend.");
        setProducts([]);
=======
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
>>>>>>> 9fb3c69fabe9c74dd467f3d4032cdea50d79da3c
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

<<<<<<< HEAD
  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`✅ ${product.name} added to cart!`);
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === "" || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (!selectedMainCategory) return true;
    if (product.category !== selectedMainCategory) return false;

    if (selectedSubCategory === "All") return true;
    return product.subcategory === selectedSubCategory;
  });

  const currentMain = mainCategories.find(cat => cat.name === selectedMainCategory);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-2xl">Loading Shop...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 tracking-tight bg-gradient-to-r from-slate-900 via-orange-600 to-slate-900 bg-clip-text text-transparent">
            ArmorCovers Shop
          </h1>
          <p className="text-2xl text-gray-600">Premium Retail Products • Fast Delivery</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8 text-center font-medium">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-10">
          {/* LEFT SIDEBAR - CATEGORIES */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 shadow-sm sticky top-8">
              <h3 className="font-bold text-2xl mb-6">Categories</h3>

              <div className="relative mb-8">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-gray-100 border border-gray-200 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-orange-500"
                />
                <Search className="absolute left-5 top-4 text-gray-400" size={22} />
              </div>

              <div className="space-y-2">
                {mainCategories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => {
                      setSelectedMainCategory(category.name);
                      setSelectedSubCategory("All");
                    }}
                    className={`w-full text-left px-6 py-4 rounded-2xl font-medium flex items-center gap-4 transition-all ${
                      selectedMainCategory === category.name
                        ? "bg-orange-500 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="lg:col-span-9">
            {selectedMainCategory && currentMain && (
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={() => {
                      setSelectedMainCategory(null);
                      setSelectedSubCategory("All");
                    }}
                    className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
                  >
                    <ArrowLeft size={22} /> All Categories
                  </button>
                  <h3 className="text-3xl font-bold text-gray-800">{selectedMainCategory}</h3>
                </div>

                <div className="flex gap-3 flex-wrap">
                  {currentMain.subcategories.map((sub) => (
                    <button
                      key={sub.value}
                      onClick={() => setSelectedSubCategory(sub.value)}
                      className={`px-7 py-3.5 rounded-2xl font-medium transition-all ${
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const isWishlisted = wishlist.includes(product._id);
                  return (
                    <div
                      key={product._id}
                      className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col h-full"
                    >
                      <Link to={`/products/${product._id}`} className="flex-1 flex flex-col">
                        <div className="relative h-52 overflow-hidden">
                          <img
                            src={product.image ? `http://localhost:5000${product.image}` : "https://via.placeholder.com/600x400"}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <button
                            onClick={(e) => { e.preventDefault(); toggleWishlist(product._id); }}
                            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition z-10"
                          >
                            <Heart size={20} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"} />
                          </button>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="font-bold text-lg mb-2 line-clamp-2 leading-tight">{product.name}</h3>
                          <p className="text-gray-600 mb-6 line-clamp-3 text-[14px] flex-1">{product.description}</p>
                          <div className="mb-6">
                            <p className="text-xs text-gray-500">Retail Price</p>
                            <p className="text-3xl font-bold text-orange-600">KSh {product.price.toLocaleString()}</p>
                          </div>
                        </div>
                      </Link>
                      <div className="p-6 pt-0">
                        <button
                          onClick={(e) => { e.preventDefault(); addToCart(product); }}
                          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all active:scale-95 text-sm"
                        >
                          <ShoppingCart size={18} /> Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-20">
                  <p className="text-gray-500 text-xl">No products available yet</p>
                  <p className="text-gray-400 mt-2">Please add products from the Seller Dashboard</p>
                </div>
              )}
            </div>
          </div>
        </div>
=======
  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Search & Category Filter */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border rounded-2xl focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-2xl text-sm font-medium whitespace-nowrap transition ${
                  selectedCategory === category 
                    ? "bg-orange-500 text-white" 
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <div className="text-center py-20">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link 
                key={product._id} 
                to={`/products/${product._id}`}
                className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition group overflow-hidden"
              >
                <div className="h-56 bg-gray-100 relative">
                  <img
                    src={product.image ? `http://localhost:5000${product.image}` : "https://via.placeholder.com/400"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {product.stock > 0 && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">In Stock</div>
                  )}
                </div>

                <div className="p-6">
                  <p className="uppercase text-xs tracking-widest text-orange-500 mb-2">{product.category}</p>
                  <h3 className="font-semibold text-lg line-clamp-2 mb-3 group-hover:text-orange-600">{product.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{product.description}</p>

                  <div className="flex justify-between items-center">
                    <p className="text-3xl font-bold text-orange-600">KSh {product.price.toLocaleString()}</p>
                    <button
                      onClick={(e) => { e.preventDefault(); alert(`✅ ${product.name} added to cart!`); }}
                      className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-2xl transition"
                    >
                      <ShoppingCart size={22} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
>>>>>>> 9fb3c69fabe9c74dd467f3d4032cdea50d79da3c
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default Shop;
=======
export default Products;
>>>>>>> 9fb3c69fabe9c74dd467f3d4032cdea50d79da3c
