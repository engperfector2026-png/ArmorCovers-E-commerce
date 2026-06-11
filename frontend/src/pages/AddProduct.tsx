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
    stock: "1",
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

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

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

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

      navigate("/my-products");
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => navigate("/seller-dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 font-medium"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          <div className="bg-orange-500 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">
              Add New Product
            </h1>

            <p className="text-orange-100 mt-2">
              Create a new product for your marketplace store.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-8"
          >
            <div className="grid md:grid-cols-2 gap-6">

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">
                  Product Name
                </label>

                <input
                  type="text"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      name: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl p-4 text-gray-900"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">
                  Description
                </label>

                <textarea
                  rows={5}
                  value={product.description}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      description: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl p-4 text-gray-900"
                  placeholder="Describe your product"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Category
                </label>

                <select
                  value={product.category}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      category: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl p-4 text-gray-900"
                  required
                >
                  <option value="">
                    Select Category
                  </option>
                  <option value="Vehicles">
                    Vehicles
                  </option>
                  <option value="Electronics">
                    Electronics
                  </option>
                  <option value="Fashion">
                    Fashion
                  </option>
                  <option value="Home">
                    Home & Living
                  </option>
                  <option value="Agriculture">
                    Agriculture
                  </option>
                  <option value="Services">
                    Services
                  </option>
                  <option value="Beauty">
                    Beauty
                  </option>
                  <option value="Health">
                    Health
                  </option>
                  <option value="Sports">
                    Sports
                  </option>
                  <option value="Jobs">
                    Jobs
                  </option>
                  <option value="RealEstate">
                    Real Estate
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Price (KES)
                </label>

                <input
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      price: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl p-4 text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Stock Quantity
                </label>

                <input
                  type="number"
                  value={product.stock}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      stock: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl p-4 text-gray-900"
                />
              </div>

            </div>

            <div className="mt-8">
              <label className="block text-gray-700 font-semibold mb-3">
                Product Image
              </label>

              <div className="border-2 border-dashed border-orange-300 rounded-2xl bg-orange-50 p-8 text-center">

                <Upload
                  size={50}
                  className="mx-auto text-orange-500 mb-4"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      setSelectedFile(file);
                      setPreviewImage(
                        URL.createObjectURL(file)
                      );
                    }
                  }}
                  className="mt-4"
                />
              </div>
            </div>

            {previewImage && (
              <div className="mt-6">

                <div className="flex justify-between mb-3">

                  <h3 className="font-semibold text-gray-700">
                    Image Preview
                  </h3>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewImage("");
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <X size={16} />
                    Remove
                  </button>

                </div>

                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-80 object-cover rounded-xl"
                />

              </div>
            )}

            <div className="flex gap-4 mt-10">

              <button
                type="button"
                onClick={() =>
                  navigate("/seller-dashboard")
                }
                className="flex-1 border border-gray-300 py-4 rounded-xl"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold"
              >
                {loading
                  ? "Saving Product..."
                  : "Add Product"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;