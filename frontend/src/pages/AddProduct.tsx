import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Upload, X } from "lucide-react";

const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState("");

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("wholesalePrice", product.wholesalePrice);
      formData.append("stock", product.stock);
      formData.append("minimumOrder", product.minimumOrder);
      formData.append("type", product.type);

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (user.id) {
        formData.append("seller", user.id);
      }

      await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("✅ Product Added Successfully");

      navigate("/seller-dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate("/seller-dashboard")} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} /> Back
          </button>
          <h1 className="text-4xl font-bold">Add New Product</h1>
        </div>

        <div className="bg-white rounded-3xl shadow p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-gray-700 mb-2">Product Name</label>
              <input type="text" value={product.name} onChange={(e) => setProduct({...product, name: e.target.value})} className="w-full px-5 py-4 rounded-2xl border focus:border-orange-500" required />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea value={product.description} onChange={(e) => setProduct({...product, description: e.target.value})} className="w-full px-5 py-4 rounded-2xl border h-32 focus:border-orange-500" required />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Category</label>
                <select value={product.category} onChange={(e) => setProduct({...product, category: e.target.value})} className="w-full px-5 py-4 rounded-2xl border focus:border-orange-500" required>
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
                <select value={product.type} onChange={(e) => setProduct({...product, type: e.target.value})} className="w-full px-5 py-4 rounded-2xl border focus:border-orange-500" required>
                  <option value="retail">Retail Only</option>
                  <option value="wholesale">Wholesale Only</option>
                  <option value="both">Both Retail & Wholesale</option>
                  <option value="warehouse">Warehouse (Bulk)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Retail Price (KSh)</label>
                <input type="number" value={product.price} onChange={(e) => setProduct({...product, price: e.target.value})} className="w-full px-5 py-4 rounded-2xl border focus:border-orange-500" required />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Wholesale Price (KSh)</label>
                <input type="number" value={product.wholesalePrice} onChange={(e) => setProduct({...product, wholesalePrice: e.target.value})} className="w-full px-5 py-4 rounded-2xl border focus:border-orange-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Stock</label>
                <input type="number" value={product.stock} onChange={(e) => setProduct({...product, stock: e.target.value})} className="w-full px-5 py-4 rounded-2xl border focus:border-orange-500" required />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Minimum Order</label>
                <input type="number" value={product.minimumOrder} onChange={(e) => setProduct({...product, minimumOrder: e.target.value})} className="w-full px-5 py-4 rounded-2xl border focus:border-orange-500" required />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Product Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
                <input type="file" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setSelectedFile(file);
                    setPreviewImage(URL.createObjectURL(file));
                  }
                }} className="hidden" id="image" />
                <label htmlFor="image" className="cursor-pointer flex flex-col items-center">
                  <Upload size={40} className="text-gray-400 mb-4" />
                  <p className="text-gray-600">Click to upload image</p>
                </label>
              </div>

              {previewImage && (
                <div className="mt-6">
                  <img src={previewImage} alt="Preview" className="w-full h-64 object-cover rounded-2xl" />
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-10">
              <button type="button" onClick={() => navigate("/seller-dashboard")} className="flex-1 border border-gray-300 py-4 rounded-2xl">Cancel</button>
              <button type="submit" disabled={loading} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-semibold">
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