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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct({
          name: res.data.name,
          description: res.data.description,
          category: res.data.category,
          price: res.data.price,
          stock: res.data.stock,
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, product);
      alert("✅ Product updated successfully!");
      navigate("/my-products");
    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading product...</div>;

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