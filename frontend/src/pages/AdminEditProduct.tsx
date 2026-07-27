import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Trash2, Save, MessageSquare, Package } from "lucide-react";

const MAIN_CATEGORIES = [
  {
    name: "Electronics",
    subcategories: [
      "Consumer Electronics",
      "Computing & Office Electronics",
      "Gaming & Entertainment",
      "Home & Kitchen Electronics",
      "Electrical & Power",
      "Tools & Industrial Electronics",
      "Automotive Electronics",
    ],
  },
  {
    name: "Vehicles",
    subcategories: [
      "Car Covers & Protection",
      "Motorcycle & Bike Covers",
      "Vehicle Accessories",
      "Truck & Heavy Vehicle Covers",
      "Interior Protection",
      "Car Electronics",
    ],
  },
  {
    name: "Fashion",
    subcategories: [
      "Men's Clothing",
      "Women's Clothing",
      "Kids & Baby Fashion",
      "Footwear",
      "Bags & Accessories",
      "Traditional & Cultural Wear",
    ],
  },
  {
    name: "Home",
    subcategories: [
      "Furniture & Decor",
      "Home Textiles & Bedding",
      "Kitchen & Dining",
      "Home Improvement",
      "Lighting & Electricals",
      "Garden & Outdoor",
    ],
  },
  {
    name: "Agriculture",
    subcategories: [
      "Farming Tools & Equipment",
      "Seeds & Fertilizers",
      "Irrigation Systems",
      "Protective Covers & Nets",
      "Animal Husbandry",
      "Harvesting & Storage",
    ],
  },
  {
    name: "Beauty",
    subcategories: [
      "Skincare",
      "Hair Care",
      "Makeup & Cosmetics",
      "Fragrances",
      "Personal Care",
      "Beauty Tools & Devices",
    ],
  },
  {
    name: "Sports",
    subcategories: [
      "Fitness Equipment",
      "Outdoor Sports",
      "Team Sports",
      "Sports Apparel & Gear",
      "Camping & Hiking",
      "Sports Protection",
    ],
  },
  {
    name: "Health",
    subcategories: [
      "Medical Supplies",
      "Supplements & Nutrition",
      "Personal Hygiene",
      "Fitness & Wellness",
      "First Aid & Safety",
    ],
  },
  {
    name: "Stationery",
    subcategories: [
      "Writing Instruments",
      "Notebooks & Paper",
      "Office Supplies",
      "Art & Craft Supplies",
      "School Supplies",
    ],
  },
  {
    name: "Education",
    subcategories: [
      "Books & Textbooks",
      "Learning Materials",
      "Educational Toys",
      "School Furniture",
      "E-Learning Devices",
    ],
  },
];

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    subcategory: "",
    description: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        setProduct(data);
        setForm({
          name: data.name || "",
          price: data.price || "",
          stock: data.stock || "",
          category: data.category || "",
          subcategory: data.subcategory || "",
          description: data.description || "",
        });
      } catch (error) {
        console.error("Failed to fetch product:", error);
        alert("Product not found");
        navigate("/admin/products");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const currentSubcategories =
    MAIN_CATEGORIES.find((c) => c.name === form.category)?.subcategories || [];

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" ? { subcategory: "" } : {}),
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        {
          name: form.name,
          price: Number(form.price),
          stock: Number(form.stock),
          category: form.category,
          subcategory: form.subcategory,
          description: form.description,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to permanently delete this product?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Product deleted");
      navigate("/admin/products");
    } catch (error) {
      alert("Failed to delete product");
    }
  };

  const handleContactSeller = () => {
    const sellerId = product?.seller?._id || product?.seller;
    if (sellerId) {
      navigate(`/chat/${sellerId}`);
    } else {
      alert("Seller information not available");
    }
  };

  const getSellerName = () => {
    if (!product?.seller) return "Unknown Seller";
    if (typeof product.seller === "string") return product.seller;
    return product.seller.name || "Unknown Seller";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading product...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/admin/products"
            className="p-2 hover:bg-gray-200 rounded-xl transition"
          >
            <ArrowLeft size={22} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
            <p className="text-gray-500 mt-1">Admin control panel</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Product Preview */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden mb-4">
              {product?.image ? (
                <img
                  src={
                    product.image.startsWith("http")
                      ? product.image
                      : `http://localhost:5000${product.image}`
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package size={48} className="text-gray-400" />
                </div>
              )}
            </div>

            <h3 className="font-bold text-lg text-gray-900 mb-2">{product?.name}</h3>
            
            <div className="space-y-2 text-sm">
              <p className="text-gray-500">
                <span className="font-medium text-gray-700">Seller:</span>{" "}
                <span className="text-orange-600 font-semibold">{getSellerName()}</span>
              </p>
              <p className="text-gray-500">
                <span className="font-medium text-gray-700">Current Category:</span>{" "}
                {product?.category}
              </p>
              {product?.subcategory && (
                <p className="text-gray-500">
                  <span className="font-medium text-gray-700">Subcategory:</span>{" "}
                  {product.subcategory}
                </p>
              )}
            </div>

            <button
              onClick={handleContactSeller}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-3 rounded-xl font-medium hover:bg-blue-100 transition"
            >
              <MessageSquare size={18} />
              Contact Seller
            </button>
          </div>

          {/* Right - Edit Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Update Product Details</h3>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (KSh)</label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select Category</option>
                  {MAIN_CATEGORIES.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
                <select
                  name="subcategory"
                  value={form.subcategory}
                  onChange={handleChange}
                  disabled={!form.category}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
                >
                  <option value="">Select Subcategory</option>
                  {currentSubcategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white py-3.5 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-60"
              >
                <Save size={18} />
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                onClick={handleDelete}
                className="flex items-center justify-center gap-2 bg-rose-50 text-rose-600 px-6 py-3.5 rounded-xl font-semibold hover:bg-rose-100 transition"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProduct;