import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

interface SubCategory {
  name: string;
  value: string;
}

interface MainCategory {
  name: string;
  subcategories: SubCategory[];
}

// MUST match Shop.tsx and AddProduct.tsx
const MAIN_CATEGORIES: MainCategory[] = [
  {
    name: "Electronics",
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

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    subcategory: "",
    price: "",
    stock: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  const subcategories = useMemo(() => {
    const main = MAIN_CATEGORIES.find((c) => c.name === product.category);
    return main?.subcategories || [];
  }, [product.category]);

  const getCurrentUserId = (): string | null => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return user._id || user.id || user.userId || null;
    } catch {
      return null;
    }
  };

  const getToken = (): string | null => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("authToken") ||
      null
    );
  };

  const getProductSellerId = (data: any): string | null => {
    if (!data?.seller) return null;
    if (typeof data.seller === "string") return data.seller;
    return data.seller._id || data.seller.id || null;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const currentUserId = getCurrentUserId();
      const token = getToken();

      if (!currentUserId || !token) {
        alert("Please log in to edit products.");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const productSellerId = getProductSellerId(res.data);

        if (
          !productSellerId ||
          productSellerId.toString() !== currentUserId.toString()
        ) {
          setUnauthorized(true);
          setLoading(false);
          return;
        }

        // Match category to known list (case-tolerant)
        const rawCategory = res.data.category || "";
        const matchedCategory =
          MAIN_CATEGORIES.find(
            (c) => c.name.toLowerCase() === String(rawCategory).toLowerCase()
          )?.name || rawCategory;

        const rawSub = res.data.subcategory || "";
        const main = MAIN_CATEGORIES.find((c) => c.name === matchedCategory);
        const matchedSub =
          main?.subcategories.find(
            (s) =>
              s.value.toLowerCase() === String(rawSub).toLowerCase() ||
              s.name.toLowerCase() === String(rawSub).toLowerCase()
          )?.value || rawSub;

        setProduct({
          name: res.data.name || "",
          description: res.data.description || "",
          category: matchedCategory,
          subcategory: matchedSub === "All" ? "" : matchedSub,
          price: res.data.price ?? "",
          stock: res.data.stock ?? "",
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load product");
        navigate("/my-products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (category: string) => {
    setProduct({
      ...product,
      category,
      subcategory: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentUserId = getCurrentUserId();
    const token = getToken();

    if (!currentUserId || !token) {
      alert("Please log in to edit products.");
      navigate("/login");
      return;
    }

    if (!product.category) {
      alert("Please select a category.");
      return;
    }
    if (!product.subcategory || product.subcategory === "All") {
      alert("Please select a specific subcategory.");
      return;
    }

    setSaving(true);

    try {
      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        {
          name: product.name,
          description: product.description,
          category: product.category,
          subcategory: product.subcategory,
          price: product.price,
          stock: product.stock,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("✅ Product updated successfully!");
      navigate("/my-products");
    } catch (error: any) {
      console.error("Update error:", error.response?.data || error);
      const status = error.response?.status;
      const msg = error.response?.data?.message || "Failed to update product";

      if (status === 401) {
        alert(
          "Not authorized (401). Your login token is missing or invalid.\n\nPlease log out and log in again."
        );
        navigate("/login");
      } else if (status === 403) {
        alert("You can only edit your own products.");
      } else {
        alert(msg);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-slate-600">Loading product...</div>
    );
  }

  if (unauthorized) {
    return (
      <div className="bg-slate-100 min-h-screen flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow p-10 max-w-md text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Access Denied</h2>
          <p className="text-slate-500 mb-6 text-sm">
            You can only edit products that you own. This product belongs to
            another seller.
          </p>
          <button
            onClick={() => navigate("/my-products")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Back to My Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow p-10">
        <div className="flex items-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => navigate("/my-products")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold">Edit Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl border focus:border-orange-500 focus:outline-none"
              required
            />
          </div>

          {/* Category + Subcategory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Main Category *</label>
              <select
                name="category"
                value={product.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border focus:border-orange-500 focus:outline-none"
                required
              >
                <option value="">Select Category</option>
                {MAIN_CATEGORIES.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
                {/* Keep unknown/old category visible if not in list */}
                {product.category &&
                  !MAIN_CATEGORIES.some((c) => c.name === product.category) && (
                    <option value={product.category}>{product.category} (old)</option>
                  )}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Subcategory *</label>
              <select
                name="subcategory"
                value={product.subcategory}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl border focus:border-orange-500 focus:outline-none disabled:bg-gray-100"
                required
                disabled={!product.category}
              >
                <option value="">
                  {product.category ? "Select Subcategory" : "Select category first"}
                </option>
                {subcategories
                  .filter((s) => s.value !== "All")
                  .map((sub) => (
                    <option key={sub.value} value={sub.value}>
                      {sub.name}
                    </option>
                  ))}
                {product.subcategory &&
                  product.subcategory !== "All" &&
                  !subcategories.some((s) => s.value === product.subcategory) && (
                    <option value={product.subcategory}>
                      {product.subcategory} (old)
                    </option>
                  )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Price (KSh)</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl border focus:border-orange-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Stock</label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl border focus:border-orange-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-5 py-4 rounded-2xl border focus:border-orange-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate("/my-products")}
              className="flex-1 py-4 border border-gray-300 rounded-2xl font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-semibold transition disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;