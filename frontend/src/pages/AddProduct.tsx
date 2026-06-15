import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Upload, X, Save } from 'lucide-react';

const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "1",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreviewImage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!product.name || !product.description || !product.category || !product.price) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("stock", product.stock);

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user.id) formData.append("seller", user.id);

      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Product added successfully!");
      navigate("/my-products");

    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        
        <button
          onClick={() => navigate("/seller-dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 font-medium transition"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="bg-orange-500 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Add New Product</h1>
            <p className="text-orange-100 mt-1">Fill in the details to list your product</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-orange-500"
                  placeholder="e.g. Premium Toyota Prado Seat Covers"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Description *</label>
                <textarea
                  name="description"
                  rows={5}
                  value={product.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-orange-500"
                  placeholder="Detailed description of your product..."
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Category *</label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-orange-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Vehicles">Vehicles & Accessories</option>
                  <option value="Fashion">Fashion & Apparel</option>
                  <option value="Home">Home & Living</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Beauty">Beauty & Health</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Price (KES) *</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-orange-500"
                  placeholder="2500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-orange-500"
                  min="1"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">Product Image</label>
              <div className="border-2 border-dashed border-orange-300 rounded-2xl bg-orange-50 p-10 text-center">
                <Upload size={48} className="mx-auto text-orange-500 mb-4" />
                <p className="text-gray-600">Click to upload image</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-4 cursor-pointer"
                />
              </div>
            </div>

            {previewImage && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-700">Image Preview</h3>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                  >
                    <X size={18} /> Remove
                  </button>
                </div>
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full max-h-80 object-cover rounded-2xl border"
                />
              </div>
            )}

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate("/seller-dashboard")}
                className="flex-1 border border-gray-300 py-4 rounded-2xl font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition"
              >
                <Save size={20} />
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