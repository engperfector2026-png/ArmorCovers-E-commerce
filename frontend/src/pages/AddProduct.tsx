import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Upload, Gift, X, Plus } from "lucide-react";

interface GiftItem {
  id: string;
  name: string;
  description: string;
  file: File | null;
  preview: string;
}

const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState("");

  // Multiple free gifts
  const [hasFreeGift, setHasFreeGift] = useState(false);
  const [gifts, setGifts] = useState<GiftItem[]>([
    { id: crypto.randomUUID(), name: "", description: "", file: null, preview: "" },
  ]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    wholesalePrice: "",
    stock: "1",
    minimumOrder: "1",
    type: "retail",
  });

  const addGift = () => {
    setGifts((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", description: "", file: null, preview: "" },
    ]);
  };

  const removeGift = (id: string) => {
    setGifts((prev) => {
      if (prev.length <= 1) return prev; // keep at least one when enabled
      return prev.filter((g) => g.id !== id);
    });
  };

  const updateGift = (id: string, field: keyof GiftItem, value: string | File | null) => {
    setGifts((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        if (field === "file" && value instanceof File) {
          return {
            ...g,
            file: value,
            preview: URL.createObjectURL(value),
          };
        }
        if (field === "file" && value === null) {
          return { ...g, file: null, preview: "" };
        }
        return { ...g, [field]: value };
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("wholesalePrice", product.wholesalePrice || "");
      formData.append("stock", product.stock);
      formData.append("minimumOrder", product.minimumOrder);
      formData.append("type", product.type);

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      // ===== MULTIPLE FREE GIFTS =====
      formData.append("hasFreeGift", String(hasFreeGift));

      if (hasFreeGift) {
        // Validate: every gift needs a name
        const invalid = gifts.some((g) => !g.name.trim());
        if (invalid) {
          alert("Please fill in a name for every free gift.");
          setLoading(false);
          return;
        }

        // Send gift metadata as JSON (order matches giftImages)
        const giftsMeta = gifts.map((g) => ({
          name: g.name.trim(),
          description: g.description.trim(),
        }));
        formData.append("gifts", JSON.stringify(giftsMeta));

        // Append each gift image under the same field name "giftImages"
        gifts.forEach((g) => {
          if (g.file) {
            formData.append("giftImages", g.file);
          }
        });
      }

      // Seller ID
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const sellerId = user._id || user.id || user.userId || "";

      if (sellerId) {
        formData.append("seller", String(sellerId));
      } else {
        alert(
          "Warning: You may not be logged in as a seller. Product may not appear on your dashboard."
        );
      }

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      console.log("✅ Product created:", res.data);

      alert("✅ Product Added Successfully");
      navigate("/seller-dashboard");
    } catch (error: any) {
      console.error("Add product error:", error.response?.data || error);
      alert(
        error.response?.data?.message ||
          "Failed to add product. Check console for details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/seller-dashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <h1 className="text-4xl font-bold">Add New Product</h1>
        </div>

        <div className="bg-white rounded-3xl shadow p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* ===== BASIC PRODUCT INFO ===== */}
            <div>
              <label className="block text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                className="w-full px-5 py-4 rounded-2xl border focus:border-orange-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
                className="w-full px-5 py-4 rounded-2xl border h-32 focus:border-orange-500 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Category</label>
                <select
                  value={product.category}
                  onChange={(e) =>
                    setProduct({ ...product, category: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl border focus:border-orange-500 focus:outline-none"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Home">Home</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Sports">Sports</option>
                  <option value="Health">Health</option>
                  <option value="Stationary">Stationary</option>
                  <option value="Education">Education</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Product Type</label>
                <select
                  value={product.type}
                  onChange={(e) =>
                    setProduct({ ...product, type: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl border focus:border-orange-500 focus:outline-none"
                  required
                >
                  <option value="retail">Retail Only</option>
                  <option value="wholesale">Wholesale Only</option>
                  <option value="both">Both Retail & Wholesale</option>
                  <option value="warehouse">Warehouse (Bulk)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  Retail Price (KSh)
                </label>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl border focus:border-orange-500 focus:outline-none"
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Wholesale Price (KSh)
                </label>
                <input
                  type="number"
                  value={product.wholesalePrice}
                  onChange={(e) =>
                    setProduct({ ...product, wholesalePrice: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl border focus:border-orange-500 focus:outline-none"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Stock</label>
                <input
                  type="number"
                  value={product.stock}
                  onChange={(e) =>
                    setProduct({ ...product, stock: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl border focus:border-orange-500 focus:outline-none"
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Minimum Order</label>
                <input
                  type="number"
                  value={product.minimumOrder}
                  onChange={(e) =>
                    setProduct({ ...product, minimumOrder: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl border focus:border-orange-500 focus:outline-none"
                  required
                  min="1"
                />
              </div>
            </div>

            {/* ===== PRODUCT IMAGE ===== */}
            <div>
              <label className="block text-gray-700 mb-2">Product Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                      setPreviewImage(URL.createObjectURL(file));
                    }
                  }}
                  className="hidden"
                  id="image"
                />
                <label
                  htmlFor="image"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload size={40} className="text-gray-400 mb-4" />
                  <p className="text-gray-600">Click to upload image</p>
                </label>
              </div>

              {previewImage && (
                <div className="mt-6">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                </div>
              )}
            </div>

            {/* ===== FREE GIFTS SECTION (MULTIPLE) ===== */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Gift className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Free Gifts
                    </h3>
                    <p className="text-sm text-gray-500">
                      Add one or more free gifts with this product
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasFreeGift}
                    onChange={(e) => {
                      setHasFreeGift(e.target.checked);
                      if (e.target.checked && gifts.length === 0) {
                        setGifts([
                          {
                            id: crypto.randomUUID(),
                            name: "",
                            description: "",
                            file: null,
                            preview: "",
                          },
                        ]);
                      }
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>

              {hasFreeGift && (
                <div className="space-y-4">
                  {gifts.map((gift, index) => (
                    <div
                      key={gift.id}
                      className="bg-orange-50/50 border border-orange-100 rounded-2xl p-5 space-y-4 relative"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-orange-700">
                          Gift #{index + 1}
                        </p>
                        {gifts.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeGift(gift.id)}
                            className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition"
                            title="Remove gift"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2 text-sm">
                          Gift Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={gift.name}
                          onChange={(e) =>
                            updateGift(gift.id, "name", e.target.value)
                          }
                          placeholder="e.g. Free Phone Case / Free Cap"
                          className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:border-orange-500 focus:outline-none bg-white text-sm"
                          required={hasFreeGift}
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2 text-sm">
                          Gift Description
                        </label>
                        <textarea
                          value={gift.description}
                          onChange={(e) =>
                            updateGift(gift.id, "description", e.target.value)
                          }
                          placeholder="Short description of this free gift..."
                          className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:border-orange-500 focus:outline-none bg-white h-20 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2 text-sm">
                          Gift Image (optional)
                        </label>
                        <div className="border-2 border-dashed border-orange-200 rounded-xl p-4 text-center bg-white">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) updateGift(gift.id, "file", file);
                            }}
                            className="hidden"
                            id={`giftImage-${gift.id}`}
                          />
                          <label
                            htmlFor={`giftImage-${gift.id}`}
                            className="cursor-pointer flex flex-col items-center"
                          >
                            <Upload size={28} className="text-orange-400 mb-2" />
                            <p className="text-gray-600 text-xs">
                              Upload gift image
                            </p>
                          </label>
                        </div>

                        {gift.preview && (
                          <div className="mt-3 relative inline-block">
                            <img
                              src={gift.preview}
                              alt={`Gift ${index + 1} Preview`}
                              className="w-24 h-24 object-cover rounded-xl border border-orange-200"
                            />
                            <button
                              type="button"
                              onClick={() => updateGift(gift.id, "file", null)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addGift}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-orange-300 text-orange-600 hover:bg-orange-50 font-medium text-sm transition"
                  >
                    <Plus size={18} />
                    Add Another Gift
                  </button>
                </div>
              )}
            </div>

            {/* ===== ACTIONS ===== */}
            <div className="flex gap-4 mt-10">
              <button
                type="button"
                onClick={() => navigate("/seller-dashboard")}
                className="flex-1 border border-gray-300 py-4 rounded-2xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-semibold disabled:opacity-60"
              >
                {loading ? "Saving Product..." : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;