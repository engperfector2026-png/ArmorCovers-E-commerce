import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image?: string;
}

function CategoryPage() {
  const { category } = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/category/${category}`
        );

        setProducts(res.data);
      } catch (error) {
        console.error("Error loading category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            {category}
          </h1>

          <p className="text-gray-500 mt-2">
            Browse products available in the {category} category.
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              No products found
            </h2>

            <p className="text-gray-500 mt-2">
              There are currently no products in this category.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-6">

            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition"
              >

                <div className="h-52 bg-gray-100 flex items-center justify-center overflow-hidden">

                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-6xl">📦</span>
                  )}

                </div>

                <div className="p-5">

                  <h3 className="font-bold text-lg text-gray-900">
                    {product.name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <p className="text-orange-500 font-bold text-xl mt-4">
                    KES {product.price.toLocaleString()}
                  </p>

                  <p className="text-gray-400 text-sm mt-2">
                    {product.category}
                  </p>

                  <Link
                    to={`/products/${product._id}`}
                    className="block text-center mt-5 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition"
                  >
                    View Product
                  </Link>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default CategoryPage;