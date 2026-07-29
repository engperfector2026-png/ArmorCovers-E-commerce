import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  const getCurrentUserId = (): string | null => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return user._id || user.id || user.userId || null;
    } catch {
      return null;
    }
  };

  const getToken = (): string | null => {
    // Support common key names
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
        const res = await axios.get(
          `http://localhost:5000/api/products/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const productSellerId = getProductSellerId(res.data);

        if (
          !productSellerId ||
          productSellerId.toString() !== currentUserId.toString()
        ) {
          setUnauthorized(true);
          setLoading(false);
          return;
        }

        setProduct({
          name: res.data.name || "",
          description: res.data.description || "",
          category: res.data.category || "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentUserId = getCurrentUserId();
    const token = getToken();

    if (!currentUserId || !token) {
      alert("Please log in to edit products.");
      navigate("/login");
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
      const msg =
        error.response?.data?.message || "Failed to update product";

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
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Access Denied
          </h2>
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
        <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl border"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl border"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Price (KSh)</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl border"
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
                className="w-full px-5 py-4 rounded-2xl border"
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
              className="w-full px-5 py-4 rounded-2xl border"
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
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-semibold transition"
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